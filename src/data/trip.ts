/**
 * Metadane wycieczki. TODO Kacper: uzupełnij poniższe pola.
 * Te wartości nie są krytyczne dla działania — apka zadziała bez nich,
 * ale ich uzupełnienie uczyni ekran Home bardziej osobistym.
 */
export const trip = {
  date: "", // np. "12 maja 2026" lub zostaw pusty
  groupSize: 0, // 3 lub 4
  airline: "", // np. "Ryanair", opcjonalne
  castleSlot: "14:30",
  flightArrive: "08:50",
  flightDepart: "19:20",
};

export const hasTripMeta = (): boolean =>
  trip.date.trim().length > 0 && trip.groupSize > 0;
