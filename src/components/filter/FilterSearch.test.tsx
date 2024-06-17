// src/components/filter/FilterSearch.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSearch from './FilterSearch';

test('renders FilterSearch component', () => {
    render(
        <FilterSearch
            onSearch={() => { }}
            onFilter={() => { }}
        />
    );

    // Check if filter elements are rendered
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select cuisine/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select difficulty/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/select diet/i)).toBeInTheDocument();
});

test('triggers onSearch callback', () => {
    const mockOnSearch = jest.fn();

    render(
        <FilterSearch
            onSearch={mockOnSearch}
            onFilter={() => { }}
        />
    );

    fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'Spaghetti' } });

    expect(mockOnSearch).toHaveBeenCalledWith('Spaghetti');
});

test('triggers onFilter callback', () => {
    const mockOnFilter = jest.fn();

    render(
        <FilterSearch
            onSearch={() => { }}
            onFilter={mockOnFilter}
        />
    );

    fireEvent.change(screen.getByPlaceholderText(/select cuisine/i), { target: { value: '1' } });

    expect(mockOnFilter).toHaveBeenCalled();
});
