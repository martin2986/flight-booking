export interface segment {
  origin: {
    displayCode: string;
    name: string;
    city: string;
  };
  destination: {
    displayCode: string;
    name: string;
    city: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  operatingCarrier: string;
  flightNumber: number;
}
export interface selectedFLight {
  segments: segment[];
  durationInMinutes: number;
  stopCount: number;
}
export interface FlightListInfoProps {
  flightData: {
    legs: {
      arrival: string;
      departure: string;
      stopCount: number;
      durationInMinutes: number;
      carriers: {
        marketing: {
          logoUrl: string;
          name: string;
          id: number;
        }[];
      };
      origin: {
        displayCode: string;
        name: string;
        city: string;
      };
      destination: {
        displayCode: string;
        name: string;
        city: string;
      };
      segments: segment[];
    }[];
    id: string;
    price: {
      formatted: string;
    };
  }[];

  onSelectFlight: (data: selectedFLight) => void;
}
