# Swachchha Nagar — Agent Instructions

## What this project is
A citizen waste-reporting and municipal cleanup management web app.
Citizens report garbage with GPS + photo, no login required.
Municipal staff manage, assign, and resolve reports on a live map.

## Tech stack (do not deviate without asking)
- Frontend: React (Vite) + Tailwind CSS + Leaflet/react-leaflet
- Backend: Node.js + Express
- Database: MySQL (spatial POINT type for location)
- Auth: JWT, staff/admin only — citizens never need an account
- Design reference: follow DESIGN.md at project root for all UI

## Functional requirements

### Citizen (no login)
- Submit a waste report: GPS location (auto-captured, editable), one photo,
  category (organic/plastic/e_waste/construction/other), optional description
- Track report status by tracking code
- Receive email notification on every status change

### Municipal staff (login required)
- Log in (JWT)
- View all reports on a live map, pins colored by status
- Filter reports by status, category, ward, date range
- Update report status: submitted → acknowledged → in_progress → resolved → closed
- Assign a report to a cleanup team / field officer
- View basic analytics: reports by category, resolution time, hotspot wards

### System rules
- Every status change MUST trigger an email notification (include relationship,
  not optional)
- Prevent duplicate report submissions at the same location within a short
  time window
- Validate category/status values against fixed enums, never free text

## Screens (match to Stitch designs by name)
1. Citizen Home
2. Submit Report
3. Report Confirmation
4. Track Report
5. Staff Login
6. Staff Dashboard (list + map + filter)
7. Report Detail Panel (status timeline, assign team)
8. Staff Analytics

## Rules for the agent
- Never invent new tech stack choices — ask first if something isn't covered here
- Keep citizen-facing screens simple and mobile-first
- Keep staff-facing screens denser, desktop-first
- Always wire real functionality (state, API calls, geolocation) — never leave
  a screen as a static mockup