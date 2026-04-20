import type { Place } from "@/types";

/**
 * UWAGA: `sections[]` dla każdej atrakcji są PUSTE.
 * Wypełnij je ręcznie po wykonaniu Deep Research wg `10-research-prompts.md`.
 * Puste sections są OK — aplikacja pokazuje wtedy placeholder z instrukcją.
 */
export const places: Record<string, Place> = {
  "edinburgh-castle": {
    slug: "edinburgh-castle",
    name: "Zamek Edynburski",
    nameEn: "Edinburgh Castle",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ98CZIJrHh0gRWApM5esemkY",
    coordinates: { lat: 55.9485947, lng: -3.1999135 },
    openingHours: "9:30 – 18:00",
    price: "£21.50 (dorosły)",
    duration: "2h zwiedzania",
    website: "https://www.edinburghcastle.scot/",
    illustration: "/svg/illustrations/castle.svg",
    sections: [],
    tips: [
      "Przyjdźcie 5 minut PO swoim slocie (14:30) — pierwsza fala już wejdzie",
      "Audioprzewodnik (~£4) jest wart ceny, szczególnie przy Honours of Scotland",
      "Najlepsze panoramy z Argyle Battery (wschodnia strona)",
      "Kamień Przeznaczenia został przeniesiony do Perth Museum w 2024 — nie ma go już w zamku",
      "Crown Room może być zamknięty (remont do kwietnia 2026) — sprawdźcie na stronie",
      "One O'Clock Gun strzela o 13:00 (wy będziecie jeszcze w katedrze)",
    ],
  },

  "calton-hill": {
    slug: "calton-hill",
    name: "Calton Hill",
    nameEn: "Calton Hill",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJmcdGbonHh0gR3WZX92S2gZE",
    coordinates: { lat: 55.9550465, lng: -3.1827409 },
    openingHours: "Otwarte 24/7",
    price: "Bezpłatne",
    duration: "60 min",
    illustration: "/svg/illustrations/calton-hill.svg",
    sections: [],
    tips: [
      "Łatwe wejście — 10 min pod górkę",
      "Najlepsze widoki: wschód (morze i Leith), południowy zachód (centrum i zamek)",
      "Nelson Monument wejście kosztuje £6 — widok ze wzgórza już jest świetny, można odpuścić",
      "Beltane Fire Festival odbywa się tu 30 kwietnia (celtyckie święto)",
      "W kwietniu może być chłodno i wietrznie — zabierzcie cieplejszą kurtkę",
    ],
  },

  "scott-monument": {
    slug: "scott-monument",
    name: "Scott Monument",
    nameEn: "Scott Monument",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ3VSVwI7Hh0gRIxcCPRiThek",
    coordinates: { lat: 55.952381, lng: -3.1932741 },
    openingHours: "10:00–12:30, 13:45–15:30 (wewnątrz)",
    price: "Bezpłatne z zewnątrz",
    duration: "20 min",
    website: "https://www.edinburghmuseums.org.uk/venue/scott-monument/",
    illustration: "/svg/illustrations/scott-monument.svg",
    sections: [],
    tips: [
      "Najlepszy kąt z Waverley Bridge (od strony wschodniej)",
      "Pomnik ma 61 metrów wysokości — największy pomnik pisarza na świecie",
      "Ciemny kolor kamienia to sadza z kominów XIX-wiecznego Edynburga, nie naturalny",
      "Wy nie wchodzicie do środka — tylko oglądacie (287 schodów, £10)",
      "Na cokole 68 rzeźb postaci z powieści Waltera Scotta",
    ],
  },

  "st-giles-cathedral": {
    slug: "st-giles-cathedral",
    name: "Katedra św. Idziego",
    nameEn: "St Giles' Cathedral",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJ_QP3T4XHh0gR8i8eVxbnJKo",
    coordinates: { lat: 55.9494837, lng: -3.1908918 },
    openingHours: "Pn-Pt 10:00–18:00, Sob 9:00–17:00, Nd 13:00–17:00",
    price: "Bezpłatne (sugerowana dotacja £10)",
    duration: "40 min",
    website: "https://stgilescathedral.org.uk/",
    illustration: "/svg/illustrations/st-giles.svg",
    sections: [],
    tips: [
      "Wstęp darmowy, ale przy wejściu sugerują £10 dotacji — dobrowolne",
      "Fotografowanie wymaga photo permit — zapytajcie przy wejściu",
      "Must-see: Thistle Chapel (szczególnie figurki aniołów grających na dudach)",
      "Heart of Midlothian — mozaika serca na bruku przed wejściem, tradycja mówi żeby na nią spluwać",
      "Kościół Szkocji rozważa wprowadzenie obowiązkowej opłaty £6 — sprawdźcie aktualną politykę",
    ],
  },

  "royal-mile": {
    slug: "royal-mile",
    name: "Royal Mile",
    nameEn: "Royal Mile",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJieMV9YXHh0gRHsuS82zRSjY",
    coordinates: { lat: 55.9501093, lng: -3.188021 },
    openingHours: "24/7 (ulica)",
    price: "Bezpłatne",
    duration: "30+ min (spacer)",
    illustration: "/svg/illustrations/royal-mile.svg",
    sections: [],
    tips: [
      '"Mila" ma długość 1,81 km (szkocka mila była dłuższa od angielskiej)',
      "Boczne uliczki (closes) są najciekawsze — Advocate's Close ma najlepszy widok na zamek",
      "Mary King's Close — zamurowane średniowieczne miasto pod ziemią (osobna atrakcja, dziś nie wchodzicie)",
      "John Knox House — najstarszy dom mieszkalny w Edynburgu (z 1490)",
      "Wieczorem wiele pubów z muzyką na żywo, ale Wy już będziecie w drodze na lotnisko",
    ],
  },

  "victoria-street": {
    slug: "victoria-street",
    name: "Victoria Street",
    nameEn: "Victoria Street",
    googleMapsUrl:
      "https://www.google.com/maps/place/?q=place_id:ChIJPZ-4wZrHh0gRc3KN--kven0",
    coordinates: { lat: 55.9487342, lng: -3.1931981 },
    openingHours: "24/7 (ulica)",
    price: "Bezpłatne",
    duration: "30 min",
    illustration: "/svg/illustrations/victoria-street.svg",
    sections: [],
    tips: [
      "Kolorowe fasady są najbardziej fotogeniczne z góry — podejście z Royal Mile",
      "Rowlingowa inspiracja dla Pokątnej (Diagon Alley) — faktem czy mitem, turyści uwielbiają",
      "Dawna nazwa West Bow — od łuku (bow) prowadzącego do Grassmarket",
      "Sklep Aha Ha Ha — kultowy sklep z żartami, fotogeniczny",
      "Maison de Moggy — kawiarnia z kotami (wymaga rezerwacji — jeśli chcecie, bookujcie 2 tyg. wcześniej)",
    ],
  },
};

export const placesList: Place[] = Object.values(places);
