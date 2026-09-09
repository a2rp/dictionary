import React from 'react'
import Dictionary from './dictionary/Dictionary'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <Dictionary />
            <ToastContainer />
        </div>
    )
}

export default App


