# Agent Guidelines for Systemic AI

## Environment & Package Manager
- **OS**: Linux
- **Package Manager**: Bun (prefer `bun` over `npm` for all commands)
- **Framework**: Next.js 15 (App Router), React 19, TypeScript

## Build/Lint/Test Commands
- **Dev**: `bun run dev`
- **Build**: `bun run build`
- **Lint**: `bun run lint`
- **Format**: `bun run format` (Prettier)
- **Type Check**: `bunx tsc --noEmit`
- **Database**: `bun run db:push` (push schema), `bun run db:studio` (view data)

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Auth**: Better Auth with email/password
- **UI**: Radix UI primitives, shadcn/ui components, Lucide React icons
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with `tailwindcss-animate`, `class-variance-authority`, `clsx`, `tailwind-merge`

## Project Architecture
```
app/
├── (auth)/           # Auth pages (login, register)
├── (dashboard)/      # Protected dashboard routes
│   └── dashboard/
│       ├── analysis/ # AI-powered research analysis
│       ├── chat/     # Research chat interface
│       ├── library/  # Research paper library
│       └── reviews/  # Literature reviews
├── (home)/           # Public landing pages
└── api/              # API routes (auth, AI integrations)

modules/              # Page-specific modules
├── [page-name]/
│   ├── components/   # Carefully broken-down page-specific components
│   └── views/        # Assembled views from components
└── auth/
    ├── components/   # Login form, register form, etc.
    └── views/        # LoginView, RegisterView

components/           # Global reusable components
├── ui/               # Shadcn UI components
└── layout/           # Global layout (header, sidebar)

types/                # Zod schemas and TypeScript types
lib/
├── db/               # Database queries and mutations
├── trpc/             # tRPC setup with server-sent events
├── auth/             # Auth utilities
├── storage/          # Storage classes and functions
└── utils/            # General utilities and helper functions

hooks/                # Custom React hooks
db/                   # Drizzle schema and config
```

## Development Rules

### 1. Server vs Client Components
- **Default**: All components are SERVER-SIDE unless explicitly needed client-side
- **Client-side only when**: Interactive state, event handlers, browser APIs, React hooks (`useState`, `useEffect`, etc.)
- **Mark client components**: Add `"use client"` directive at top of file
- **Auth pattern**: Use server-side validation in pages, then pass data to views

### 2. Page Implementation Pattern
```typescript
// app/(dashboard)/dashboard/[feature]/page.tsx (SERVER COMPONENT - ALWAYS)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { FeatureView } from "@/modules/[feature]/views/FeatureView";
import { getFeatureData } from "@/lib/db/[feature]";

export default async function FeaturePage() {
  // 1. Server-side authentication (REQUIRED BEFORE RENDERING)
  const session = await auth.api.getSession({
    headers: await cookies()
  });
  
  if (!session) {
    redirect("/login");
  }

  // 2. Server-side data fetching using db queries
  const data = await getFeatureData(session.user.id);

  // 3. Render view with data (view assembles components)
  return <FeatureView data={data} user={session.user} />;
}
```

### 3. Module & Component Organization
- **Modules** (`modules/[page-name]/`): Page-specific logic
  - `components/`: Carefully broken-down components for that page only
  - `views/`: Assembled views that combine components
- **Global Components** (`components/`): Reusable across entire app
  - `ui/`: Shadcn UI primitives (use as-is)
  - `layout/`: Global layouts (header, sidebar, footer)
- **Types** (`types/`): All Zod schemas and TypeScript type definitions
- **Database** (`lib/db/`): All database queries and mutations
- **tRPC** (`lib/trpc/`): tRPC setup with server-sent events for real-time AI operations

### 4. Type Definitions with Zod
```typescript
// types/[feature].ts
import { z } from "zod";

export const ResearchInputSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  reviewType: z.enum(["systematic", "literature", "meta-analysis"]),
  description: z.string().optional(),
});

export type ResearchInput = z.infer<typeof ResearchInputSchema>;
```

### 5. Database Queries & Mutations
```typescript
// lib/db/[feature].ts
import { db } from "@/db";
import { research } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getResearchById(id: string) {
  return await db.query.research.findFirst({
    where: eq(research.id, id),
  });
}

export async function createResearch(data: InsertResearch) {
  return await db.insert(research).values(data).returning();
}
```

### 6. Authentication Pattern
- **All pages are SERVER-SIDE** - Authentication happens BEFORE rendering
- **Server-side**: Use `auth.api.getSession()` with cookies
- **Client-side**: Use `useSession()` hook from `@/lib/auth-client` (only in client components)
- **Protected routes**: ALWAYS check session in page component, redirect if unauthorized
- **API routes**: Validate session in API handlers

### 7. Database Operations
- Use Drizzle ORM for all database operations
- Schema defined in `db/schema.ts`
- All queries/mutations in `lib/db/[feature].ts`
- Run `bun run db:push` after schema changes
- Use `bun run db:studio` to view/edit data

### 8. tRPC with Server-Sent Events
```typescript
// lib/trpc/routers/[feature].ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { observable } from "@trpc/server/observable";

export const featureRouter = router({
  streamAnalysis: publicProcedure
    .input(z.object({ id: z.string() }))
    .subscription(async function* ({ input }) {
      // Server-sent events for real-time AI progress
      for await (const chunk of aiAnalysisStream(input.id)) {
        yield chunk;
      }
    }),
});
```

### 9. Code Style
- **Imports**: Use `@/` alias for all imports (e.g., `@/components/ui/button`, `@/modules/auth/views/LoginView`)
- **Types**: TypeScript strict mode; prefer explicit types, avoid `any`
- **Naming**: PascalCase for components, camelCase for functions/variables, kebab-case for files
- **UI Components**: Use existing shadcn/ui components from `@/components/ui/`
- **Utilities**: Use `cn()` from `@/lib/utils` for className merging
- **Formatting**: Double quotes, 2-space indent, semicolons (Next.js defaults)

### 10. AI Integration Patterns
- Research analysis features use AI agents for systematic reviews
- tRPC with server-sent events for real-time AI progress streaming
- Store AI-generated content in database via `lib/db/` queries
- Long-running AI operations show progress via SSE

### 11. Error Handling
- Use environment variables with `!` assertion for required secrets
- Implement proper error boundaries for client components
- Validate all user inputs with Zod schemas (defined in `types/`)
- Return meaningful error messages from API routes and tRPC procedures

### 12. Adding New Shadcn UI Components
```bash
bunx shadcn@latest add [component-name]
```

## Migration Notes
This application is migrating to a **strict modular architecture**:
- **Modules-based organization**: Each page has its own module in `modules/[page-name]/`
- **Server-first**: ALL pages are server-side, authentication BEFORE rendering
- **tRPC with SSE**: Real-time AI operations via server-sent events
- **Type-safe**: Zod schemas in `types/`, database queries in `lib/db/`

## Workflow for Building New Features
1. **Define types** in `types/[feature].ts` using Zod
2. **Create database queries/mutations** in `lib/db/[feature].ts`
3. **Build module structure** in `modules/[feature]/`:
   - Break down components in `components/`
   - Assemble views in `views/`
4. **Create server-side page** in `app/`:
   - Server-side auth check FIRST
   - Data fetching using `lib/db/` queries
   - Render view from `modules/[feature]/views/`
5. **Add tRPC procedures** in `lib/trpc/routers/` (for real-time features)
6. **Client components only when needed** (mark with `"use client"`)
7. **Validate**: Run `bunx tsc --noEmit` and `bun run lint`

## File Organization Rules
- `modules/`: Page-specific code ONLY
- `components/`: Global reusable components and Shadcn UI
- `types/`: ALL Zod schemas and type definitions
- `lib/db/`: ALL database operations
- `lib/trpc/`: tRPC setup and routers
- `lib/storage/`: Storage utilities and classes
- `lib/utils/`: General helper functions
