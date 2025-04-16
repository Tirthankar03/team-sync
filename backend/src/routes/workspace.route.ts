import { Router } from "express";
import { createWorkspaceController, getAllWorkspacesUserIsMemberController, getWorkspaceByIdController, getWorkspaceMembersController } from "../controllers/workspace.controller";

const workspaceRoutes = Router();

workspaceRoutes.post("/create/new", createWorkspaceController);

workspaceRoutes.get("/all", getAllWorkspacesUserIsMemberController);

//get members present in a specific workspace
workspaceRoutes.get("/members/:id", getWorkspaceMembersController);

workspaceRoutes.get("/:id", getWorkspaceByIdController);

export default workspaceRoutes;

