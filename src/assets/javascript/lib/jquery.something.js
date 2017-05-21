(function() {
  console.log('ryu is here to save the world');
  var $body = $(document.body);
  var $full = $('<div class="full" style="' +
    'position: absolute; ' +
    'background: rgba(0, 0, 0, 0.6); ' +
    'top: 0; ' +
    'left: 0; ' +
    'bottom: 0; ' +
    'right: 0; ' +
    'z-index: 20;' +
    'user-select: none; ' +
  '"></div>');

  var $container = $('<div style="' +
    'position: absolute; ' +
    'text-align: center; ' +
    'overflow: hidden; ' +
    'background: rgba(0, 0, 0, 0.4); ' +
    'box-shadow: 0 0 25px rgba(0, 0, 0, 0.25); ' +
    'top: 30%; ' +
    'z-index: 50;' +
    'white-space: nowrap; ' +
    'transition: all 0s; ' +
    'transform-origin: center center; ' +
    'transform: scale(1, 1); ' +
    'height: 221px; ' +
    'width: 100%;' +
  '"></div>');

  $container.css('transform-origin', 'left center');
  $container.css('transform', 'scale(0, 0.3)');
  $container.css('opacity', '0');

  var $text1  = $('<p style="' +
    'vertical-align: middle; ' +
    'display: inline-block; ' +
    'color: #FFF; ' +
    'text-transform: uppercase; ' +
    'font-size: 30px; ' +
    'font-family: Gobold; ' +
    'letter-spacing: 1.4px; ' +
    'margin: 0 70px; ' +
    'text-shadow: 1px 1px 1px black; ' +
    'transition: all 0s; ' +
    'line-height: 50px; ' +
    'white-space: nowrap; ' +
  '">Every moment gives us a chance<br />to become more than what we are</p>');

  var $img1 = $('<img style="'+
    'vertical-align: middle; ' +
    'display: inline-block; ' +
    'transition: all 5s; ' +
    'margin-right: 1500px; ' +
  '" height="221px" src="http://www.fightersgeneration.com/characters3/ryu-big-intro-gif.gif" />');

  $text1.appendTo($container);
  $img1.appendTo($container);
  $container.appendTo($full);
  $body.prepend($full);
  $body.css('overflow', 'hidden');

  window.setTimeout(function() {
    $container.css('transition', 'all 2s');
    $img1.css('margin-right', '0');

    window.setTimeout(function() {
      $container.css('transform', 'scale(1, 1)');
      $container.css('opacity', '1');

    }, 100);
  }, 10);

  $full.one('click', function(event) {
    event.stopPropagation();
    var $text2  = $('<p style="' +
      'vertical-align: middle; ' +
      'display: inline-block; ' +
      'color: #FFF; ' +
      'text-transform: uppercase; ' +
      'font-size: 30px; ' +
      'font-family: Gobold; ' +
      'letter-spacing: 1.4px; ' +
      'margin: 0 70px; ' +
      'text-shadow: 1px 1px 1px black; ' +
      'line-height: 50px; ' +
      'white-space: nowrap; ' +
      'transition: all 5s; ' +
      'margin-left: 1500px; ' +
    '">Whatever you find warthwhile in life,<br />is worth fighting for!</p>');

    var $img2 = $('<img style="' +
      'vertical-align: middle; ' +
      'display: inline-block; ' +
    '" src="http://www.fightersgeneration.com/characters3/ryu-bigintrogif-2.gif" height="221px" />');

    $container.css('transform', 'scale(1, 0)');
    $container.css('opacity', '0');

    window.setTimeout(function() {
      $container.css('transition', 'all 0s');

      $container.html('');
      $text2.appendTo($container);
      $img2.appendTo($container);
      // $container.css('right', '0px');
      // $container.css('left', '2000px');
      // $container.css('opacity', '0');

      $container.css('transform-origin', 'right center');
      $container.css('transform', 'scale(0, 0)');
      $container.css('opacity', '0');
      //
      // $container.css('left', '');
      // $container.css('right', '0');
      // $container.css('opacity', '0');
      // $container.css('max-width', '0');
      // $container.css('max-height', '221px');

      window.setTimeout(function() {
        $container.css('transform', 'scale(0, 0.5)');
        $container.css('transition', 'all 1s');

        window.setTimeout(function() {
          $container.css('transform', 'scale(1, 1)');
          $container.css('opacity', '1');

          $text2.css('margin-left', '0');

          var lastDestroyedSize = 1;
          $full.on('click', function(event) {
            var $destroyingItem = $('.last-destroy');
            var firstSelectors = '.panel:not(.destroyed), h1:not(.destroyed), h2:not(.destroyed), h3:not(.destroyed), .main-content>p:not(.destroyed), .main-content>aside:not(.destroyed), .main-content>ul:not(.destroyed), pre:not(.destroyed)';
            var secondSelectors = '.nav-siblings a:not(.destroyed), .nav-siblings select:not(.destroyed), .nav-siblings input:not(.destroyed), header ul:not(.destroyed)';
            var lastSelectors = '.main-content:not(.destroyed), .nav-siblings:not(.destroyed), header:not(.destroyed)';

            $body = $(document.body);

            if ($destroyingItem.length === 0) {
              var $item = $(firstSelectors, $body);

              if ($item.length <= 0) {
                $item = $(secondSelectors, $body);
              }

              if ($item.length <= 0) {
                $item = $(lastSelectors, $body);
              }

              if ($item.length <= 0) {
                $item = $('.container:not(.destroyed)', $body);
              }

              lastDestroyedSize = 1;

              $destroyingItem = $($item.get(Math.floor(Math.random() * $item.length)));
              $destroyingItem.addClass('last-destroy');
              $destroyingItem.css('transition', 'transform 0.2s, max-height 0.4s');
            }

            $destroyingItem.css('transform-origin', 'center center');
            $destroyingItem.css('overflow', 'hidden');
            $destroyingItem.css('transform', 'scale(' + lastDestroyedSize + ', ' + lastDestroyedSize + ')');

            lastDestroyedSize = lastDestroyedSize - 0.20;

            if (lastDestroyedSize <= 0.2) {
              $destroyingItem.css('transform-origin', 'center center');
              $destroyingItem.css('transform', 'scale(0, 0)');
              $destroyingItem.css('max-height', '0');
              $destroyingItem.css('padding', '0');
              $destroyingItem.css('margin', '0');
              $destroyingItem.addClass('destroyed');
              $destroyingItem.removeClass('last-destroy');

              lastDestroyedSize = 0
            }
          });
        }, 1000);
      }, 10);

      return false;
    }, 2000)
  });

  console.log('-- ryu is here to save the world --');
})();
