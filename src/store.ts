import { coordinates } from "@maptiler/client";
import { create } from "zustand";

type userIdStore = {
  userId: string | undefined;
  setUserId: (userId: string | undefined) => void;
};

type geolocationStore = {
  coordinates: [lat: number, lng: number];
  setCoordinates: ([lat, lng]: [lat: number, lng: number]) => void;
};

export const useUserIdStore = create<userIdStore>((set) => ({
  userId: "0",
  setUserId: (userId) => {
    set({ userId: userId });
  },
}));

export const useGeolocationStore = create<geolocationStore>((set) => ({
  coordinates: [0, 0],
  setCoordinates: (data) => {
    set({ coordinates: data });
  },
}));
