# Sidebar Usage Guide

## Quick Start

### Basic Navigation
1. **Hover** over the sidebar to expand it
2. Click any menu item to navigate
3. Move mouse away to auto-collapse

### Lock Sidebar (Keep Expanded)
1. Hover over sidebar to expand
2. Click the **Pin icon** (📌) in the header
3. Sidebar stays expanded permanently
4. Click **Pin icon** again to unlock

### Logout
1. Scroll to bottom of sidebar
2. Click **"Logout"** button
3. Wait for confirmation toast
4. You'll be redirected to login page

## Visual States

### Collapsed State (Default)
```
┌────┐
│ 🧠 │  ← Logo only
├────┤
│ 🏠 │  ← Dashboard (icon only)
│ 📖 │  ← Reviews
│ 📊 │  ← Analysis
│ ⚙️ │  ← Settings
├────┤
│ 🚪 │  ← Logout
└────┘
Width: 64px
```

### Expanded State (On Hover or Pinned)
```
┌──────────────────────┐
│ 🧠 SynthesisAI  📌 ❌ │  ← Logo + Pin/Menu buttons
├──────────────────────┤
│ 🏠 Dashboard         │  ← Full labels visible
│ 📖 Reviews           │
│ 📊 Analysis          │
│ ⚙️ Settings          │
├──────────────────────┤
│ 🚪 Logout            │
└──────────────────────┘
Width: 256px
```

### Pinned State (Locked Expanded)
```
┌──────────────────────┐
│ 🧠 SynthesisAI  📍   │  ← Pin icon is highlighted (primary color)
├──────────────────────┤
│ 🏠 Dashboard         │
│ 📖 Reviews           │
│ 📊 Analysis          │
│ ⚙️ Settings          │
├──────────────────────┤
│ 🚪 Logout            │
└──────────────────────┘
```

## Icon Reference

| Icon | State | Color | Meaning |
|------|-------|-------|---------|
| 📌 (Pin) | Active | Primary Blue | Sidebar is locked |
| 📌 (PinOff) | Inactive | Gray | Sidebar is unlocked |
| ☰ (Menu) | Always | Default | Expand sidebar (shown when collapsed) |
| 🚪 (Logout) | Default | Red | Sign out |
| 🚪 (Logout) | Loading | Red (50% opacity) | Signing out... |

## Toast Notifications

### Pin Actions
```
✅ Success: "Sidebar locked"
   Sidebar will stay expanded

ℹ️ Info: "Sidebar unlocked"
   Sidebar will auto-collapse on mouse leave
```

### Logout Actions
```
⏳ Loading: "Signing out..."

✅ Success: "Signed out successfully"
   You've been logged out. See you next time!

❌ Error: "Logout failed"
   Something went wrong. Please try again.
```

## Keyboard Accessibility

### Tab Navigation
1. Press `Tab` to focus on first sidebar item
2. Continue pressing `Tab` to navigate through items
3. Press `Enter` to activate focused item

### Focus States
- All buttons show focus ring when selected
- Tooltips appear on keyboard focus
- Screen readers announce all interactive elements

## Tips & Tricks

### 💡 Productivity Tips
1. **Pin sidebar** if you frequently switch between pages
2. **Leave unpinned** for maximum content space
3. Hover quickly to peek at menu without full expansion

### ⚠️ Important Notes
- Pin state persists across browser sessions
- Logout clears all session data
- Tooltips show menu labels when collapsed

## Troubleshooting

### Issue: Sidebar won't stay expanded
**Solution:** Click the pin button (📌) to lock it

### Issue: Pin state not saving
**Solution:** 
1. Check if browser allows localStorage
2. Try clearing browser cache
3. Disable private browsing mode

### Issue: Logout button not working
**Solution:**
1. Check internet connection
2. Try refreshing the page
3. Clear browser cache and cookies

### Issue: Sidebar animation stuttering
**Solution:**
1. Close unnecessary browser tabs
2. Disable browser extensions
3. Update your browser

## Feature Comparison

| Feature | Unpinned | Pinned |
|---------|----------|--------|
| Auto-collapse on mouse leave | ✅ Yes | ❌ No |
| Expands on hover | ✅ Yes | N/A (always expanded) |
| Shows full menu labels | Only on hover | ✅ Always |
| Saves state | ❌ No | ✅ Yes (localStorage) |
| Maximum content space | ✅ Yes | ❌ No |
| Quick access to menu | ❌ Need to hover | ✅ Always visible |

## Best Practices

### When to Pin
✅ Use pinned mode if you:
- Frequently switch between dashboard pages
- Prefer having menu always visible
- Have a large screen (≥1920px width)
- Work primarily in the dashboard

### When to Unpin
✅ Use unpinned mode if you:
- Need maximum content viewing space
- Have a smaller screen (<1920px width)
- Only occasionally switch pages
- Prefer minimal UI

## Technical Details

### State Management
- **Component**: `components/layout/sidebar.tsx`
- **State Variables**: 
  - `collapsed` (boolean)
  - `isPinned` (boolean)
  - `isLoading` (boolean)
- **Persistence**: localStorage key `sidebar-pinned`

### Transitions
- **Duration**: 300ms
- **Easing**: Default CSS ease
- **Properties**: `width`, `opacity` (for text)

### Responsive Behavior
- On mobile: Sidebar behavior TBD (future enhancement)
- On tablet: Same as desktop
- On desktop: Full functionality

## Future Features (Roadmap)

- [ ] Keyboard shortcut to toggle pin (`Ctrl+B` or `Cmd+B`)
- [ ] Adjustable sidebar width
- [ ] Custom themes (dark mode variants)
- [ ] Mobile-optimized drawer
- [ ] Collapsible menu groups
- [ ] Search within sidebar
- [ ] Recent pages quick access

## Support

For issues or feature requests, please check:
1. This documentation first
2. Project README.md
3. GitHub issues (if applicable)
4. Contact development team

---

**Last Updated:** October 2025  
**Version:** 1.0  
**Component Location:** `components/layout/sidebar.tsx`
