import React, { useState } from 'react';
import { Form, Input, Button, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Cuisine } from '../../../interfaces/cuisine';
import { Diet } from '../../../interfaces/diet';
import { Difficulty } from '../../../interfaces/difficulty';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { AddRecipeFormProps, Recipe } from '../../../interfaces/recipes';
import './addRecipeForm.css'

const { TextArea } = Input;
const { Option } = Select;

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ cuisines, diets, difficulties, onChange }) => {
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
            message.error('You can only upload JPG/PNG/WEBP file!');
        }
        const updatedRecipe = { ...recipe, image: URL.createObjectURL(file) };
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

            await axios.post('http://localhost:8080/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

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
        <>
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
            <ToastContainer />
        </>
    );
};

export default AddRecipeForm;
