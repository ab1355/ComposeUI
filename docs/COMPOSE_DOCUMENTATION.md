# ComposeUI - Composable Component System

## Overview

ComposeUI transforms the Magnet UI library into a fully composable system where components can be dynamically combined to create instant dashboards. This system includes innovative emoji-based security features that turn potential vulnerabilities into security strengths.

## Key Features

### 🎨 Composable Components
- **Dynamic Composition**: Create components programmatically and compose them into dashboards
- **Instant Dashboards**: Build dashboards on-the-fly without writing HTML
- **Component Registry**: Pre-configured components ready to use
- **Lifecycle Management**: Components have onCreate and onDestroy hooks

### 🔐 Emoji-Based Security
Instead of traditional password vulnerabilities, ComposeUI uses **emojis as security features**:

- **Emoji Authentication**: Users authenticate with emoji patterns (e.g., 🔐🌟🎯🚀)
- **Visual Security**: Emoji patterns are easier to remember than complex passwords
- **Pattern Validation**: Requires minimum 3 emojis for secure patterns
- **Session Management**: Automatic timeout and status indicators
- **Permission System**: Control component access per user

### ⚡ Real-Time Updates
- Dashboard components update dynamically
- Security status monitoring
- Session timeout notifications

## Getting Started

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/magnet.css">
    <script src="/components/compose.js"></script>
    <script src="/components/emoji-security.js"></script>
    <script src="/components/component-registry.js"></script>
</head>
<body>
    <div id="app"></div>
    
    <script>
        // Initialize
        const composeUI = new ComposeUI();
        const emojiSecurity = new EmojiSecurity();
        
        // Set up security
        composeUI.setSecurityProvider(emojiSecurity);
        
        // Register components
        registerDefaultComponents(composeUI);
        
        // Register user with emoji pattern
        emojiSecurity.registerUser('user1', '🔐🌟🎯', ['*']);
        
        // Authenticate
        const result = emojiSecurity.authenticate('user1', '🔐🌟🎯');
        
        if (result.success) {
            // Create dashboard
            const dashboard = composeUI.createDashboard('myDashboard');
            
            // Add components
            composeUI.addToDashboard('myDashboard', 'alert', {
                type: 'success',
                message: 'Welcome to ComposeUI!'
            });
            
            composeUI.addToDashboard('myDashboard', 'stat-widget', {
                emoji: '👥',
                value: '1,234',
                label: 'Total Users',
                trend: 15
            });
            
            // Mount to DOM
            composeUI.mount('myDashboard', '#app');
        }
    </script>
</body>
</html>
```

## Core API

### ComposeUI Class

#### `registerComponent(name, config)`
Register a new component type.

```javascript
composeUI.registerComponent('myComponent', {
    template: (props) => `<div>${props.text}</div>`,
    props: { text: 'default' },
    onCreate: function(props) { /* initialization */ },
    onDestroy: function() { /* cleanup */ }
});
```

#### `createDashboard(name, config)`
Create a new dashboard container.

```javascript
const dashboard = composeUI.createDashboard('dashboard1', {
    styles: 'background: #f0f0f0; padding: 1rem;'
});
```

#### `addToDashboard(dashboardName, componentName, props)`
Add a component to a dashboard.

```javascript
composeUI.addToDashboard('dashboard1', 'alert', {
    type: 'success',
    message: 'Component added!'
});
```

#### `removeFromDashboard(dashboardName, componentId)`
Remove a component from a dashboard.

```javascript
composeUI.removeFromDashboard('dashboard1', componentId);
```

#### `mount(dashboardName, targetElement)`
Mount a dashboard to the DOM.

```javascript
composeUI.mount('dashboard1', '#app');
```

### EmojiSecurity Class

#### `registerUser(username, emojiPattern, permissions)`
Register a user with emoji authentication.

```javascript
emojiSecurity.registerUser('alice', '🔐🚀💎🌟', ['alert', 'card']);
```

#### `authenticate(username, emojiPattern)`
Authenticate a user.

```javascript
const result = emojiSecurity.authenticate('alice', '🔐🚀💎🌟');
if (result.success) {
    console.log('Logged in!');
}
```

#### `isAuthenticated()`
Check if a user is currently authenticated.

```javascript
if (emojiSecurity.isAuthenticated()) {
    // User is logged in
}
```

#### `getSecurityStatus()`
Get current security status.

```javascript
const status = emojiSecurity.getSecurityStatus();
// { status: 'authenticated', emoji: '🔓', message: '...', user: 'alice' }
```

#### `generateSuggestion()`
Generate a random secure emoji pattern.

```javascript
const pattern = emojiSecurity.generateSuggestion();
// Returns: '🔐⭐🎯🚀💎'
```

## Available Components

### alert
Alert/notification component with different types.

```javascript
composeUI.addToDashboard('main', 'alert', {
    type: 'success',        // primary, secondary, success, danger, warning
    message: 'Success!',
    icon: 'fas fa-check',
    link: { url: '#', text: 'Learn more' }
});
```

### button
Interactive button component.

```javascript
composeUI.addToDashboard('main', 'button', {
    variant: 'primary-btn',  // secondary-btn, success-btn, etc.
    text: 'Click me',
    icon: 'fas fa-rocket',
    onClick: () => alert('Clicked!')
});
```

### card
Card component for displaying content.

```javascript
composeUI.addToDashboard('main', 'card', {
    orientation: 'vertical',  // or 'horizontal'
    title: 'Card Title',
    author: 'Author Name',
    description: 'Card description',
    image: '/path/to/image.jpg',
    badge: 'New',
    price: '$99.99'
});
```

### stat-widget
Statistical widget with gradient background.

```javascript
composeUI.addToDashboard('main', 'stat-widget', {
    emoji: '📊',
    value: '1,234',
    label: 'Total Users',
    trend: 15,  // positive or negative percentage
    color1: '#667eea',
    color2: '#764ba2'
});
```

### security-status
Security status indicator.

```javascript
composeUI.addToDashboard('main', 'security-status', {
    authenticated: true,
    emoji: '🔓',
    message: 'Secure session active',
    user: 'username'
});
```

### panel
Container panel for grouping content.

```javascript
composeUI.addToDashboard('main', 'panel', {
    title: 'Panel Title',
    content: '<p>Panel content</p>',
    background: '#fff',
    padding: '1rem'
});
```

### grid
Grid layout container.

```javascript
composeUI.addToDashboard('main', 'grid', {
    columns: 'repeat(3, 1fr)',
    gap: '1rem',
    content: '<div>Grid items</div>'
});
```

### input
Input field component.

```javascript
composeUI.addToDashboard('main', 'input', {
    type: 'text',
    label: 'Username',
    placeholder: 'Enter username',
    onChange: (value) => console.log(value)
});
```

## Security Benefits of Emoji Authentication

### Why Emojis are Security Features (Not Vulnerabilities)

1. **Memorable**: Easier to remember than random passwords
2. **Visual**: Leverages visual memory
3. **Large Character Space**: Thousands of emojis provide huge combination space
4. **Cultural**: Can use meaningful sequences
5. **Hard to Shoulder Surf**: Visual patterns harder to observe than typed text
6. **No Dictionary Attacks**: Emojis aren't in password dictionaries
7. **Fun**: Increases user engagement with security

### Best Practices

- Use at least 4-6 emojis for strong patterns
- Mix different emoji categories (objects, animals, symbols)
- Avoid obvious sequences (🔢🔣🔤)
- Create meaningful but unique patterns
- Update patterns periodically

## Examples

### Creating a Dashboard Builder

```javascript
// Initialize systems
const composeUI = new ComposeUI();
const emojiSecurity = new EmojiSecurity();
composeUI.setSecurityProvider(emojiSecurity);
registerDefaultComponents(composeUI);

// Register users
emojiSecurity.registerUser('admin', '🔐🛡️⚔️🎯', ['*']);
emojiSecurity.registerUser('viewer', '👁️🔍📊', ['alert', 'stat-widget']);

// Authenticate
emojiSecurity.authenticate('admin', '🔐🛡️⚔️🎯');

// Create dashboard
const dashboard = composeUI.createDashboard('analytics');

// Add components
composeUI.addToDashboard('analytics', 'alert', {
    type: 'primary',
    message: '📈 Analytics Dashboard'
});

composeUI.addToDashboard('analytics', 'stat-widget', {
    emoji: '👥',
    value: '2,547',
    label: 'Users',
    trend: 12
});

composeUI.addToDashboard('analytics', 'stat-widget', {
    emoji: '🔐',
    value: '100%',
    label: 'Secure',
    trend: 0
});

// Mount
composeUI.mount('analytics', '#dashboard');
```

### Custom Component

```javascript
composeUI.registerComponent('custom-widget', {
    template: (props) => `
        <div style="padding: 1rem; background: ${props.bg};">
            <h3>${props.title}</h3>
            <p>${props.content}</p>
        </div>
    `,
    props: {
        title: 'Widget',
        content: 'Content',
        bg: '#fff'
    },
    onCreate: function(props) {
        console.log('Widget created:', props);
    },
    onDestroy: function() {
        console.log('Widget destroyed');
    }
});

// Use it
composeUI.addToDashboard('main', 'custom-widget', {
    title: 'My Widget',
    content: 'Hello World!',
    bg: '#f0f0f0'
});
```

## Demo

Try the live dashboard builder at `/dashboard-builder.html`

Default credentials:
- Username: `demo`
- Emoji Pattern: `🔐🌟🎯🚀`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Emoji support requires modern browsers with full Unicode emoji rendering.

## License

Same as Magnet UI - Open Source
