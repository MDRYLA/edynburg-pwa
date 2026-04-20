import type { Restaurant } from "@/types";

export const restaurants: Restaurant[] = [
  {
    id: "oink",
    name: "Oink Victoria Street",
    type: "street-food",
    price: "£",
    priceRange: "£6–10",
    speed: "5–10 min",
    specialty: "Hog roast sandwich",
    recommendation: "Grunter size z apple sauce i haggis",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJuVVt8prHh0gRT8QqY0FF3nM",
    address: "34 Victoria St, Edinburgh EH1 2JW",
    description:
      "Kultowy street food. Kanapka z pieczoną świnią krojoną na miejscu przy Was. Trzy rozmiary: oink (mała), grunter (średnia), oinker (duża). Jecie na stojąco na ulicy albo idziecie z nią dalej. Pierwsza opcja jeśli chcecie jak najwięcej czasu na miasto i jak najmniej przy stole. Pokazani w programie Phila Rosenthala na Netflix.",
  },
  {
    id: "berties",
    name: "Bertie's Proper Fish & Chips",
    type: "sit-down",
    price: "££",
    priceRange: "£13–17",
    speed: "30–40 min",
    specialty: "Fish and chips",
    recommendation: "Classic Haddock Supper",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJleTcv9THh0gRVa_dxJWO7oM",
    address: "9 Victoria St, Edinburgh EH1 2HE",
    description:
      'Nagradzane fish & chips w klimatycznym wnętrzu stylizowanym na stary kiosk. Duża przestrzeń, nie trzeba rezerwować nawet w szczycie lunchowym. Klasyczne "supper" to plamiak (haddock) w cieście z frytkami, mushy peas i sosem tartarskim. Uwaga: doliczają 10% service charge — pamiętajcie przy planowaniu napiwku.',
  },
  {
    id: "scotts-kitchen",
    name: "Scotts Kitchen",
    type: "cafe",
    price: "££",
    priceRange: "£12–16",
    speed: "30–40 min",
    specialty: "Scottish classics",
    recommendation: "Haggis, Neeps & Tatties",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJHc117ZrHh0gR12EGsarHIBg",
    address: "4-6 Victoria Terrace, Edinburgh EH1 2JL",
    description:
      "Kawiarnia-restauracja kilka schodków nad Victoria Street (Victoria Terrace). Otwarta od 9:00 do 17:00, więc idealnie trafia w godziny lunchu. Serwują tradycyjne szkockie dania: haggis z puree brukwiowo-ziemniaczanym (neeps & tatties), scotch eggs, cullen skink. Taras widokowy na Grassmarket to bonus. Ceny turystyczne, ale jedzenie rzetelne.",
  },
];

export const recommendedRestaurant = "berties";
