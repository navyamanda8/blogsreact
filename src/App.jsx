// src/App.jsx
// import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";

const App = () => {
  return (
    <div>
      <Header />
      <Home />
      <Blogs />
      <Contact />
    </div>
  );
};

export default App;
