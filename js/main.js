// js/main.js
import { styleStars } from "./displayStars.js";

document.addEventListener("DOMContentLoaded", () => {
  const bookNameRef = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-button");
  const result = document.getElementById("result");

  searchBtn.addEventListener("click", getBook);
  bookNameRef.value = "The Fountainhead";
  getBook();

  async function getBook() {
    let bookName = bookNameRef.value;
    let url = `https://openlibrary.org/search.json?title=${bookName}`;

    if (bookName.length <= 0) {
      result.innerHTML = `<h3 class="msg">Please enter a book title</h3>`;
    } else {
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        if (data.numFound > 0) {
          let item = data.docs[0];
          let olid = item.key.replace("/works/", "");
          let img = getImg(item, olid);
          let author = item.author_name
            ? item.author_name.join(", ")
            : "No authors available";
          // Extract book information
          const { first_publish_year, first_sentence, number_of_pages_median } =
            item;
          // Display book information
          console.log(item);
          result.innerHTML = `
            <div class="info">
                <img src="${img}">
                <div>
                <h2>${item.title}</h2>
                <div class="rating">
                    <div id="stars-container"></div>
                    <h4>${item.ratings_average.toFixed(1) || "N/A"}</h4>
                </div>
                <div class="pair">
                    <h3>Author(s):</h3>
                    <p>${author}</p>
                </div>
                <div class="pair">
                    <h3>First sentence: </h3>
                    <p>"${first_sentence ? first_sentence[0] : ""}"</p>
                </div>
                <div class="pair">
                    <h4>First published:</h4>
                    <p>${first_publish_year}</p>
                </div>
                <div class="pair">
                    <h4>Page count:</h4>
                    <p>${number_of_pages_median}</p>
                </div>
                <div class="pair">
                    <h4>Open Library ID:</h4>
                    <p>${olid}</p>
                </div>
                </div>
            </div>`;

          // Extract book popularity information
          const {
            want_to_read_count,
            currently_reading_count,
            ratings_average,
            already_read_count,
            ratings_count,
          } = item;

          // Display user data
          const userData = `
          <div class="user-data">
          <span>${ratings_average.toFixed(
            1
          )} ⭐️ (${ratings_count} ratings)</span> &middot;
          <span>Want to read: ${want_to_read_count}</span> &middot;
          <span>Currently reading: ${currently_reading_count}</span> &middot;
          <span>Have read: ${already_read_count}</span>
          </div>`;
          result.insertAdjacentHTML("beforeend", userData);
          // Display stars
          styleStars(item.ratings_average.toFixed(2) || 0);
        } else {
          result.innerHTML = `<h3 class="msg">No books found</h3>`;
        }
      } catch (error) {
        console.error(error);
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      }
    }
  }
});

function getImg(item, olid) {
  const coverId = item.cover_i;
  const coverEditionKey = item.cover_edition_key;
  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  } else if (coverEditionKey) {
    return `https://covers.openlibrary.org/b/${olid}/${coverEditionKey}-L.jpg`;
  } else {
    console.log("Cover not available.");
  }
}
