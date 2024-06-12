import { useEffect, useState } from "react"
import { RecipesProps } from "../../interfaces/recipes"
import { Cuisine } from "../../interfaces/cuisine"
import { Diet } from "../../interfaces/diet"
import { Difficulty } from "../../interfaces/difficulty"
import axios from "axios"
import { Layout, Row, Col, Spin } from "antd"
import { Header, Content, Footer } from "antd/es/layout/layout"
import RecipeCard from "../../components/cards/RecipeCard"
import './recipes.css'

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<RecipesProps[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesResponse = await axios.get('http://localhost:8080/recipes');
        const cuisinesResponse = await axios.get('http://localhost:8080/cuisines');
        const dietsResponse = await axios.get('http://localhost:8080/diets');
        const difficultiesResponse = await axios.get('http://localhost:8080/difficulties');

        setRecipes(recipesResponse.data);
        setCuisines(cuisinesResponse.data);
        setDiets(dietsResponse.data);
        setDifficulties(difficultiesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCuisineId = (id: string) => {
    const cuisine = cuisines.find(cuisine => cuisine.id === id);
    return cuisine ? cuisine.name : 'Unknown';
  };

  const getDietId = (id: string) => {
    const diet = diets.find(diet => diet.id === id);
    return diet ? diet.name : 'Unknown';
  };

  const getDifficultyId = (id: string) => {
    const difficulty = difficulties.find(diff => diff.id === id);
    return difficulty ? difficulty.name : 'Unknown';
  };

  return (
    <Layout>
      <Header className="site-header">
        <Row justify="center">
          <Col span={24}>
            <div className="header-card">
              <h1>Welcome to My Cooking Site</h1>
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="site-content">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[16, 16]} justify="center">
            {recipes.map(recipe => (
              <Col xs={24} sm={12} md={8} lg={6} key={recipe.id}>
                <RecipeCard
                  id={recipe.id}
                  name={recipe.name}
                  ingredients={recipe.ingredients}
                  instructions={recipe.instructions}
                  image={recipe.image}
                  cuisineId={getCuisineId(recipe.cuisineId)}
                  dietId={getDietId(recipe.dietId)}
                  difficultyId={getDifficultyId(recipe.difficultyId)}
                />
              </Col>
            ))}
          </Row>
        )}
      </Content>
      <Footer className="site-footer">
        <Row justify="center">
          <Col span={24}>
            <div className="footer-card">
              <p>© 2024 My Cooking Site. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default Home;