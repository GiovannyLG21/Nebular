---
title: 'Using CSS Variables for Theming'
description: 'How to leverage CSS custom properties for dynamic and maintainable themes.'
date: '04-10-2024'
tags: ["css", "theming", "web development"]
readtime: 3
---

# Benefits of CSS Variables

CSS variables (custom properties) allow you to define values once and reuse them throughout your CSS, making it easier to manage themes.

# Example

```css
:root {
  --primary-color: #3498db;
}

button {
  background: var(--primary-color);
}
```

Changing the variable updates the theme across your site, enabling light and dark modes with minimal code.