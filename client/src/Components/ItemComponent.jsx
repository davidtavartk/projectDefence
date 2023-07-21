import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import routePaths from '../routes/routePaths';
import { getLikesCountForItem } from '../api';




const ItemComponent = ({item}) => {
    const author = "David";

    const [isFilled, setIsFilled] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const getLikesCountForItemLocal = async (id) => {
        try {
            const response = await getLikesCountForItem(id);
            setLikesCount(response.data.likes);
        } catch (error) {
            console.log(error);
        }
    }

    const handleHeartClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setIsFilled(!isFilled);
    };

    useEffect(() => {
        if (item?.id) {
          getLikesCountForItemLocal(item?.id);
        }
      }, [item?.id]);
    
    return (
        <Card className="mb-4 bg-white border p-3 rounded-pill">
            <Link to={`${routePaths.Item.replace(':id', item?.id)}`} className="text-decoration-none">
                <Container>
                    <Row>
                        <Col md={4}>
                            <h2 className='d-flex'>{item?.name}</h2>
                            <span className="text-muted">Created by: {author}</span>
                        </Col>
                        <Col md={4} className='d-flex justify-content-center align-items-center'>
                            <span className="text-muted">Topic: {item?.Collection?.topic}</span>
                        </Col>
                        <Col md={4} className='d-flex justify-content-between align-items-center'>
                            <Badge variant="secondary">7 Comments</Badge>
                            <Badge variant="secondary">{likesCount} Likes</Badge>
                            <span>
                                {isFilled ? (
                                    <AiFillHeart className="heart-icon heart-icon-filled" onClick={handleHeartClick} />
                                ) : (
                                    <AiOutlineHeart className="heart-icon" onClick={handleHeartClick} />
                                )}
                            </span>
                        </Col>
                    </Row>
                </Container>
            </Link>
        </Card>
    );
};

export default ItemComponent;
