import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  useEffect(() => {
    getRecipes().then(response => setRecipes(response.data));
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Recipes</h2>
      <ul>
        {currentRecipes.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              <h3>{recipe.title}</h3>
              <img src={recipe.imageUrl} alt={recipe.title} style={{ width: '150px' }} />
              <p>{recipe.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div>
        {[...Array(Math.ceil(recipes.length / recipesPerPage)).keys()].map(page => (
          <button key={page} onClick={() => paginate(page + 1)}>{page + 1}</button>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;