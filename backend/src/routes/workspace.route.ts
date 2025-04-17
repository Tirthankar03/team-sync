import { Router } from "express";
import { changeWorkspaceMemberRoleController, createWorkspaceController, deleteWorkspaceByIdController, getAllWorkspacesUserIsMemberController, getWorkspaceAnalyticsController, getWorkspaceByIdController, getWorkspaceMembersController, updateWorkspaceByIdController } from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", createWorkspaceController);

workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController);

//get members present in a specific workspace
workspaceRoutes.get("/members/:id", getWorkspaceMembersController);

workspaceRoutes.get("/:id", getWorkspaceByIdController);

workspaceRoutes.put("/update/:id", updateWorkspaceByIdController);

workspaceRoutes.delete("/delete/:id", deleteWorkspaceByIdController);

workspaceRoutes.get("/analytics/:id", getWorkspaceAnalyticsController);

//change role of workspace
workspaceRoutes.put(
    "/change/member/role/:id",
    changeWorkspaceMemberRoleController
);

export default workspaceRoutes;

