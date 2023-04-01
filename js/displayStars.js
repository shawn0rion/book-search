// js/displayStars.js
export function styleStars(rating) {
  // Get the stars container element
  const starsContainer = document.getElementById("stars-container");

  // Create an array of Font Awesome star elements
  const stars = [
    document.createElement("i"),
    document.createElement("i"),
    document.createElement("i"),
    document.createElement("i"),
    document.createElement("i"),
  ];

  // Add classes to the stars
  stars.forEach((star) => {
    star.classList.add("fas", "fa-star");
  });

  // Add the stars to the stars container element
  stars.forEach((star) => starsContainer.appendChild(star));

  // Set the color of the stars based on the rating
  for (let i = 0; i < stars.length; i++) {
    if (rating >= i + 0.75) {
      stars[i].style.color = "gold";
    } else if (rating >= i + 0.25) {
      stars[i].classList.remove("fa-star");
      stars[i].classList.add("fa-star-half-alt");
      stars[i].style.color = "gold";
    } else {
      stars[i].style.color = "gray";
    }
  }
}
