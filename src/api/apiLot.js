import { apiClient, apiLot, apiLot_v2 } from "./apiClient";

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

export const LotAPI_new = {
  signatureGenerate: async () => {
    try {
      const timestamp = new Date().toISOString();

      const response = await apiLot_v2.post(
        `/v1/partner/generate-signature`,
        null,
        {
          headers: {
            clientkey: "4fc9d5ce-7b1e-477b-aac0-a60e43755552",
            secretkey: "c84fd876-6d53-4e75-bd69-622ed7e6a404",
            timestamp: timestamp,
          },
        }
      );
      return {
        signature: response.data?.signature,
        timestamp,
      };
    } catch (error) {
      throw error?.response?.data || error;
    }
  },

  // Step 2: Hit realtime/location-availability
  getLocationAvailability: async (locationCode) => {
    try {
      const { signature, timestamp } = await LotAPI_new.signatureGenerate();

      const response = await apiLot_v2.post(
        `/v1/realtime/location-availability`,
        {
          locationCode,
        }, // Sesuaikan jika ada body
        {
          headers: {
            clientkey: "4fc9d5ce-7b1e-477b-aac0-a60e43755552",
            signature: signature,
            timestamp: timestamp,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error?.response?.data || error;
    }
  },
};
