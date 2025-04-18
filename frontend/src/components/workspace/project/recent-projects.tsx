import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const RecentProjects = () => {
  const workspaceId = useWorkspaceId();

  const [isPending, setIsPending] = useState(true);
  const [projects, setProjects] = useState([]);

  // Dummy data
  useEffect(() => {
    setTimeout(() => {
      setProjects([
        {
          _id: "1",
          name: "Project Aurora",
          emoji: "🌌",
          createdAt: new Date("2025-03-01"),
          createdBy: {
            name: "Alice Johnson",
            profilePicture: "", // Or provide a URL
          },
        },
        {
          _id: "2",
          name: "SkyNet UI",
          emoji: "🛰️",
          createdAt: new Date("2025-03-10"),
          createdBy: {
            name: "Bob Smith",
            profilePicture: "",
          },
        },
        {
          _id: "3",
          name: "Neon CRM",
          emoji: "💡",
          createdAt: new Date("2025-04-01"),
          createdBy: {
            name: "Charlie Rivera",
            profilePicture: "",
          },
        },
      ]);
      setIsPending(false);
    }, 1000); // Simulate loading
  }, []);



  return (
    <div className="flex flex-col pt-2">
      {isPending ? (
        <Loader
          className="w-8 h-8
         animate-spin
         place-self-center
         flex"
        />
      ) : null}
      {projects?.length === 0 && !isPending && (
        <div
          className="font-semibold
         text-sm text-muted-foreground
          text-center py-5"
        >
          No Project created yet
        </div>
      )}

      <ul role="list" className="space-y-2">
        {projects.map((project) => {
          const name = project.createdBy.name;
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            <li
              key={project._id}
              role="listitem"
              className="shadow-none cursor-pointer border-0 py-2 hover:bg-gray-50 transition-colors ease-in-out "
            >
              <Link
                to={`/workspace/${workspaceId}/project/${project._id}`}
                className="grid gap-8 p-0"
              >
                <div className="flex items-start gap-2">
                  <div className="text-xl !leading-[1.4rem]">
                    {project.emoji}
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {project.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.createdAt
                        ? format(project.createdAt, "PPP")
                        : null}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-4">
                    <span className="text-sm text-gray-500">Created by</span>
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src={project.createdBy.profilePicture || ""}
                        alt="Avatar"
                      />
                      <AvatarFallback className={avatarColor}>
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentProjects;
