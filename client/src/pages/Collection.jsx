import { Container } from 'react-bootstrap';
import AppNavbar from '../Components/AppNavbar';
import CollectionCanvas from '../Components/CollectionCanvas';
import CollectionMain from '../Components/CollectionMain';

const Collection = () => {
    return (
        <div>
            <AppNavbar/>
            <CollectionMain />
        </div>
    );
};

export default Collection;