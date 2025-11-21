import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { InitiativeHeatmap } from "@/components/dashboard/InitiativeHeatmap";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
        <p className="text-muted-foreground">
          High-level overview of strategy, execution, and health.
        </p>
      </div>

      <DashboardStats />
      <InitiativeHeatmap />
    </div>
  );
}
