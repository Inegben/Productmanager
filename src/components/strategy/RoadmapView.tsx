"use client";

import { useStore } from "@/lib/store";
import { useMemo } from "react";

export function RoadmapView() {
    const initiatives = useStore((state) => state.initiatives);
    const goals = useStore((state) => state.goals);

    // Helper to calculate position and width
    const { months, getPosition } = useMemo(() => {
        const start = new Date("2026-01-01");
        const end = new Date("2026-12-31");
        const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const getPosition = (startDate: string, endDate: string) => {
            const s = new Date(startDate);
            const e = new Date(endDate);

            const left = ((s.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;
            const width = ((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) / totalDays * 100;

            return { left: `${Math.max(0, left)}%`, width: `${Math.min(100, width)}%` };
        };

        return { months, getPosition };
    }, []);

    return (
        <div className="rounded-xl border bg-card shadow-sm">
            {/* Header / Timeline Scale */}
            <div className="grid grid-cols-12 border-b bg-secondary/30 text-xs font-medium text-muted-foreground">
                <div className="col-span-3 p-4 border-r">Initiative</div>
                <div className="col-span-9 grid grid-cols-12">
                    {months.map((m) => (
                        <div key={m} className="border-l px-2 py-4 text-center first:border-l-0">
                            {m}
                        </div>
                    ))}
                </div>
            </div>

            {/* Rows */}
            <div className="divide-y">
                {initiatives.map((initiative) => {
                    const goal = goals.find(g => g.id === initiative.goalId);
                    const { left, width } = getPosition(initiative.startDate, initiative.endDate);

                    return (
                        <div key={initiative.id} className="grid grid-cols-12 group hover:bg-secondary/10 transition-colors">
                            {/* Initiative Info */}
                            <div className="col-span-3 p-4 border-r flex flex-col justify-center">
                                <div className="font-medium text-sm truncate" title={initiative.title}>
                                    {initiative.title}
                                </div>
                                <div className="text-xs text-muted-foreground truncate mt-1">
                                    {goal?.title}
                                </div>
                            </div>

                            {/* Timeline Bar */}
                            <div className="col-span-9 relative h-16">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 grid grid-cols-12 pointer-events-none">
                                    {months.map((_, i) => (
                                        <div key={i} className="border-l h-full first:border-l-0 border-dashed border-border/50" />
                                    ))}
                                </div>

                                {/* Bar */}
                                <div className="absolute top-1/2 -translate-y-1/2 h-8 rounded-md px-2 flex items-center text-xs font-medium text-white shadow-sm transition-all hover:opacity-90 cursor-pointer"
                                    style={{ left, width, backgroundColor: 'var(--primary)' }}>
                                    <span className="truncate px-1">{initiative.title}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
