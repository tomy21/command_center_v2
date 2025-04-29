import { apiClient } from "../api/apiClient";

export const Object = {
  create: async (object) => {
    try {
      const response = await apiClient.post(`/v01/occ/api/object`, object);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

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

  getById: async (id) => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/object/byIdCategory?idCategory=${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateObject: async (id, formData) => {
    try {
      const response = await apiClient.put(
        `/v01/occ/api/object/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteObject: async (id) => {
    try {
      const response = await apiClient.delete(`/v01/occ/api/object/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
