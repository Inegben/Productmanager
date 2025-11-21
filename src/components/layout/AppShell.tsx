"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Target,
    Map,
    ListTodo,
    KanbanSquare,
    Settings,
    Menu,
    X
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Strategy", href: "/strategy", icon: Target },
    { name: "Roadmap", href: "/strategy/roadmap", icon: Map },
    { name: "Backlog", href: "/execution/backlog", icon: ListTodo },
    { name: "Board", href: "/execution/board", icon: KanbanSquare },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="flex items-center justify-between border-b p-4 md:hidden">
                <span className="text-xl font-bold text-primary">ProductManager</span>
                <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex h-16 items-center border-b px-6">
                    <span className="text-xl font-bold text-primary">ProductManager</span>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-secondary/30">
                <div className="container mx-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
