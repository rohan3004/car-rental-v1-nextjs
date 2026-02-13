"use client";

// City coordinates for West Bengal (approximate centers)
// Using OpenStreetMap Nominatim for geocoding would be ideal in production
const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Major Cities
  "Kolkata": { lat: 22.5726, lng: 88.3639 },
  "Howrah": { lat: 22.5958, lng: 88.2636 },
  "Siliguri": { lat: 26.7271, lng: 88.3953 },
  "Asansol": { lat: 23.6889, lng: 86.9661 },
  "Durgapur": { lat: 23.5204, lng: 87.3119 },
  "Bardhaman": { lat: 23.2324, lng: 87.8615 },
  "Kharagpur": { lat: 22.3460, lng: 87.2320 },
  "Haldia": { lat: 22.0667, lng: 88.0698 },
  "Darjiling": { lat: 27.0410, lng: 88.2663 },
  "Darjeeling": { lat: 27.0410, lng: 88.2663 },
  "Kalimpong": { lat: 27.0594, lng: 88.4695 },
  "Malda": { lat: 25.0108, lng: 88.1411 },
  "English Bazar": { lat: 25.0108, lng: 88.1411 },
  "Baharampur": { lat: 24.1005, lng: 88.2512 },
  "Krishnanagar": { lat: 23.4013, lng: 88.4841 },
  "Barasat": { lat: 22.7200, lng: 88.4800 },
  "Barrackpore": { lat: 22.7656, lng: 88.3700 },
  
  // North 24 Parganas
  "Bidhannagar": { lat: 22.5800, lng: 88.4200 },
  "Salt Lake": { lat: 22.5800, lng: 88.4200 },
  "New Town": { lat: 22.5922, lng: 88.4847 },
  "Dum Dum": { lat: 22.6200, lng: 88.4300 },
  "Bhatpara": { lat: 22.8700, lng: 88.4100 },
  "Panihati": { lat: 22.6900, lng: 88.3700 },
  "Kamarhati": { lat: 22.6700, lng: 88.3700 },
  "Naihati": { lat: 22.8900, lng: 88.4200 },
  "Habra": { lat: 22.8400, lng: 88.6300 },
  "Basirhat": { lat: 22.6500, lng: 88.8700 },
  "Bangaon": { lat: 23.0500, lng: 88.8300 },
  
  // South 24 Parganas
  "Alipore": { lat: 22.5300, lng: 88.3300 },
  "Diamond Harbour": { lat: 22.1900, lng: 88.1900 },
  "Baruipur": { lat: 22.3600, lng: 88.4300 },
  "Budge Budge": { lat: 22.4800, lng: 88.1800 },
  "Maheshtala": { lat: 22.5100, lng: 88.2500 },
  
  // Howrah District
  "Bally": { lat: 22.6500, lng: 88.3400 },
  "Uluberia": { lat: 22.4700, lng: 88.1100 },
  
  // Hooghly
  "Chandannagar": { lat: 22.8700, lng: 88.3600 },
  "Serampore": { lat: 22.7500, lng: 88.3400 },
  "Rishra": { lat: 22.7100, lng: 88.3500 },
  "Hugli-Chuchura": { lat: 22.9000, lng: 88.3900 },
  "Chinsurah": { lat: 22.9000, lng: 88.3900 },
  "Bansberia": { lat: 22.9700, lng: 88.4000 },
  "Tarakeswar": { lat: 22.8900, lng: 88.0200 },
  
  // Nadia
  "Kalyani": { lat: 22.9750, lng: 88.4344 },
  "Ranaghat": { lat: 23.1800, lng: 88.5700 },
  "Santipur": { lat: 23.2500, lng: 88.4400 },
  "Nabadwip": { lat: 23.4100, lng: 88.3700 },
  "Chakdaha": { lat: 23.0800, lng: 88.5200 },
  
  // Purba & Paschim Bardhaman
  "Kalna": { lat: 23.2200, lng: 88.3700 },
  "Katwa": { lat: 23.6500, lng: 88.1300 },
  "Raniganj": { lat: 23.6200, lng: 87.1300 },
  "Kulti": { lat: 23.7300, lng: 86.8500 },
  
  // Purba & Paschim Medinipur
  "Medinipur": { lat: 22.4200, lng: 87.3200 },
  "Tamluk": { lat: 22.2900, lng: 87.9200 },
  "Contai": { lat: 21.7800, lng: 87.7500 },
  "Ghatal": { lat: 22.6700, lng: 87.7300 },
  "Digha": { lat: 21.6280, lng: 87.5070 },
  
  // Murshidabad
  "Jangipur": { lat: 24.4700, lng: 88.0700 },
  "Kandi": { lat: 23.9600, lng: 88.0400 },
  "Murshidabad": { lat: 24.1800, lng: 88.2700 },
  
  // Birbhum
  "Suri": { lat: 23.9100, lng: 87.5300 },
  "Bolpur": { lat: 23.6700, lng: 87.7200 },
  "Rampurhat": { lat: 24.1700, lng: 87.7800 },
  "Santiniketan": { lat: 23.6800, lng: 87.6900 },
  
  // Bankura & Purulia
  "Bankura": { lat: 23.2300, lng: 87.0700 },
  "Bishnupur": { lat: 23.0700, lng: 87.3200 },
  "Puruliya": { lat: 23.3300, lng: 86.3600 },
  "Purulia": { lat: 23.3300, lng: 86.3600 },
  
  // North Bengal
  "Jalpaiguri": { lat: 26.5200, lng: 88.7300 },
  "Alipurduar": { lat: 26.4900, lng: 89.5300 },
  "Koch Bihar": { lat: 26.3200, lng: 89.4500 },
  "Cooch Behar": { lat: 26.3200, lng: 89.4500 },
  "Raiganj": { lat: 25.6200, lng: 88.1200 },
  "Balurghat": { lat: 25.2200, lng: 88.7600 },
  "Kurseong": { lat: 26.8800, lng: 88.2800 },
  "Mirik": { lat: 26.8900, lng: 88.1800 },
  
  // Jhargram
  "Jhargram": { lat: 22.4500, lng: 86.9900 },
};

// Haversine formula to calculate distance between two coordinates
function haversineDistance(
  lat1: number, lng1: number,
  lat2: number, lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export interface DistanceResult {
  distanceKm: number;
  durationMinutes: number;
  isEstimate: boolean;
}

// Calculate distance between two cities
export function calculateDistance(
  pickupCity: string,
  dropoffCity: string
): DistanceResult | null {
  const pickup = CITY_COORDINATES[pickupCity];
  const dropoff = CITY_COORDINATES[dropoffCity];
  
  if (!pickup || !dropoff) {
    // If coordinates not found, return null
    return null;
  }
  
  // Calculate straight-line distance
  const straightLineKm = haversineDistance(
    pickup.lat, pickup.lng,
    dropoff.lat, dropoff.lng
  );
  
  // Apply road factor (roads are typically 1.3-1.5x longer than straight line)
  const roadFactor = 1.4;
  const distanceKm = Math.round(straightLineKm * roadFactor);
  
  // Estimate duration (average speed 40 km/h for Indian roads)
  const avgSpeedKmh = 40;
  const durationMinutes = Math.round((distanceKm / avgSpeedKmh) * 60);
  
  return {
    distanceKm,
    durationMinutes,
    isEstimate: true
  };
}

// Format duration for display
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Calculate pricing estimate
export interface PricingEstimate {
  hourlyTotal: number;
  distanceTotal: number | null;
  baseTotal: number;
  nightCharges: number;
  finalTotal: number;
  billingType: 'hourly' | 'distance';
  hours: number;
  distance: number | null;
  minHoursApplied: boolean;
  minKmApplied: boolean;
  hasDistanceData: boolean;
  hasNightHours: boolean;
  nightHoursCount: number;
}

// Check if time falls within night hours
function isNightHour(hour: number, nightStart: number, nightEnd: number): boolean {
  if (nightStart > nightEnd) {
    // Night spans midnight (e.g., 22:00 - 06:00)
    return hour >= nightStart || hour < nightEnd;
  }
  return hour >= nightStart && hour < nightEnd;
}

// Calculate night hours in a trip
function calculateNightHours(
  startDate: string,
  endDate: string,
  nightStart: number = 22,
  nightEnd: number = 6
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  
  let nightHours = 0;
  const current = new Date(start);
  
  while (current < end) {
    const hour = current.getHours();
    if (isNightHour(hour, nightStart, nightEnd)) {
      nightHours++;
    }
    current.setHours(current.getHours() + 1);
  }
  
  return nightHours;
}

export function calculatePricingEstimate(
  startDate: string,
  endDate: string,
  distanceKm: number | null,
  pricePerHr: number,
  pricePerKm: number,
  minHours: number = 10,
  minKm: number = 100,
  nightChargeRate: number = 300,
  nightChargesEnabled: boolean = true,
  nightStart: number = 22,
  nightEnd: number = 6
): PricingEstimate | null {
  if (!startDate || !endDate) return null;
  
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  
  if (isNaN(start) || isNaN(end) || end <= start) return null;
  
  // Calculate hours
  const diffHours = (end - start) / (1000 * 60 * 60);
  const billedHours = Math.max(diffHours, minHours);
  const minHoursApplied = diffHours < minHours;
  
  // Calculate hourly total
  const hourlyTotal = Math.round(billedHours * pricePerHr);
  
  // Calculate night hours and charges
  const nightHoursCount = nightChargesEnabled 
    ? calculateNightHours(startDate, endDate, nightStart, nightEnd) 
    : 0;
  const hasNightHours = nightHoursCount > 0;
  const nightCharges = hasNightHours ? nightChargeRate : 0;
  
  // If no distance data, return hours-only estimate
  if (distanceKm === null || distanceKm === 0) {
    const baseTotal = hourlyTotal;
    return {
      hourlyTotal,
      distanceTotal: null,
      baseTotal,
      nightCharges,
      finalTotal: baseTotal + nightCharges,
      billingType: 'hourly',
      hours: Math.round(billedHours * 10) / 10,
      distance: null,
      minHoursApplied,
      minKmApplied: false,
      hasDistanceData: false,
      hasNightHours,
      nightHoursCount
    };
  }
  
  // Calculate distance (round trip = 2x one way)
  const roundTripKm = distanceKm * 2;
  const billedKm = Math.max(roundTripKm, minKm);
  const minKmApplied = roundTripKm < minKm;
  
  // Calculate distance total
  const distanceTotal = Math.round(billedKm * pricePerKm);
  
  // Whichever is higher
  const baseTotal = Math.max(hourlyTotal, distanceTotal);
  const billingType = hourlyTotal >= distanceTotal ? 'hourly' : 'distance';
  
  return {
    hourlyTotal,
    distanceTotal,
    baseTotal,
    nightCharges,
    finalTotal: baseTotal + nightCharges,
    billingType,
    hours: Math.round(billedHours * 10) / 10,
    distance: billedKm,
    minHoursApplied,
    minKmApplied,
    hasDistanceData: true,
    hasNightHours,
    nightHoursCount
  };
}
