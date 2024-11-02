import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #1F1F1F;
    color: #FFFFFF; 
  }

  a {
    color: #1890ff;
  }

  .ant-btn {
    background-color: #333; 
    color: #fff; 
  }

  .ant-table {
    background-color: #222;
  }
`;