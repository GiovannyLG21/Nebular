---
title: 'How to create a font subset with transfonter'
description: 'A guide on how to create a font subset using Transfonter, a web-based'
date: '01-10-2023'
tags: ["web development", "fonts", "transfonter"]
readtime: 5
---

## What is Transfonter?

**Transfonter** is a web-based tool that allows you to create a subset of your fonts. This means you can select only the characters you need from a font, reducing its size and improving your website's performance. It's particularly useful for web developers who want to optimize their sites by using only the necessary font characters

```
0000-007F, 00A0-024F, 2190-22FF, 2934-2937, F6D5-F6D8
```

:::tip
You can find out the character codes and view the glyph tables of a font using built-in system tools:
- Windows: Use Character Map (charmap). Open the Start menu, search for "Character Map," and select a font to see its glyphs and Unicode codes.
- macOS: Open Font Book, select a font, and switch to "Repertoire" mode to see all available characters along with their codes.
- Linux: Use gucharmap (GNOME Character Map) or kcharselect (for KDE) to browse Unicode symbols in installed fonts.
:::

```css
@font-face {
  font-family: "SFProRounded";
  src: url("/fonts/SF-Pro-Rounded-Regular-Basic.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "SFProRounded";
  src: url("/fonts/SF-Pro-Rounded-Regular-Extended.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
```