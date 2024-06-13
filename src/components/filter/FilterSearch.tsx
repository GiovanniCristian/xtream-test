import React, { useState, useEffect } from 'react';
import { Input, Select, Row, Col } from 'antd';
import { FilterSearchProps, Filters } from '../../interfaces/filterSearch';
import axios from 'axios';
import { Cuisine } from "../../interfaces/cuisine"
import { Diet } from "../../interfaces/diet"
import { Difficulty } from "../../interfaces/difficulty"
import './filterSearch.css';

const { Search } = Input;
const { Option } = Select;


const FilterSearch: React.FC<FilterSearchProps> = ({ onSearch, onFilter }) => {
    const [cuisines, setCuisines] = useState<Cuisine[]>([]);
    const [diets, setDiets] = useState<Diet[]>([]);
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
    const [filters, setFilters] = useState<Filters>({})

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const cuisinesResponse = await axios.get('http://localhost:8080/cuisines');
                const dietsResponse = await axios.get('http://localhost:8080/diets');
                const difficultiesResponse = await axios.get('http://localhost:8080/difficulties');

                setCuisines(cuisinesResponse.data);
                setDiets(dietsResponse.data);
                setDifficulties(difficultiesResponse.data);
            } catch (error) {
                console.error('Error fetching filter data:', error);
            }
        };

        fetchFilters();
    }, [])

    const handleCuisineChange = (value: string) => {
        const newFilters = { ...filters, cuisineId: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const handleDifficultyChange = (value: string) => {
        const newFilters = { ...filters, difficultyId: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    const handleDietChange = (value: string) => {
        const newFilters = { ...filters, dietId: value };
        setFilters(newFilters);
        onFilter(newFilters);
    };

    return (
        <div className="filter-search">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Search placeholder="Search..." onSearch={onSearch} />
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select placeholder="Select cuisine" onChange={handleCuisineChange} style={{ width: '100%' }}>
                        {cuisines.map(cuisine => (
                            <Option key={cuisine.id} value={cuisine.id}>
                                {cuisine.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select placeholder="Select difficulty" onChange={handleDifficultyChange} style={{ width: '100%' }}>
                        {difficulties.map(difficulty => (
                            <Option key={difficulty.id} value={difficulty.id}>
                                {difficulty.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Select placeholder="Select diet" onChange={handleDietChange} style={{ width: '100%' }}>
                        {diets.map(diet => (
                            <Option key={diet.id} value={diet.id}>
                                {diet.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </div>
    )
}

export default FilterSearch;