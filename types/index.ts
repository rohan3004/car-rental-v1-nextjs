export interface Car {
  id: number;
  modelName: string; // "Swift Dzire"
  type: 'SEDAN' | 'HATCHBACK' | 'SUV';
  transmission: 'MANUAL' | 'AUTOMATIC';
  fuelType: 'PETROL' | 'DIESEL' | 'CNG';
  seats: number;
  rating: number; // 4.8
  tripCount: number; // 120
  basePricePerHour: number; // 80
  imageUrl: string;
  isAvailable: boolean;
  features: string[]; // ["Bluetooth", "Fastag", "Phone Holder"]
}

export interface SearchParams {
  city: string; // Hardcoded to 'Bangalore' for now
  startDate: Date;
  endDate: Date;
}