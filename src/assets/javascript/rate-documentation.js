
  (function rateDocumentation() {
    var $rateDocumentation = $('.rate-documentation');
    var pagePath = path.replace(/\//g, '-');
    var categoryRating = parseInt(store('rate-documentation-' + pagePath));

    $rateDocumentation.barrating({
      theme: 'fontawesome-stars',
      initialRatting: 0,
      allowEmpty: true,
      onSelect: function(value, text, event) {
        if (typeof(event) !== 'undefined') {
          // rating was selected by a user
          store('rate-documentation-' + pagePath, event.target.dataset.ratingValue);
          $rateDocumentation.barrating('set', event.target.dataset.ratingValue);
          // $rateDocumentation.barrating('readonly', true); // wired on mobile

          ga('send', 'event', {
            eventCategory: 'documentation-rate',
            eventAction: site_url + site_base_path + path,
            eventLabel: event.target.dataset.ratingText,
            transport: 'beacon'
          });

          window.setTimeout(function() {
            $('.br-current-rating').css('transition', 'opacity 0.15s');
            $('.br-current-rating').css('opacity', '0');

            window.setTimeout(function() {
              $('.br-current-rating').css('transition', 'opacity 0.9s');
              $('.br-current-rating').text("thank's for feedback !");
              $('.br-current-rating').css('opacity', '1');
            }, 140);
          }, 1);

          window.setTimeout(function() {
            $('.br-current-rating').css('opacity', '0');

            window.setTimeout(function() {
              $('.br-current-rating').css('transition', 'opacity 0.2s');
              if (event.target.dataset.ratingText === 'Excellent documentation') {
                $('.br-current-rating').text(event.target.dataset.ratingText + ' \\o/');
              }
              else {
                $('.br-current-rating').text(event.target.dataset.ratingText);
              }
              $('.br-current-rating').css('opacity', '1');
            }, 1000);
          }, 2500);
        }
        else {
          // rating was selected programmatically
          // by calling `set` method
        }
      }
    });

    $('.br-current-rating').addClass('visible');

    if (!isNaN(categoryRating)) {
      $rateDocumentation.barrating('set', categoryRating);
      $rateDocumentation.barrating('readonly', true);
    }
  })();
