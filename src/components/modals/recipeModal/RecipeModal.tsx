import React, { useState } from 'react';
import { Modal, Rate, Input, Button, List } from 'antd';
import { RecipesModalProps } from '../../../interfaces/recipes';
import './recipeModal.css'

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
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h3>Ingredients:</h3>
            <div className="recipe-ingredients">
                {recipe.ingredients.map((ingredient, index) => (
                    <span key={index} className="ingredient">{ingredient}</span>
                ))}
            </div>
            <h3>Instructions:</h3>
            <div className="recipe-instructions">{recipe.instructions}</div>
            <h3>Cuisine: {recipe.cuisineId}</h3>
            <h3>Diet: {recipe.dietId}</h3>
            <h3>Difficulty: {recipe.difficultyId}</h3>
            <h3>Comments:</h3>
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