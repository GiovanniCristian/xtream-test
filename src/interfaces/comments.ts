export interface Comments {
    id: string;
    recipeId: string;
    comment: string;
    rating: number;
    date: string;
}

export interface CommentModalProps {
    open: boolean;
    onClose: () => void;
    recipeId: string;
    addComment: (recipeId: string, comment: string, rating: number) => void;
}