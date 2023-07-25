import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Offcanvas, Form, Container, Row, Col } from 'react-bootstrap';
import Rating from 'react-rating';
import info from '../images/info.png'
import { getAllCollections, makeCollection } from '../api';
import Select from 'react-select';
import jwt_decode from 'jwt-decode';



const CollectionCanvas = ({ setCollectionData }) => {

    const [show, setShow] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [image, setImage] = useState(null);
    const [collection, setCollection] = useState('');
    const [newTopic, setNewTopic] = useState('');
    const [user, setUser] = useState('');

    const [topicOptions, setTopicOptions] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAllCollectionsLocal = async () => {
        try {
          const response = await getAllCollections();
    
          const topics = response.data.collections.map((collection) => ({
            value: collection.topic,
            label: collection.topic,
          }));
    
          setTopicOptions(topics);
    
          setCollection(response.data.collections);
        } catch (error) {
          console.log(error);
        }
      };

    const createCollection = async (e) => {
        try {
          e.preventDefault();
    
          let formData = new FormData();
          formData.append('name', name);
          formData.append('description', description);
          formData.append('userId', user?.id);
          
          let selectedTopics = [];
    
          if (newTopic) {
            selectedTopics = [newTopic];
          } else {
            selectedTopics = [topic];
          }
    
          formData.append('topic', selectedTopics[0]); // Save the first topic as a string
          formData.append('image', image);
    
          const response = await makeCollection(formData);
    
          console.log(response);
          handleClose();
          setCollectionData(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      const handleTopicInputChange = (inputValue) => {
        setNewTopic(inputValue);
      };
    
      const handleKeyPress = (event) => {
        if (event.key === 'Enter' && newTopic) {
          // Append the new topic to the existing options
          setTopicOptions((prevOptions) => [
            ...prevOptions,
            { value: newTopic, label: newTopic },
          ]);
          setTopic(newTopic);
          setNewTopic(''); // Reset the newTopic state for the next input
        }
      };

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
        getAllCollectionsLocal();
      }, []);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add a Collection
            </Button>
            <Offcanvas className='primary bg-secondary' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title>Add a Collection</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Form className='bg-secondary'>
                        <Form.Group className="mb-3">
                            <Form.Label className='fs-2'>Collection</Form.Label>
                            <Form.Control size='lg' type="text" placeholder="Collection Name" onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3 fs-3">
                            <Form.Label>Add a description</Form.Label>
                            <Form.Control as="textarea" rows={5} className="form-control-sm" onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3 fs-5">
                            <Form.Label>Add a topic</Form.Label>
                            <Select
                                options={topicOptions}
                                isClearable
                                isSearchable
                                onChange={(selectedOption) => setTopic(selectedOption?.value || '')}
                                onInputChange={handleTopicInputChange}
                                onKeyDown={handleKeyPress} 
                            />
                        </Form.Group>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Add an image (optional)</Form.Label>
                            <Form.Control type="file" accept="image/*" size="sm" onChange={(e) => setImage(e.target.files[0])} />
                        </Form.Group>
                    </Form>
                </Offcanvas.Body>

                <Button variant="primary m-5 mt-1" type="submit" onClick={(e) => createCollection(e)}>
                    Create Collection
                </Button>

            </Offcanvas>
        </>
    );
};

export default CollectionCanvas;