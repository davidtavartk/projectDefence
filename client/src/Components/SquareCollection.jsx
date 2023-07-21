import { Button, Card, Container } from 'react-bootstrap';
import whiskey from '../images/whiskey.jpg';
import { useNavigate } from 'react-router-dom';


const SquareCollection = ({ collection, itemCounts}) => {
    const image = <img src={whiskey} alt="Image" className='rounded-4 col-image' />;
    // const collectionName = 'Whiskey'
    const cardTitle = "Whiskey Collection";
    const itemNum = 8;
    // const rating = 3.7;
    const star = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>;

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/collection/${collection.id}`);
    }

    return (
        <div className="square m-3">
            <Card style={{ width: '18rem' }} className="bg-secondary">
                <Card.Body className="p-0 square-top">
                    {collection?.photo ? (
                        <Card.Img
                            variant="top"
                            src={'http://localhost:3000/' + collection?.photo}
                            alt={collection?.name}
                            className="square-image"
                        />
                    ) : (
                        <h3 className="text-center square-letter">{collection?.name[0]}</h3>
                    )}
                </Card.Body>
                <Card.Body className='border-top square-body'>
                    <Card.Title className='text-start'>{collection?.name}</Card.Title>
                    <Card.Text className='text-start'>
                        This collection has <b>{itemCounts?.find(count => count.id === collection.id).count }</b> items!
                    </Card.Text>
                    <Card.Text className='d-flex justify-content-between'>
                        <span className='text-muted'>{collection?.topic ? `Topic: ${collection.topic}` : 'No Topic'}</span>
                        <span>{collection?.rating ? collection.rating : 'No Rating'} {star}</span>
                    </Card.Text>

                    <Button variant="primary" className='align-center' onClick={handleButtonClick}>View Collection</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SquareCollection;