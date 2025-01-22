import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import DetailView from './components/DetailView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<DetailView />} />
      </Routes>
    </Router>
  );
};

export default App;