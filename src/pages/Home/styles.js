import styled from "styled-components";
export const Wrapper = styled.div`
  .canvas-container {
    box-shadow: 0rem 0rem 0.5rem rgba(0, 0, 0, 0.1);
    overflow: auto;
  }
  .konvajs-content {
    border: 1px solid #a6a6a6 !important;
    margin: 2rem;
    display: inline-block;
  }
  .layer-texts {
    z-index: 99999;
  }
  .layer-images {
    z-index: 1;
  }
`;
