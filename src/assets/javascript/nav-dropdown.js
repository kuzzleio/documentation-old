(function navDropdown() {
  $('.dropdown-btn')
    .on('click', function (event) {
      event.preventDefault();
      event.stopPropagation()
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
