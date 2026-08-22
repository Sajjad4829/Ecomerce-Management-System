# PROJECT HANDOFF — MODERN ECOMMERCE CMS

## 1. PROJECT PURPOSE

This is an existing modern, premium, feature-rich eCommerce Management System for a furniture/eCommerce storefront.

Long-term goal:

Build a professional enterprise-grade frontend CMS where an administrator can control the customer-facing storefront from the dashboard without directly editing React code.

Backend, database, API, authentication backend, payment integration, and real persistence are intentionally postponed for a later phase.

Current priority:
Complete the frontend CMS and especially the Visual Page Builder / Section System.

---

## 2. IMPORTANT CONTINUATION RULES

When another ChatGPT account or AI continues this project:

- DO NOT treat this as a new project.
- DO NOT rebuild the project from scratch.
- DO NOT delete working functionality.
- DO NOT replace existing architecture unnecessarily.
- DO NOT duplicate an existing CMS/module/component.
- Inspect the current implementation before making changes.
- Reuse existing components, routes, contexts, utilities, and design language.
- Fix root causes instead of adding random patches.
- Keep the frontend backend-ready.
- Backend is NOT part of the current phase unless explicitly requested.

---

## 3. CURRENT TECHNOLOGY DIRECTION

The project is a React-based modern eCommerce management system.

Expected/known frontend direction includes:

- React
- Vite
- Tailwind CSS
- Framer Motion
- Modern reusable UI components
- CMS/admin dashboard
- Customer-facing storefront

The exact installed versions and architecture must always be verified from the current project files before changing anything.

---

## 4. CMS VISION

The CMS should eventually provide control over:

### Pages
- Homepage
- Product Listing
- Product Details
- Category Pages
- Collection Pages
- Offers
- About
- Contact
- FAQ
- Custom Pages

### Commerce
- Products
- Categories
- Collections
- Brands
- Inventory UI
- Coupons
- Offers

### Content
- Banners
- Media Library
- Blog/content
- Reviews
- Testimonials
- Reusable Blocks

### Storefront
- Header
- Navigation
- Mega Menu
- Footer
- Announcement Bar
- Popups

### SEO
- Global SEO
- Page SEO
- Product SEO
- Category SEO
- Collection SEO
- Redirects

### Publishing
- Draft
- Preview
- Publish UI
- Schedule UI
- Revision History

### System
- Permissions UI
- Audit Log UI
- Global Settings

---

## 5. PAGE MANAGEMENT WORKFLOW

The intended workflow is:

Page Center
    ↓
Create/Edit Page
    ↓
Page Information
    ↓
Save & Continue to Builder
    ↓
Visual Page Builder
    ↓
Add/Edit/Reorder Sections
    ↓
Preview
    ↓
Save Draft / Publish UI

Page Information should contain logical groups such as:

GENERAL
- Page Name
- Page Type
- Slug
- Description

SEO
- SEO Title
- SEO Description
- OG Image

PUBLISHING
- Status
- Visibility
- Scheduling

Do not put the entire page design configuration into the Page Information form.

---

## 6. VISUAL PAGE BUILDER ARCHITECTURE

The preferred builder architecture is:

LEFT:
Content Structure

CENTER:
Live Storefront Preview

RIGHT:
Section Properties

Top toolbar may include:

- Back
- Page name
- Desktop / Tablet / Mobile
- Undo
- Redo
- Preview
- Save Draft
- Publish
- More actions

### Left Content Structure

Should show page sections such as:

- Hero
- Featured Categories
- Featured Products
- Promotional Banner
- Testimonials
- Newsletter

Each section should support where implemented:

- Select
- Drag/Reorder
- Hide/Show
- Duplicate
- Delete
- More actions

Bottom action:

+ Add Section

### Center Canvas

Must behave like a professional storefront preview.

Requirements:

- No horizontal overflow
- No clipped content
- No overlapping cards
- No broken images
- Correct max-width
- Correct responsive behavior
- Stable independent scrolling
- Desktop/Tablet/Mobile viewport switching

### Right Properties

When no section is selected:

"Select a section to edit its properties."

When selected:

Show section-specific editable properties.

---

## 7. SECTION SYSTEM — CORE ARCHITECTURE

The Section System should use a centralized scalable architecture:

Section Registry
    ↓
Section Definition
    ↓
Section Instance
    ↓
Section Renderer
    ↓
Section Editor
    ↓
Live Preview

Do not scatter section definitions across unrelated files.

Conceptual section instance:

{
  id,
  type,
  order,
  visible,
  content,
  settings,
  responsive
}

Adapt this to the actual existing project state architecture.

Do not create a duplicate state system if one already exists.

---

## 8. SECTION CATEGORIES

The intended rich section library includes:

### HERO
- Hero Banner
- Split Hero
- Video Hero
- Fullscreen Hero
- Promotional Hero

### PRODUCTS
- Featured Products
- Product Grid
- Product Carousel
- New Arrivals
- Best Sellers
- Trending Products
- Recommended Products
- Product Spotlight

### CATEGORIES
- Featured Categories
- Category Grid
- Category Carousel
- Category Showcase

### COLLECTIONS
- Collection Grid
- Collection Carousel
- Collection Showcase
- Featured Collection
- Lookbook

### MARKETING
- Promotional Banner
- Offer Banner
- Flash Sale
- Countdown
- Campaign Banner
- CTA Banner
- Announcement Section

### CONTENT
- Rich Text
- Image + Text
- Text + Image
- Split Content
- Brand Logos
- Statistics
- Feature List

### SOCIAL PROOF
- Testimonials
- Customer Reviews
- Ratings
- Trust Badges
- Client Logos

### MEDIA
- Image Gallery
- Video Section
- Video + Text
- Lookbook Gallery
- Editorial Gallery

### CUSTOMER ENGAGEMENT
- Newsletter
- FAQ
- Contact CTA

### UTILITY
- Spacer
- Divider
- Custom Content
- Custom HTML placeholder

Only implement sections that fit the existing project architecture and current phase.

---

## 9. ADD SECTION EXPERIENCE

Clicking:

+ ADD SECTION

should open a professional Section Library.

The library should support:

- Search
- Category filters
- Section cards
- Description
- Preview
- Add button

When a section is added:

1. Create a unique section instance ID.
2. Apply default content.
3. Apply default settings.
4. Add to current page.
5. Add to Content Structure.
6. Render immediately in the canvas.
7. Select the new section.

---

## 10. SECTION EDITOR

The properties panel should be dynamic based on section type.

Do NOT create one giant form containing every possible section field.

Use a schema/configuration-driven approach where practical.

### Common settings

GENERAL
- Section title
- Visibility
- Background
- Container width

LAYOUT
- Alignment
- Content width
- Spacing
- Padding
- Margin

RESPONSIVE
- Desktop visibility
- Tablet visibility
- Mobile visibility

---

## 11. MAJOR SECTION EDITORS

### Hero
- Heading
- Subtitle
- Description
- Primary CTA
- Secondary CTA
- Desktop image
- Tablet image
- Mobile image
- Video where supported
- Alignment
- Content position
- Height
- Overlay
- Overlay opacity

### Product sections
- Section title
- Subtitle
- Product source
- Manual product selection
- Category source
- Collection source
- Number of products
- Columns
- Card style
- Price visibility
- Rating visibility
- Badge visibility
- Wishlist visibility
- Quick View
- Add to Cart

### Category sections
- Manual category selection
- Automatic category source
- Number of categories
- Columns
- Image ratio
- Title
- Description
- Overlay
- CTA

### Collection sections
- Collection selection
- Image
- Heading
- Description
- CTA
- Layout
- Item count

### Promotional banners
- Image
- Heading
- Description
- Offer text
- CTA
- Link
- Overlay
- Alignment
- Background

### Testimonials
- Customer name
- Avatar
- Review
- Rating
- Number of testimonials
- Layout

### FAQ
- Add/edit question
- Add/edit answer
- Delete
- Reorder
- Default open state

### Newsletter
- Heading
- Description
- Input placeholder
- Button text
- Background
- Alignment

---

## 12. STOREFRONT CONSISTENCY

The CMS preview should visually resemble the actual customer-facing storefront.

Where practical, reuse the same section rendering components for:

CMS Preview
and
Storefront

Editor controls may wrap the content, but the actual section design should remain consistent.

Never show raw technical IDs such as:

HERO_BANNER
FEATURED_PRODUCTS
FEATURED_CATEGORIES

as customer-facing visual content.

---

## 13. RESPONSIVE REQUIREMENTS

The builder must support:

### Desktop
- Full desktop layout
- Multi-column grids
- Large typography

### Tablet
- Reduced columns
- Responsive spacing
- Responsive typography

### Mobile
- One-column layouts where appropriate
- Correct image ratios
- Wrapped typography
- Stacked buttons where necessary
- No horizontal overflow

Every major CMS screen should also be checked for responsive usability.

---

## 14. FRONTEND DATA / MOCK DATA RULES

Use existing project data whenever possible:

- Products
- Categories
- Collections
- Reviews
- Banners
- Brands

Do NOT create duplicate product/category/collection systems.

Mock data is acceptable for this frontend-only phase.

Keep mock data isolated and structured so it can later be replaced with API services.

---

## 15. BACKEND IS POSTPONED

Current phase is frontend-only.

DO NOT implement:

- MongoDB
- Express backend
- API server
- Real database persistence
- Payment gateway
- Server-side publishing
- Real backend authentication

The frontend must simply remain ready for future integration.

---

## 16. CURRENT DEVELOPMENT PHASE

The project is being developed through these phases:

### PHASE 1
Page Management + Builder Foundation

### PHASE 2
Section Library + Add Section + Section Structure

### PHASE 3
Section Properties + Content Editing

### PHASE 4
Full Storefront Control

### PHASE 5
Enterprise Polish + QA + Backend Readiness

IMPORTANT:

The actual completion status must be determined by inspecting the current project files. Do not assume a phase is complete just because this document lists it.

---

## 17. KNOWN DESIGN DIRECTION

The CMS should feel:

- Premium
- Modern
- Minimal
- Clean
- Enterprise-grade
- International
- eCommerce-focused

Avoid:

- Broken overflow
- Cropped headings
- Overlapping cards
- Stretched images
- Excessive shadows
- Random spacing
- Technical placeholder UI
- Raw IDs shown to users
- Giant cluttered forms
- Duplicate components
- Unnecessary animations

---

## 18. IMPORTANT CURRENT BUILDER ISSUE

The Homepage/Visual Builder has previously shown problems such as:

- Hero placeholder text instead of proper preview
- Section overflow
- Cropped headings
- Product/category overlap
- Incorrect canvas width
- Responsive preview problems
- Section rendering that does not always resemble the storefront

When continuing, inspect whether these issues still exist before changing the architecture.

Fix shared/root causes rather than adding one-off CSS patches.

---

## 19. CONTINUATION PROCEDURE FOR A NEW CHATGPT ACCOUNT

When this project is opened in another ChatGPT account:

### STEP 1
Read this file completely.

### STEP 2
Inspect the actual project files.

### STEP 3
Run the application if possible.

### STEP 4
Compare the actual state against this handoff.

### STEP 5
Create a concise status report:

- Completed
- Partial
- Missing
- Broken
- Current Phase
- Next Task

### STEP 6
Only then implement the next required task.

Never restart completed work.

---

## 20. CHANGE LOG

Update this section after each major phase.

### Current Entry
Date: __________________

Current Phase: __________________

Completed:
- __________________
- __________________
- __________________

Partial:
- __________________
- __________________

Missing:
- __________________
- __________________

Known Bugs:
- __________________
- __________________

Files/Modules Recently Changed:
- __________________
- __________________

Next Recommended Task:
- __________________

---

## 21. FINAL PROJECT VISION

The finished product should be a modern enterprise eCommerce CMS where an admin can:

1. Create a page.
2. Define page information and SEO.
3. Open a visual builder.
4. Add sections from a section library.
5. Reorder sections.
6. Edit section content.
7. Configure section layout.
8. Configure responsive behavior.
9. Preview desktop/tablet/mobile.
10. Manage products/categories/collections inside sections.
11. Control banners and promotions.
12. Control header/navigation/footer.
13. Manage reusable content.
14. Save draft state.
15. Preview changes.
16. Publish through a future backend integration.

The frontend should feel like a professional visual commerce platform,
not a basic CRUD dashboard.

END OF PROJECT HANDOFF
