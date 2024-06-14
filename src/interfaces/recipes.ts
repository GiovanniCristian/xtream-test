import { Comments } from "./comments";

export interface Recipe {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
    image: string;
    cuisineId: string;
    dietId: string;
    difficultyId: string;
}

export interface RecipesCardProps {
    id?: string;
    image: string;
    name: string;
    cuisineId: string;
    dietId: string;
    onClick: () => void;
}

export interface RecipesModalProps {
    open: boolean;
    onClose: () => void;
    addComment: (recipeId: string, comment: string, rating: number) => void;
    recipe: {
        id: string;
        name: string;
        ingredients: string[];
        instructions: string;
        image: string;
        cuisineId: string;
        dietId: string;
        difficultyId: string;
        comments: Comments[];
    }
}

export interface AddRecipeProps {
    onChange: (newRecipe: Recipe) => void;
}