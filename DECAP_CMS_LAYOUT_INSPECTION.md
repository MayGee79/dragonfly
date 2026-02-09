# Decap CMS Layout Inspection

## What We Know From the Codebase

### Key class names (from custom.css and Decap source)
- **`nc-appHeader`** – Main app header (contains Save/Publish button)
- **`nc-appHeader-actions`** – Container for the Save/Publish button
- **`nc-entryEditor`** / **`EntryEditor`** – Entry editor container
- **`nc-entryEditor-toolbarButton`** – Save/Publish buttons in the editor toolbar
- **`ToolbarContainer`** / **`EditorToolbar`** / **`editorToolbar`** – Possible toolbar wrappers

### Current CSS
- Header: `position: sticky; top: 44px` (below our nav)
- Toolbar: `position: sticky; top: 92px` (added by us)
- Save buttons: styled with `nc-appHeader-actions`, `nc-button-primary`, etc.

### Possible issue
The CMS layout may use a **scrollable content area** that contains both the header and the form. If the header is *inside* that scrollable div, it scrolls away with the content. `position: sticky` only works relative to its scroll parent – if the scroll parent is an inner div, the header sticks within that, not the viewport.

---

## How to Inspect Yourself

1. Open the admin at `http://localhost:3000/admin`
2. Go to Content → Blog → Edit any post (or create one)
3. Open **DevTools** (F12 or right‑click → Inspect)
4. Paste this in the Console and press Enter:

```javascript
(function(){
  var root = document.getElementById('nc-root');
  if (!root) { console.log('nc-root not found'); return; }
  
  function findScroll(el, depth) {
    if (!el || depth > 5) return null;
    var s = getComputedStyle(el);
    var overflow = s.overflow + s.overflowY;
    if (overflow.indexOf('scroll') !== -1 || overflow.indexOf('auto') !== -1) {
      return { el: el, overflow: overflow, tag: el.tagName, classes: el.className };
    }
    return findScroll(el.parentElement, depth + 1);
  }
  
  var header = root.querySelector('[class*="appHeader"]') || root.querySelector('header');
  var saveBtn = root.querySelector('[class*="nc-appHeader-actions"] button') || 
    Array.from(root.querySelectorAll('button')).find(b => /save|publish/i.test(b.textContent));
  
  console.log('=== HEADER ===', header);
  console.log('=== SAVE BUTTON ===', saveBtn);
  if (header) {
    var scrollParent = findScroll(header, 0);
    console.log('=== HEADER SCROLL PARENT ===', scrollParent);
    console.log('Header parent chain:', header.parentElement?.className, '→', header.parentElement?.parentElement?.className);
  }
  
  console.log('=== FULL NC-ROOT STRUCTURE (simplified) ===');
  function dump(el, indent) {
    if (!el || indent > 6) return;
    var cls = (el.className || '').toString().slice(0, 50);
    var scroll = (getComputedStyle(el).overflowY || '') + (getComputedStyle(el).overflow || '');
    var mark = scroll.includes('scroll') || scroll.includes('auto') ? ' [SCROLL]' : '';
    console.log('  '.repeat(indent) + el.tagName + (cls ? '.' + cls.split(' ')[0] : '') + mark);
    [].slice.call(el.children).slice(0, 8).forEach(c => dump(c, indent + 1));
  }
  dump(root, 0);
})();
```

5. Check the console output and note:
   - Where the header sits in the DOM
   - Whether a `[SCROLL]` container wraps the header
   - The class names of the scroll parent

---

## Next Steps After Inspection

- **If header is inside a scroll container:** Make that container’s header/toolbar `position: fixed` (or move it outside the scroll area) so it stays at the top.
- **If header is at the root level:** Sticky should work; we may need to adjust `top` or z-index.
- **If Save is in a different toolbar:** We may need to target `nc-entryEditor-toolbar` instead of `nc-appHeader-actions`.
