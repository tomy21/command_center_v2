import { apiClient } from "../api/apiClient";

export const Category = {
  create: async (category) => {
    try {
      const response = await apiClient.post(
        `/v01/occ/api/category/create`,
        category
      );
      return response.data;
    } catch (error) {
      return error.response;
    }
  },

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

  summaryDataCategory: async (page, limit, search) => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/issues/getSummaryCategory`,
        {
          params: { page, limit, search },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  summaryData: async () => {
    try {
      const response = await apiClient.get(`/v01/occ/api/issues/getSummary`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateCategory: async (id, formData) => {
    try {
      const response = await apiClient.put(
        `/v01/occ/api/getById/update/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await apiClient.delete(
        `/v01/occ/api/getById/delete/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
