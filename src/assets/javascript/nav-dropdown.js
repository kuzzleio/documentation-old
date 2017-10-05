(function navDropdown() {
  $('.dropdown-btn')
    .on('click', function (event) {
      event.preventDefault();
      event.stopPropagation()
      $(event.target)
        .parent()
        .addClass('open');
      // console.dir(event);
    })
  $(window)
    .on('click', function () {
      $('.dropdown-btn')
        .parent()
        .removeClass('open');
    });
})();
