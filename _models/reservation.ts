export interface Reservation {
  id?: string;
  date: Date;
  duration: number;
  description: string;
  players: number;
  place_id: number;
  user_id: string;
}
