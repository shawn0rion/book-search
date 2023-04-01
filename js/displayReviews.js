// js/displayReviews.js
export function displayReviews(olid) {
  console.log(olid);
  let reviewUrl = `https://openlibrary.org/api/works/${olid}/reviews.json`;
  console.log(reviewUrl);
  fetch(reviewUrl)
    .then((resp) => resp.json())
    .then((reviews) => {
      if (reviews.length > 0) {
        const reviewSlides = document.querySelector(".review-slides");
        reviews.forEach((review, index) => {
          const slide = document.createElement("div");
          slide.classList.add("slide");
          if (index === 0) slide.classList.add("active");
          slide.innerHTML = `
            <h4>${review.user}</h4>
            <p>${review.text}</p>
            <p>Rating: ${review.rating}</p>`;
          reviewSlides.appendChild(slide);
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });

  setupReviewSlider();
}

function setupReviewSlider() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const prevButton = document.querySelector(".prev-review");
  const nextButton = document.querySelector(".next-review");

  if (slides.length <= 1) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  }

  prevButton.addEventListener("click", () => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
  });

  nextButton.addEventListener("click", () => {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  });
}
