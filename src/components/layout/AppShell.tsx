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
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

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
    const fetchData = useStore((state) => state.fetchData);
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Check auth
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user && pathname !== '/login') {
                router.push('/login');
            } else {
                setUser(user);
                fetchData(); // Load data on mount
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push('/login');
                setUser(null);
            } else if (session?.user) {
                setUser(session.user);
                fetchData();
            }
        });

        return () => subscription.unsubscribe();
    }, [pathname, router, fetchData]);

    if (pathname === '/login') {
        return <>{children}</>;
    }

    if (!user) return null; // Or a loading spinner

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
                <div className="flex h-16 items-center border-b px-6 justify-between">
                    <span className="text-xl font-bold text-primary">ProductManager</span>
                </div>

                <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {user.email?.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user.email}</p>
                            <button
                                onClick={() => supabase.auth.signOut()}
                                className="text-xs text-muted-foreground hover:text-foreground"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>
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
