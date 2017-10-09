(function navDropdown() {
  $('.dropdown-btn')
    .on('click', function (event) {
      event.stopPropagation();
      $(event.target)
        .parent()
        .toggleClass('open');
    })
  $(window)
    .on('click', function () {
      $('.dropdown-btn')
        .removeClass('open');
    });
})();
