import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import routePaths from './routes/routePaths';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Item from './pages/Item';
import MyCollection from './pages/MyCollection';




function App() {

  return (
    <> 
    <Routes>
      <Route path= {routePaths.Registration} element = {<Registration />} />
      <Route path= {routePaths.Login} element = {<Login />} />
      <Route path= {routePaths.Home} element = {<Home />} />
      <Route path= {routePaths.Collection} element = {<Collection />} />
      <Route path= {routePaths.Item} element = {<Item />} />
      <Route path= {routePaths.MyCollection} element = {<MyCollection />} />
    </Routes>
    </>
  );
}

export default App;