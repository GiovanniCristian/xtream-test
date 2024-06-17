import { Layout, Typography } from 'antd'
import { Header, Content } from 'antd/es/layout/layout'
import './addRecipes.css'
import AddRecipeForm from '../../components/form/addRecipeForm/AddRecipeForm';
import { Recipe } from '../../interfaces/recipes';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import Arrow from '../../assets/json/addrecipearrow.json'
import { Cuisine } from '../../interfaces/cuisine';
import { Diet } from '../../interfaces/diet';
import { Difficulty } from '../../interfaces/difficulty';
import axios from 'axios';

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
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cuisinesResponse = await axios.get('http://localhost:8080/cuisines');
        const dietsResponse = await axios.get('http://localhost:8080/diets');
        const difficultiesResponse = await axios.get('http://localhost:8080/difficulties');

        setCuisines(cuisinesResponse.data);
        setDiets(dietsResponse.data);
        setDifficulties(difficultiesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getCuisineName = (id: string) => {
    const cuisine = cuisines.find(cuisine => cuisine.id === id);
    return cuisine ? cuisine.name : 'Cuisine';
  };

  const getDietName = (id: string) => {
    const diet = diets.find(diet => diet.id === id);
    return diet ? diet.name : 'Diet';
  };

  const getDifficultyName = (id: string) => {
    const difficulty = difficulties.find(difficulty => difficulty.id === id);
    return difficulty ? difficulty.name : 'Difficulty';
  };

  const handleFormChange = (newRecipe: Recipe) => {
    setRecipe(newRecipe);
  };

  return (
    <Layout className='add-layout'>
      <Header className='add-header'>
        <Title level={2} style={{ margin: '0.6rem 0rem' }} className='add-title'>Add a new recipe</Title>
      </Header>
      <Content className='add'>
        <div className='add-content-left'>
          <AddRecipeForm
            onChange={handleFormChange}
            cuisines={cuisines}
            diets={diets}
            difficulties={difficulties}
          />
        </div>
        <div className='add-content-middle'>
          <Title level={5} style={{ fontWeight: 400 }}>Fill the Form to see the Magic!</Title>
          <Lottie animationData={Arrow} style={{ width: '25%' }} />
        </div>
        <div className='add-content-right'>
          <div className="recipe-content-preview">
            <Title className='title' level={3}>{recipe.name}</Title>
            {recipe.image && <img src={recipe.image} alt={recipe.name} className="recipe-content-image" />}
            <div className="recipe-content-ingredients">
              {recipe.ingredients.map((ingredient, index) => (
                <span key={index} className="ingredient">{ingredient}</span>
              ))}
            </div>
            <div className="recipe-content-instructions"><Title level={5} style={{ margin: 0, fontSize: '1rem', fontWeight: 300 }}>{recipe.instructions}</Title></div>
            <div className='recipe-content-specifics'>
              <Title level={5} style={{ margin: 0 }}>&#129368; {getCuisineName(recipe.cuisineId)}</Title>
              <Title level={5} style={{ margin: 0 }}>&#129388; {getDietName(recipe.dietId)}</Title>
              <Title level={5} style={{ margin: 0 }}>&#128246; {getDifficultyName(recipe.difficultyId)}</Title>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default AddRecipes