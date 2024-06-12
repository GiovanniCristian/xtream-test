import { Card } from "antd";
import { RecipesCardProps } from "../../../interfaces/recipes";
import './RecipeCard.css'

const RecipeCard: React.FC<RecipesCardProps> = ({ name, image, cuisineId, dietId, onClick }) => {
    return (
        <Card hoverable color="var(--primary)" className="recipe-card" onClick={onClick}>
            <Card.Meta title={name} />
            <div className="card-body">
                <div className="body-left">
                    <p>👨🏻‍🍳 {cuisineId}</p>
                    <p>🥬 {dietId}</p>
                </div>
                <div className="body-right">
                    <img src={`http://localhost:8080${image}`} alt={name} />
                </div>
            </div>
        </Card>
    );
};

export default RecipeCard;