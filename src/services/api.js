import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getRecipes = () => axios.get(`${API_URL}/recipes`);
export const getRecipeById = (id) => axios.get(`${API_URL}/recipes/${id}`);
export const createRecipe = (recipeData) => {
  const formData = new FormData();
  Object.keys(recipeData).forEach(key => formData.append(key, recipeData[key]));
  return axios.post(`${API_URL}/recipes`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI0MjM0Njk2LCJleHAiOjE3MjQyMzgyOTZ9.RmgVRdR4PAVKuv1OU6LS2uq3Gpz42rrBEyZqG_sFnig`
    }
  });
};