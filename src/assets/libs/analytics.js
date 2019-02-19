// google analytics
gtag('create', 'UA-67035328-2', 'auto');

if (typeof report404ga !== 'undefined' && report404ga) {
  gtag('send', 'event', {
    eventCategory: 'documentation-not-found',
    eventAction: document.location.href,
    eventLabel: document.referrer || '',
    transport: 'beacon'
  });
}

(function scrollToHash() {
  if (window.location.hash != '') {
    var anchor = $(location.hash).get(0);
    if (anchor) {
      anchor.scrollIntoView();
    }
  }
})();
