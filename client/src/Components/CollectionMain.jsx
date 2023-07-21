import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rating from 'react-rating';
import info from '../images/info.png'
import CollectionCanvas from './CollectionCanvas';
import { getCollection, getItem } from '../api';
import ItemComponent from './ItemComponent';
import ItemCanvas from './ItemCanvas';

const CollectionMain = () => {


    const [collection, setCollection] = useState({});
    const { id } = useParams();
    const [item, setItem] = useState({}); 

    const ratingQuantity = 42;
    const infoIcon = <img src={info} alt="info" className='navbar-icon' />;


    const getCollectionLocal = async (id) => {
        const response = await getCollection(id);
        setCollection(response.data);
    }

    const getItemLocal = async () => {
        try {
          const response = await getItem(id);
          setItem(response.data);
        } catch (error) {
          console.error('Error retrieving item:', error);
        }
      };


    useEffect(() => {

        if (id) {
            getCollectionLocal(id);
            getItemLocal(id);
        }

    }, [id]);

    return (
        <Container fluid className='text-start header'>
            <Row>
                <Col >
                    <h1 className='display-4'>{collection?.name ? collection.name : 'No Name'}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='properties float-start'>
                        <Rating
                            initialRating={collection?.rating ? collection.rating : 0}
                            empty="far fa-star"
                            full="fas fa-star"
                            readonly
                        />
                        <span className='m-auto'>{collection?.rating ? collection.rating : 'No Rating'}</span>
                        <span> · {ratingQuantity} Ratings</span>
                        <span>  {infoIcon}{collection?.topic}  </span>
                    </div>
                </Col>
                <Col>
                    <div className='mb-2 float-end'>
                        <CollectionCanvas setCollection={setCollection} />
                        <ItemCanvas collection={collection} />
                    </div>
                </Col>
            </Row>
            <Row className='my-3 d-flex justify-content-center align-items-center h-100 w-100'>
                <Col md={8}>
                {collection.photo ? (
                        <Card.Img
                            variant="top"
                            src={'http://localhost:3000/' + collection?.photo}
                            alt={collection?.name}
                            className="rounded col-image"
                        />
                    ) : (
                            <span className="display-1 d-flex justify-content-center"> No Image</span>
                    )}
                </Col>
                <Col md={4}>
                    <Card className='h-100 bg-secondary'>
                        <Card.Header as="h4">Description</Card.Header>
                        <Card.Body className='card-body-custom'>
                            <Card.Text>{collection?.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex align-items-center justify-content-center'>
                <h1>Collection Items</h1>
                <Col>
                    <ItemComponent item={item}/>
                </Col>
            </Row>
        </Container >
    );
};

export default CollectionMain;