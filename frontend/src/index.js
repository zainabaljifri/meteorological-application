import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import Cities from './components/Cities';
import reportWebVitals from './reportWebVitals';
import Test from './components/App';
import Index from './components/Card';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
      <Index/>
    <div className="App">
        <div>
            <Test/>          
        </div>
    </div>
   
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
