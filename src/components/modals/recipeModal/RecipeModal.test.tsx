// src/components/modals/recipeModal/RecipeModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import RecipeModal from './RecipeModal';
import { Recipe } from '../../../interfaces/recipes';
import { Comments } from '../../../interfaces/comments';

const mockRecipe: Recipe = {
    id: '1',
    name: 'Spaghetti Carbonara',
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan Cheese', 'Pancetta', 'Black Pepper'],
    instructions: 'Boil the spaghetti. Fry the pancetta. Mix eggs and cheese. Combine all.',
    cuisineId: '1',
    dietId: '3',
    difficultyId: '3',
    image: '/uploads/carbonara-horizontal-square640-v2.jpg'
};

const mockComments: Comments[] = [
    { id: '1', recipeId: '1', comment: 'Delicious!', rating: 5, date: '2023-01-01T00:00:00.000Z' },
];

test('renders RecipeModal component', () => {
    render(
        <RecipeModal
            open={true}
            onClose={() => { }}
            recipe={{ ...mockRecipe, comments: mockComments }}
            addComment={() => { }}
        />
    );

    // Check if modal elements are rendered
    expect(screen.getByText(/spaghetti carbonara/i)).toBeInTheDocument();
    expect(screen.getByText(/boil the spaghetti/i)).toBeInTheDocument();
    expect(screen.getByText(/delicious!/i)).toBeInTheDocument();
});

test('calls onClose callback when close button is clicked', () => {
    const mockOnClose = jest.fn();

    render(
        <RecipeModal
            open={true}
            onClose={mockOnClose}
            recipe={{ ...mockRecipe, comments: mockComments }}
            addComment={() => { }}
        />
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockOnClose).toHaveBeenCalled();
});
