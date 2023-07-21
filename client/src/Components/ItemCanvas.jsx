import { useEffect, useState } from 'react';
import { Button, Form, Offcanvas } from 'react-bootstrap';
import { makeItem } from '../api';
import jwt_decode from 'jwt-decode';

const ItemCanvas = ({collection}) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [user, setUser] = useState('');

    const createItem = async (e) => {
        try {
            e.preventDefault();

            const formData = {name: name, collection_id: collection?.id, userId: user?.id};
            
            console.log(formData);
            const response = await makeItem(formData);
            console.log(response);

        } catch (error) {
            console.error(error);
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

    return (
        <>
            <Button variant="primary mx-2" onClick={handleShow}>
                Add Item
            </Button>
            <Offcanvas className='primary bg-secondary' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title>Add Items in Collection '{collection?.name}'</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Form className='bg-secondary'>
                        <Form.Group className="mb-3">
                            <Form.Label className='fs-2'>Item</Form.Label>
                            <Form.Control size='lg' type="text" placeholder="Item Name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        {/* <Form.Group className="mb-3 fs-3">
                            <Form.Label>Add tags</Form.Label>
                            <Form.Control as="textarea" rows={3} className="form-control-sm" onChange={(e) => setTags(e.target.value)} />
                        </Form.Group> */}
                    </Form>

                </Offcanvas.Body>

                <Button variant="primary m-5 mt-1" type="submit" onClick={(e) => createItem(e)}>
                    Add Items
                </Button>
            </Offcanvas>
        </>
    );
};

export default ItemCanvas;