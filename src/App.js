import React from 'react';
import MainRoutes from "./routes/mainRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
    return (
        <div className="background">
          <MainRoutes />
          <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={true}
              newestOnTop={true}
              closeOnClick
              pauseOnFocusLoss
              pauseOnHover
          />
        </div>
    );
};

export default App;