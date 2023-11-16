// Track the previous scroll position for header visibility changes
var prevScrollPos = $(window).scrollTop();

// Handle header visibility on scroll
$(window).scroll(function () {
  var currentScrollPos = $(window).scrollTop();
  var header = $("header");

  // Check scroll direction to determine header class changes
  if (prevScrollPos > currentScrollPos) {
    header.removeClass("header-hidden").addClass("header-on");
  } else {
    header.addClass("header-hidden").removeClass("header-on");
  }

  // Change header background on scroll
  if (window.scrollY > 0) {
    header.addClass("header-bg");
  } else {
    header.removeClass("header-bg");
  }

  // Update previous scroll position
  prevScrollPos = currentScrollPos;
});

// Handle collapsed navigation bar
const navBarIcon = $(".collapsed-nav");
const phoneNavBar = $(".phone-nav");
const closeNavBar = $(".close-ico");

// Show mobile navigation on icon click
navBarIcon.on("click", function () {
  phoneNavBar.addClass("show-nav");
});

// Hide mobile navigation on close icon click
closeNavBar.on("click", function () {
  phoneNavBar.removeClass("show-nav");
});

// Handle dropdown functionality in the footer section
$(".dropdown").click(function () {
  $(this).find(".collapse").toggleClass("expand");
});

// Animate sections on scroll
const sections = $("section");

function reveal() {
  var windowHeight = $(window).innerHeight();
  var windowBottom = $(window).scrollTop() + windowHeight;
  var revealPoint = windowBottom - 100;

  sections.each(function () {
    var offset = $(this).offset().top;
    var sectionBottom = offset + $(this).outerHeight();

    if (offset <= revealPoint && sectionBottom > $(window).scrollTop()) {
      $(this).addClass("show-animate");
    } else {
      $(this).removeClass("show-animate");
    }
  });
}

$(window).on("scroll", reveal);

// Carousel cards functionality
const carousel = $("#posts .container .carousel");
const arrows = $("#posts .arrow");
const firstCard = $("#posts .activity").outerWidth(true);
const carouselChildren = carousel.children().toArray();

// Initialize variables for dragging state and position
let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

// Calculate the number of cards per view
let cardPerView = Math.round(carousel.outerWidth(true) / firstCard);

// Prepend and append cards for infinite scrolling effect
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach(function (card) {
    carousel.prepend($(card).prop("outerHTML"));
  });

carouselChildren.slice(0, cardPerView).forEach(function (card) {
  carousel.append($(card).prop("outerHTML"));
});

// Event handlers for arrow clicks
arrows.each(function () {
  $(this).on("click", function (e) {
    const arrow = $(this);
    const isLeftArrow = arrow.hasClass("left");
    const scrollAmount = isLeftArrow ? -firstCard : firstCard;

    carousel.scrollLeft(carousel.scrollLeft() + scrollAmount);
  });
});

// Functions for dragging, infinite scrolling, and auto sliding
const dragStart = function (e) {
  isDragging = true;
  carousel.addClass("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft();
};

const dragStop = function () {
  isDragging = false;
  carousel.removeClass("dragging");
};

const dragging = function (e) {
  if (!isDragging) return;
  carousel.scrollLeft(startScrollLeft - (e.pageX - startX));
};

const infiniteScroll = function () {
  const carouselScrollLeft = carousel.scrollLeft();
  const carouselScrollWidth = carousel[0].scrollWidth;
  const carouselWidth = carousel.outerWidth();

  if (carouselScrollLeft === 0) {
    carousel.addClass("no-transition");
    carousel.scrollLeft(carouselScrollWidth - 2 * carouselWidth);
    carousel.removeClass("no-transition");
  } else if (
    carouselScrollLeft === Math.floor(carouselScrollWidth - carouselWidth)
  ) {
    carousel.addClass("no-transition");
    carousel.scrollLeft(carouselWidth);
    carousel.removeClass("no-transition");
  }

  clearTimeout(timeoutId);
  if (!carousel.is(":hover")) {
    autoSlide();
  }
};

const autoSlide = () => {
  if ($(window).innerWidth() < 800) return;
  timeoutId = setTimeout(
    () => carousel.scrollLeft(carousel.scrollLeft() + firstCard),
    3500
  );
};

// Initial auto slide
autoSlide();

// Attach event handlers for dragging and resizing
carousel.on("mousemove", dragging);
$(document).on("mouseup", dragStop);
carousel.on("mousedown", dragStart);
carousel.on("scroll", infiniteScroll);
carousel.on("mouseenter", () => clearTimeout(timeoutId));
carousel.on("mouseleave", autoSlide);

// Function to change inner HTML based on window width
function changeInnerHtml() {
  var element = $(".activity.large h3");

  if ($(window).width() < 723) {
    element.text("استمتع بشواطئ البحر في الغردقة");
  } else {
    element.text("استجمام على شواطئ البحر الأحمر في الغردقة");
  }
}

// Call the function on page load and window resize
changeInnerHtml();
$(window).resize(changeInnerHtml);
