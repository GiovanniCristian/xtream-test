import { useEffect, useState } from "react"
import { Recipe } from "../../interfaces/recipes"
import { Cuisine } from "../../interfaces/cuisine"
import { Diet } from "../../interfaces/diet"
import { Difficulty } from "../../interfaces/difficulty"
import axios from "axios"
import { Layout, Row, Col, Spin } from "antd"
import { Header, Content } from "antd/es/layout/layout"
import './recipes.css'
import { Comments } from "../../interfaces/comments"
import RecipeCard from "../../components/cards/recipeCards/RecipeCard"
import RecipeModal from "../../components/modals/recipeModal/RecipeModal"

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesResponse = await axios.get('http://localhost:8080/recipes');
        const cuisinesResponse = await axios.get('http://localhost:8080/cuisines');
        const dietsResponse = await axios.get('http://localhost:8080/diets');
        const difficultiesResponse = await axios.get('http://localhost:8080/difficulties');
        const commentsResponse = await axios.get('http://localhost:8080/comments');

        setRecipes(recipesResponse.data);
        setCuisines(cuisinesResponse.data);
        setDiets(dietsResponse.data);
        setDifficulties(difficultiesResponse.data);
        setComments(commentsResponse.data);
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

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const handleAddComment = (recipeId: string, comment: string, rating: number) => {
    const newComment = {
      id: String(Date.now()),
      recipeId,
      comment,
      rating,
      date: new Date().toISOString()
    };
    setComments([...comments, newComment]);
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
                  image={recipe.image}
                  name={recipe.name}
                  cuisineId={getCuisineId(recipe.cuisineId)}
                  dietId={getDietId(recipe.dietId)}
                  onClick={() => handleCardClick(recipe)}
                />
              </Col>
            ))}
          </Row>
        )}
        {selectedRecipe && (
          <RecipeModal
            open={modalVisible}
            onClose={() => setModalVisible(false)}
            recipe={{
              ...selectedRecipe,
              cuisineId: getCuisineId(selectedRecipe.cuisineId),
              dietId: getDietId(selectedRecipe.dietId),
              difficultyId: getDifficultyId(selectedRecipe.difficultyId),
              comments: comments.filter(comment => comment.recipeId === selectedRecipe.id)
            }}
            addComment={handleAddComment}
          />
        )}
      </Content>
    </Layout>
  );
};

export default Home;