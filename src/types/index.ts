export type EventType = "attraction" | "meal" | "transit" | "buffer";

export interface ScheduleEvent {
  id: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  subtitle?: string;
  duration: number;
  type: EventType;
  placeId?: string;
  price?: string;
  notes?: string;
  bufferMinutes?: number;
  ticketRequired?: boolean;
  stopUrl?: string;
  stopName?: string;
}

export interface PlaceSection {
  title: string;
  content: string;
}

export interface Place {
  slug: string;
  name: string;
  nameEn: string;
  googleMapsUrl: string;
  coordinates: { lat: number; lng: number };
  openingHours?: string;
  price?: string;
  duration: string;
  website?: string;
  illustration: string;
  sections: PlaceSection[];
  tips: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  type: "street-food" | "sit-down" | "cafe";
  price: "£" | "££" | "£££";
  priceRange: string;
  speed: string;
  specialty: string;
  recommendation: string;
  googleMapsUrl: string;
  address: string;
  description: string;
}

export interface BuyOption {
  method: string;
  url?: string;
  note?: string;
}

export interface TransportOption {
  id: string;
  mode: "tram" | "bus" | "taxi";
  name: string;
  price: string;
  duration: string;
  frequency: string;
  route: string;
  destination: string;
  buyOptions: BuyOption[];
  pros: string[];
  cons?: string[];
}

export interface DayTicket {
  name: string;
  price: string;
  savings: string;
  validity: string;
  note: string;
  buyUrl: string;
}
