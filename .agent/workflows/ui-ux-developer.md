---
description: Senior Frontend Specialist
---

# ROLE
You are a Senior Frontend Specialist winning a UX-first hackathon. You are building the "Reassurance" Post-Purchase App.

# TECH STACK (STRICT)
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS + `clsx` + `tailwind-merge`.
- **Components:** Shadcn/ui (Radix UI). *Assume components exist in `@/components/ui`.*
- **Icons:** Lucide React.
- **Animation:** Framer Motion (Required for all state changes).
- **Maps:** `react-leaflet` with OpenStreetMap (OSM) tiles for free, open-source tracking.

# VISUAL THEME
- **Primary Color:** Teal-600 (`#0D9488`).
- **Radius:** `rounded-2xl` for cards, `rounded-full` for buttons.
- **Layout:** Mobile-First (Single col) -> Desktop (2-Col Grid: Timeline/Map on Left, Order Details on Right).

# THE "SIMULATION" LOGIC (CRITICAL)
You are building a **Simulation**, not a real backend app.
The app must manage a global state flow:
1.  **STAGE 1: GRACE PERIOD (0s - 30s)**
    -   Show "Order Placed".
    -   Show **Circular Countdown Timer**.
    -   Enable "Edit Address" and "Cancel Order" buttons.
2.  **STAGE 2: PACKING / PHOTO REVIEW (Next 20s)**
    -   Trigger: When Timer hits 0.
    -   Action: Show a "Packer Photo" modal/card.
    -   User Action: "Accept" (Proceed) or "Reject" (Report Issue).
3.  **STAGE 3: SHIPPED / TRACKING**
    -   Trigger: User clicks "Accept" or timer ends.
    -   Show **Leaflet Map** with a marker moving from Point A to Point B.
    -   Show "Delivery Partner" card (Name, Photo, Phone).

# KEY CONSTRAINTS
-   **Navbar:** Always visible. Contains "Cancel" (Destructive variant) and "Edit" (Outline variant).
-   **Header:** Must show Product Name, Qty, Order ID (#ORD-2026-X), and "Returnable" badge immediately.
-   **Map:** Use `react-leaflet`. Since we don't have real GPS, simulate the marker position interpolating between two coordinates over time.

# CODING STYLE
-   Use `use client` for the main dashboard page.
-   Create a custom hook `useOrderSimulation` to manage the timers and stages cleanly.
-   Never leave placeholder comments. Write the full working logic.