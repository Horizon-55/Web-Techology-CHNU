document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".slider-image");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.style.display = i === index ? "block" : "none";
    });
  }

  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });

  // Initialize
  showImage(currentIndex);
});
