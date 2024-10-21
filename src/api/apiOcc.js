import { apiClient } from "./apiClient";

export const getTransaction = {
  getGate: async (page, limit, search, sortBy, order) => {
    try {
      const response = await apiClient.get("/v01/occ/api/gates", {
        params: {
          page,
          limit,
          search,
          sortBy,
          order,
        },
      });
      return response;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateStatusGate: async (id, statusGate) => {
    try {
      const response = await apiClient.put(`/v01/occ/api/gates/${id}`, {
        statusGate: statusGate,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  updateStatusOpenGate: async (id, arduino) => {
    try {
      const response = await apiClient.put(`/v01/occ/api/gates/${id}`, {
        arduino: arduino,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getFoto: async (channelId) => {
    try {
      const response = await apiClient.get(`/v01/occ/api/hikvision/capture`, {
        params: {
          channelId,
        },
        responseType: "arraybuffer",
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const users = {
  verifyToken: async () => {
    try {
      const response = await apiClient.get(`/v01/occ/api/protected`);

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (identifier, password) => {
    try {
      const response = await apiClient.post(`/v01/occ/api/login`, {
        identifier,
        password,
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getById: async () => {
    try {
      const response = await apiClient.get(`/v01/occ/api/getUserById`);

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.post(`/v01/occ/api/logout`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const Issues = {
  getAll: async (page, limit, search) => {
    try {
      const response = await apiClient.get(`/v01/occ/api/issues/getAll`, {
        params: { page, limit, search },
      });
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  create: async (formData) => {
    try {
      const response = await apiClient.post(
        `/v01/occ/api/issues/create`,
        formData
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export const loging = {
  getAll: async (page, limit) => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/logs/getAll?search=OPEN_GATE`,
        {
          params: { page, limit },
        }
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
