import { Card } from "antd";
import { RecipesCardProps } from "../../../interfaces/recipes";

const RecipeCard: React.FC<RecipesCardProps> = ({ name, image, cuisineId, dietId, onClick }) => {
    return (
        <Card hoverable className="recipe-card" onClick={onClick}>
            <Card.Meta title={name} />
            <div className="recipe-meta">
                <p>Cuisine: {cuisineId}</p>
                <p>Diet: {dietId}</p>
            </div>
        </Card>
    );
};

export default RecipeCard;