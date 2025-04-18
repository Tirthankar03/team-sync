import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import useWorkspaceId from "@/hooks/use-workspace-id";
import {
  getAvatarColor,
  getAvatarFallbackText,
  transformStatusEnum,
} from "@/lib/helper";

import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const RecentTasks = () => {
  const workspaceId = useWorkspaceId();

  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Dummy data
  useEffect(() => {
    setTimeout(() => {
      setTasks([
        {
          _id: "task-001",
          title: "Fix authentication bug",
          taskCode: "AUTH-101",
          dueDate: new Date("2025-04-22"),
          status: "TODO", // should match TaskStatusEnum
          priority: "HIGH", // should match TaskPriorityEnum
          assignedTo: {
            name: "Alice Morgan",
            profilePicture: "",
          },
        },
        {
          _id: "task-002",
          title: "Implement project dashboard UI",
          taskCode: "UI-202",
          dueDate: new Date("2025-04-25"),
          status: "inProgress",
          priority: "medium",
          assignedTo: {
            name: "Bob Chen",
            profilePicture: "",
          },
        },
        {
          _id: "task-002",
          title: "Implement project dashboard UI",
          taskCode: "UI-202",
          dueDate: new Date("2025-04-25"),
          status: "IN_PROGRESS",
          priority: "MEDIUM",
          assignedTo: {
            name: "Bob Chen",
            profilePicture: "",
          },
        },
        {
          _id: "task-002",
          title: "Implement project dashboard UI",
          taskCode: "UI-202",
          dueDate: new Date("2025-04-25"),
          status: "inProgress",
          priority: "medium",
          assignedTo: {
            name: "Bob Chen",
            profilePicture: "",
          },
        },
        {
          _id: "task-002",
          title: "Implement project dashboard UI",
          taskCode: "UI-202",
          dueDate: new Date("2025-04-25"),
          status: "inProgress",
          priority: "medium",
          assignedTo: {
            name: "Bob Chen",
            profilePicture: "",
          },
        },
        {
          _id: "task-002",
          title: "Implement project dashboard UI",
          taskCode: "UI-202",
          dueDate: new Date("2025-04-25"),
          status: "inProgress",
          priority: "medium",
          assignedTo: {
            name: "Bob Chen",
            profilePicture: "",
          },
        },
        {
          _id: "task-002",
          title: "Implement project dashboard UI",
          taskCode: "UI-202",
          dueDate: new Date("2025-04-25"),
          status: "inProgress",
          priority: "medium",
          assignedTo: {
            name: "Bob Chen",
            profilePicture: "",
          },
        },
        {
          _id: "task-003",
          title: "Write integration tests for billing module",
          taskCode: "TEST-303",
          dueDate: new Date("2025-04-30"),
          status: "done",
          priority: "low",
          assignedTo: {
            name: "Charlie Diaz",
            profilePicture: "",
          },
        },
        {
          _id: "task-004",
          title: "Update user roles logic",
          taskCode: "ADMIN-404",
          dueDate: new Date("2025-05-01"),
          status: "todo",
          priority: "high",
          assignedTo: {
            name: "Dana Kapoor",
            profilePicture: "",
          },
        },
        {
          _id: "task-005",
          title: "Optimize database queries",
          taskCode: "DB-505",
          dueDate: new Date("2025-05-05"),
          status: "inProgress",
          priority: "medium",
          assignedTo: {
            name: "Ethan Wright",
            profilePicture: "",
          },
        },
      ]);
      setIsLoading(false);
    }, 500); // Simulate loading
  }, []);



  return (
    <div className="flex flex-col space-y-6">
      {isLoading ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex
        "
        />
      ) : null}

      {tasks?.length === 0 && !isLoading && (
        <div
          className="font-semibold
         text-sm text-muted-foreground
          text-center py-5"
        >
          No Task created yet
        </div>
      )}

      <ul role="list" className="divide-y divide-gray-200">
        {tasks.map((task) => {
          const name = task?.assignedTo?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={task._id}
              className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              {/* Task Info */}
              <div className="flex flex-col space-y-1 flex-grow">
                <span className="text-sm capitalize text-gray-600 font-medium">
                  {task.taskCode}
                </span>
                <p className="text-md font-semibold text-gray-800 truncate">
                  {task.title}
                </p>
                <span className="text-sm text-gray-500">
                  Due: {task.dueDate ? format(task.dueDate, "PPP") : null}
                </span>
              </div>

              {/* Task Status */}
              <div className="text-sm font-medium ">
                <Badge
                  variant={TaskStatusEnum[task.status]}
                  className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
                >
                  <span>{transformStatusEnum(task.status)}</span>
                </Badge>
              </div>

              {/* Task Priority */}
              <div className="text-sm ml-2">
                <Badge
                  variant={TaskPriorityEnum[task.priority]}
                  className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
                >
                  <span>{transformStatusEnum(task.priority)}</span>
                </Badge>
              </div>

              {/* Assignee */}
              <div className="flex items-center space-x-2 ml-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={task.assignedTo?.profilePicture || ""}
                    alt={task.assignedTo?.name}
                  />
                  <AvatarFallback className={avatarColor}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentTasks;
