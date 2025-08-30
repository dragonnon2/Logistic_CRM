# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Logistics CRM MVP built as a web application focusing on dispatcher efficiency. The system is designed for non-technical users and provides a centralized dashboard showing vehicle status, orders, and logistics operations.

## Architecture

**Type:** Jamstack Monorepo with BaaS backend  
**Structure:** npm Workspaces with `/apps/web/` (React app) and `/packages/shared-types/` (TypeScript interfaces)  
**Backend:** Supabase (PostgreSQL, Auth, auto-generated APIs)  
**Frontend:** React + Vite + TypeScript with shadcn/ui components  
**Deployment:** Vercel (frontend) + Supabase (backend)

### Key Project Structure
```
/apps/web/                 # Main React application
  /src/
    /components/           # UI Components
    /data/                # Data files and dummy data
    /hooks/               # Custom React hooks  
    /pages/               # Application pages
    /lib/                 # Utilities (supabaseClient.ts)
/packages/shared-types/    # TypeScript interfaces shared across workspaces
/docs/                    # Project documentation (sharded)
  /prd/                   # Product requirements (sharded)
  /architecture/          # Technical architecture (sharded)
  /stories/               # User stories for development
```

## Technology Stack

- **Frontend:** React ~18.2.0, TypeScript ~5.2.2, Vite ~5.2.0
- **UI/Styling:** shadcn/ui, Tailwind CSS ~3.4.1  
- **State Management:** Zustand ~4.5.2
- **Testing:** Vitest + React Testing Library
- **Backend:** Supabase (latest)
- **Database:** PostgreSQL 15.1

## Core Data Models

**Orders:** Customer logistics orders with status tracking  
**Trucks:** Vehicle information with driver details and location  
**Status Values:** 'Pending', 'In Transit', 'Delivered', 'Urgent'

## Development Commands

Since the project follows the Monorepo pattern with npm Workspaces, commands should be run from the appropriate workspace:

**Root level (workspace management):**
```bash
npm install                    # Install all workspace dependencies
npm run dev                    # Start all development servers
npm run build                  # Build all workspaces
npm run test                   # Run tests across workspaces
```

**Web app specific (from apps/web/ or via workspace):**
```bash
npm run dev --workspace=apps/web     # Start Vite dev server
npm run build --workspace=apps/web   # Build React app
npm run test --workspace=apps/web    # Run Vitest tests
```

## Testing Strategy

Focus on Dashboard functionality during MVP phase. Use Vitest for unit tests and React Testing Library for component testing. Tests should verify basic rendering and core logic functionality.

## Security Requirements

- Store Supabase API keys and sensitive configuration in `.env` files only
- Enable Row Level Security (RLS) in Supabase for data access control
- Never hardcode secrets in the codebase

## Key Documentation

- **Requirements:** `docs/prd/` (sharded Product Requirements Document)
- **Architecture:** `docs/architecture/` (sharded technical documentation)  
- **User Stories:** `docs/stories/` (development stories with acceptance criteria)
- **BMad Configuration:** `.bmad-core/core-config.yaml` (project workflow configuration)

The documentation is sharded into focused sections for easier navigation and maintenance.