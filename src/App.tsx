import React from 'react';
import './App.css';
import { SearchWidget } from './component/search/SearchWidget';

const App: React.FC = () => {
  return (
    <div className="App">
      <SearchWidget></SearchWidget>
    </div>
  );
}

export default App;
