// lib/mockData.ts
import { Car } from "@/types";

export const MOCK_CARS: Car[] = [
  {
    id: 101,
    modelName: "Maruti Suzuki Swift Dzire",
    type: "SEDAN",
    transmission: "MANUAL",
    fuelType: "PETROL",
    seats: 5,
    rating: 4.9,
    tripCount: 42,
    basePricePerHour: 99,
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000",
    isAvailable: true,
    features: ["Bluetooth", "Rear AC", "Phone Holder"]
  },
  {
    id: 102,
    modelName: "Tata Nexon",
    type: "SUV",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    seats: 5,
    rating: 4.7,
    tripCount: 15,
    basePricePerHour: 149,
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=1000",
    isAvailable: true,
    features: ["Sunroof", "Fastag", "Reverse Camera"]
  }
];