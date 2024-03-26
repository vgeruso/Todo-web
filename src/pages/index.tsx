import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Toaster } from "react-hot-toast";

import "../styles/global.css";
import { GlobalStyle } from "../styles/GlobalStyle";

import Header from "../components/Header";
import Tasks from "../components/Tasks";

const IndexPage: React.FC<PageProps> = () => {  
  return (
    <>
      <GlobalStyle/>
      <Header/>
      <Tasks/>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Task</title>
