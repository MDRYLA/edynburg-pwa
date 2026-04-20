import type { TransportOption } from "@/types";

export const transportToCity: TransportOption = {
  id: "tram-to-city",
  mode: "tram",
  name: "Tramwaj: EDI → York Place",
  price: "£7.50 single",
  duration: "35 min",
  frequency: "co 7 min",
  route:
    "Edinburgh Airport → Ingliston Park & Ride → Gogarburn → Edinburgh Gateway → Gyle Centre → Edinburgh Park Central → Edinburgh Park Station → Bankhead → Saughton → Balgreen → Murrayfield Stadium → Haymarket → West End → Princes Street → St Andrew Square → York Place",
  destination: "York Place",
  buyOptions: [
    {
      method: "Aplikacja Bus & Tram (iOS)",
      url: "https://apps.apple.com/gb/app/bus-tram/id6468092588",
      note: "Rekomendowane. Płatność kartą, ticket w telefonie, oszczędność 30p vs automat.",
    },
    {
      method: "Aplikacja Bus & Tram (Android)",
      url: "https://play.google.com/store/apps/details?id=travel.ticketless.app.lothian",
      note: "Ta sama apka.",
    },
    {
      method: "Online",
      url: "https://tickets.edinburghtrams.com/",
      note: "Oszczędność 30p. Bilet w emailu / na telefonie.",
    },
    {
      method: "Automat na przystanku",
      note: "Bilet ważny 30 min od zakupu — kupujcie tuż przed wsiadaniem.",
    },
    {
      method: "TapTapCap (kartą zbliżeniową)",
      note: "Przyłóż Visa/Mastercard/Apple Pay/Google Pay do walidatora na peronie. System sam policzy najtańszą opcję dzienną.",
    },
  ],
  pros: [
    "Prosto z terminalu lotniska (przystanek przy drzwiach)",
    "Miejsce na walizki w każdym wagonie",
    "Punktualność niezależna od korków",
    "York Place jest 500m od Calton Hill",
  ],
  cons: ["Trochę dłużej niż autobus (ale za to bez opóźnień)"],
};

export const transportToAirport: TransportOption = {
  id: "tram-to-airport",
  mode: "tram",
  name: "Tramwaj: West End → EDI",
  price: "£7.50 single",
  duration: "40 min",
  frequency: "co 7 min",
  route:
    "West End → Haymarket → Murrayfield Stadium → Balgreen → Saughton → Bankhead → Edinburgh Park Station → Edinburgh Park Central → Gyle Centre → Edinburgh Gateway → Gogarburn → Ingliston Park & Ride → Edinburgh Airport",
  destination: "Edinburgh Airport",
  buyOptions: [
    {
      method: "Ta sama aplikacja / metoda co rano",
      note: "Kupujecie kolejny single £7.50 albo korzystacie z Network DAYticket jeśli wzięliście rano.",
    },
    {
      method: "TapTapCap (kontynuacja)",
      note: "Jeśli rano zapłaciliście kartą zbliżeniową — o drugim przejeździe system naliczy cap dzienny (czasem £9.50 zamiast 2×£7.50).",
    },
  ],
  pros: [
    "Przystanek West End jest 10-12 min pieszo w dół od zamku",
    "Bez ryzyka korków (ważne w godzinach szczytu)",
    "Dokładny czas przejazdu — możecie zaplanować z precyzją",
  ],
  cons: ["Trzeba zejść do West End (nie wsiadacie przy zamku)"],
};

export const networkDayTicket = {
  name: "Network DAYticket",
  price: "£12.50",
  savings: "£2.50 vs 2×single",
  validity: "Cały dzień, wszystkie tramwaje i autobusy (w tym Airlink)",
  note: "Jeśli planujecie tylko 2 przejazdy tramwajowe — jest na styku opłacalności. Jeśli dojdzie jeszcze 1 autobus miejski lub bardzo zmęczone nogi = warto.",
  buyUrl: "https://tickets.edinburghtrams.com/",
};
