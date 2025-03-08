import { apiClient, apiLot } from "./apiClient";

export const lotAvailable = {
  getAllPerlocation: async (locationCode) => {
    try {
      const response = await apiLot.get(
        `/v1/realtime/location/${locationCode}`
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  gateLocation: async (locationId) => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/gates/getGateBylocation/${locationId}`
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  updateGate: async (locationId) => {
    try {
      const response = await apiClient.put(
        `/v01/occ/api/gates/arduino/${locationId}`,
        {
          arduino: "1",
        }
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
