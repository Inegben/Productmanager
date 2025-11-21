"use client";

import { useStore } from "@/lib/store";
import { Activity, AlertTriangle, Target, Zap } from "lucide-react";

export function DashboardStats() {
    const goals = useStore((state) => state.goals);
    const initiatives = useStore((state) => state.initiatives);
    const stories = useStore((state) => state.stories);

    // 1. North Star Progress (Avg of Goal Progress)
    const avgGoalProgress = goals.length > 0
        ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
        : 0;

    // 2. Delivery Velocity (Completed Points / Total Points)
    const totalPoints = stories.reduce((acc, s) => acc + s.points, 0);
    const completedPoints = stories
        .filter(s => s.status === 'done')
        .reduce((acc, s) => acc + s.points, 0);
    const velocity = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

    // 3. Critical Risks (Critical stories not done)
    const criticalRisks = stories.filter(s => s.priority === 'critical' && s.status !== 'done').length;

    // 4. Active Streams (In-progress initiatives)
    const activeStreams = initiatives.filter(i => i.status === 'in-progress').length;

    const stats = [
        {
            label: "North Star Progress",
            value: `${avgGoalProgress}%`,
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            desc: "Avg. Goal Completion"
        },
        {
            label: "Delivery Velocity",
            value: `${velocity}%`,
            icon: Zap,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            desc: "Scope Completed"
        },
        {
            label: "Critical Risks",
            value: criticalRisks,
            icon: AlertTriangle,
            color: "text-red-500",
            bg: "bg-red-500/10",
            desc: "Open Critical Items"
        },
        {
            label: "Active Streams",
            value: activeStreams,
            icon: Activity,
            color: "text-green-500",
            bg: "bg-green-500/10",
            desc: "Initiatives In Flight"
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className={`rounded-lg p-3 ${stat.bg}`}>
                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold tracking-tight">{stat.value}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
