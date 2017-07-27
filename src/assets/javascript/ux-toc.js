(function tocUX() {
  var $toc = $('.toc');
  var $content = $('.content');

  //----------------------------
  // fixes toc next to content
  if ($toc.length > 0) {
    var debounceComputeSize = false;
    var computeSize = function() {
      // 280 is the width of left nav / 15 is the margin with content
      $toc.css('left', $content.get('0').offsetLeft + $content.get('0').offsetWidth + 280 + 15 +'px');
      // 30 is the margin with bottom window
      $toc.css('max-height', window.innerHeight - $toc.get('0').offsetTop - 30  + 'px');
    }

    $(window).on('resize', function() {
      clearTimeout(debounceComputeSize);
      debounceComputeSize = setTimeout(computeSize, 13);
    })
    computeSize();
  }
  //----------------------------

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
