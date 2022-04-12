import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Category from './components/Category';
import SingleMeal from './components/SingleMeal';
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Category />} />
        <Route path=':id' element={<SingleMeal />} />
      </Routes>
    </>
  );
};

export default App;
