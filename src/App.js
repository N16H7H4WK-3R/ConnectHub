import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './views/signUpPage';
import LoginPage from "./views/loginPage";
import Root from "./views/root";
import NotFoundPage from "./views/notFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Root />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}


export default App;
