import { render, screen, fireEvent } from '@testing-library/react';
import AddRecipeForm from './AddRecipeForm';
import { Cuisine } from '../../../interfaces/cuisine';
import { Diet } from '../../../interfaces/diet';
import { Difficulty } from '../../../interfaces/difficulty';

const mockCuisines: Cuisine[] = [
    { id: '1', name: 'Italian' },
    { id: '2', name: 'American' },
    { id: '3', name: 'Mexican' },
    { id: '4', name: 'Indian' },
    { id: '5', name: 'Japanese' },
    { id: '6', name: 'Spanish' },
    { id: '7', name: 'French' },
    { id: '8', name: 'Greek' },
    { id: '9', name: 'Thai' },
    { id: '10', name: 'British' },
    { id: '11', name: 'Russian' },
    { id: '12', name: 'Middle Eastern' },
    { id: '13', name: 'North African' },
    { id: '14', name: 'Korean' }
];

const mockDiets: Diet[] = [
    { id: '1', name: 'Vegetarian' },
    { id: '2', name: 'Mediterranean' },
    { id: '3', name: 'Non-Vegetarian' },
    { id: '2', name: 'Pescatarian' },
];

const mockDifficulties: Difficulty[] = [
    { id: '1', name: 'Easy' },
    { id: '2', name: 'Medium' },
    { id: '3', name: 'Hard' }
];

test('renders AddRecipeForm component', () => {
    render(
        <AddRecipeForm
            cuisines={mockCuisines}
            diets={mockDiets}
            difficulties={mockDifficulties}
            onChange={() => { }}
        />
    );

    // Check if form elements are rendered
    expect(screen.getByLabelText(/recipe name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/image/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/instructions/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cuisine/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/diet type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/difficulty/i)).toBeInTheDocument();
});

test('submits the form', async () => {
    const mockOnChange = jest.fn();
    const mockOnReset = jest.fn();

    render(
        <AddRecipeForm
            cuisines={mockCuisines}
            diets={mockDiets}
            difficulties={mockDifficulties}
            onChange={mockOnChange}
        />
    );

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/recipe name/i), { target: { value: 'Spaghetti' } });
    fireEvent.change(screen.getByLabelText(/ingredients/i), { target: { value: 'Pasta, Tomato Sauce' } });
    fireEvent.change(screen.getByLabelText(/instructions/i), { target: { value: 'Boil pasta, add sauce' } });
    fireEvent.change(screen.getByLabelText(/cuisine/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/diet type/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/difficulty/i), { target: { value: '1' } });

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /add recipe/i }));

    // Check if onChange and onReset were called
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnReset).toHaveBeenCalled();
});