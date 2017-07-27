(function leftNavUX() {
  var $wrapper = $('.tocify-wrapper');

  if ($wrapper.length !== 0) {
    var $selectedItem = $('.tocify-level-2.tocify-focus', $wrapper);

    if ($selectedItem.length === 0) {
      $selectedItem = $('.tocify-focus', $wrapper);
    }

    if ($selectedItem.get(0).offsetTop + 120 > $wrapper.height()) {
      $wrapper.scrollTop(Math.ceil($selectedItem.get(0).offsetTop - $wrapper.height() / 2));
    }
  }
})();
