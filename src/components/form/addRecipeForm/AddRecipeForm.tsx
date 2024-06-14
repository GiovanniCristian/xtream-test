import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Cuisine } from '../../../interfaces/cuisine';
import { Diet } from '../../../interfaces/diet';
import { Difficulty } from '../../../interfaces/difficulty';
import { Bounce, toast } from 'react-toastify';
import { AddRecipeProps, Recipe } from '../../../interfaces/recipes';
import './addRecipeForm.css'

const { TextArea } = Input;
const { Option } = Select;

const AddRecipeForm: React.FC<AddRecipeProps> = ({ onChange }) => {
    const [form] = Form.useForm();
    const [cuisines, setCuisines] = useState<Cuisine[]>([]);
    const [diets, setDiets] = useState<Diet[]>([]);
    const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
    const [formComplete, setFormComplete] = useState<boolean>(false);
    const [recipe, setRecipe] = useState<Recipe>({
        id: '',
        name: '',
        ingredients: [],
        instructions: '',
        cuisineId: '',
        dietId: '',
        difficultyId: '',
        image: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cuisinesResponse = await axios.get('http://localhost:8080/cuisines');
                const dietsResponse = await axios.get('http://localhost:8080/diets');
                const difficultiesResponse = await axios.get('http://localhost:8080/difficulties');

                setCuisines(cuisinesResponse.data);
                setDiets(dietsResponse.data);
                setDifficulties(difficultiesResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Ops.. Something went wrong', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
            }
        };

        fetchData();
    }, []);

    const handleFormChange = (changedValues: Recipe) => {
        const updatedRecipe = { ...recipe, ...changedValues };
        setRecipe(updatedRecipe);
        onChange(updatedRecipe);
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
        const allTouched = form.isFieldsTouched(true);
        setFormComplete(allTouched && !hasErrors);
    };

    const handleImageUpload = (file: any) => {
        const updatedRecipe = { ...recipe, image: URL.createObjectURL(file) };
        setRecipe(updatedRecipe);
        onChange(updatedRecipe);
        return false;
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await axios.post('http://localhost:8080/recipes', values);
            form.resetFields();
            toast.success('Recipe added successfully!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } catch (error) {
            console.error('Failed to add recipe:', error);
            toast.error('Failed to add recipe.', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    return (
        <Form form={form} onValuesChange={handleFormChange} onFinish={handleSubmit} layout="vertical" className='add-form'>
            <Form.Item name="name" label="Recipe Name" rules={[{ required: true, message: 'Please enter the recipe name' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="image" label="Image" valuePropName="fileList" getValueFromEvent={(e: any) => e?.fileList} required>
                <Upload beforeUpload={handleImageUpload} listType="picture">
                    <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
            </Form.Item>
            <Form.Item name="ingredients" label="Ingredients" rules={[{ required: true, message: 'Please enter the ingredients' }]}>
                <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
            </Form.Item>
            <Form.Item name="instructions" label="Instructions" rules={[{ required: true, message: 'Please enter the instructions' }]}>
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item name="cuisineId" label="Cuisine" rules={[{ required: true, message: 'Please select the cuisine' }]}>
                <Select>
                    {cuisines.map((cuisine: Cuisine) => (
                        <Option key={cuisine.id} value={cuisine.id}>{cuisine.name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="dietId" label="Diet Type" rules={[{ required: true, message: 'Please select the diet type' }]}>
                <Select>
                    {diets.map((diet: Diet) => (
                        <Option key={diet.id} value={diet.id}>{diet.name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name="difficultyId" label="Difficulty" rules={[{ required: true, message: 'Please select the difficulty' }]}>
                <Select>
                    {difficulties.map((difficulty: Difficulty) => (
                        <Option key={difficulty.id} value={difficulty.id}>{difficulty.name}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!formComplete}>Add Recipe</Button>
            </Form.Item>
        </Form>
    );
};

export default AddRecipeForm;
