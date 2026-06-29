# Iranpart Interview

A Nuxt ticket dashboard built with TypeScript, Tailwind CSS and Axios

## Requirements

- Node.js: use the current LTS version, preferably Node.js 20 or newer.
- Nuxt: Nuxt 4 is used through the `nuxt` package.
- Package manager: this repository includes `pnpm-lock.yaml`, so `pnpm` is recommended.

## Install and Run

Install dependencies:

```bash
pnpm install
```

Create a local environment file if you need to override the defaults:

```bash
cp .env.example .env
```

Run the development server:

```bash
pnpm dev
```

## Project Structure

```text
src/
├── app.vue                         # Root Nuxt app component
├── pages/
│   ├── index.vue                    # Main route: /
│   ├── dashboard.vue                # Dashboard redirect/entry route
│   └── dashboard/tickets/index.vue  # Tickets page route
├── modules/
│   └── feature-name/                # Example: tickets
│       ├── api/                     # Feature API endpoints
│       ├── components/              # Feature-only UI components
│       ├── composables/             # Feature state and fetch logic
│       ├── config/                  # Feature configuration, such as table columns
│       ├── constants/               # Feature constants, such as status values
│       ├── services/                # Feature data mapping/business logic
│       ├── types/                   # Feature DTO, model, and query types
│       └── utils/                   # Feature helper functions
├── components/
│   ├── layout/                      # Shared layout components
│   └── ui/                          # Shared base UI components
├── layouts/
│   ├── default.vue                  # Default site layout
│   └── dashboard.vue                # Dashboard layout
├── assets/
│   ├── css/                         # Global CSS files
│   └── fonts/                       # Local font files
├── core/
│   ├── api/                         # Shared API base classes and API types
│   └── constants.ts                 # Shared constants
```

| Directory | Reason |
| --- | --- |
| `src/app.vue` | Root Nuxt application component. |
| `src/pages` | Defines Nuxt routes. Important routes are the main page, dashboard entry, and tickets page. |
| `src/modules` | Keeps feature code grouped by domain. Each module can contain its own `api`, `components`, `composables`, `config`, `constants`, `services`, `types`, and `utils`. Example: `src/modules/tickets`. |
| `src/core` | Stores shared foundation code. The API base layer lives here and is reused by modules. |
| `src/components/layout` | Stores shared layout components like navbar, footer, and dashboard sidebar. |
| `src/components/ui` | Stores shared base UI components like table, paginator, and skeleton components. |
| `src/layouts` | Stores reusable Nuxt page layouts. |
| `src/assets/css` | Stores global CSS files, including Tailwind and font styles. |
| `src/assets/fonts` | Stores local font files. |
| `nuxt.config.ts` | Stores Nuxt modules, route rules, runtime config, TypeScript, and Tailwind setup. |

## Fetch Data Flow

Data is fetched from the backend and used in the frontend with this flow:

```text
Backend
  ↓
BaseApi (Axios)
  ↓
API
  ↓
Service
  ↓
Composable
  ↓
Component / Page
```

| Step | Example file | Responsibility |
| --- | --- | --- |
| `BaseApi (Axios)` | `src/core/api/base-api.ts` | Creates the shared Axios client, sets the base URL, sends HTTP requests, reads the backend response, and handles API errors. |
| `API` | `src/modules/tickets/api/tickets.api.ts` | Defines the backend endpoint methods for a feature. Example: `getUserTickets()` calls the ticket endpoint. |
| `Service` | `src/modules/tickets/services/tickets.service.ts` | Calls the API layer and prepares data for the frontend. Example: converts ticket DTOs to ticket models. |
| `Composable` | `src/modules/tickets/composables/useTickets.ts` | Manages frontend state for the feature, such as `loading`, `error`, `tickets`, and `pagination`. |
| `Component / Page` | `src/pages/dashboard/tickets/index.vue` | Uses the composable, calls the fetch function, and renders the data in the UI. |

The API base URL is configured through Nuxt runtime config:

```env
NUXT_PUBLIC_API_BASE=http://api.fixent.ir/api
NUXT_PUBLIC_DEFAULT_PAGE_SIZE=10
```

## Technical Notes

### 1. Data Fetching Architecture

The project separates backend communication from UI rendering:

```text
BaseApi (Axios) -> API -> Service -> Composable -> Component
```

This keeps each layer focused:

- `BaseApi`: shared HTTP behavior.
- `API`: endpoint definitions for one feature.
- `Service`: data preparation and DTO-to-model conversion.
- `Composable`: page state and actions.
- `Component`: rendering and user interaction.

### 2. Directory Architecture

The project uses a feature-based structure. Shared code stays in `src/core` and `src/components`, while feature-specific code stays inside `src/modules/{feature-name}`.

Example:

```text
src/modules/tickets/
├── api/
├── components/
├── composables/
├── config/
├── constants/
├── services/
├── types/
└── utils/
```

This makes the feature easier to move, maintain, and extend without mixing it with unrelated pages or shared components.

### 3. Filters in Query Params

Ticket filters are stored in the route query, so the page state is shareable and reload-safe.

Example URL state:

```text
?filter={"search":"test","status":"under-review"}&pagination={"page":2}
```

The implementation is in `src/modules/tickets/utils/ticket-route-query.ts`:

- `parseTicketsRouteQuery()` reads query params and converts them to page state.
- `buildTicketsRouteQuery()` converts page state back to query params.
- `isSameTicketsRouteQuery()` prevents unnecessary route updates.

The `useTickets` composable syncs this route state with the UI. Search is debounced, status changes reset the page, and pagination is saved in the URL.

### 4. HTML Template to Vue Components

The provided HTML template was moved into Vue by splitting the page into smaller components instead of keeping one large page file.

The tickets page now only connects the feature state to the UI:

```text
src/pages/dashboard/tickets/index.vue
```

Feature UI parts are placed in:

```text
src/modules/tickets/components/
├── TicketsPageHeader.vue
├── TicketsListToolbar.vue
├── TicketsListSection.vue
├── TicketsListSkeleton.vue
├── TicketsListEmptyState.vue
├── TicketsListErrorState.vue
└── TicketStatusBadge.vue
```

Shared UI components, such as table, paginator, and skeleton, are placed in `src/components/ui` so they can be reused outside the tickets feature.

## Future Improvements

If I had more time, I would add:

1. **CI/CD pipeline**
   Add automated checks for linting, type checking, building, and deployment. This would make every change safer before merging or releasing.

2. **Ticket detail dialog**
   Add a detail dialog that opens when the user clicks an item in the tickets table. This dialog could show the full ticket description, status, department, order information, dates, and possible actions.
