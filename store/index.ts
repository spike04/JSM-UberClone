import { DriverStore, LocationStore, MarkerData } from '@/types/type'
import { create } from 'zustand'

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  destinationAddress: null,
  destinationLongitude: null,
  destinationLatitude: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number
    longitude: number
    address: string
  }) => {
    set((state) => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }))
  },
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number
    longitude: number
    address: string
  }) => {
    set((state) => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }))
  },
}))

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) => {
    set((state) => ({
      selectedDriver: driverId,
    }))
  },
  setDrivers: (drivers: MarkerData[]) => {
    set((state) => ({
      drivers: drivers,
    }))
  },
  clearSelectedDriver: () => {
    set((state) => ({
      selectedDriver: null,
    }))
  },
}))
