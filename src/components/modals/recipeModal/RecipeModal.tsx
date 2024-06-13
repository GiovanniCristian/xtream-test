import React, { useState } from 'react';
import { Modal, Button, Typography, Carousel } from 'antd';
import { RecipesModalProps } from '../../../interfaces/recipes';
import CommentModal from '../commentModal/CommentModal';
import './recipeModal.css'

const { Title } = Typography;

const RecipeModal: React.FC<RecipesModalProps> = ({ open, onClose, recipe, addComment }) => {
    const [commentModalVisible, setCommentModalVisible] = useState<boolean>(false);

    const toggleCommentModal = () => {
        setCommentModalVisible(!commentModalVisible);
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={700}
            centered
            style={{padding: '1rem'}}
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
            <Carousel autoplay className="comment-carousel">
                {recipe.comments.map((comment, index) => (
                    <div key={index} className="comment-slide">
                        <div>
                            <strong>Rating: {comment.rating}</strong>
                            <p>{comment.comment}</p>
                            <small>{new Date(comment.date).toLocaleString()}</small>
                        </div>
                    </div>
                ))}
            </Carousel>
            <Button className='recipe-btn' onClick={toggleCommentModal}>Add Comment</Button>
            <CommentModal
                open={commentModalVisible}
                onClose={toggleCommentModal}
                addComment={addComment}
                recipeId={recipe.id}
            />
        </Modal>
    )
}

export default RecipeModal