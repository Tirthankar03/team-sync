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