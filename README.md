# ✈️ Snap the World – Flight Catalog Website

Snap the World, a simple flight catalog website designed to help travelers (especially points and miles enthusiasts) discover flight options between major global cities. This project was built as part of the Snap Academies program to learn core web development skills (html, css, javascript) and some basic data structures.


> ⚠️ Note: This dataset is for demo purposes only — it’s not real-time, not complete, and may include inaccurate data. Please don’t use it to book actual flights 😅.

> ✈️ For a better experience testing the search, filter, and sort features, try flights between San Francisco (SFO) and Los Angeles (LAX) — in either direction. These routes have been populated with a variety of classes and prices to showcase the full functionality of the site.

---

## Demo

[![Demo Video](https://img.youtube.com/vi/p8usaVEAqx0/0.jpg)]([https://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID](https://youtu.be/p8usaVEAqx0))


---


## Features

* Search Flights by:
   * Departure city or airport code
   * Destination city or airport code
   * Flight class (All, Economy, Business, First)

* Sort Flights by:
   * Points required (ascending / descending)
   * Price in USD (ascending / descending)

* Autocomplete Suggestions
   * Built using a Set data structure for efficient lookups and fast filtering.
   * Suggests cities and airport codes while typing.

* Dynamic Rendering
   * Flights are loaded dynamically from a JSON file.
   * Rendered as card-style layouts using vanilla JavaScript and DOM manipulation.

* Random Explorer Mode
   * Click "Snap the World ✈️" or "Wanna Explore 🌎 ?" to load a random set of flights.

---

## Dataset Overview

Example entry from `flights.json`:

```json
{
  "destinationCity": "Tokyo",
  "destinationCountry": "Japan",
  "destinationAirportCode": "NRT",
  "departureCity": "San Francisco",
  "departureCountry": "USA",
  "departureAirportCode": "SFO",
  "flightClass": "Economy",
  "points": 35000,
  "inUSD": 420,
  "lastUpdated": 5,
  "image": "images/tokyo.webp"
}
```

---

## Acknowledgments
* Snap Academies – for providing the guidance, community, and resources to build this project.
* Unsplash – for the royalty-free images.
* Friends who provided feedback and helped test the site.
