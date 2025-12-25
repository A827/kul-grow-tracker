"use client";

import { useEffect, useState } from "react";
import { api } from "./memoryDb";
import { Harvest, Location, Plant } from "./types";

export function useStore() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [harvests, setHarvests] = useState<Harvest[]>([]);

  const refresh = () => {
    setLocations(api.listLocations());
    setPlants(api.listPlants());
    setHarvests(api.listHarvests());
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    locations,
    plants,
    harvests,
    refresh,

    addLocation: (data: Omit<Location, "id" | "createdAt">) => {
      api.addLocation(data);
      refresh();
    },
    deleteLocation: (id: string) => {
      api.deleteLocation(id);
      refresh();
    },

    addPlant: (data: Omit<Plant, "id" | "createdAt">) => {
      api.addPlant(data);
      refresh();
    },
    deletePlant: (id: string) => {
      api.deletePlant(id);
      refresh();
    },

    addHarvest: (data: Omit<Harvest, "id" | "createdAt">) => {
      api.addHarvest(data);
      refresh();
    },
    deleteHarvest: (id: string) => {
      api.deleteHarvest(id);
      refresh();
    },
  };
}