// Define the Event enum
export enum Event {
    ForecastAlert = "forecastAlert",
  }
  
  // Define the Message interface
  export interface Message {
    event: Event;
    data: {
        Message: string;
    }
    timestamp: string;
}