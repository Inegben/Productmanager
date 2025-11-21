"use client";

import { useStore } from "@/lib/store";
import { InitiativeCard } from "@/components/strategy/InitiativeCard";
import { Plus } from "lucide-react";

export default function InitiativesPage() {
    const initiatives = useStore((state) => state.initiatives);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Strategic Initiatives</h1>
                    <p className="text-muted-foreground">
                        Key projects and programs driving your goals.
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    New Initiative
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {initiatives.map((initiative) => (
                    <InitiativeCard key={initiative.id} initiative={initiative} />
                ))}
            </div>
        </div>
    );
}
