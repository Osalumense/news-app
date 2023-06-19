import React from "react";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
