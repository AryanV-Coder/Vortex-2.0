# Reassurance - Place Order Screen

A beautiful, modern order placement screen built with Next.js 15, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Premium UI Design** - Teal (#0D9488) theme with rounded-2xl cards and calm aesthetics
- ✨ **Smooth Animations** - Framer Motion animations for page transitions, stagger effects, and number counting
- 📱 **Responsive Layout** - Mobile-first design with fixed footer on mobile, static on desktop
- ✅ **Form Validation** - Pre-submission validation with toast notifications  
- 🛒 **Order Management** - Zustand state management for cart and order placement
- 🚀 **Fast & Modern** - Next.js 15 with Turbopack for lightning-fast development

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **State:** Zustand
- **Notifications:** Sonner

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout with Sonner toaster
│   ├── globals.css                   # Global styles & Tailwind directives
│   ├── page.tsx                      # Redirects to /place-order
│   ├── place-order/
│   │   └── page.tsx                  # Main Place Order screen
│   └── order/[orderId]/tracking/
│       └── page.tsx                  # Order tracking placeholder
├── components/ui/
│   ├── secure-checkout-badge.tsx     # Security indicator badge
│   ├── order-item-card.tsx           # Product card component
│   ├── bill-summary.tsx              # Billing breakdown card
│   ├── delivery-address-inline.tsx   # Address display component
│   ├── place-order-footer.tsx        # Fixed footer with CTA
│   └── support-link.tsx              # Help link component
├── lib/
│   ├── utils.ts                      # Utility functions (cn, formatCurrency)
│   └── store.ts                      # Zustand store with mock data
└── types/
    └── order.ts                      # TypeScript type definitions
```

## Components

### SecureCheckoutBadge
Top-right badge indicating secure checkout with lock icon.

### OrderItemCard
Displays individual cart items with icon, name, quantity, and prices. Includes stagger animation.

### BillSummary
Shows itemized billing breakdown with:
- Subtotal, shipping fee, taxes
- Discount (highlighted in Teal)
- Total payable (animated number counting, Teal background)
- Payment method indicator (UPI badge)
- Embedded delivery address display

### PlaceOrderFooter
Fixed bottom bar (mobile) with:
- Total payable amount
- Gradient Teal CTA button
- Loading state with spinner
- Hover & tap animations

## Animations

- **Page Load:** Fade-in transition
- **Order Items:** Stagger-in effect (0.05s delay per item)
- **Bill Summary:** Number counting animation for total
- **Footer:** Slide up from bottom
- **Support Link:** Delayed fade-in (1s)

## Color Palette

- **Primary Teal:** `#0D9488`
- **Light Teal:** `#f0fdfa` (backgrounds)
- **Dark Teal:** `#0f766e` (hover states)
- **Backgrounds:** `bg-gray-50` (page), `bg-white` (cards)

## Next Steps

This is the initial order placement screen. Future features will include:
- 30-second grace period with countdown timer
- Photo review phase with accept/reject
- Live order tracking with map integration
- Delivery partner details

## License

MIT
