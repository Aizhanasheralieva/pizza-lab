import React, { PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar.tsx";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container mt-4">
        <div className="row">{children}</div>
      </main>
    </>
  );
};

export default Layout;
