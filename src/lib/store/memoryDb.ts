import { Harvest, Location, Plant, QrTag } from "./types";

function uid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
}

const nowISO = () => new Date().toISOString();

type DB = {
  locations: Location[];
  plants: Plant[];
  harvests: Harvest[];
  qrTags: QrTag[];
};

export const db: DB = {
  locations: [],
  plants: [],
  harvests: [],
  qrTags: [],
};

export const api = {
  // LOCATIONS
  listLocations() {
    return [...db.locations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  addLocation(input: Omit<Location, "id" | "createdAt">) {
    const item: Location = { id: uid("loc"), createdAt: nowISO(), ...input };
    db.locations.unshift(item);
    return item;
  },
  deleteLocation(id: string) {
    db.locations = db.locations.filter((x) => x.id !== id);
  },

  // PLANTS
  listPlants() {
    return [...db.plants].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
  addPlant(input: Omit<Plant, "id" | "createdAt">) {
    const item: Plant = { id: uid("plant"), createdAt: nowISO(), ...input };
    db.plants.unshift(item);
    return item;
  },
  deletePlant(id: string) {
    db.plants = db.plants.filter((x) => x.id !== id);
    // also remove harvests linked to this plant (optional)
    db.harvests = db.harvests.filter((h) => h.plantId !== id);
  },

  // HARVESTS
  listHarvests() {
    return [...db.harvests].sort((a, b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));
  },
  addHarvest(input: Omit<Harvest, "id" | "createdAt">) {
    const item: Harvest = { id: uid("harv"), createdAt: nowISO(), ...input };
    db.harvests.unshift(item);
    return item;
  },
  deleteHarvest(id: string) {
    db.harvests = db.harvests.filter((x) => x.id !== id);
  },
};