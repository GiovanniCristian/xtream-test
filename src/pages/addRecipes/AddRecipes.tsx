import { Layout, Typography } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import './addRecipes.css'
import AddRecipeForm from '../../components/form/addRecipeForm/AddRecipeForm';
import { Recipe } from '../../interfaces/recipes';
import { useState } from 'react';

const { Title } = Typography;

const AddRecipes = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    id: '',
    name: '',
    ingredients: [],
    instructions: '',
    cuisineId: '',
    dietId: '',
    difficultyId: '',
    image: ''
  });

  const handleFormChange = (newRecipe: Recipe) => {
    setRecipe(newRecipe);
  };

  return (
    <Layout className='add-layout'>
      <Header className='add-header'>
        <Title level={2} style={{ margin: 0 }} className='add-title'>Add a new recipe</Title>
      </Header>
      <Content className='add'>
        <div className='add-content-left'>
          <AddRecipeForm onChange={handleFormChange} />
        </div>
        <div className='add-content-right'>
          <div className="recipe-preview">
            <Title className='title' level={2}>{recipe.name || 'Recipe Name'}</Title>
            {recipe.image && <img src={recipe.image} alt={recipe.name} className="recipe-image" />}
            <Title className='ingredients-title' level={5}>Ingredients:</Title>
            <div className="recipe-ingredients">
              {recipe.ingredients.map((ingredient, index) => (
                <span key={index} className="ingredient">{ingredient}</span>
              ))}
            </div>
            <Title className='title' level={5}>Instructions:</Title>
            <div className="recipe-instructions">{recipe.instructions || 'Recipe Instructions'}</div>
            <div className='recipe-specifics'>
              <Title className='spec-title' level={5}>&#129368; {recipe.cuisineId || 'Cuisine'}</Title>
              <Title className='spec-title' level={5}>&#129388; {recipe.dietId || 'Diet'}</Title>
              <Title className='spec-title' level={5}>&#128246; {recipe.difficultyId || 'Difficulty'}</Title>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default AddRecipes