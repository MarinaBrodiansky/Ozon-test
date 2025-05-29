class Progress {
  constructor(options) {
    this.progressBlock = options.progressBlock;
    this.valueInput = options.valueInput;
    this.animateToggle = options.animateToggle;
    this.hideToggle = options.hideToggle;

    this.fgCircle = this.progressBlock.querySelector(".fg");

    this.init();
  }

  init() {
    const initialValue = parseInt(this.valueInput.value) || 0;
    this.updateProgress(initialValue);

    this.valueInput.addEventListener("input", this.handleValueInput.bind(this));
    this.animateToggle.addEventListener("change", this.handleAnimateChange.bind(this));
    this.hideToggle.addEventListener("change", this.handleHideChange.bind(this));
  }

  updateProgress(value) {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (value / 100) * circumference;
    this.fgCircle.style.strokeDashoffset = `${offset}`;
  }

  handleValueInput(e) {
    let value = parseInt(e.target.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    e.target.value = value;
    this.updateProgress(value);
  }

  handleAnimateChange(e) {
    if (e.target.checked) {
      this.progressBlock.classList.add("animated");
    } else {
      this.progressBlock.classList.remove("animated");
    }
  }

  handleHideChange(e) {
    if (e.target.checked) {
      this.progressBlock.classList.add("hidden");
    } else {
      this.progressBlock.classList.remove("hidden");
    }
  }  
}

document.addEventListener("DOMContentLoaded", () => {
  new Progress({
    progressBlock: document.getElementById("progressBlock"),
    valueInput: document.getElementById("progressValue"),
    animateToggle: document.getElementById("animateToggle"),
    hideToggle: document.getElementById("hideToggle")
  });
});