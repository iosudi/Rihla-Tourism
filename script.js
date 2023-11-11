var prevScrollPos = $(window).scrollTop();

$(window).scroll(function () {
  var currentScrollPos = $(window).scrollTop();
  var header = $("header");

  if (prevScrollPos > currentScrollPos) {
    header.removeClass("header-hidden");
    header.addClass("header-on");
  } else {
    header.addClass("header-hidden");
    header.removeClass("header-on");
  }

  if (window.scrollY > 0) {
    header.addClass("header-bg"); // Add the class to hide and change background
  } else {
    header.removeClass("header-bg"); // Remove the class to show and restore background
  }

  prevScrollPos = currentScrollPos;
});
/*
const carousel = $(".trips-recommendation .trips-carousel");
const arrows = $(".trips-recommendation .arrow");
const firstCard = $(".trips-recommendation .activity").outerWidth();
const carouselChildren = carousel.children().toArray();

let cardPerView = Math.round(carousel.outerWidth(true) / firstCard);

let isDragging = false,
  startX,
  startScrollLeft;

const dragStart = (e) => {
  isDragging = true;
  carousel.addClass("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft();
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft(startScrollLeft - (e.pageX - startX));
};

const dragStop = () => {
  isDragging = false;
  carousel.removeClass("dragging");
};

arrows.each(function () {
  // Bind a click event handler to each arrow element
  $(this).on("click", function (e) {
    const arrow = $(this);
    const isLeftArrow = arrow.hasClass("left");
    const scrollAmount = isLeftArrow ? -firstCard : firstCard;

    // Adjust the scrollLeft property of the carousel element
    carousel.scrollLeft(carousel.scrollLeft() + scrollAmount);
  });
});

// Prepend cards at the beginning and append cards at the end of the carousel
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach(function (activity) {
    carousel.prepend($(activity).prop("outerHTML"));
  });

carouselChildren.slice(0, cardPerView).forEach(function (activity) {
  carousel.append($(activity).prop("outerHTML"));
});

const infiniteScroll = function () {
  const carousel = $(".trips-recommendation .trips-carousel");
  const carouselScrollLeft = carousel.scrollLeft();
  const carouselScrollWidth = carousel[0].scrollWidth; // Use [0] to access the native DOM element
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

autoSlide();
carousel.on("mousedown", dragStart);
carousel.on("mouseup", dragStop);
carousel.on("mouseleave", dragStop);
carousel.on("mousemove", dragging);
carousel.on("scroll", infiniteScroll);
carousel.on("mouseenter", () => clearTimeout(timeoutId));
carousel.on("mouseleave", autoSlide);*/

//footer section
$(".dropdown").click(function () {
  $(this).find(".collapse").toggleClass("expand");
});

/* carousel cards */

// Select the carousel element with the jQuery selector
const carousel = $("#posts .container .carousel");
const arrows = $("#posts .arrow");
const firstCard = $("#posts .activity").outerWidth(true);
const carouselChildren = carousel.children().toArray();

// Initialize variables to track dragging state and position
let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

let cardPerView = Math.round(carousel.outerWidth(true) / firstCard);

// Prepend cards at the beginning and append cards at the end of the carousel
carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach(function (card) {
    carousel.prepend($(card).prop("outerHTML"));
  });

carouselChildren.slice(0, cardPerView).forEach(function (card) {
  carousel.append($(card).prop("outerHTML"));
});

arrows.each(function () {
  // Bind a click event handler to each arrow element
  $(this).on("click", function (e) {
    const arrow = $(this);
    const isLeftArrow = arrow.hasClass("left");
    const scrollAmount = isLeftArrow ? -firstCard : firstCard;

    // Adjust the scrollLeft property of the carousel element
    carousel.scrollLeft(carousel.scrollLeft() + scrollAmount);
  });
});

// Function to start dragging
const dragStart = function (e) {
  isDragging = true;
  carousel.addClass("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft();
};

// Function to stop dragging
const dragStop = function () {
  isDragging = false;
  carousel.removeClass("dragging");
};

// Function to handle dragging
const dragging = function (e) {
  if (!isDragging) return; // Don't proceed if not dragging
  carousel.scrollLeft(startScrollLeft - (e.pageX - startX));
};

// Function for infinite scrolling
const infiniteScroll = function () {
  const carousel = $("#posts .container .carousel");
  const carouselScrollLeft = carousel.scrollLeft();
  const carouselScrollWidth = carousel[0].scrollWidth; // Use [0] to access the native DOM element
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

autoSlide();

// Attach event handlers
carousel.on("mousemove", dragging);
$(document).on("mouseup", dragStop);
carousel.on("mousedown", dragStart);
carousel.on("scroll", infiniteScroll);
carousel.on("mouseenter", () => clearTimeout(timeoutId));
carousel.on("mouseleave", autoSlide);
