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

// Add this interface to your existing types
export interface CarDetails extends Car {
  description: string;
  images: string[];
  specs: {
    engine: string;
    power: string;
    topSpeed: string;
    fuelTank: string;
  };
  policies: string[];
}

// Add this function to simulate fetching a single car
export const getCarById = (id: string) => {
  // Simulating a DB fetch
  return {
    ...MOCK_CARS[0], // Returns the Swift Dzire for now
    id: parseInt(id),
    description: "The Maruti Suzuki Swift Dzire is the undisputed king of Indian roads. Perfect for city commutes and weekend getaways. This particular unit is the ZXi Plus variant with automatic climate control and a precision-tuned AMT gearbox.",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1000", // Main
      "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&q=80&w=800", // Interior
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800", // Rear
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=800", // Wheel/Detail
    ],
    specs: {
      engine: "1.2L DualJet",
      power: "89 BHP",
      topSpeed: "155 km/h",
      fuelTank: "37 Liters"
    },
    policies: [
      "Fuel: Level to Level",
      "Speed Limit: 80 km/h (Govt Mandated)",
      "Fastag: Pre-installed (Deducted from deposit)",
      "Pets: Not allowed"
    ]
  };
};