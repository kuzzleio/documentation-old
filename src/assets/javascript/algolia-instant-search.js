(function instantSearchUI() {
  var KEY_UP = 38;
  var KEY_DOWN = 40;
  var client = algoliasearch(algolia_projectId, algolia_publicKey);
  var index = client.initIndex('kuzzle-documentation');
  var template = $('#search-results-template').html();
  var $searchInput = $('.search input[type=search]');
  var $searchResults = $('.search-results');
  var $searchResultsContainer = $('ul', $searchResults);
  var watchResultsDebounce = false;
  var selectedIndex = -1;
  var watchClose = false;
  var lastHits = 0;
  var _a = true;

  var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

  $('body')
    .keyup(function (event) {
      if (event.altKey && event.key === 's') {
        $searchInput.focus();
      }
    })

  $(window).on('keydown', function (event) {
    if (watchClose) {
      var $results = $('a', $searchResultsContainer);
      var $focusResult = $('a:hover, a:focus', $searchResultsContainer);

      if ($focusResult.length > 0) {
        $results.each(function(index, element) {

          if ($results[index] === $focusResult.get(0)) {
            selectedIndex = index;
          }
        })
      }

      switch (event.keyCode) {
        case KEY_UP:
          event.stopPropagation();
          if (selectedIndex === 0) {
            selectedIndex = -1;
          }

          if (selectedIndex === -1) {
            $searchInput.focus();
            selectedIndex = $results.length - 1;
          }
          else {
            selectedIndex -= 1;
            $results.get(selectedIndex).focus();
          }
          //$('li:not(:last-child).selected').removeClass('selected').next().addClass('selected');

          return false;
        case KEY_DOWN:
          event.stopPropagation();
          if (selectedIndex >= $results.length -1) {
            $searchInput.focus();
            selectedIndex = -1;
          }
          else {
            selectedIndex += 1;
            $results.get(selectedIndex).focus();
          }
          //$('li:not(:first-child).selected').removeClass('selected').prev().addClass('selected');
          return false;
      }
    }
  });

  // search results open/close handlers
  $(window).on('click touch', function() {
    if (watchClose) {
      $searchResults.removeClass('display');
      watchClose = false;

      if (watchResultsDebounce) {
        window.clearTimeout(watchResultsDebounce);
      }
    }
  });

  $searchInput.on('click touch', function(event) {
    if (lastHits > 0) {
      $searchResults.addClass('display');
      watchClose = true;
    }
    event.stopPropagation();
  });

  $searchInput.on('focus', function(event) {
    if (lastHits > 0) {
      $searchResults.addClass('display');
      watchClose = true;
    }

    selectedIndex = -1;
  });

  $searchInput.on('blur', function(event) {
    if (lastHits > 0) {
      $searchResults.addClass('display');
      watchClose = true;
    }
  });
  // end - search results open/close handlers


  // main input listener
  $searchInput.on('input', function(event) {
    var $input = $(this);
    var searchResultsContent = '';
    // var length = (this.value.length + 1) * 6;

    selectedIndex = -1;

    // // resize input length to fit value
    // length = (length > 450) ? 450 : length;
    // this.style.width = (length > 220) ? length + 'px' : '220px';


    // clear search result on empty input
    if (this.value === '' || Base64.encode(this.value) === 'SGVscCBSeXUgYnkgY2xpY2tpbmcgeW91ciB3YXkgdGhyb3VnaCBkZXN0aW55IQ==') {
      $searchResults.removeClass('display');
      $searchResultsContainer.empty();
      watchClose = false;

      return;
    }

    if (_a) {
      console.warn(Base64.decode('WW91IG1pZ2h0IHdhbnQgdG8gYXNrIFJ5dSBmb3IgaGVscA=='));
      _a = false;
    }

    if (Base64.encode(this.value.toLowerCase()) === 'cnl1IGhlbHAgbWU=') {
      var d = document

      s = d.createElement('script');
      s.src = site_base_path + Base64.decode('YXNzZXRzL2phdmFzY3JpcHQvbGliL2pxdWVyeS5zb21ldGhpbmcuanM=');
      s.async = 'async';
      (d.head || d.body).appendChild(s);

      $searchResultsContainer.empty();
      $searchResults.removeClass('display');
      watchClose = false;

      this.disabled = true;
      this.value = Base64.decode('SGVscCBSeXUgYnkgY2xpY2tpbmcgeW91ciB3YXkgdGhyb3VnaCBkZXN0aW55IQ==');

      return;
    }

    index.search(this.value, function(err, res) {
      if (err) {
        console.error(err);
        return;
      }

      lastHits = res.hits.length;
      if (watchResultsDebounce) {
        window.clearTimeout(watchResultsDebounce);
      }

      if (lastHits === 0) {
        $searchResultsContainer.empty();
        $searchResults.removeClass('display');
        return;
      }

      // send ga event when user has search results but does nothing
      watchResultsDebounce = window.setTimeout(function() {
        ga('send', 'event', {
          eventCategory: 'documentation-search',
          eventAction: (lastHits > 0) ? '<watch_results>' : '<no_results>',
          eventLabel: $searchInput.val(),
          transport: 'beacon'
        });
      }, 4000);

      $searchResults.addClass('display');
      watchClose = true;

      // make search result item from
      for (var key in res.hits) {
        var content = template;

        // here we secure manualy all xml tags wich may can be retrieved by results, but we keep <em> tags for highlighting
        var elements = res.hits[key]._snippetResult.content.value.split('<em>');
        var preview = '';

        for (var k in elements) {
          elements[k] = elements[k].replace(/</g, '&lt;');
          elements[k] = elements[k].replace(/>/g, '&gt;');
        }

        // restore <em></em> tags
        preview = elements.join('<em>');
        preview = preview.replace(/&lt;\/em&gt;/g, '</em>');

        // replace variables in template
        content = content.replace(/__tabindex__/g, key + 2);
        content = content.replace(/__link__/g, site_url + site_base_path + res.hits[key].path);
        content = content.replace(/__parent__/g, res.hits[key].parent || '');
        content = content.replace(/__firstMember__/g, res.hits[key].firstMember || '');
        content = content.replace(/__title__/g, res.hits[key]._highlightResult.title.value);
        content = content.replace(/__preview__/g, preview);

        searchResultsContent += content;
      }

      // add algolia copyright
      searchResultsContent += '<li style="text-align: right"><img src="https://www.algolia.com/assets/pricing_new/algolia-powered-by-ac7dba62d03d1e28b0838c5634eb42a9.svg" style="margin: 8px 8px 0 0;"></li>';

      // magic jQuery
      $searchResultsContainer.html(searchResultsContent);

      // send ga event on search result hit
      $('a', $searchResultsContainer).on('click touch', function(event) {
        ga('send', 'event', {
          eventCategory: 'documentation-search',
          eventAction: this.href,
          eventLabel: $searchInput.val(),
          transport: 'beacon'
        });
      });
    });
  });

})();
