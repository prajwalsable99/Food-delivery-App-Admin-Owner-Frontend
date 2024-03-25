import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

// DarkTheme.js
import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const DarkTheme = extendTheme({

  styles: {
    global: (props) => ({
      body: {
        bg: "black",
        color: "white",
      },
    }),
  },
});




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>


    <BrowserRouter>

      <ChakraProvider theme={DarkTheme}>

        <Provider store={store}>

          <App />
        </Provider>

      </ChakraProvider>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
