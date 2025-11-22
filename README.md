# ProductManager

A unified Product Management tool bridging the gap between **Strategy** (Vision, Goals) and **Execution** (Tasks, Sprints).

## 🗺️ Application Structure (Sitemap)

The application is architected around two core modules that feed into a unified dashboard.

### 1. 🏠 Dashboard (`/`)
The central command center providing a unified view of progress.
- **Key Widgets**:
    - Roadmap Timeline Preview
    - Active Sprint Progress
    - Recent Activity Feed
    - Goal Health Status

### 2. 🎯 Strategy Module (`/strategy`)
*The "Why" and "What". Focuses on high-level planning and direction.*

- **`/strategy/goals`**: Define strategic objectives and key results (OKRs).
- **`/strategy/initiatives`**: Large bodies of work that achieve goals.
- **`/strategy/roadmap`**: Visual Gantt/Timeline view of initiatives over time.
- **`/strategy/personas`**: User persona definitions and market segments.

### 3. 🔨 Execution Module (`/execution`)
*The "How". Focuses on engineering delivery and day-to-day tasks.*

- **`/execution/backlog`**: Prioritized list of User Stories and Epics.
- **`/execution/board`**: Kanban/Scrum board for active work (To Do, In Progress, Done).
- **`/execution/issues`**: Searchable list of all tasks and bugs.
- **`/execution/releases`**: Release planning and version management.

### 4. ⚙️ Settings (`/settings`)
- Workspace configuration.
- Team management.
- Workflow customization.

## 📊 Data Architecture

The application uses a hierarchical data model to link high-level strategy with day-to-day execution.

### Strategy Layer
1. **Goal**: High-level objectives (e.g., "Market Dominance").
   - *Properties*: Title, Description, Progress %, Owner.
2. **Initiative**: Strategic projects that drive Goals (e.g., "Enterprise SSO").
   - *Properties*: Dates, Status, Linked Goal.

### Execution Layer
3. **Epic**: Large bodies of work broken down from Initiatives (e.g., "Authentication Service").
   - *Properties*: Priority, Status, Linked Initiative.
4. **Story**: Individual units of work (e.g., "Implement SAML validation").
   - *Properties*: Points, Priority, Status, Linked Epic.

### 🔗 The Golden Thread
`Goal` ◄── `Initiative` ◄── `Epic` ◄── `Story`

This linkage ensures that every line of code (Story) can be traced back to a strategic objective (Goal).

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **Deployment**: Vercel

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Inegben/Productmanager.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Setup Database**
   Run the SQL script located in `schema.sql` in your Supabase SQL Editor to create the necessary tables and policies.

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📧 Support

For support or to contact the product owner, please email: **[Inegben@inegben.xyz](mailto:Inegben@inegben.xyz)**
