/**
 * Paste this in the browser console when on /admin with Content > Pages (or Blog) open.
 * It will log the DOM structure so we can find why list view shows squares.
 */
(function() {
  var root = document.getElementById('nc-root');
  if (!root) {
    console.log('ERROR: #nc-root not found. Are you on /admin?');
    return;
  }

  console.log('=== 1. View controls ===');
  var controls = root.querySelector('[class*="viewControls"]') || root.querySelector('[class*="ViewControls"]');
  console.log('View controls element:', controls);
  if (controls) {
    var btns = controls.querySelectorAll('button, a');
    console.log('Number of buttons:', btns.length);
    btns.forEach(function(b, i) {
      console.log('  Button', i, ':', {
        ariaPressed: b.getAttribute('aria-pressed'),
        title: b.title,
        ariaLabel: b.getAttribute('aria-label'),
        className: b.className,
        text: b.textContent?.trim().slice(0, 30)
      });
    });
  } else {
    console.log('NO view controls found - file collection (Pages) may not have list/card toggle');
  }

  console.log('\n=== 2. CardsGrid ===');
  var ul = root.querySelector('ul[class*="CardsGrid"]');
  console.log('CardsGrid ul:', ul);
  if (ul) {
    console.log('  data-view:', ul.getAttribute('data-view'));
    console.log('  display:', getComputedStyle(ul).display);
    console.log('  flex-direction:', getComputedStyle(ul).flexDirection);
    console.log('  child count:', ul.children.length);
  }

  console.log('\n=== 3. List/table view (alternative structure) ===');
  var table = root.querySelector('table[class*="entryListing"], [class*="entryListing-table"], [class*="collectionView-list"] table');
  console.log('List/table element:', table);

  console.log('\n=== 4. What our script would detect ===');
  var mode = 'cards';
  if (controls) {
    var pressed = controls.querySelector('[aria-pressed="true"]');
    if (pressed) {
      var title = (pressed.title || pressed.getAttribute('aria-label') || '').toLowerCase();
      mode = title.indexOf('list') !== -1 ? 'list' : 'cards';
    }
  }
  console.log('getViewMode() would return:', mode);

  console.log('\n=== 5. Full structure dump (first 3 levels) ===');
  function dump(el, indent) {
    if (!el || indent > 3) return;
    var cls = (el.className || '').toString().slice(0, 80);
    var tag = el.tagName + (cls ? ' .' + cls.split(' ')[0] : '');
    console.log('  '.repeat(indent) + tag);
    [].slice.call(el.children).slice(0, 5).forEach(function(c) { dump(c, indent + 1); });
  }
  var main = root.querySelector('[class*="entryListing"], [class*="collectionView"], [class*="CardsGrid"]')?.parentElement || root;
  dump(main || root, 0);
})();
