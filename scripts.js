
// Load flights from json file
let flights = [];
let renderedFlights = [];
let cityAirportSuggestions = new Set();       // for suggestion in searh bar
const numRandomFlights = 13;                  // for initial rendering

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

      // console.log(cityAirportSuggestions)
      randomFlights = getRandomFlights(numRandomFlights)
      renderedFlights = randomFlights
      // console.log(randomFlights)
      renderDestinations(renderedFlights)
      setupAutocomplete("fromInput", "fromSuggestions");
      setupAutocomplete("toInput", "toSuggestions");
    })
  .catch(error => console.error("Failed to load flights data:", error));


function getRandomFlights(n = 6) {
  const shuffled = [...flights].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function loadRandomFlights() {
  const randomFlights = getRandomFlights(numRandomFlights);
  renderedFlights = randomFlights;
  renderDestinations(renderedFlights);
}


// ==============================
// Render Destination Cards
// ==============================
function renderDestinations(flights) {
  const container = document.getElementById("catalog");
  const sortSelect = document.getElementById("sortOption")
  const noResult = document.getElementById("noResultsMessage")
  container.innerHTML = "";

  // do not render the sorting option if no data 
  if (flights.length === 0) {
    sortSelect.classList.add("hidden");
    noResult.classList.remove("hidden");
    return;
  } else {
    sortSelect.classList.remove("hidden");
    noResult.classList.add("hidden");
  }

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
    // console.log(val.length)

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


function extractAirportCode(inputStr) {
  const match = inputStr.match(/\(([A-Z]{3})\)/i); // match airport code like (JFK)
  return match ? match[1].toLowerCase() : null;
}


function searchFlights() {
  const fromVal = document.getElementById("fromInput").value.toLowerCase();
  const toVal = document.getElementById("toInput").value.toLowerCase();
  const selectedClass = document.getElementById("flightClass").value.toLowerCase();

  if (fromVal.trim() === "" && toVal.trim() === "") {
    alert("Please enter valid city names or airport codes from the suggestions.");
    return;
  }

  fromCode = extractAirportCode(fromVal);
  toCode = extractAirportCode(toVal);

  // .filter(callback() {
  //    true to keep element
  //    false to exclude element
  // })

  const results = flights.filter(flight => {
    const matchesDepartures = flight.departureAirportCode.toLowerCase().includes(fromCode);
    const matchesDestinations = flight.destinationAirportCode.toLowerCase().includes(toCode);
    const matchesClass = selectedClass === "" | selectedClass === flight.flightClass.toLowerCase();

    return matchesDepartures && matchesDestinations && matchesClass;
  });

  renderedFlights = results;
  renderDestinations(renderedFlights);
}


// sort the renderedFlights based on user choice
function sortFlights() {
  if (renderedFlights.length === 0) {
    return;
  }

  // make a copy of renderedFlights
  let sortedFlights = [...renderedFlights];
  const sortOption = document.getElementById("sortOption").value;
  switch (sortOption) {
    case "points-asc":
      sortedFlights.sort((a, b) => a.points - b.points);
      break;
    case "points-desc":
      sortedFlights.sort((a, b) => b.points - a.points);
      break;
    case "usd-asc":
      sortedFlights.sort((a, b) => a.inUSD - b.inUSD);
      break;
    case "usd-desc":
      sortedFlights.sort((a, b) => b.inUSD - a.inUSD);
      break;
    default:
      return
  };
  renderDestinations(sortedFlights);
}
