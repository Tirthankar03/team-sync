import useWorkspaceId from "@/hooks/use-workspace-id";
import AnalyticsCard from "./common/analytics-card";

const WorkspaceAnalytics = () => {
  const workspaceId = useWorkspaceId();



  const analytics = {
    totalTasks: 3,
    overdueTasks: 1,
    completedTasks: 2
  }

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard
        title="Total Task"
        value={analytics?.totalTasks || 0} isLoading={false}      />
      <AnalyticsCard
        title="Overdue Task"
        value={analytics?.overdueTasks || 0} isLoading={false}      />
      <AnalyticsCard
        title="Completed Task"
        value={analytics?.completedTasks || 0} isLoading={false}      />
    </div>
  );
};

export default WorkspaceAnalytics;
