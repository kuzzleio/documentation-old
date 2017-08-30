//---------------------------------------------------------------------
// language tab selector
(function languageTabSelector() {
  var $languageTabSelector = $('.language-tab-selector a');
  var pageCategory = ancestry_parent_path.replace(/\//g, '-');
  var selectedLanguage = store('selected-language' + pageCategory);

  if (selectedLanguage) {
    if ($('.language-tab[data-language="' + selectedLanguage + '"]').length > 0) {
      $('.language-tab-active').removeClass('language-tab-active');
      $('.language-tab-selector a[data-language-name="' + selectedLanguage + '"]').addClass('language-tab-active');
      $('.language-tab[data-language="' + selectedLanguage + '"]').addClass('language-tab-active');
    }
  }

  if ($languageTabSelector.length > 0) {
    $languageTabSelector.on('click touch', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var language = $(this).data('languageName');

      $('.language-tab-active').removeClass('language-tab-active');
      $('.language-tab-selector a[data-language-name="' + language + '"]').addClass('language-tab-active');
      $('.language-tab[data-language="' + language + '"]').addClass('language-tab-active');

      store('selected-language' + pageCategory, language)
    });
  }
})();
//---------------------------------------------------------------------
