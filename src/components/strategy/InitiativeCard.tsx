import { Initiative } from "@/types";
import { cn } from "@/lib/utils";
import { Calendar, ArrowRight } from "lucide-react";

interface InitiativeCardProps {
    initiative: Initiative;
}

export function InitiativeCard({ initiative }: InitiativeCardProps) {
    return (
        <div className="group flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div>
                <div className="mb-4 flex items-start justify-between">
                    <h3 className="font-semibold leading-none tracking-tight">{initiative.title}</h3>
                    <span className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        initiative.status === "done" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                            initiative.status === "in-progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                                "bg-secondary text-secondary-foreground"
                    )}>
                        {initiative.status}
                    </span>
                </div>

                <p className="mb-6 text-sm text-muted-foreground line-clamp-2">
                    {initiative.description}
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{initiative.startDate} - {initiative.endDate}</span>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex -space-x-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-[10px] text-primary-foreground">
                            {initiative.ownerId.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <button className="group/btn flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        View Details
                        <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
