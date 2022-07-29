import { getNextSlide, getPrevSlide, getSlideActiveDot } from "../js/script.js";

function Slider(container) {
  this.container = document.querySelector(container);
  this.slides = Array.from(this.container.querySelectorAll(".slide__item"));
  this.nextButton = this.container.querySelector(".next");
  this.prevButton = this.container.querySelector(".prev");
  this.dotNode = this.container.querySelector(".dots");
  let timeOutId;
  let that = this;

  function getElementNextOrPrev() {
    const activeSlide = that.container.querySelector(".slide__item.active");
    const activeIndex = that.slides.indexOf(activeSlide);
    let next, prev;

    if (activeIndex === that.slides.length - 1) {
      next = that.slides[0];
    } else {
      next = that.slides[activeIndex + 1];
    }

    if (activeIndex === 0) {
      prev = that.slides[that.slides.length - 1];
    } else {
      prev = that.slides[activeIndex - 1];
    }
    return [next, prev];
  }

  function getPosition() {
    const activeSlide = that.container.querySelector(".slide__item.active");
    const activeIndex = that.slides.indexOf(activeSlide);

    const [next, prev] = getElementNextOrPrev();

    that.slides.forEach((slide, index) => {
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

  function getNextSlide() {
    clearTimeout(timeOutId);
    const current = that.container.querySelector(".slide__item.active");
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

  function getPrevSlide() {
    clearTimeout(timeOutId);
    const current = that.container.querySelector(".slide__item.active");
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

  function getActiveDot() {
    const allDots = that.container.querySelectorAll(".dots .dot");
    const activeSlide = that.container.querySelector(".slide__item.active");
    const activeIndex = that.slides.indexOf(activeSlide);
    allDots.forEach((dot) => {
      dot.classList.remove("active");
    });
    allDots[activeIndex].classList.add("active");
  }

  this.getSlideActiveDot = () => {
    const allDots = that.container.querySelectorAll(".dots .dot");
    allDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        getDotSlide(index);
      });
    });
  };

  function getDotSlide(index) {
    clearTimeout(timeOutId);
    that.slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    that.slides[index].classList.add("active");
    getPosition();
    getActiveDot();
  }

  function autoLoopSlider() {
    timeOutId = setTimeout(() => {
      getNextSlide();
    }, 5000);
  }

  // this.buttons.forEach((button) => {
  //   button.addEventListener("click", () => {
  //     if (button.classList.contains("next")) getNextSlide();
  //     else if (button.classList.contains("prev")) getPrevSlide();
  //   });
  // });

  this.nextButton.onclick = () => getNextSlide();
  this.prevButton.onclick = () => getPrevSlide();

  this.slides.forEach((slide) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    this.dotNode.appendChild(dot);
  });
}

const slideList = ["#slider-1", "#slider-2"];
slideList.forEach((slideItem) => {
  const slide = new Slider(slideItem);
  slide.getSlideActiveDot();
});
