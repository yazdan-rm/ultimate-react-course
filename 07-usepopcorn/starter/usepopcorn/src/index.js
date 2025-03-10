import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App-v1';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      {/*<StarRating maxRating={'5'}/>*/}
      {/*<StarRating maxRating={5}/>*/}
      {/*<StarRating maxRating={5} messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}/>*/}
      {/*<StarRating maxRating={5} defaultRating={2}/>*/}
      {/*<StarRating size={24} color={'red'}/>*/}
      <App/>
    </React.StrictMode>
);
