import { Badge, Button, Col, Container, Form, Row } from "react-bootstrap";
import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import { addComment, addItemLike, getItem, getItemComments, getIsLiked, removeItemLike } from "../api";
import { useParams } from "react-router-dom";
import { notify } from "../utilities/notify";
import jwt_decode from 'jwt-decode';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";

const ItemMain = () => {

    const [item, setItem] = useState({});
    const [comment, setComment] = useState('');
    const [user, setUser] = useState(null);
    const [itemComments, setItemComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    const { id } = useParams();

    const handleHeartClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLiked(!isLiked);
        try {
            if(isLiked) {
                const response = await removeItemLike(id, user?.id);
            } else {
                const response = await addItemLike(id, user?.id);
            }
        } catch (error) {
            console.error('Error adding Likes and retrieving item comments:', error);
        }
        
    };

    const isLikedLocal = async (id, userId) => {
        try {
            
            const response = await getIsLiked(id, userId);
            setIsLiked(response.data.response);
        } catch (error) {
            console.error('Couldnt find isLiked', error);
        }
    }

    const getItemLocal = async (id) => {
        try {
            const response = await getItem(id);
            setItem(response.data);
        } catch (error) {
            console.error(error);
        }

    }

    const getItemCommentsLocal = async (id) => {
        try {
            const response = await getItemComments(id);
            setItemComments(response.data);

        } catch (error) {
            console.error('Error retrieving item comments:', error);
        }
    };

    const addCommentLocal = async () => {
        try {
            const data = { content: comment, user_id: user.id };
            const response = await addComment(item.id, data);
            notify('success', `Comment added to the item: ${item?.name}`);
            getItemCommentsLocal(id);
            setComment('');
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            setUser(decodedToken);
        } else {
            setUser(null);
        }
    }, []);

    useEffect(() => {

        if (id) {
            getItemLocal(id);
            getItemCommentsLocal(id);
        }

    }, [id]);

    useEffect(() => {

        if (id && user !== null) {
            isLikedLocal(id, user.id);
        }
    }, [id, user]);

    return (
        <Container fluid className='header'>
            <ToastContainer
                autoClose={5000}
                theme="colored"
            />
            <Row>
                <Col >
                    <h1 className='display-4 text-center'>{item?.name}</h1>
                </Col>
            </Row>

            <Row>
                <Col className="d-flex justify-content-between">
                    <span className='fs-4 text-muted'>From collection: {item.Collection?.name}</span>
                    <span>
                        {isLiked ? (
                            <AiFillHeart className="heart-icon heart-icon-filled " onClick={handleHeartClick} />
                        ) : (
                            <AiOutlineHeart className="heart-icon" onClick={handleHeartClick} />
                        )}

                        <RiDeleteBin5Line size={24} className="mx-4" />
                    </span>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col>
                    <h1>
                        This item has <Badge bg="primary">{item?.likes}</Badge> Likes
                    </h1>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center align-items-center">
                <Col>
                    <h2 className="text-center my-4">{itemComments?.length} Coments</h2>
                    {user && <Form className="bg-secondary">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="fs-5">Add Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3} />
                        </Form.Group>
                        <Button variant="outline-primary" onClick={() => addCommentLocal()}> Write Comment</Button>
                    </Form>}
                    
                    <CommentSection itemComments={itemComments} />
                </Col>
            </Row>
        </Container >
    );
};

export default ItemMain;