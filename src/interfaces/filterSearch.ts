export interface FilterSearchProps {
    onSearch: (query: string) => void;
    onFilter: (filters: Filters) => void;
}

export interface Filters {
    cuisineId?: string,
    dietId?: string;
    difficultyId?: string;
}