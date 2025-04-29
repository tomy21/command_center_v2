import { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../hooks/Category";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await Category.getAll();
      console.log(response);
      setCategories(response);
    } catch (error) {
      return error.response;
    }
  };

  const getById = async (id) => {
    try {
      const response = await Category.getById(id);
      setCategory(response.data);
    } catch (error) {
      return error.response.data;
    }
  };

  const createCategory = async (category) => {
    try {
      const response = await Category.create(category);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const updateCategory = async (id, formData) => {
    try {
      const response = await Category.updateCategory(id, formData);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await Category.deleteCategory(id);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        category,
        getById,
        createCategory,
        updateCategory,
        deleteCategory,
        fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  return useContext(CategoryContext);
};
