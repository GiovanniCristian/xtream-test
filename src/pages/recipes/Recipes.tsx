import { useEffect, useState } from "react"
import { Recipe } from "../../interfaces/recipes"
import { Cuisine } from "../../interfaces/cuisine"
import { Diet } from "../../interfaces/diet"
import { Difficulty } from "../../interfaces/difficulty"
import axios from "axios"
import { Layout, Row, Col, Spin, Empty, Typography } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import './recipes.css'
import { Comments } from "../../interfaces/comments"
import RecipeCard from "../../components/cards/recipeCards/RecipeCard"
import RecipeModal from "../../components/modals/recipeModal/RecipeModal"
import FilterSearch from "../../components/filter/FilterSearch"

const { Title } = Typography;

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [diets, setDiets] = useState<Diet[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipesResponse = await axios.get('http://localhost:8080/recipes');
        const cuisinesResponse = await axios.get('http://localhost:8080/cuisines');
        const dietsResponse = await axios.get('http://localhost:8080/diets');
        const difficultiesResponse = await axios.get('http://localhost:8080/difficulties');
        const commentsResponse = await axios.get('http://localhost:8080/comments');

        setTimeout(() => {
          setRecipes(recipesResponse.data);
          setCuisines(cuisinesResponse.data);
          setDiets(dietsResponse.data);
          setDifficulties(difficultiesResponse.data);
          setComments(commentsResponse.data);
          setFilteredRecipes(recipesResponse.data)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const onSearch = debounce((value: string) => {
    const filtered = recipes.filter(recipe => recipe.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredRecipes(filtered);
  }, 300);

  const onFilter = (filters: any) => {
    let filtered = recipes;

    if (filters.cuisineId) {
      filtered = filtered.filter(recipe => recipe.cuisineId === filters.cuisineId);
    }
    if (filters.dietId) {
      filtered = filtered.filter(recipe => recipe.dietId === filters.dietId);
    }
    if (filters.difficultyId) {
      filtered = filtered.filter(recipe => recipe.difficultyId === filters.difficultyId);
    }

    setFilteredRecipes(filtered);
  };

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

  const isEmptyState = () => {
    return (
      recipes.length === 0 ||
      cuisines.length === 0 ||
      diets.length === 0 ||
      difficulties.length === 0 ||
      comments.length === 0
    );
  };

  return (
    <Layout className="recipes-layout">
      <Header className="site-header">
        <Title level={2} style={{ margin: 0 }}>Recipe Book</Title>
        <FilterSearch onSearch={onSearch} onFilter={onFilter} />
      </Header>
      <Content className="site-content">
        {loading ? (
          <div style={{ width: '100%', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spin size="large" />
          </div>
        ) : isEmptyState() && (
          <Empty description="No data available, try again" />
        )}
        {!loading && (
          <Row gutter={[16, 16]} justify="center">
            {filteredRecipes.map(recipe => (
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

export default Recipes;