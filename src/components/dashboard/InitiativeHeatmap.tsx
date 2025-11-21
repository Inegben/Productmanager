"use client";

import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function InitiativeHeatmap() {
    const goals = useStore((state) => state.goals);
    const initiatives = useStore((state) => state.initiatives);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done': return 'bg-green-500';
            case 'in-progress': return 'bg-blue-500';
            case 'review': return 'bg-yellow-500';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="rounded-xl border bg-card shadow-sm">
            <div className="border-b p-6">
                <h3 className="font-semibold leading-none tracking-tight">Strategic Alignment Heatmap</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Visual distribution of initiatives across strategic goals.
                </p>
            </div>
            <div className="p-6 grid gap-6">
                {goals.map((goal) => {
                    const goalInitiatives = initiatives.filter(i => i.goalId === goal.id);

                    return (
                        <div key={goal.id} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{goal.title}</span>
                                <span className="text-xs text-muted-foreground">{goalInitiatives.length} Initiatives</span>
                            </div>

                            {goalInitiatives.length > 0 ? (
                                <div className="grid grid-cols-12 gap-2">
                                    {goalInitiatives.map((initiative) => (
                                        <div
                                            key={initiative.id}
                                            className={cn(
                                                "col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 h-24 rounded-lg p-4 flex flex-col justify-between transition-all hover:opacity-90 cursor-pointer border border-transparent hover:border-border",
                                                getStatusColor(initiative.status),
                                                initiative.status === 'todo' ? 'text-foreground' : 'text-white'
                                            )}
                                            title={initiative.title}
                                        >
                                            <span className="text-xs font-medium line-clamp-2">{initiative.title}</span>
                                            <span className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">
                                                {initiative.status.replace('-', ' ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-12 rounded-lg border border-dashed flex items-center justify-center text-xs text-muted-foreground bg-secondary/20">
                                    No active initiatives
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
