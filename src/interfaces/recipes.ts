export interface RecipesProps {
    id?: string;
    name: string;
    ingredients: string[];
    instructions: string;
    image: string;
    cuisineId: string;
    dietId: string;
    difficultyId: string;
}