const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const slides = Array.from($$(".slider-1 .slide"));
const buttons = $$(".buttons div");
const dotNode = $(".dots");
let timeOutId;

export function getElementNextOrPrev() {
  const activeSlide = $(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  let next, prev;

  if (activeIndex === slides.length - 1) {
    next = slides[0];
  } else {
    next = slides[activeIndex + 1];
  }

  if (activeIndex === 0) {
    prev = slides[slides.length - 1];
  } else {
    prev = slides[activeIndex - 1];
  }

  return [next, prev];
}

export function getPosition() {
  const activeSlide = $(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);

  const [next, prev] = getElementNextOrPrev();

  slides.forEach((slide, index) => {
    if (index === activeIndex) {
      slide.style.transform = "translateX(0)";
    } else if (slide === prev) {
      slide.style.transform = "translateX(-100%)";
    } else if (slide === next) {
      slide.style.transform = "translateX(100%)";
    } else {
      slide.style.transform = "translateX(100%)";
    }

    slide.addEventListener("transitionend", () => {
      slide.classList.remove("top");
    });
  });
}

//*-----------------
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     if (button.classList.contains("next")) getNextSlide();
//     else if (button.classList.contains("prev")) getPrevSlide();
//   });
// });

export function getNextSlide() {
  clearTimeout(timeOutId);
  const current = $(".slide.active");
  const [next, prev] = getElementNextOrPrev();

  if (current.classList.contains("top")) {
    return;
  }
  current.classList.add("top");
  next.classList.add("top");

  current.classList.remove("active");
  current.style.transform = "translateX(-100%)";
  next.classList.add("active");
  next.style.transform = "translateX(0)";

  getPosition();
  getActiveDot();
  autoLoopSlider();
}

export function getPrevSlide() {
  clearTimeout(timeOutId);
  const current = $(".slide.active");
  const [next, prev] = getElementNextOrPrev();
  if (current.classList.contains("top")) {
    return;
  }
  current.classList.add("top");
  prev.classList.add("top");
  current.classList.remove("active");
  current.style.transform = "translateX(100%)";
  prev.classList.add("active");
  prev.style.transform = "translateX(0)";
  getPosition();
  getActiveDot();
  autoLoopSlider();
}

/*---------------------------------------------*/
//Dots function
//*--------------------
// slides.forEach((slide) => {
//   const dot = document.createElement("div");
//   dot.classList.add("dot");
//   dotNode.appendChild(dot);
// });

export function getActiveDot() {
  const allDots = $$(".dots .dot");
  const activeSlide = $(".slide.active");
  const activeIndex = slides.indexOf(activeSlide);
  allDots.forEach((dot) => {
    dot.classList.remove("active");
  });
  allDots[activeIndex].classList.add("active");
}

export function getSlideActiveDot() {
  const allDots = $$(".dots .dot");
  allDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      getDotSlide(index);
    });
  });
}

export function getDotSlide(index) {
  clearTimeout(timeOutId);
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
  getPosition();
  getActiveDot();
}

//*-----------------
// getSlideActiveDot();

/*-------------------------------------*/
//Auto loop slider

export function autoLoopSlider() {
  timeOutId = setTimeout(() => {
    getNextSlide();
  }, 5000);
}
