import React, { useState } from 'react';
import { Modal, Rate, Input, Button, List, Typography } from 'antd';
import { RecipesModalProps } from '../../../interfaces/recipes';
import './recipeModal.css'

const { Title } = Typography;

const RecipeModal: React.FC<RecipesModalProps> = ({ open, onClose, recipe, addComment }) => {
    const [newComment, setNewComment] = useState<string>('')
    const [newRating, setNewRating] = useState<number>(0)

    const onAddComment = () => {
        addComment(recipe.id, newComment, newRating);
        setNewComment('')
        setNewRating(0)
    }

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={600}
            centered
        >
            <Title className='title' level={2}>{recipe.name}</Title>
            <img src={`http://localhost:8080${recipe.image}`} alt={recipe.name} className="recipe-image" />
            <Title className='title' level={4}>Ingredients:</Title>
            <div className="recipe-ingredients">
                {recipe.ingredients.map((ingredient, index) => (
                    <span key={index} className="ingredient">{ingredient}</span>
                ))}
            </div>
            <Title className='title' level={4}>Instructions:</Title>
            <div className="recipe-instructions">{recipe.instructions}</div>
            <Title className='title' level={4}>Cuisine: {recipe.cuisineId}</Title>
            <Title className='title' level={4}>Diet: {recipe.dietId}</Title>
            <Title className='title' level={4}>Difficulty: {recipe.difficultyId}</Title>
            <Title className='title' level={4}>Comments:</Title>
            <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={recipe.comments}
                renderItem={comment => (
                    <li>
                        <div>
                            <strong>Rating: {comment.rating}</strong>
                            <p>{comment.comment}</p>
                            <small>{new Date(comment.date).toLocaleString()}</small>
                        </div>
                    </li>
                )}
            />
            <div className="add-comment">
                <Rate onChange={setNewRating} value={newRating} />
                <Input.TextArea
                    rows={4}
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <Button type="primary" onClick={onAddComment}>Submit</Button>
            </div>
        </Modal>
    )
}

export default RecipeModal