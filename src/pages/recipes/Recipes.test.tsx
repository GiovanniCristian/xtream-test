// src/pages/Recipes/Recipes.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Recipes from './Recipes';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRecipes = [
    {
        id: '1',
        name: 'Spaghetti Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Parmesan Cheese', 'Pancetta', 'Black Pepper'],
        instructions: 'Boil the spaghetti. Fry the pancetta. Mix eggs and cheese. Combine all.',
        cuisineId: '1',
        dietId: '3',
        difficultyId: '3',
        image: '/uploads/carbonara-horizontal-square640-v2.jpg',
    },
];

const mockCuisines = [
    { id: '1', name: 'Italian' },
];

const mockDiets = [
    { id: '3', name: 'Omnivore' },
];

const mockDifficulties = [
    { id: '3', name: 'Medium' },
];

const mockComments = [
    { id: '1', recipeId: '1', comment: 'Delicious!', rating: 5, date: '2023-01-01T00:00:00.000Z' },
];

describe('Recipes Page', () => {
    beforeEach(() => {
        mockedAxios.get.mockImplementation((url) => {
            switch (url) {
                case 'http://localhost:8080/recipes':
                    return Promise.resolve({ data: mockRecipes });
                case 'http://localhost:8080/cuisines':
                    return Promise.resolve({ data: mockCuisines });
                case 'http://localhost:8080/diets':
                    return Promise.resolve({ data: mockDiets });
                case 'http://localhost:8080/difficulties':
                    return Promise.resolve({ data: mockDifficulties });
                case 'http://localhost:8080/comments':
                    return Promise.resolve({ data: mockComments });
                default:
                    return Promise.reject(new Error('not found'));
            }
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Recipes component', async () => {
        render(<Recipes />);

        expect(screen.getByText(/recipe book/i)).toBeInTheDocument();

        await waitFor(() => expect(screen.getByText(/spaghetti carbonara/i)).toBeInTheDocument());
    });

    test('shows loading spinner', () => {
        render(<Recipes />);
        expect(screen.getByRole('img', { name: /loading/i })).toBeInTheDocument();
    });

    test('displays an empty state when there are no recipes', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });
        render(<Recipes />);

        await waitFor(() => expect(screen.getByText(/no data available, try again/i)).toBeInTheDocument());
    });
});
