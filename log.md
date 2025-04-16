


# Using a Compare Function
The compare function takes two arguments (a and b) and should return:

* A negative value if a should come before b
* A positive value if a should come after b
* Zero if they are equal


```javascript
const products = [
  { name: "Laptop", price: 1200 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 500 }
];

// Sort by price (low to high)
products.sort((a, b) => a.price - b.price);
console.log(products);
/* Output:
[
  { name: "Tablet", price: 500 },
  { name: "Phone", price: 800 },
  { name: "Laptop", price: 1200 }
]

```


more-data
[
  {
    "destinationCity": "Helsinki",
    "destinationCountry": "Finland",
    "destinationAirportCode": "HEL",
    "departureCity": "Chicago",
    "departureCountry": "USA",
    "departureAirportCode": "ORD",
    "flightClass": "Economy",
    "points": 47000,
    "inUSD": 530,
    "lastUpdated": 1,
    "image": "images/helsinki.webp"
  },
  {
    "destinationCity": "Auckland",
    "destinationCountry": "New Zealand",
    "destinationAirportCode": "AKL",
    "departureCity": "Los Angeles",
    "departureCountry": "USA",
    "departureAirportCode": "LAX",
    "flightClass": "Business",
    "points": 96000,
    "inUSD": 1500,
    "lastUpdated": 2,
    "image": "images/auckland.webp"
  },
  {
    "destinationCity": "Buenos Aires",
    "destinationCountry": "Argentina",
    "destinationAirportCode": "EZE",
    "departureCity": "New York",
    "departureCountry": "USA",
    "departureAirportCode": "JFK",
    "flightClass": "First",
    "points": 210000,
    "inUSD": 5200,
    "lastUpdated": 3,
    "image": "images/buenosaires.webp"
  },
  {
    "destinationCity": "Oslo",
    "destinationCountry": "Norway",
    "destinationAirportCode": "OSL",
    "departureCity": "Seattle",
    "departureCountry": "USA",
    "departureAirportCode": "SEA",
    "flightClass": "Economy",
    "points": 44000,
    "inUSD": 480,
    "lastUpdated": 4,
    "image": "images/oslo.webp"
  },
  {
    "destinationCity": "Doha",
    "destinationCountry": "Qatar",
    "destinationAirportCode": "DOH",
    "departureCity": "Miami",
    "departureCountry": "USA",
    "departureAirportCode": "MIA",
    "flightClass": "First",
    "points": 225000,
    "inUSD": 5700,
    "lastUpdated": 0,
    "image": "images/doha.webp"
  },
  {
    "destinationCity": "Cape Town",
    "destinationCountry": "South Africa",
    "destinationAirportCode": "CPT",
    "departureCity": "Washington D.C.",
    "departureCountry": "USA",
    "departureAirportCode": "IAD",
    "flightClass": "Business",
    "points": 94000,
    "inUSD": 1400,
    "lastUpdated": 2,
    "image": "images/capetown.webp"
  },
  {
    "destinationCity": "Vienna",
    "destinationCountry": "Austria",
    "destinationAirportCode": "VIE",
    "departureCity": "Atlanta",
    "departureCountry": "USA",
    "departureAirportCode": "ATL",
    "flightClass": "Economy",
    "points": 43000,
    "inUSD": 490,
    "lastUpdated": 3,
    "image": "images/vienna.webp"
  },
  {
    "destinationCity": "Hong Kong",
    "destinationCountry": "China",
    "destinationAirportCode": "HKG",
    "departureCity": "San Francisco",
    "departureCountry": "USA",
    "departureAirportCode": "SFO",
    "flightClass": "Business",
    "points": 88000,
    "inUSD": 1350,
    "lastUpdated": 4,
    "image": "images/hongkong.webp"
  },
  {
    "destinationCity": "New Delhi",
    "destinationCountry": "India",
    "destinationAirportCode": "DEL",
    "departureCity": "Chicago",
    "departureCountry": "USA",
    "departureAirportCode": "ORD",
    "flightClass": "First",
    "points": 218000,
    "inUSD": 5500,
    "lastUpdated": 1,
    "image": "images/newdelhi.webp"
  },
  {
    "destinationCity": "Reykjavik",
    "destinationCountry": "Iceland",
    "destinationAirportCode": "KEF",
    "departureCity": "Boston",
    "departureCountry": "USA",
    "departureAirportCode": "BOS",
    "flightClass": "Economy",
    "points": 32000,
    "inUSD": 410,
    "lastUpdated": 5,
    "image": "images/reykjavik.webp"
  }
]
