import * as React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';

import { ChakraProvider } from '@chakra-ui/react'
const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);


// 1. import `ChakraProvider` component

root.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>
);