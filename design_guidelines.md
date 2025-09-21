# AI Career Guidance Platform Design Guidelines

## Design Approach: Hybrid System + Reference
**Primary Reference**: Notion/Linear for productivity features, LinkedIn Learning for educational content
**System Foundation**: Clean, modern design system emphasizing clarity and professionalism

## Core Design Principles
- **Professional Trust**: Clean, credible interface that builds confidence in AI recommendations
- **Data Clarity**: Clear visualization of academic progress and career metrics
- **Action-Oriented**: Prominent CTAs for skill development and career actions
- **Progressive Disclosure**: Complex data revealed through intuitive navigation

## Color Palette
**Primary Brand**: 220 85% 35% (Professional blue)
**Secondary**: 220 15% 95% (Light background)
**Success**: 142 69% 58% (Achievement green)
**Warning**: 38 92% 50% (Alert orange)
**Dark Mode**: 220 15% 12% (Dark background)

## Typography
**Primary**: Inter (Google Fonts) - body text, UI elements
**Display**: Poppins (Google Fonts) - headings, dashboard titles
**Mono**: JetBrains Mono - code snippets, technical content

## Layout System
**Spacing Units**: Tailwind 2, 4, 6, 8, 12, 16 units
**Grid**: 12-column responsive grid with consistent 4-unit gutters
**Breakpoints**: Mobile-first approach with clean tablet/desktop scaling

## Component Library

### Navigation
- **Sidebar Navigation**: Fixed left sidebar with icon + label format
- **Top Header**: Breadcrumbs, user profile, notifications
- **Mobile**: Collapsible hamburger menu

### Data Visualization
- **SGPA Chart**: Clean line chart with gradient fill, hover tooltips
- **Progress Bars**: Rounded progress indicators for learning paths
- **Score Cards**: Elevated cards showing internal assessment breakdowns

### Dashboard Components
- **To-Do Cards**: Checkable task cards with priority indicators
- **News Cards**: Image thumbnail + headline + source layout
- **Course Cards**: Video thumbnail + title + provider + rating

### Forms & Inputs
- **Resume Upload**: Drag-and-drop zone with file type indicators
- **Assessment Input**: Number inputs with validation feedback
- **Search Bars**: Prominent search with filter options

## Key Sections Layout

### Dashboard Overview
Single-viewport layout with 4-quadrant grid:
- SGPA trend (top-left)
- Current tasks (top-right)
- Recent recommendations (bottom-left)
- Quick actions (bottom-right)

### Analytics Page
Focus on SGPA visualization with secondary metrics below:
- Main chart takes 60% viewport height
- Assessment breakdown cards in 3-column grid
- Grade prediction callout box

### Learning Path
Vertical timeline layout:
- Progress indicator on left
- Expandable skill modules
- Resource cards (courses/videos) in grid

### Resume Analysis
Two-column layout:
- Upload/preview on left (40%)
- Analysis results on right (60%)
- Recommendations in expandable sections below

## Animations
**Minimal Use Only**:
- Smooth page transitions (300ms ease)
- Chart data loading animations
- Hover states on interactive elements
- No scroll-triggered animations

## Images
**Hero Image**: None - focus on dashboard functionality over marketing appeal
**Supporting Images**:
- Course thumbnails from YouTube API
- Career news article images
- Placeholder avatars for user profiles
- Icon illustrations for empty states

**Image Treatment**: Rounded corners (8px), subtle shadows, consistent aspect ratios

## Accessibility & Polish
- Dark mode toggle in header
- High contrast ratios (4.5:1 minimum)
- Focus indicators on all interactive elements
- Loading states for all data-heavy components
- Error boundaries with helpful messaging

This design emphasizes professional functionality while maintaining visual appeal through strategic use of color, clean typography, and intuitive information architecture.