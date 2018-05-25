(function tocUX() {
  var $toc = $('.toc');

  //---------------------------------------------------------------------
  // toogle 'active' class on toc link when headings pass window offset
  if ($toc.length > 0) {
    var headings = {};
    var debounceActiveItem = false;
    var computeActiveItem = function() {
      var lastPassedItem;

      for (var key in headings) {
        headings[key].$link.removeClass('active');

        if (headings[key].offset <= window.pageYOffset + 70) {
          lastPassedItem = headings[key];
        }
      }

      if (lastPassedItem) {
        lastPassedItem.$link.addClass('active');
      }
    }

    $('a[href]', $toc).each(function(index, element) {
      var id = element.href.slice(element.href.indexOf('#'));
      var $ref = $(id).parent();

      if ($ref.length > 0) {
        headings[id] = {
          $ref: $ref,
          $link: $(element),
          offset: $ref.get('0').offsetTop
        }
      }
    });

    $(window).on('scroll', function() {
      clearTimeout(debounceActiveItem);
      debounceActiveItem = setTimeout(computeActiveItem, 10);
    })
    computeActiveItem();
  }
  //---------------------------------------------------------------------
})();
