import { getNextSlide, getPrevSlide, getSlideActiveDot } from "../js/script.js";

function Slider(container) {
  this.container = document.querySelector(container);
  this.slides = Array.from(this.container.querySelectorAll(".slide"));
  this.buttons = this.container.querySelectorAll(".buttons div");
  this.dotNode = this.container.querySelector(".dots");

  this.buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("next")) getNextSlide();
      else if (button.classList.contains("prev")) getPrevSlide();
    });
  });

  this.slides.forEach((slide) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    this.dotNode.appendChild(dot);
  });

  getSlideActiveDot();
}

const slider1 = new Slider("#slider-1");
const slider2 = new Slider("#slider-2");
