import { apiClient } from "./apiClient";

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
};

export const ObjectApi = {
  create: async (formdata) => {
    try {
      const response = await apiClient.post(`/v01/occ/api/object`, formdata);
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
  getByIdCategory: async (idCategory) => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/object/byIdCategory?idCategory=${idCategory}`
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
