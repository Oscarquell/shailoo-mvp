import React from 'react';
import MainRoutes from "./routes/mainRoutes";
import {Bounce, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
    return (
        <div className="background">
          <MainRoutes />
          <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
          />
        </div>
    );
};

export default App;