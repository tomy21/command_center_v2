import { apiClient } from "./apiClient";

export const Category = {
  getAll: async (page, limit, search) => {
    try {
      const response = await apiClient.get(`/v01/occ/api/category`, {
        params: { page, limit, search },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const ObjectApi = {
  getAll: async (page, limit, search) => {
    try {
      const response = await apiClient.get(`/v01/occ/api/object/getAll`, {
        params: { page, limit, search },
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
