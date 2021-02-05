import { createGlobalStyle } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rc-slider/assets/index.css";

const GlobalStyle = createGlobalStyle`
body{
    font-family: "Montserrat", sans-serif;
    // font-size: 14px;
    line-height: 1.6;
    color: #636b6f;
    background-color: #ffffff;
    box-sizing: border-box;
}
.uploader-container {
    width: 100%;
    height: 135px;
    padding: 50px 0;
    border: 2px dashed #ccc;
    text-align: center;
    cursor: pointer;
    color: #585758;
    outline: none;
    .upload-style-button {
        display: inline-block;
        border: 1px solid #36613e;
        padding: 2px 10px;
        border-radius: 0.2rem;
        color: #ffffff;
        background-color: #36613e;
        font-size: 0.9rem;
    }
    &:focus,
    &:hover,
    &.open {
        border-color: #36613e;
        .upload-style-button {
        border-color: #2a5231;
        background-color: #2a5231;
        }
    }
}
.border-bot-dotted{
    border-bottom:1px dotted #999;
    margin:1rem 0;
}
.hand{
    cursor:pointer;
}
`;

export default GlobalStyle;
