import React, { useState } from 'react';
import { createRecipe } from '../services/api';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      ingredients: formData.ingredients.split('\n'),
      steps: formData.steps.split('\n'),
    };
    try {
      await createRecipe(formattedData);
      alert('Recipe submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('There was an error submitting the recipe.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit a New Recipe</h2>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Ingredients (separate by newline)</label>
        <textarea name="ingredients" value={formData.ingredients} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Steps (separate by newline)</label>
        <textarea name="steps" value={formData.steps} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Image</label>
        <input type="file" name="image" onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;