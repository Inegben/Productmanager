"use client";

import { TeamSection } from "@/components/settings/TeamSection";
import { DataSection } from "@/components/settings/DataSection";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Removed unused import
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("team");

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">
                    Manage your workspace, team, and data preferences.
                </p>
            </div>

            <div className="space-y-6">
                <div className="border-b">
                    <div className="flex gap-6">
                        {['team', 'data', 'general'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-colors border-b-2 -mb-[2px]",
                                    activeTab === tab
                                        ? "border-primary text-foreground"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[400px]">
                    {activeTab === 'team' && <TeamSection />}
                    {activeTab === 'data' && <DataSection />}
                    {activeTab === 'general' && (
                        <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                            General settings (Profile, Appearance) coming soon.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
