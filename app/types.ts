export type Tab = "home" | "classification" | "dataset" | "analytics" | "about";

export interface Species {
  id: string;
  name: string;
  scientificName: string;
  status: "TERVERIFIKASI" | "PENDING_REVIEW";
  verified: boolean;
}

export interface PredictionCandidate {
  name: string;
  confidence: number; // percentage
  barId: string;
}

export interface HistoryItem {
  id: string;
  imageSrc: string;
  speciesName: string;
  scientificName: string;
  confidence: number;
  timestamp: string;
}
