# Magnet UI - Now with ComposeUI! 🎨

Magnet UI is free, open sourced library that provides ready-to-use frontend components and it is user-friendly and customizable. Spend less time in designing and concentrate more on logic without hustling on UI.

## 🚀 NEW: ComposeUI - Composable Component System

ComposeUI extends Magnet UI with a powerful **composable component system** that enables:

- **🎯 Instant Dashboards**: Create dynamic dashboards programmatically without writing HTML
- **🔐 Emoji-Based Security**: Revolutionary authentication using emojis as security features instead of vulnerabilities
- **⚡ Dynamic Composition**: Build and modify UI components on-the-fly
- **🛡️ Secure by Design**: Built-in permission system and session management

[📚 View ComposeUI Documentation](docs/COMPOSE_DOCUMENTATION.md) | [🎮 Try the Dashboard Builder](dashboard-builder.html)

---

## Quick Start
You can import the following code snippet in your css or html file to start using the components in your project.

```css
@import url("https://magnet-ui.netlify.app/magnet.css");
```

```html
<link rel="stylesheet" href="https://magnet-ui.netlify.app/magnet.css">
```
---

## Components
Following is the list of components available in Magnet-UI.

- [Typography](#typography)
- [Avatar](#avatar)
- [Alert](#alert)
- [Badge](#badge)
- [Button](#button)
- [Card](#card)
- [Image](#image)
- [Input](#input)
- [List](#list)
- [Modal](#modal)
- [Rating](#rating)
- [Navigation](#navigation)
- [Toast](#toast)
- [Grid](#grid)
- [Slider](#slider)

---

## Overview of components

### Typography

With typography you are provided with various text utlities for your content.
You can check out the various typographies [here](https://magnet-ui.netlify.app/docs/docs-components/foundation/typography.html)

* Heading text
* Paragraph text
* Align text
* Extra styles

---

### Avatar

Avatars are images that users can set as their profile picture.They can be custom photos, uploaded by users, or generated as Identicons as a placeholder.
You can check out the various types of avatars [here](https://magnet-ui.netlify.app/docs/docs-components/components/avatar.html)

* Image Avatar
* Avatar with initials
---

### Alert
Alert messages can be used to notify the user about something special: danger, success, information or warning.
You can check out the various types of alerts [here](https://magnet-ui.netlify.app/docs/docs-components/components/alert.html)

* Basic Alerts
* Alerts with icons
* Alerts with links
---

### Badge

A badge is a counter shown on icons like cart, notification and avatars. It is also used to show online and offline status of a person.
You can check out the various types of badges [here](https://magnet-ui.netlify.app/docs/docs-components/components/badge.html)

* Badge on icons
* Badge on avatar
* Badge as border on avatar

---

### Button

Buttons are also called as call to action. We have range of buttons and their states to choose from.
You can check out the various types of buttons [here](https://magnet-ui.netlify.app/docs/docs-components/components/button.html)

* Solid Buttons
* Outline Buttons
* Link Buttons
* Icon Buttons
* Disabled Buttons
* Floating Action Buttons

---

### Card

Card are used to show user related data collectively, like product details.
<br />
You can check out the various types of cards [here](https://magnet-ui.netlify.app/docs/docs-components/components/card.html)

* Horizontal card
* Vertical card
* Cards with badge
* Card with text overlay
* Card with dismiss
* Text only card

---

### Image
Images can be responsive to fit the parent's width, and also can be customised to be round shaped.
You can check out the various types of images [here](https://magnet-ui.netlify.app/docs/docs-components/components/image.html)

* Responsive Image
* Round Image
* Sqaure Image
---

### Input
Inputs are necessary for user interaction with the website. Inputs are used to take information from the user, and then save the data to the server, accordingly.
You can check out the various types of input [here](https://magnet-ui.netlify.app/docs/docs-components/components/input.html)

* Different Input Size and Shape
* Form Validation
* Text Area
* Checkbox
* Radio Input

---

### List

Lists can be used at so many places, navigation bar, stacked notifications, article pages, etc.
You can check out the various types of list [here](https://magnet-ui.netlify.app/docs/docs-components/components/list.html)

* Unordered List
* Ordered List
* List with no bullets
* List with inline items

---

### Modal

Modal is like a pop-up which you get to confirm some changes or cancel the changes.
You can check out the various types of list [here](https://magnet-ui.netlify.app/docs/docs-components/components/modal.html)

* Simple modal

---

### Rating
Rating components can be used as read-only badge or in reviews section. Can be used in reviews section as form too.
You can check out the simple rating [here](https://magnet-ui.netlify.app/docs/docs-components/components/rating.html)

* Simple rating

---

### Navigation

Navigation as the name suggest is used to navigate through the website.
You can check out the ready to go navigation [here](https://magnet-ui.netlify.app/docs/docs-components/components/navigation.html)

* Simple navigation

---

### Toast

A toast is like a notification given to user based on some events like Page not found or when photo is saved successfully.
You can check out the various types of snackbars [here](https://magnet-ui.netlify.app/docs/docs-components/components/toast.html)

* Baseline
* Leading
* Stacked

---


### Grid

Grid is used to divide the view into different sections of different sizes.
You can check out the various types of grids [here](https://magnet-ui.netlify.app/docs/docs-components/components/grid.html)

* Grid 50-50 Layout
* Grid 30-70 Layout
* Grid with 3 columns Layout
* Grid Layout Module

---

### Slider

A Slider allows user to select a range from which products can be displayed.
You can check out the simple slider [here](https://magnet-ui.netlify.app/docs/docs-components/components/slider.html)

* Filter Slider
* Volume Slider

---

## 🎨 ComposeUI Features

### Composable Component System

ComposeUI transforms static components into a dynamic, composable system:

```javascript
// Initialize
const composeUI = new ComposeUI();
const emojiSecurity = new EmojiSecurity();

// Register user with emoji pattern
emojiSecurity.registerUser('user1', '🔐🌟🎯🚀', ['*']);

// Authenticate with emojis
emojiSecurity.authenticate('user1', '🔐🌟🎯🚀');

// Create instant dashboard
const dashboard = composeUI.createDashboard('myDashboard');

// Add components dynamically
composeUI.addToDashboard('myDashboard', 'stat-widget', {
    emoji: '👥',
    value: '1,234',
    label: 'Total Users'
});

composeUI.mount('myDashboard', '#app');
```

### Emoji-Based Security 🔐

Instead of traditional passwords that can be vulnerabilities, ComposeUI uses **emojis as security features**:

- **Visual Authentication**: Easy to remember patterns like 🔐🌟🎯🚀
- **Large Character Space**: Thousands of emojis provide strong security
- **No Dictionary Attacks**: Emojis aren't in password databases
- **Session Management**: Automatic timeouts and status monitoring
- **Permission Control**: Fine-grained component access

### Benefits

1. **Instant Dashboards**: No HTML writing required
2. **Dynamic Updates**: Modify dashboards in real-time
3. **Secure by Default**: Built-in authentication and authorization
4. **Cybersecurity Focus**: Emojis turn potential vulnerabilities into strengths
5. **Developer Friendly**: Simple API for complex dashboards

[📖 Full Documentation](docs/COMPOSE_DOCUMENTATION.md)

---

## Documentation Website Overview

![magnetui overview gif](/assets/Magnet-UI-Overview.gif)
