(function leftNavUX() {
console.log('leftNavUx');
  var $wrapper = $('.tocify-wrapper');

console.log('Wrap length', $wrapper.length);
  if ($wrapper.length !== 0) {
    var $selectedItem = $('.tocify-level-2.tocify-focus', $wrapper);

    if ($selectedItem.length === 0) {
      $selectedItem = $('.tocify-focus', $wrapper);
    }
console.log('selectedItem', $selectedItem);
console.log('selectedItem Offset', $selectedItem.get(0).offsetTop + 120);
console.log('wrapper heigth', $wrapper.height());

    if ($selectedItem.get(0).offsetTop + 120 > $wrapper.height()) {
      $wrapper.scrollTop(Math.ceil($selectedItem.get(0).offsetTop - $wrapper.height() / 2));
    }
  }

  $('nav .btn-hamburger').on('click', function (event) {
    event.preventDefault();
    $('.tocify-wrapper').toggleClass('open');
  })

  $('.floating-toggle').on('click', function (event) {
    event.preventDefault();
    $('.tocify-wrapper').toggleClass('open');
  })

  $('.main-content').on('click', function(event) {
    $('.tocify-wrapper').removeClass('open');
  })
})();
