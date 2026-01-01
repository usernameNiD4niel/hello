# Full UI/UX Implementation Plan

## Overview
Transform the chatbot app with:
1. ✅ Onboarding flow (3 screens)
2. ✅ Settings with theme toggle
3. ✅ Improved UI matching reference design
4. ✅ Light/Dark mode support

## Files to Create/Modify

### New Files (Onboarding)
1. `app/(onboarding)/_layout.tsx` - Onboarding stack navigator
2. `app/(onboarding)/welcome.tsx` - Welcome screen
3. `app/(onboarding)/language.tsx` - Language selection
4. `app/(onboarding)/permissions.tsx` - Microphone permission

### New Files (Settings)
5. `app/settings.tsx` - Settings screen with theme toggle

### New Files (Home/Categories)
6. `app/index.tsx` - New home screen with categories
7. `components/home/category-card.tsx` - Category cards component
8. `components/home/search-bar.tsx` - Search bar component

### Updated Files
9. `store/use-app-store.ts` - Add onboarding & theme state
10. `constants/theme.ts` - Add light mode colors
11. `app/_layout.tsx` - Check onboarding status
12. `app/(chat)/index.tsx` - Improved conversation list
13. `CLAUDE.md` - Update with new structure

## Implementation Steps

### Phase 1: State Management & Theme
- Update Zustand store with:
  - `hasCompletedOnboarding: boolean`
  - `theme: 'light' | 'dark' | 'auto'`
- Add light mode color palette
- Create theme toggle hook

### Phase 2: Onboarding Flow
- Welcome screen with app intro
- Language selection screen
- Permissions request screen
- Skip/Continue navigation

### Phase 3: Settings
- Settings screen with sections:
  - Theme toggle (Light/Dark/Auto)
  - Default language
  - Audio autoplay
  - About/Version

### Phase 4: Improved UI
- Home screen with:
  - Search bar
  - Category cards ("AI text writer", etc.)
  - History section
- Better conversation list
- Improved chat bubbles

## UI Design Reference
Based on the screenshots:
- Dark gradient backgrounds
- Pink/Purple accent colors
- Category cards with icons
- Modern search bar
- Clean typography
- Smooth animations
