# Portfolio Polish TODO

Global & Reusable Components:
- [x] index.html - title, meta, OG tags, fonts, theme-color
- [x] index.css - design tokens, Inter font, scrollbar, selection, smooth
- [x] Create reusable UI components (Loader, EmptyState, StatusBadge, Modal, PageHeader, Spinner)
- [x] Remove leftover App.css boilerplate

Layout & Navigation:
- [x] Sidebar - add nav items (role-aware), bottom user card, active indicator
- [x] Navbar - functional search, dynamic title, user dropdown
- [x] DashboardLayout - mobile bottom nav bar

Public Pages:
- [x] ProtectedRoute - branded full-screen loader
- [x] NotFound - full redesign w/ dark mode

Feature Pages:
- [x] Profile - avatar, loading skeleton, role badge
- [x] AllBorrows - badges, dark mode, spinner, empty state
- [x] BorrowedBooks - badges, spinner, overdue highlight
- [x] Books - custom delete modal, empty state polish
- [x] CreateBook - consistent modern form
- [x] EditBook - consistent modern form

Feedback Additions (remove footer & dark/light toggle):
- [x] DashboardLayout - removed Footer component
- [x] Home landing page - removed footer + social icons
- [x] Navbar - removed dark/light theme toggle button
- [x] ThemeContext - enforced single light theme (removed toggle functionality)

Testing:
- [x] Run build to verify no errors (199 modules, build successful)
