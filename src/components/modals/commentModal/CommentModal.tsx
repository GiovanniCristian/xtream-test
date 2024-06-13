import { useState } from 'react'
import './commentModal.css'
import { Modal, Rate, Input, Button, Typography } from 'antd'
import { CommentModalProps } from '../../../interfaces/comments'

const { Title } = Typography;

const CommentModal: React.FC<CommentModalProps> = ({ open, onClose, addComment, recipeId }) => {
    const [newComment, setNewComment] = useState<string>('');
    const [newRating, setNewRating] = useState<number>(0);

    const onAddComment = () => {
        addComment(recipeId, newComment, newRating);
        setNewComment('');
        setNewRating(0);
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={500}
            centered
        >
            <Title className='comment-modal-title' level={3}>Leave your comment!</Title>
            <Rate onChange={setNewRating} value={newRating} className='comment-modal-rate'/>
            <Input.TextArea
                rows={4}
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Write here your comment"
                className='comment-modal-text'
            />
            <Button className='comment-modal-btn' onClick={onAddComment}>Submit</Button>
        </Modal>
    )
}

export default CommentModal;