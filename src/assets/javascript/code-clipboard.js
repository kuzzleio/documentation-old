//---------------------------------------------------------------------
// copy code to clipboard button
(function codeClipboard() {
  $hljs = $('.hljs');

  if ($hljs.length > 0) {
    var debounceClipboard = false;
    var clipboardSnippets;

    function fallbackMessage(action) {
        var actionMsg = '';
        var actionKey = (action === 'cut' ? 'X' : 'C');
        if (/iPhone|iPad/i.test(navigator.userAgent)) {
            actionMsg = 'No support :(';
        } else if (/Mac/i.test(navigator.userAgent)) {
            actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
        } else {
            actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
        }
        return actionMsg;
    }

    $hljs.each(function(index, element) {
      $(element).before('<button class="clipboard" title="copy code to clipboard" data-clipboard-snippet><i class="fa fa-clipboard" aria-hidden="true"></i></button>');
    })

    clipboardSnippets = new Clipboard('[data-clipboard-snippet]', {
        target: function(trigger) {
            return trigger.nextElementSibling;
        }
    });

    clipboardSnippets.on('success', function(e) {
        e.clearSelection();
        $(e.trigger).text('Copied!')

        clearTimeout(debounceClipboard);
        debounceClipboard = setTimeout(function() {
          $(e.trigger).html('<i class="fa fa-clipboard" aria-hidden="true"></i>');
        }, 1200);
    });
    clipboardSnippets.on('error', function(e) {
      e.clearSelection();
      $(e.trigger).text(fallbackMessage(e.action));

      clearTimeout(debounceClipboard);
      debounceClipboard = setTimeout(function() {
        $(e.trigger).html('<i class="fa fa-clipboard" aria-hidden="true"></i>');
      }, 2400);
    });
  }
})();
//---------------------------------------------------------------------
