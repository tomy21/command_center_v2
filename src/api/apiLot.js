import { apiLot } from "./apiClient";

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
};
