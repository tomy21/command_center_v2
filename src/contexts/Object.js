import { createContext, useContext, useEffect, useState } from "react";
import { Object } from "../hooks/Object";

const ObjectContext = createContext();

export const ObjectProvider = ({ children }) => {
  const [objects, setObjects] = useState([]);
  const [object, setObject] = useState(null);

  const fetchObjects = async () => {
    try {
      const response = await Object.getAll();
      setObjects(response.objects);
    } catch (error) {
      console.error("Error fetching objects:", error);
    }
  };

  const getById = async (id) => {
    try {
      const response = await Object.getById(id);
      setObject(response.object);
    } catch (error) {}
  };

  const createObject = async (object) => {
    try {
      const response = await Object.create(object);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const updateObject = async (id, formData) => {
    try {
      const response = await Object.updateObject(id, formData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const deleteObject = async (id) => {
    try {
      const response = await Object.deleteObject(id);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <ObjectContext.Provider
      value={{
        objects,
        object,
        getById,
        createObject,
        updateObject,
        deleteObject,
        fetchObjects,
      }}
    >
      {children}
    </ObjectContext.Provider>
  );
};

export const useObject = () => {
  return useContext(ObjectContext);
};
