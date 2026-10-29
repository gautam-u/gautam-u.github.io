# Workbill website

The production site is served at https://gautam-u.github.io/workbill/.

The homepage, support and privacy pages are static HTML. `assets/site-v2.css` controls their shared layout; `assets/gallery.js` only switches local screenshot images and captions. It does not send analytics. Existing event and terms pages keep their existing stylesheet.

`assets/screenshots-current/source-manifest.json` records the source and version of every screenshot. Captures contain demonstration or empty app records.

Preview through a local HTTP server rooted at the parent repository. Check desktop and narrow phone layouts, screenshot selection, full-size image links and support/privacy navigation before publishing. Preserve the root app-ads.txt and associated-domain files.
