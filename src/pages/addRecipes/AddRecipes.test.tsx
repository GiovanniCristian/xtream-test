import { render, screen } from '@testing-library/react';
import AddRecipes from './AddRecipes';

test('renders AddRecipes component', () => {
    render(<AddRecipes />);

    // Check if the header is rendered
    expect(screen.getByText(/add a new recipe/i)).toBeInTheDocument();

    // Check if the preview elements are rendered
    expect(screen.getByText(/fill the form to see the magic/i)).toBeInTheDocument();
});