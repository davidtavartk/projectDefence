import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDate } from '../utilities/formatDate';

const CommentSection = ({ itemComments }) => {
    return (
        <div >
            {itemComments.map((comment) => (
            <Card key={comment.id} className='my-3'>
                <Card.Header className='d-flex align-items-center justify-content-between'>
                    <Card.Title className='mr-5'>{comment.User.username}</Card.Title>
                    <Card.Text className='text-muted ml-5'> {formatDate(comment?.created_at)}</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Card.Text>{comment.content} </Card.Text>
                </Card.Body>
            </Card>
            ))}
        </div>
    );
};

export default CommentSection;