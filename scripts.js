/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 */


// load flights from json file
let flights = [];
let cityAirportSuggestions = new Set();     // for suggestion in searh bar
const numRandomFlights = 5;                 // for initial rendering

fetch("./flights.json")
  .then(response => response.json())
  .then(
    data => {
      flights = data;
      // build suggestion set
      flights.forEach(flight => {
        cityAirportSuggestions.add(`${flight.departureCity}, ${flight.departureCountry} (${flight.departureAirportCode})`)
        cityAirportSuggestions.add(`${flight.destinationCity}, ${flight.destinationCountry} (${flight.destinationAirportCode})`)
      });

      console.log(cityAirportSuggestions)
      randomFlights = getRandomFlights(numRandomFlights)
      // console.log(randomFlights)
      renderDestinations(randomFlights)
      setupAutocomplete("fromInput", "fromSuggestions");
      setupAutocomplete("toInput", "toSuggestions");
    })
  .catch(error => console.error("Failed to load flights data:", error));


function getRandomFlights(n = 6) {
  const shuffled = [...flights].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}


// ==============================
// Render Destination Cards
// ==============================
function renderDestinations(flights) {
  const container = document.getElementById("catalog");
  container.innerHTML = "";

  flights.forEach(flight => {
    // console.log(flight);
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${flight.image}" alt="${flight.city}">
      <div class="info">
        <h3>${flight.destinationCity}, ${flight.destinationCountry}</h3>
        <p>${flight.departureCity} (${flight.departureAirportCode}) → ${flight.destinationCity} (${flight.destinationAirportCode})</p>
        <p><strong>About ${flight.points.toLocaleString()} pts</strong></p>
        <div class="tags">
          <span class="flightclass">${flight.flightClass}</span>
          <span class="days">Updated: ${flight.lastUpdated}d ago</span>
          <span class="price"> $${flight.inUSD} </span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}


// Suggestions Box for user to choose the city / airport / country
function setupAutocomplete(inputId, suggestionListId) {
  const input = document.getElementById(inputId);
  const suggestions = document.getElementById(suggestionListId);

  input.addEventListener("input", () => {
    const val = input.value.toLowerCase();
    suggestions.innerHTML = ""; // clear prev suggestions
    console.log(val.length)

    // hide the border of suggestion block when there's nothing in input box
    if (val.length === 0) {
      suggestions.style.display = "none";
      return;
    }

    const matches = [...cityAirportSuggestions].filter(city => city.toLowerCase().includes(val)).slice(0, 7);
    // console.log(matches);

    if (matches.length === 0) {
      suggestions.style.display = "none";
      return;
    }

    // manipulate DOM
    // render matches result in suggestions element
    matches.forEach(city => {
      const li = document.createElement("li");
      li.textContent = city;
      // make the list clickable and change input value
      li.addEventListener("click", () => {
        input.value = city;
        suggestions.innerHTML = "";       // clear suggestions list
        suggestions.style.display = "none";
      })
      suggestions.appendChild(li);
    });
    suggestions.style.display = "block";
  });

  // clear the suggestion list once clicked (technically 150ms after) outside
  input.addEventListener("blur", () => {
    setTimeout(() => {
      suggestions.innerHTML = "";
      suggestions.style.display = "none";
    }, 150);
  });

}













// ==============================
// Search Feature
// ==============================
document.getElementById("searchInput").addEventListener("input", function (e) {
  const term = e.target.value.toLowerCase();
  const filtered = destinations.filter(dest =>
    dest.city.toLowerCase().includes(term) ||
    dest.country.toLowerCase().includes(term)
  );
  renderDestinations(filtered);
});


// ==============================
// Sort Feature
// ==============================
function sortByPoints() {
  const sorted = [...destinations].sort((a, b) => a.points - b.points);
  renderDestinations(sorted);
}

// ==============================
// Initial Load
// ==============================
renderDestinations(destinations);










// const FRESH_PRINCE_URL =
//   "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
// const CURB_POSTER_URL =
//   "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
// const EAST_LOS_HIGH_POSTER_URL =
//   "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// // This is an array of strings (TV show titles)
// let titles = [
//   "Fresh Prince of Bel Air",
//   "Curb Your Enthusiasm",
//   "East Los High",
// ];
// // Your final submission should have much more data than this, and
// // you should use more than just an array of strings to store it all.

// // This function adds cards the page to display the data in the array
// function showCards() {
//   const cardContainer = document.getElementById("card-container");
//   cardContainer.innerHTML = "";
//   const templateCard = document.querySelector(".card");

//   for (let i = 0; i < titles.length; i++) {
//     let title = titles[i];

//     // This part of the code doesn't scale very well! After you add your
//     // own data, you'll need to do something totally different here.
//     let imageURL = "";
//     if (i == 0) {
//       imageURL = FRESH_PRINCE_URL;
//     } else if (i == 1) {
//       imageURL = CURB_POSTER_URL;
//     } else if (i == 2) {
//       imageURL = EAST_LOS_HIGH_POSTER_URL;
//     }

//     const nextCard = templateCard.cloneNode(true); // Copy the template card
//     editCardContent(nextCard, title, imageURL); // Edit title and image
//     cardContainer.appendChild(nextCard); // Add new card to the container
//   }
// }

// function editCardContent(card, newTitle, newImageURL) {
//   card.style.display = "block";

//   const cardHeader = card.querySelector("h2");
//   cardHeader.textContent = newTitle;

//   const cardImage = card.querySelector("img");
//   cardImage.src = newImageURL;
//   cardImage.alt = newTitle + " Poster";

//   // You can use console.log to help you debug!
//   // View the output by right clicking on your website,
//   // select "Inspect", then click on the "Console" tab
//   console.log("new card:", newTitle, "- html: ", card);
// }

// // This calls the addCards() function when the page is first loaded
// document.addEventListener("DOMContentLoaded", showCards);

// function quoteAlert() {
//   console.log("Button Clicked!");
//   alert(
//     "I guess I can kiss heaven goodbye, because it got to be a sin to look this good!"
//   );
// }

// function removeLastCard() {
//   titles.pop(); // Remove last item in titles array
//   showCards(); // Call showCards again to refresh
// }
