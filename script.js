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

changeInnerHtml();
$(window).resize(changeInnerHtml);

// hell
const rihlaInfo = $(".rihla-info");

const postsContent = $(".posts-content");

var rihlaInfoOffsetTop = rihlaInfo.offset().top;

let rihlaInfoHeight = rihlaInfo.height();

let postsContentOffsetTop = postsContent.offset().top;

$(window).scroll(function () {
  let scrollPosition = $(window).scrollTop();

  let rihlaInfoBottom = rihlaInfoOffsetTop + rihlaInfoHeight;

  let postsContentBottom = postsContentOffsetTop + postsContent.height();

  if (
    scrollPosition >= rihlaInfoOffsetTop &&
    scrollPosition < postsContentBottom - rihlaInfoHeight
  ) {
    var topValue = scrollPosition - rihlaInfoOffsetTop;
    rihlaInfo.css({ position: "relative", top: topValue + 70 + "px" });
  } else if (scrollPosition >= postsContentBottom - rihlaInfoHeight) {
    rihlaInfo.css({
      position: "relative",
      top:
        postsContentBottom - rihlaInfoHeight - rihlaInfoOffsetTop - 70 + "px",
    });
  } else {
    rihlaInfo.css({ position: "relative", top: "0" });
  }
});

// Carousel cards functionality
const reviewCarousel = $(".customer-reviews .reviews");
const reviewArrows = $(".customer-reviews .arrows .arrow");
const reviewFirstCard = $(".customer-reviews .review-card").outerWidth(true);
const reviewCarouselChildren = reviewCarousel.children().toArray();

// Initialize variables for dragging state and position
let review_isDragging = false,
  review_startX,
  review_startScrollLeft,
  review_timeoutId;

// Calculate the number of cards per view
let reviewCardPreview = Math.round(
  reviewCarousel.outerWidth(true) / reviewFirstCard
);

// Prepend and append cards for infinite scrolling effect
reviewCarouselChildren
  .slice(-reviewCardPreview)
  .reverse()
  .forEach(function (card) {
    reviewCarousel.prepend($(card).prop("outerHTML"));
  });

reviewCarouselChildren.slice(0, reviewCardPreview).forEach(function (card) {
  reviewCarousel.append($(card).prop("outerHTML"));
});

// Event handlers for arrow clicks
reviewArrows.each(function () {
  $(this).on("click", function (e) {
    const arrow = $(this);
    const isLeftArrow = arrow.hasClass("left");
    const scrollAmount = isLeftArrow ? -reviewFirstCard : reviewFirstCard;

    reviewCarousel.scrollLeft(reviewCarousel.scrollLeft() + scrollAmount);
  });
});

// Functions for dragging, infinite scrolling, and auto sliding
const reviewDragStart = function (e) {
  review_isDragging = true;
  reviewCarousel.addClass("dragging");
  review_startX = e.pageX;
  review_startScrollLeft = reviewCarousel.scrollLeft();
};

const reviewDragStop = function () {
  review_isDragging = false;
  reviewCarousel.removeClass("dragging");
};

const reviewDragging = function (e) {
  if (!review_isDragging) return;
  reviewCarousel.scrollLeft(review_startScrollLeft - (e.pageX - review_startX));
};

const reviewInfiniteScroll = function () {
  const reviewCarouselScrollLeft = reviewCarousel.scrollLeft();
  const reviewCarouselScrollWidth = reviewCarousel[0].scrollWidth;
  const reviewCarouselWidth = reviewCarousel.outerWidth();

  if (reviewCarouselScrollLeft === 0) {
    reviewCarousel.addClass("no-transition");
    reviewCarousel.scrollLeft(
      reviewCarouselScrollWidth - 2 * reviewCarouselWidth
    );
    reviewCarousel.removeClass("no-transition");
  } else if (
    reviewCarouselScrollLeft ===
    Math.floor(reviewCarouselScrollWidth - reviewCarouselWidth)
  ) {
    reviewCarousel.addClass("no-transition");
    reviewCarousel.scrollLeft(reviewCarouselWidth);
    reviewCarousel.removeClass("no-transition");
  }

  clearTimeout(review_timeoutId);
  if (!reviewCarousel.is(":hover")) {
    autoSlide();
  }
};

const reviewAutoSlide = () => {
  if ($(window).innerWidth() < 800) return;
  review_timeoutId = setTimeout(
    () =>
      reviewCarousel.scrollLeft(reviewCarousel.scrollLeft() + reviewFirstCard),
    3500
  );
};

// Initial auto slide
reviewAutoSlide();

// Attach event handlers for dragging and resizing
reviewCarousel.on("mousemove", reviewDragging);
$(document).on("mouseup", reviewDragStop);
reviewCarousel.on("mousedown", reviewDragStart);
reviewCarousel.on("scroll", reviewInfiniteScroll);
reviewCarousel.on("mouseenter", () => clearTimeout(review_timeoutId));
reviewCarousel.on("mouseleave", reviewAutoSlide);
