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
      return response;
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

  login: async (identidfier, password) => {
    try {
      const response = await apiClient.post(`/v01/occ/api/login`, {
        identidfier,
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

  getAllUser: async () => {
    try {
      const response = await apiClient.get(`/v01/occ/api/getAllUsers`);

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

  summaryPerMonth: async () => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/issues/getSummaryMonth`
      );
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

  update: async (id, formData) => {
    try {
      const response = await apiClient.put(
        `/v01/occ/api/issues/updated/${id}`,
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

export const location = {
  getAllLocation: async (page, limit, search) => {
    try {
      const response = await apiClient.get(
        "/v01/occ/api/location-occ/get-all",
        {
          params: {
            page,
            limit,
            search,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getAllLoc: async (page, limit, search) => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/location-occ/get-all-status`,
        {
          params: {
            page,
            limit,
            search,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getGateByLocation: async (idLoc) => {
    try {
      const response = await apiClient.get(
        `/v01/occ/api/gates/getGateBylocation/${idLoc}`
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  updateLocationActive: async (idLoc, recordStatus) => {
    try {
      const response = await apiClient.put(
        `/v01/occ/api/location-occ/update-data/${idLoc}`,
        {
          recordStatus,
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  addGate: async (formData) => {
    try {
      const response = await apiClient.post(`/v01/occ/api/gates/create-data`, {
        formData,
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  getCCTV: async (idCCTV) => {
    try {
      const response = await apiClient.post(
        `/v01/occ/api/cctv/lokasi/${idCCTV}`
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};
