import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsInWorkspaceController,
  getProjectAnalyticsController,
  getProjectByIdAndWorkspaceIdController,
  updateProjectController,
} from "../controllers/project.controller";

const projectRoutes = Router();

// create a project in workspaceId
projectRoutes.post("/workspace/:workspaceId/create", createProjectController);

// update 
projectRoutes.put(
  "/:id/workspace/:workspaceId/update",
  updateProjectController
);


projectRoutes.delete(
  "/:id/workspace/:workspaceId/delete",
  deleteProjectController
);

// get all projects in a workspace
projectRoutes.get(
  "/workspace/:workspaceId/all",
  getAllProjectsInWorkspaceController
);

// analytics for project 
projectRoutes.get(
  "/:id/workspace/:workspaceId/analytics",
  getProjectAnalyticsController
);

// get project by id
projectRoutes.get(
  "/:id/workspace/:workspaceId",
  getProjectByIdAndWorkspaceIdController
);

export default projectRoutes;
