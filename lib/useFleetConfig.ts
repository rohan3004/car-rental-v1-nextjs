"use client";

import { useEffect, useState } from "react";
import { fetchAndActivate, getValue } from "firebase/remote-config";
import { remoteConfig } from "./firebase";

// --- 1. TYPE DEFINITIONS ---
export interface District {
  name: string;
  headquarters?: string;
  municipal_corporations: string[];
  municipalities: string[];
  census_towns: string[];
  other_urban_units?: string[];
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  category_id?: string;
  price_per_hr?: number;
  price_per_km?: number;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// --- 2. THE MASTER DATA (West Bengal) ---
const WB_DISTRICT_DATA: District[] = [
    // ... (Keep the exact same WB_DISTRICT_DATA array from previous steps here)
    // For brevity in this code block, I assume you have the full list I generated before.
    // If you need it pasted again, let me know, but it is huge!
    { "name": "Kolkata", "headquarters": "Kolkata", "municipal_corporations": ["Kolkata"], "municipalities": [], "census_towns": [], "other_urban_units": [] },
    { "name": "North 24 Parganas", "headquarters": "Barasat", "municipal_corporations": ["Bidhannagar"], "municipalities": ["Barasat", "Dum Dum", "Barrackpore", "New Town", "Salt Lake"], "census_towns": ["Rajarhat"], "other_urban_units": [] }
    // ... etc
];

// --- 3. DEFAULT CONFIGURATION (Fallback) ---
const DEFAULT_FULL_CONFIG = {
  service_type: "WITH_DRIVER",
  location_data: {
    districts: WB_DISTRICT_DATA
  },
  testimonials: [
    { name: "Amit Roy", role: "User", text: "Smooth booking." },
    { name: "Sneha Das", role: "User", text: "Clean car." }
  ],
  faqs: [
    { question: "Is fuel included?", answer: "No, fuel is level-to-level." },
    { question: "Can I drive?", answer: "No, this is a chauffeur-driven service." }
  ],
  fleet_config: {
    pricing_rules: {
      min_hours: 10,
      min_km: 100,
      policies: ["Fuel charges extra", "Driver Allowance extra"]
    },
    categories: [] // (Keep your default categories here)
  }
};

// --- 4. THE HOOK ---
export function useFleetConfig() {
  const [data, setData] = useState<any>(DEFAULT_FULL_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      remoteConfig.settings.minimumFetchIntervalMillis = 10000;

      fetchAndActivate(remoteConfig)
        .then(() => {
          const val = getValue(remoteConfig, "fleet_config");
          const jsonString = val.asString();
          if (jsonString) {
            try {
              const parsed = JSON.parse(jsonString);
              // Logic to handle nested/flat structures
              if (parsed.fleet_config && parsed.location_data) {
                 setData(parsed);
              } else {
                 setData(parsed);
              }
            } catch (e) {
              console.warn("Invalid Remote Config JSON, using fallback.");
            }
          }
        })
        .catch((err) => console.error("Firebase Config Error:", err))
        .finally(() => setLoading(false));
    }
  }, []);

  // --- 5. HELPERS ---
  const districts: District[] = data?.location_data?.districts || WB_DISTRICT_DATA;
  const testimonials: Testimonial[] = data?.testimonials || [];
  const faqs: FAQ[] = data?.faqs || [];
  
  const allCars: Car[] = (data?.fleet_config?.categories?.flatMap((cat: any) => 
    (cat.cars || []).map((car: any) => ({
      ...car,
      category_id: cat.id,
      price_per_hr: cat.price_per_hr,
      price_per_km: cat.price_per_km
    }))
  )) || [];

  return { 
    config: data?.fleet_config, 
    districts,
    testimonials,
    faqs, // <--- EXPORTED HERE
    allCars, 
    loading 
  };
}