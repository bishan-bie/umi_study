import React, { Fragment, useState } from "react";
// import Header from "./components/Header";
import Footer from "@/components/footer";
// import Content from "./components/Content";
// import About from "./components/About";
// import Main from "./components/Main";

import "./index.css";

const Home = () => {
  const [pageType, setPageType] = useState("home");
  return (
    <Fragment>
      <div
        className={`xh-home-wrapper ${
          pageType === "about" ? "xh-about-wrapper" : ""
        }`}
      >
        {/* <Header
          handleClickNav={(value) => {
            setPageType(value);
          }}
          tab={pageType}
        />
        <Main>
          {pageType === "home" && <Content />}
          {pageType === "about" && <About />}
        </Main> */}
        <Footer />
      </div>
    </Fragment>
  );
};

export default Home;
