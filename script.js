document.addEventListener("DOMContentLoaded", () => {
  const bookNameRef = document.getElementById("bookName");
  const searchBtn = document.getElementById("searchBtn");
  const result = document.getElementById("result");

  searchBtn.addEventListener("click", getBook);

  function getBook() {
    let bookName = bookNameRef.value;
    let url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`;

    if (bookName.length <= 0) {
      result.innerHTML = `<h3 class="msg">Please enter a book title</h3>`;
    } else {
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          if (data.totalItems > 0) {
            let item = data.items[0].volumeInfo;
            result.innerHTML = `
              <div class="info">
                <img src=${item.imageLinks.thumbnail} class="poster">
                <div>
                  <h2>${item.title}</h2>
                  <div class="rating">
                    <div id="stars-container"></div>
                    <h4>${item.averageRating || "N/A"}</h4>
                  </div>
                  <div class="details">
                    <span>Published: ${item.publishedDate}</span>
                  </div>
                  <div class="genre">
                    <div>${
                      item.categories
                        ? item.categories.join("</div><div>")
                        : "No categories available"
                    }</div>
                  </div>
                </div>
              </div>
              <h3>Description:</h3>
              <p>${item.description || "No description available"}</p>
              <h3>Author(s):</h3>
              <p>${
                item.authors ? item.authors.join(", ") : "No authors available"
              }</p>
              <h3>Google Books Volume ID:</h3>
                <p>${data.items[0].id}</p>
                <h3>Reviews:</h3>
                <div class="reviews">
                  <button class="prev-review">&#8249;</button>
                  <div class="review-slides"></div>
                  <button class="next-review">&#8250;</button>
                </div>`;
            styleStars(item.averageRating || 0);
            displayReviews(data.items[0].id);
          } else {
            result.innerHTML = `<h3 class="msg">No books found</h3>`;
          }
        })
        .catch(() => {
          result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
    }
  }
});

function styleStars(rating) {
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
