export type LocationType = "area" | "pot" | "tray";

export type Location = {
  id: string;
  type: LocationType;
  name: string;
  notes?: string;
  createdAt: string;
};

export type PlantStatus = "seed" | "seedling" | "growing" | "fruiting" | "finished";

export type Plant = {
  id: string;
  variety: string;
  status: PlantStatus;
  locationId?: string; // area/pot/tray
  sowDate?: string; // YYYY-MM-DD
  transplantDate?: string; // YYYY-MM-DD
  createdAt: string;
};

export type Harvest = {
  id: string;
  plantId: string;
  date: string; // YYYY-MM-DD
  grams: number;
  note?: string;
  createdAt: string;
};

export type QrTag = {
  id: string;
  code: string; // what the QR encodes, e.g. "POT-A12"
  targetType: "location" | "plant";
  targetId: string;
  createdAt: string;
};