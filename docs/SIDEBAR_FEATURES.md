# Sidebar Features Documentation

## ✅ Implemented Features

### 1. Auto-Collapse/Expand on Hover
The sidebar automatically collapses when the mouse leaves and expands when hovering over it.

**Behavior:**
- Default state: Collapsed (width: 64px / 4rem)
- On hover: Expands to full width (width: 256px / 16rem)
- Smooth transition: 300ms duration

### 2. Lock/Pin Sidebar in Expanded Mode
Users can lock the sidebar in an expanded state to prevent auto-collapse.

**Features:**
- **Pin Button**: Shows when sidebar is expanded
- **Icon**: 
  - `PinOff` (unpinned) - Gray color
  - `Pin` (pinned) - Primary color
- **Tooltip**: "Lock sidebar expanded" / "Unlock sidebar"
- **Persistence**: State saved to `localStorage` (key: `sidebar-pinned`)
- **Toast Notifications**:
  - Success: "Sidebar locked - Sidebar will stay expanded"
  - Info: "Sidebar unlocked - Sidebar will auto-collapse on mouse leave"

**Usage:**
1. Hover over sidebar to expand it
2. Click the pin icon in the header
3. Sidebar stays expanded even when mouse leaves
4. Click pin icon again to unlock

### 3. Logout Functionality
Full logout implementation with proper error handling and user feedback.

**Features:**
- **Loading State**: Button shows "Signing out..." while processing
- **Disabled State**: Prevents double-clicking during logout
- **Toast Notifications**:
  - Loading: "Signing out..."
  - Success: "Signed out successfully - You've been logged out. See you next time!"
  - Error: "Logout failed - Something went wrong. Please try again."
- **Auto-redirect**: Redirects to `/login` after 500ms on success
- **Error Recovery**: Re-enables button on failure

**Usage:**
1. Click "Logout" button at bottom of sidebar
2. See loading toast
3. Automatically redirected to login page on success

### 4. Enhanced Tooltips
All sidebar items show tooltips when collapsed for better UX.

**Tooltip Locations:**
- Navigation items (when collapsed)
- Pin/Unpin button
- Logout button (when collapsed)

**Tooltip Position:** Right side of sidebar

## Component Structure

### File Location
```
components/layout/sidebar.tsx
```

### Key State Variables
```typescript
const [collapsed, setCollapsed] = useState(false);      // Sidebar collapse state
const [isPinned, setIsPinned] = useState(false);        // Pin/lock state
const [isLoading, setIsLoading] = useState(false);      // Logout loading state
```

### localStorage Keys
- `sidebar-pinned`: Stores pin state ("true" or "false")

## Navigation Items

Current sidebar navigation:
1. **Dashboard** (`/dashboard`) - Brain icon
2. **Reviews** (`/dashboard/reviews`) - BookOpen icon
3. **Analysis** (`/dashboard/analysis`) - BarChart icon
4. **Settings** (`/dashboard/settings`) - Settings icon

## Styling

### Width States
- **Collapsed**: `w-16` (64px)
- **Expanded**: `w-64` (256px)
- **Transition**: `transition-all duration-300`

### Active State
- **Active link**: Primary background with primary foreground text
- **Inactive link**: Transparent with hover accent background

### Colors
- **Pin icon (active)**: Primary color
- **Pin icon (inactive)**: Default color
- **Logout button**: Destructive color with hover background

## User Experience Flow

### First Visit
1. Sidebar starts collapsed
2. User hovers → sidebar expands
3. User moves mouse away → sidebar collapses

### Pinning Sidebar
1. User hovers over sidebar
2. Clicks pin button
3. Toast: "Sidebar locked"
4. Sidebar stays expanded
5. Pin icon turns primary color
6. State saved to localStorage

### Next Visit
1. Sidebar loads with pinned state from localStorage
2. If pinned: Starts expanded and doesn't auto-collapse
3. If not pinned: Normal hover behavior

### Logout Flow
1. User clicks logout button
2. Loading toast appears
3. Button disabled and shows "Signing out..."
4. On success:
   - Success toast shown
   - After 500ms: Redirect to login
   - Session cleared
5. On error:
   - Error toast shown
   - Button re-enabled
   - User stays on page

## Accessibility

### Keyboard Navigation
- All buttons are keyboard accessible
- Tooltips show on focus

### Screen Readers
- Button titles properly set
- Icon buttons have accessible names via tooltips

### Visual Feedback
- Clear hover states
- Loading indicators
- Toast notifications for all actions
- Color-coded states (primary for active/pinned)

## Integration with Auth

### Authentication Library
Uses Better Auth client from `@/lib/auth-client`

### Logout Method
```typescript
import { signOut } from "@/lib/auth-client";

await signOut({
  fetchOptions: {
    onSuccess: () => { /* Handle success */ },
    onError: () => { /* Handle error */ },
  },
});
```

### Session Management
- Session automatically cleared on logout
- Router refresh ensures clean state
- Redirect to login page

## Toast Notifications

All toasts use Sonner library:

### Types Used
1. **Loading Toast**: `toast.loading(message)`
2. **Success Toast**: `toast.success(title, { description })`
3. **Info Toast**: `toast.info(title, { description })`
4. **Error Toast**: `toast.error(title, { description })`

### Toast Durations
- Success: 2000ms (2 seconds)
- Info: Default
- Error: 3000ms (3 seconds)
- Loading: Auto-dismissed on success/error

## Future Enhancements

Potential improvements:
- [ ] Keyboard shortcut to toggle pin (e.g., `Ctrl+B`)
- [ ] Sidebar width customization
- [ ] Remember last visited page
- [ ] User preference sync across devices
- [ ] Minimize animation settings
- [ ] Custom sidebar themes

## Troubleshooting

### Sidebar doesn't stay pinned
**Solution**: Check if localStorage is enabled in browser

### Logout doesn't work
**Solution**: 
1. Check network connection
2. Verify auth session is valid
3. Check browser console for errors

### Tooltips not showing
**Solution**: Ensure TooltipProvider wraps the component

## Code Examples

### Adding New Navigation Item
```typescript
const sidebarItems = [
  // ... existing items
  {
    title: "New Feature",
    icon: YourIcon,
    href: "/dashboard/new-feature",
  },
];
```

### Customizing Pin Behavior
```typescript
const togglePin = () => {
  const newPinnedState = !isPinned;
  setIsPinned(newPinnedState);
  localStorage.setItem("sidebar-pinned", String(newPinnedState));
  
  // Add custom logic here
};
```

### Changing Toast Messages
```typescript
toast.success("Custom success message", {
  description: "Custom description",
  duration: 5000, // 5 seconds
});
```

## Dependencies

Required packages:
- `lucide-react` - Icons
- `sonner` - Toast notifications
- `@/components/ui/button` - Button component
- `@/components/ui/tooltip` - Tooltip component
- `@/lib/auth-client` - Authentication
- `next/navigation` - Router

## Performance Considerations

- **localStorage**: Minimal performance impact
- **Transitions**: Hardware-accelerated CSS
- **Re-renders**: Optimized with proper state management
- **Toast Cleanup**: Auto-dismissal prevents memory leaks
