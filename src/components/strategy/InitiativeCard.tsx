"use client";

import { Initiative } from "@/types";
import { CalendarDays, Circle, MoreHorizontal } from "lucide-react";
import { useStore } from "@/lib/store";

interface InitiativeCardProps {
    initiative: Initiative;
}

export function InitiativeCard({ initiative }: InitiativeCardProps) {
    const epics = useStore((state) => state.epics.filter(e => e.initiativeId === initiative.id));
    const stories = useStore((state) => state.stories);

    // Calculate Progress
    const initiativeStories = stories.filter(s => epics.some(e => e.id === s.epicId));
    const totalPoints = initiativeStories.reduce((acc, s) => acc + s.points, 0);
    const completedPoints = initiativeStories
        .filter(s => s.status === 'done')
        .reduce((acc, s) => acc + s.points, 0);

    const progress = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

    return (
        <div className="group relative flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="space-y-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h3 className="font-semibold leading-none tracking-tight">{initiative.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{initiative.description}</p>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Circle className={`h-3 w-3 ${initiative.status === 'in-progress' ? 'fill-blue-500 text-blue-500' :
                                initiative.status === 'done' ? 'fill-green-500 text-green-500' : 'text-gray-400'
                            }`} />
                        <span className="capitalize">{initiative.status.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-3 w-3" />
                        <span>
                            {new Date(initiative.startDate).toLocaleDateString(undefined, { month: 'short' })} - {new Date(initiative.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
                <div className="flex -space-x-2">
                    <div className="h-6 w-6 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-medium text-primary">
                        U1
                    </div>
                </div>
                <div className="text-xs text-muted-foreground">
                    {epics.length} Epics • {initiativeStories.length} Stories
                </div>
            </div>
        </div>
    );
}
