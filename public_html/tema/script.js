// Roller JS

// Slide to anchors (anchors must have class 'goto')
var $root = $('html, body');
$('a.goto').click(function() {
  $root.animate({
    scrollTop: $( $.attr(this, 'href') ).offset().top
  }, 900);
  return false;
});

$(document).ready(function() {
  $('#or').height("50");
  $('#or').width("50");
  
  $('#and').height("50");
  $('#and').width("50");
  
  $('#sujeito').height("100");
  $('#sujeito').width("350");
  
  $('#propriedade').height("70");
  $('#propriedade').width("250");
  
  $('#botaoPesquisar').click(function(){
      pesquisar();
  });
  
  // Bootstrap Scrollspy
  $('body').scrollspy({offset: 100});

  // Setup Fitvids Container
  $(".video-container").fitVids();

  // Add animation classes to slides on page load
  $(".active .message").addClass("msg-visible animated slow fadeInDown");

  // Add / Remove animation classes to slides on slide
  var carousel = $("#introCarousel");
  carousel.on("slid", function () {
    var all = carousel.find('.item'),
        active = carousel.find('.active'),
        slidTo = all.index(active);
    $(".active .message").addClass("msg-visible animated slow fadeInDown");
  });
  carousel.on("slide", function () {
    var all = carousel.find('.item'),
        active = carousel.find('.active'),
        slidFrom = all.index(active);
    $(".message").removeClass("msg-visible animated slow fadeInDown");
  });

  // Sliding Pages - you can add more classes like so... $(".page-1, .page-2, .page-3")
  $(".page-1").pageslide({ speed: 600, direction: "left", modal: true });
  $(".page-2").pageslide({ speed: 600, direction: "right", modal: true });

  // Gallery Popup
  $('.image-popup-vertical-fit').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'my-mfp-zoom-in',
    image: {
      verticalFit: true
    }
  });

  // Set Header to Absolute on Input Focus
  if (Modernizr.touch) {
    var $body = $('body');
    var $inputs = $('input');
    $inputs.on('focus', function(e) {
      $body.addClass('fixed');
    });
    $inputs.on('blur', function(e) {
      $body.removeClass('fixed');
    });
  }

  // Leaflet Map
  var map = L.map('map').setView([51.505, -0.09], 13);
  // Values 51.505, -0.09 are Lattitude / Longitude of map center - change these to where you are!
  L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
  }).addTo(map);
  // Values 51.5, -0.09 are Lattitude / Longitude of the marker - change these to where you are!
  L.marker([51.5, -0.09]).addTo(map)
  // Set the marker popup content below
  .bindPopup("<p><b>Your Company Name</b><br/>Imaginary Street<br/>London WC3 456<br/>United Kingdom</p>").openPopup();
  var popup = L.popup();
  function onMapClick(e) {
    popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
  }
  map.on('click', onMapClick);

});

// Gallery Layout - On Window Load
var $container = $('#gallery');
$(window).load(function() {
  $container.packery({
    itemSelector: '.gallery-item',
    gutter: '.gutter-sizer'
  });
});