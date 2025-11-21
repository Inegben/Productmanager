import { Goal } from "@/types";
import { cn } from "@/lib/utils";
import { Trophy, TrendingUp, Users } from "lucide-react";

interface GoalCardProps {
    goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className={cn("absolute left-0 top-0 h-full w-1", goal.color)} />

            <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary")}>
                        <Trophy className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold leading-none tracking-tight">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Owner: {goal.ownerId}</p>
                    </div>
                </div>
                <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    goal.progress >= 100 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                        goal.progress >= 50 ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                )}>
                    {goal.progress}%
                </span>
            </div>

            <p className="mb-6 text-sm text-muted-foreground line-clamp-2">
                {goal.description}
            </p>

            <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                        className={cn("h-full transition-all duration-500 ease-in-out", goal.color.replace('bg-', 'bg-opacity-80 bg-'))}
                        style={{ width: `${goal.progress}%`, backgroundColor: 'currentColor' }}
                    />
                    {/* Note: The goal.color is a class like 'bg-blue-500'. We can use it directly if we handle the color mapping correctly or just use the class. 
              Let's simplify and just use the class directly on the div.
          */}
                    <div
                        className={cn("h-full transition-all duration-500 ease-in-out", goal.color)}
                        style={{ width: `${goal.progress}%` }}
                    />
                </div>
            </div>

            <div className="mt-4 flex items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>On Track</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>Product Team</span>
                </div>
            </div>
        </div>
    );
}
