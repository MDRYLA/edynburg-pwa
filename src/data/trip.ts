/**
 * Metadane wycieczki. TODO Kacper: uzupełnij poniższe pola.
 * Te wartości nie są krytyczne dla działania — apka zadziała bez nich,
 * ale ich uzupełnienie uczyni ekran Home bardziej osobistym.
 */
export const trip = {
  date: "24 kwietnia 2026",
  groupSize: 4,
  airline: "",
  castleSlot: "14:30",
  flightArrive: "08:50",
  flightDepart: "19:20",
};

export const hasTripMeta = (): boolean =>
  trip.date.trim().length > 0 && trip.groupSize > 0;
