import { Col, Container, Navbar, Row } from 'react-bootstrap';
import AppNavbar from '../Components/AppNavbar';
import SquareCollection from '../Components/SquareCollection';
import ItemComponent from '../Components/ItemComponent';
import { useEffect, useState } from 'react';
import { getAllCollections, getAllItems } from '../api';
import CollectionCanvas from '../Components/CollectionCanvas';


const Home = () => {

    const [collections, setCollections] = useState({});
    const [itemCounts, setItemCounts] = useState({});
    const [items, setItems] = useState({});

    const getAllCollectionsLocal = async () => {
        try {
            const response = await getAllCollections();
            setCollections(response.data.collections);
            setItemCounts(response.data.itemCounts);
        } catch (error) {
            console.log(error);
        }

    }

    const getAllItemsLocal = async () => {
        const response = await getAllItems();
        console.log(response);
        setItems(response.data)
    };

    useEffect(() => {
        getAllCollectionsLocal();
        getAllItemsLocal();
    }, []);

    return (
        <>
            <AppNavbar />
            <Container className='collection-container'>
                <h1 className='text-center my-4'>Top Largest 5 Collections</h1>
                <CollectionCanvas></CollectionCanvas>
                <Row className='justify-content-lg-between'>
                    {collections?.length && collections?.map((collection, index) => {

                        return (<Col s={3} key={index}>
                            <SquareCollection collection={collection} itemCounts={itemCounts} />
                        </Col>)
                    })}

                </Row>

                <h1 className='text-center my-4'>Items:</h1>
                <Row className='d-block'>
                    {items?.length && items?.map((item, index) => {
                        return (<Col key={index}>
                            <ItemComponent item={item} />
                        </Col>)
                    })}


                </Row>
            </Container>
        </>
    );
};

export default Home;
