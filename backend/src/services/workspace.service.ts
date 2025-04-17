import mongoose from "mongoose";
import { Roles } from "../enums/role.enum";
import MemberModel from "../models/member.model";
import RoleModel from "../models/roles-permission.model";
import UserModel from "../models/user.model";
import WorkspaceModel from "../models/workspace.model";
import { BadRequestException, NotFoundException } from "../utils/appError";
import TaskModel from "../models/task.model";
import { TaskStatusEnum } from "../enums/task.enum";
import ProjectModel from "../models/project.model";



export const createWorkspaceService = async (
    userId: string,
    body: {
      name: string;
      description?: string | undefined;
    }
  ) => {
    //declare session 
    const session = await mongoose.startSession()
    try {
      //start transaction
      session.startTransaction();

      const { name, description } = body;
  
    const user = await UserModel.findById(userId).session(session);
  
    if (!user) {
      throw new NotFoundException("User not found");
    }
  
    const ownerRole = await RoleModel.findOne({ name: Roles.OWNER }).session(session);
  
    if (!ownerRole) {
      throw new NotFoundException("Owner role not found");
    }
  
    const workspace = new WorkspaceModel({
      name: name,
      description: description,
      owner: user._id,
    });
  
    await workspace.save({session});
  
    const member = new MemberModel({
      userId: user._id,
      workspaceId: workspace._id,
      role: ownerRole._id,
      joinedAt: new Date(),
    });
  
    await member.save({session});
  
    user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
    await user.save({session});
  
    await session.commitTransaction();
    session.endSession()
    return {workspace};

    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }  
  };


  export const getAllWorkspacesUserIsMemberService = async (userId: string) => {

    const memberships = await MemberModel.find({ userId })
      .populate("workspaceId")
      .select("-password")
      .exec();
  
    // Extract workspace details from memberships
    const workspaces = memberships.map((membership) => membership.workspaceId);

    return { workspaces };
  };
  


  export const getWorkspaceMembersService = async (workspaceId: string) => {
    // Fetch all members of the workspace
    
    //takes only a handful of fields from user and role after populating them in member 
    const members = await MemberModel.find({
      workspaceId,
    })
      .populate("userId", "name email profilePicture -password")
      .populate("role", "name");
  
    //takes name and id, removes permission
    const roles = await RoleModel.find({}, { name: 1, _id: 1 })
      .select("-permission")
      .lean();
  
    return { members, roles };
  };


  export const getWorkspaceByIdService = async (workspaceId: string) => {
    // const workspace = await WorkspaceModel.findById(workspaceId);
  
    // if (!workspace) {
    //   throw new NotFoundException("Workspace not found");
    // }
  
    // const members = await MemberModel.find({
    //   workspaceId,
    // }).populate("role");
  
    // const workspaceWithMembers = {
    //   ...workspace.toObject(),
    //   members,
    // };

    //lean is a better option, read-only
    const workspace = await WorkspaceModel.findById(workspaceId).lean(); // use lean

  if (!workspace) {
    throw new NotFoundException("Workspace not found");
  }

  const members = await MemberModel.find({ workspaceId }).populate("role").lean(); 

  const workspaceWithMembers = {
    ...workspace,
    members,
  };
    return {
      workspace: workspaceWithMembers,
    };
  };

  export const updateWorkspaceByIdService = async (
    workspaceId: string,
    name: string,
    description?: string
  ) => {
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }
  
    // Update the workspace details
    workspace.name = name || workspace.name;
    workspace.description = description || workspace.description;
    await workspace.save();
  
    return {
      workspace,
    };
  };


  export const deleteWorkspaceService = async (
    workspaceId: string,
    userId: string
  ) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const workspace = await WorkspaceModel.findById(workspaceId).session(
        session
      );
      if (!workspace) {
        throw new NotFoundException("Workspace not found");
      }
  
      // Check if the user owns the workspace
      if (workspace.owner.toString() !== userId) {
        throw new BadRequestException(
          "You are not authorized to delete this workspace"
        );
      }
  
      const user = await UserModel.findById(userId).session(session);
      if (!user) {
        throw new NotFoundException("User not found");
      }
  
      //delete all projects under the workspace
      await ProjectModel.deleteMany({ workspace: workspace._id }).session(
        session
      );

      //delete all tasks under the workspace
      await TaskModel.deleteMany({ workspace: workspace._id }).session(session);
      
      //remove all members under the workspace
      await MemberModel.deleteMany({
        workspaceId: workspace._id,
      }).session(session);
  
      // Update the user's currentWorkspace if it matches the deleted workspace
      if (user?.currentWorkspace?.equals(workspaceId)) {
        const memberWorkspace = await MemberModel.findOne({ userId }).session(
          session
        );
        // Update the user's currentWorkspace
        user.currentWorkspace = memberWorkspace
          ? memberWorkspace.workspaceId
          : null;

        await user.save({ session });
      }
  
      await workspace.deleteOne({ session });
  
      await session.commitTransaction();
  
      session.endSession();
  
      return {
        currentWorkspace: user.currentWorkspace,
      };

    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

  export const getWorkspaceAnalyticsService = async (workspaceId: string) => {
    //get current date
    const currentDate = new Date();
    //get all tasks from the workspaceId
    const totalTasks = await TaskModel.countDocuments({
      workspace: workspaceId,
    });
    
    //tasks < currentDate()
    const overdueTasks = await TaskModel.countDocuments({
      workspace: workspaceId,
      dueDate: { $lt: currentDate },
      status: { $ne: TaskStatusEnum.DONE },
    });
  
    //tasks that are marked done
    const completedTasks = await TaskModel.countDocuments({
      workspace: workspaceId,
      status: TaskStatusEnum.DONE,
    });
  
    const analytics = {
      totalTasks,
      overdueTasks,
      completedTasks,
    };
  
    return { analytics };
  };

  export const changeMemberRoleService = async (
    workspaceId: string,
    memberId: string,
    roleId: string
  ) => {
    // get workspace by id
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) {
      throw new NotFoundException("Workspace not found");
    }
    
    //get the role from the given id 
    const role = await RoleModel.findById(roleId);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    
    //get the member using userId and workspaceId
    const member = await MemberModel.findOne({
      userId: memberId,
      workspaceId: workspaceId,
    });
  
    if (!member) {
      throw new Error("Member not found in the workspace");
    }
    
    //change the role with the given role 
    member.role = role;
    await member.save();
  
    return {
      member,
    };
  };