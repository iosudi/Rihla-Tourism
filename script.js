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

const rihlaInfo = $(".rihla-info");

// const postsContent = $(".posts-content");

// var rihlaInfoOffsetTop = rihlaInfo.offset().top;

// let rihlaInfoHeight = rihlaInfo.height();

// let postsContentOffsetTop = postsContent.offset().top;

// $(window).scroll(function () {
//   let scrollPosition = $(window).scrollTop();

//   let rihlaInfoBottom = rihlaInfoOffsetTop + rihlaInfoHeight;

//   let postsContentBottom = postsContentOffsetTop + postsContent.height();

//   if (
//     scrollPosition >= rihlaInfoOffsetTop &&
//     scrollPosition < postsContentBottom - rihlaInfoHeight
//   ) {
//     var topValue = scrollPosition - rihlaInfoOffsetTop;
//     rihlaInfo.css({ position: "relative", top: topValue + 70 + "px" });
//   } else if (scrollPosition >= postsContentBottom - rihlaInfoHeight) {
//     rihlaInfo.css({
//       position: "relative",
//       top:
//         postsContentBottom - rihlaInfoHeight - rihlaInfoOffsetTop - 70 + "px",
//     });
//   } else {
//     rihlaInfo.css({ position: "relative", top: "0" });
//   }
// });

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

// increase numbers animation

// let nums = $(".counter-section .nums");
// let counterSection = $(".counter-section");
// let started = false;

// function startCounter(el, start, goal) {
//   let count = start;
//   let duration = 2500 / goal;
//   let counter = setInterval(() => {
//     $(el).text(++count);

//     if (count == goal) {
//       clearInterval(counter);
//     }
//   }, duration);
// }

// $(window).scroll(function () {
//   let windowBottom = $(window).scrollTop() + $(window).height();
//   let sectionTop = counterSection.offset().top;

//   if (windowBottom >= sectionTop && !started) {
//     nums.each(function (index, element) {
//       let start = $(element).data("start") || 0;
//       let goal = $(element).data("goal");
//       startCounter(element, start, goal);
//     });

//     started = true;
//   }
// });

// handle class selection

// Function to update values based on traveler selection

// When the element with class 'select' is clicked, toggle the 'active' class for 'selectWindow'
$(
  ".land .container .content .booking-box .booking-control .booking-info .trip-control .traveler-class .select"
).on("click", function () {
  $(
    ".land .container .content .booking-box .booking-control .booking-info .trip-control .traveler-class .selectWindow"
  ).toggleClass("active");
});

// When the 'موافق' button is clicked, close the selectWindow
$(".selectWindow button").on("click", function () {
  $(".selectWindow").removeClass("active");
});

function updateValues(context) {
  var sum = 0;

  // Loop through all "fieldSet" select elements in the specified context
  $("." + context + " .fieldSet select").each(function () {
    sum += parseInt($(this).val(), 10) || 0; // Parse as integer, default to 0 if NaN
  });

  // Set the sum in the main select div in the specified context
  $("." + context + " .counter .numberOfTravllers").text(sum);

  // Update the text based on the sum in the specified context
  if (sum >= 3 && sum < 10) {
    $("." + context + " .counter .name").text("مسافرين");
  } else {
    $("." + context + " .counter .name").text("مسافر");
  }

  // Set the value of "classSelect" in the main span in the specified context
  var classSelectValue = $("." + context + " .selectClass select").val();
  $("." + context + " .traveler-class .class span").html(classSelectValue);
}

// Function to show/hide oneWay div
function showHideOneWay() {
  $(".option-oneWay").show();
  $(".option-roundtrip").hide();
  $(".option-multicity").hide();

  // Call updateValues function for oneWay
  updateValues("option-oneWay");

  // Remove the "active" class from the select window
  $(".selectWindow").removeClass("active");
}

// Function to show/hide roundtrip div
function showHideRoundTrip() {
  $(".option-oneWay").hide();
  $(".option-roundtrip").show();
  $(".option-multicity").hide();

  // Call updateValues function for roundtrip
  updateValues("option-roundtrip");

  // Remove the "active" class from the select window
  $(".selectWindow").removeClass("active");
}
function showHideMultiCity() {
  $(".option-oneWay").hide();
  $(".option-roundtrip").hide();
  $(".option-multicity").show();

  // Call updateValues function for roundtrip
  updateValues("option-roundtrip");

  // Remove the "active" class from the select window
  $(".selectWindow").removeClass("active");
}

// Function to show/hide divs based on selected option
function showHideDivs() {
  var selectedOption = $("input[name='radio-group']:checked").attr("id");

  if (selectedOption === "radio2") {
    showHideRoundTrip();
  } else if (selectedOption === "radio3") {
    showHideMultiCity();
  } else {
    showHideOneWay();
  }
}

// Attach the showHideDivs function to the change event of radio buttons
$(".trip-options input[type='radio']").on("change", showHideDivs);

// Attach the updateValues function to the change event of traveler selects
$(".fieldSet select, .selectClass select").on("change", function () {
  // Determine the context based on the visibility of the divs
  var context;
  if ($(".option-oneWay").is(":visible")) {
    context = "option-oneWay";
  } else if ($(".option-roundtrip").is(":visible")) {
    context = "option-roundtrip";
  } else if ($(".option-multicity").is(":visible")) {
    context = "option-multicity";
  }

  updateValues(context);
});

// Initial update
updateValues("option-oneWay"); // or "option-roundtrip" based on your default visibility
showHideDivs();

// Initial row count
var rowCount = 1; // Updated initial count

// Function to add a new row
function addRow() {
  if (rowCount < 6) {
    var newRow = $(".trip-control.option-multicity .row:first").clone();
    rowCount++;
    $(".trip-control.option-multicity .data-row").append(newRow);
    newRow.show(); // Show the newly added row

    // Remove any existing "Remove Next to Last Row" button
    $(".trip-control.option-multicity .removeNextToLastRow").remove();

    // Create the remove button and append it to the new row
    var removeButton = $("<button>")
      .html("<i class='fa-solid fa-x'></i>")
      .addClass("removeNextToLastRow")
      .attr("id", "removeNextToLastRow");
    newRow.append(removeButton);

    updateRemoveButtonVisibility(); // Update the visibility of the remove button
    // Adjustments for the styling of the added row (if needed)
  } else {
    alert("You can't add up to 6 rows.");
  }
}

// Function to remove the row next to the last row
function removeRowRemover() {
  if (rowCount > 3) {
    // Ensure there are at least 3 rows
    $(".trip-control.option-multicity .row:nth-last-child(3)").remove();
    rowCount--;
    updateRemoveButtonVisibility();
  }
}

// Function to update the visibility and position of the remove button
function updateRemoveButtonVisibility() {
  if (rowCount > 3) {
    // Show the button and move it to the last row
    $(".trip-control.option-multicity .removeNextToLastRow").show();
    $(".trip-control.option-multicity .row:first").append(
      $(".removeNextToLastRow")
    );
  } else {
    // Hide the button
    $(".trip-control.option-multicity .removeNextToLastRow").hide();
  }
}

for (var i = 0; i < 2; i++) {
  addRow();
}

// Event listener for the "Add Row" button
$(".trip-control.option-multicity").on("click", ".addRowButton", function () {
  addRow();
});

// Event listener for the "Remove Next to Last Row" button
$(".trip-control.option-multicity").on(
  "click",
  ".removeNextToLastRow",
  function () {
    removeRowRemover();
    updateRemoveButtonVisibility();
  }
);

// Initial update of the remove button visibility
updateRemoveButtonVisibility();
