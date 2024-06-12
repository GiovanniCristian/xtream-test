import { Card } from "antd";
import { RecipesProps } from "../../interfaces/recipes";

const RecipeCard: React.FC<RecipesProps> = ({ id, name, ingredients, instructions, image }) => {
    return (
        <Card
            hoverable
            cover={<img alt={name} src={image} />}
            className="recipe-card"
        >
            <Card.Meta title={name} />
            <div className="recipe-details">
                <h3>Ingredients:</h3>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
                <h3>Instructions:</h3>
                <p>{instructions}</p>
            </div>
        </Card>
    );
};

export default RecipeCard;