import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { getAvatarColor, getAvatarFallbackText } from "@/lib/helper";
import { format } from "date-fns";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const RecentMembers = () => {
  const workspaceId = useWorkspaceId();


  const [isPending, setIsPending] = useState(true);
  const [members, setMembers] = useState([]);

  // Dummy data
  useEffect(() => {
    setTimeout(() => {
      setMembers([
        {
          _id: "1",
          userId: {
            name: "Alice Johnson",
            profilePicture: "", // You can use a URL if you like
          },
          role: {
            name: "Admin",
          },
          joinedAt: new Date("2025-03-01"),
        },
        {
          _id: "2",
          userId: {
            name: "Bob Smith",
            profilePicture: "",
          },
          role: {
            name: "Developer",
          },
          joinedAt: new Date("2025-03-10"),
        },
        {
          _id: "3",
          userId: {
            name: "Charlie Rivera",
            profilePicture: "",
          },
          role: {
            name: "Designer",
          },
          joinedAt: new Date("2025-04-01"),
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
        place-self-center flex"
        />
      ) : null}

      <ul role="list" className="space-y-3">
        {members.map((member, index) => {
          const name = member?.userId?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={index}
              role="listitem"
              className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="h-9 w-9 sm:flex">
                  <AvatarImage
                    src={member.userId.profilePicture || ""}
                    alt="Avatar"
                  />
                  <AvatarFallback className={avatarColor}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Member Details */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">
                  {member.userId.name}
                </p>
                <p className="text-sm text-gray-500">{member.role.name}</p>
              </div>

              {/* Joined Date */}
              <div className="ml-auto text-sm text-gray-500">
                <p>Joined</p>
                <p>{member.joinedAt ? format(member.joinedAt, "PPP") : null}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentMembers;
