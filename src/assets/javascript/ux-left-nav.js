(function leftNavUX() {
console.log('leftNavUx');
  var $wrapper = $('.tocify-wrapper');

console.log('Wrap length', $wrapper.length);
  if ($wrapper.length !== 0) {
    var $selectedItemList = $('.tocify-level-2.tocify-focus', $wrapper);

    if ($selectedItemList.length === 0) {
      $selectedItemList = $('.tocify-focus', $wrapper);
    }
console.log('selectedItemList', $selectedItemList);
    var $selectedItem = $selectedItemList.get($selectedItemList.length-1)
console.log('selectedItem Offset', $selectedItem.offsetTop);
console.log('wrapper heigth', $wrapper.height());

    if ($selectedItem.offsetTop + 120 > $wrapper.height()) {
      console.log(Math.ceil($selectedItem.offsetTop - $wrapper.height() / 2));
      $wrapper.scrollTop(Math.ceil($selectedItem.offsetTop - $wrapper.height() / 2));
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
