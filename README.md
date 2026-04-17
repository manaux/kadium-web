# Kadium

A web-based property management platform for residential apartment complexes.

This project started as a real internal tool I built for an apartment complex about 4 years ago to replace manual processes — managing residents, tracking maintenance requests, posting announcements, and organizing building contacts. The original codebase is now being cleaned up and extended as part of my public portfolio.

## Features

- **Authentication** — phone number sign-in via Firebase (SMS + reCAPTCHA)
- **Complex management** — buildings, entrances, and apartment directory
- **Residents** — user accounts with role-based access (admin / resident)
- **News & announcements** — per-complex news feed
- **Service requests** — residents can submit and track maintenance requests
- **Contacts** — emergency and service contact directory
- **Camera feeds** — CCTV camera link registry
- **Generic entity system** — all 9 data types driven by a single config-based CRUD architecture

## Tech Stack

- **Angular 12** + TypeScript
- **Firebase** — Realtime Database + Phone Authentication
- **NGXS** — centralized state management
- **Angular Material** — UI components
- **RxJS** — reactive data flows

## Getting Started

### Prerequisites

- Node.js + npm
- Angular CLI: `npm install -g @angular/cli`
- A Firebase project with Realtime Database and Phone Authentication enabled

### Setup

1. Clone the repo
   ```bash
   git clone https://github.com/manaux/kadium-web.git
   cd kadium-web
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Firebase

   Copy the example environment file and fill in your Firebase project credentials:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.example.ts src/environments/environment.prod.ts
   ```

   Edit both files with your values from the [Firebase Console](https://console.firebase.google.com) → Project settings → Your apps.

4. Run the dev server
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`

### Build

```bash
ng build --configuration production
```

## Project Structure

```
src/app/
├── login/              # Phone authentication
├── header/             # Navigation
├── entities/           # Generic CRUD list + detail views
│   ├── entities/       # Paginated data table
│   └── view-edit-entity/  # Create / edit form
├── error/              # Error page
└── shared/
    ├── store/          # NGXS state (user + entity context)
    ├── services/       # Firebase CRUD, auth guard, session
    ├── interfaces/     # TypeScript type definitions
    └── directives/     # Reactive form utilities
```

## License

MIT
