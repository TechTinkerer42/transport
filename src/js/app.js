'use strict';

$(document).foundation();

var useMouseLeave = false;
var forceOffCanvas = false;

var changeLayout = function() {
  $('#layout').removeClass();
  $('#layout-inner').removeClass();
  $('#layout-sidebar').removeClass();
  $('#layout-content').removeClass();

  if (x === 'autohide' && !forceOffCanvas) {
    $('#layout').addClass('sidebar-wrapper');
    $('#layout-sidebar').addClass('sidebar show-for-medium');
    $('#layout-content').addClass('sidebar-content');
    useMouseLeave = true;
    $('.sidebar').mouseenter(function() {
      $('.sidebar-content').addClass('is-fat');
      $('.sidebar').addClass('is-fat');
    }).mouseleave(function() {
      if (useMouseLeave) {
        $('.sidebar-content').removeClass('is-fat');
        $('.sidebar').removeClass('is-fat');
      }
    })
  } else if (x === 'alwaysopen' && !forceOffCanvas) { // alwaysopen
    useMouseLeave = false;
    $('#layout').addClass('sidebar-wrapper');
    $('#layout-sidebar').addClass('sidebar show-for-medium is-fat');
    $('#layout-content').addClass('sidebar-content is-fat');
  } else { // if (x === 'offcanvas')
    $('#layout').addClass('off-canvas-wrapper');
    $('#layout-inner').addClass('off-canvas-wrapper-inner');
    $('#layout-sidebar').addClass('off-canvas position-left');
    $('#layout-content').addClass('off-canvas-content');
  }
}

var x = $('input[name=sidebar-preference]').val();
$('.current-preference').text(x);
changeLayout();

$('input[name=sidebar-preference]').change(function() {
  x = $(this).val();
  $('.current-preference').text(x);
  changeLayout();
});

$(window).on('changed.zf.mediaquery', function(event, name) {
  forceOffCanvas = (name === 'small' || name === 'medium');
  changeLayout();
});
