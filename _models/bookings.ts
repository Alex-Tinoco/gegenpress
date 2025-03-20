export interface Place {
  id: number;
  name: string;
  location: string;
  hours_open: string;
  image: string;
}

export interface Booking {
  date: Date;
  players: number;
  place_id: number;
  place: Place;
}
