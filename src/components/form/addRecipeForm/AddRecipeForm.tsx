import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Cuisine } from '../../../interfaces/cuisine';
import { Diet } from '../../../interfaces/diet';
import { Difficulty } from '../../../interfaces/difficulty';
import { AddRecipeFormProps, Recipe } from '../../../interfaces/recipes';
import './addRecipeForm.css'

const { TextArea } = Input;
const { Option } = Select;

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ cuisines, diets, difficulties, onChange }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
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

    const handleFormChange = (changedValues: Recipe) => {
        const updatedRecipe = { ...recipe, ...changedValues };
        setRecipe(updatedRecipe);
        onChange(updatedRecipe);
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length > 0);
        const allTouched = form.isFieldsTouched(true);
        setFormComplete(allTouched && !hasErrors);
    };

    const handleImageUpload = (file: any) => {
        const isJpgOrPngOrWebp = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
        if (!isJpgOrPngOrWebp) {
            messageApi.open({
                type: 'error',
                content: 'You can only upload JPG/PNG/WEBP file!'
            });
        }
        const updatedRecipe = { ...recipe, image: file };
        setRecipe(updatedRecipe);
        onChange(updatedRecipe);
        return false;
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('ingredients', values.ingredients.join(','));
            formData.append('instructions', values.instructions);
            formData.append('cuisineId', values.cuisineId);
            formData.append('dietId', values.dietId);
            formData.append('difficultyId', values.difficultyId);
            if (recipe.image) {
                formData.append('image', recipe.image);
            }

            const response = await axios.post('http://localhost:8080/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const newRecipe = response.data;
            const updateRecipe = { ...recipe, image: newRecipe.image };
            setRecipe(updateRecipe);
            form.resetFields();
            messageApi.open({
                type: 'success',
                content: 'Recipe added successfully!'
            })
        } catch (error) {
            console.error('Failed to add recipe:', error);
            messageApi.open({
                type: 'error',
                content: 'Failed to add recipe'
            })
        }
    };

    return (
        <>
            {contextHolder}
            <Form form={form} onValuesChange={handleFormChange} onFinish={handleSubmit} layout="vertical" className='add-form'>
                <Form.Item name="name" label="Recipe Name" rules={[{ required: true, message: 'Please enter the recipe name' }]} className='form-item'>
                    <Input />
                </Form.Item>
                <Form.Item name="image" label="Image" valuePropName="fileList" getValueFromEvent={(e: any) => e?.fileList} required className='form-item'>
                    <Upload beforeUpload={handleImageUpload} listType="picture">
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name="ingredients" label="Ingredients" rules={[{ required: true, message: 'Please enter the ingredients' }]} className='form-item'>
                    <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']} />
                </Form.Item>
                <Form.Item name="instructions" label="Instructions" rules={[{ required: true, message: 'Please enter the instructions' }]} className='form-item'>
                    <TextArea rows={4} style={{ resize: 'none' }} />
                </Form.Item>
                <Form.Item name="cuisineId" label="Cuisine" rules={[{ required: true, message: 'Please select the cuisine' }]} className='form-item'>
                    <Select>
                        {cuisines.map((cuisine: Cuisine) => (
                            <Option key={cuisine.id} value={cuisine.id}>{cuisine.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="dietId" label="Diet Type" rules={[{ required: true, message: 'Please select the diet type' }]} className='form-item'>
                    <Select>
                        {diets.map((diet: Diet) => (
                            <Option key={diet.id} value={diet.id}>{diet.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="difficultyId" label="Difficulty" rules={[{ required: true, message: 'Please select the difficulty' }]} className='form-item'>
                    <Select>
                        {difficulties.map((difficulty: Difficulty) => (
                            <Option key={difficulty.id} value={difficulty.id}>{difficulty.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='form-item-btn'>
                    <Button type="primary" htmlType="submit" disabled={!formComplete}>Add Recipe</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default AddRecipeForm;
