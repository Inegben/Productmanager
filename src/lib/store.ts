import { create } from 'zustand';
import { Goal, Initiative, Epic, Story, User } from '@/types';

interface AppState {
    goals: Goal[];
    initiatives: Initiative[];
    epics: Epic[];
    stories: Story[];
    users: User[];

    // Actions
    addGoal: (goal: Goal) => void;
    addInitiative: (initiative: Initiative) => void;
    addEpic: (epic: Epic) => void;
    addStory: (story: Story) => void;
    addUser: (user: User) => void;

    updateStoryStatus: (storyId: string, status: Story['status']) => void;
}

export const useStore = create<AppState>((set) => ({
    goals: [
        {
            id: 'g-1',
            title: 'Market Dominance',
            description: 'Become the #1 provider in the enterprise sector',
            progress: 35,
            color: 'bg-blue-500',
            ownerId: 'u-1'
        },
        {
            id: 'g-2',
            title: 'User Delight',
            description: 'Achieve NPS of 70+',
            progress: 60,
            color: 'bg-green-500',
            ownerId: 'u-1'
        }
    ],
    initiatives: [
        {
            id: 'i-1',
            title: 'Enterprise SSO',
            description: 'Enable SAML and OIDC for large clients',
            goalId: 'g-1',
            status: 'in-progress',
            startDate: '2026-01-01',
            endDate: '2026-03-31',
            ownerId: 'u-1'
        },
        {
            id: 'i-2',
            title: 'Mobile App Redesign',
            description: 'Modernize the UX for iOS and Android',
            goalId: 'g-2',
            status: 'todo',
            startDate: '2026-02-15',
            endDate: '2026-06-30',
            ownerId: 'u-2'
        }
    ],
    epics: [
        {
            id: 'e-1',
            title: 'Authentication Service',
            description: 'Backend changes for SSO',
            initiativeId: 'i-1',
            status: 'in-progress',
            priority: 'high',
            ownerId: 'u-1'
        }
    ],
    stories: [
        {
            id: 's-1',
            title: 'Implement SAML validation',
            description: 'Validate assertions from IdP',
            epicId: 'e-1',
            status: 'done',
            priority: 'critical',
            points: 5
        },
        {
            id: 's-2',
            title: 'Configure OIDC provider',
            description: 'Setup Auth0 connection',
            epicId: 'e-1',
            status: 'in-progress',
            priority: 'high',
            points: 3
        },
        {
            id: 's-3',
            title: 'Update login UI',
            description: 'Add "Login with SSO" button',
            epicId: 'e-1',
            status: 'todo',
            priority: 'medium',
            points: 2
        }
    ],
    users: [
        {
            id: 'u-1',
            name: 'Admin User',
            email: 'admin@company.com',
            avatar: 'AU'
        }
    ],

    addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
    addInitiative: (initiative) => set((state) => ({ initiatives: [...state.initiatives, initiative] })),
    addEpic: (epic) => set((state) => ({ epics: [...state.epics, epic] })),
    addStory: (story) => set((state) => ({ stories: [...state.stories, story] })),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),

    updateStoryStatus: (storyId, status) => set((state) => ({
        stories: state.stories.map((s) => s.id === storyId ? { ...s, status } : s)
    })),
}));
