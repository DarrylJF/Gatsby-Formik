import { css } from "@emotion/react"


export default (theme) => css`
  .asset-preview-wrapper {
    overflow: hidden;
    position: relative;
    min-height: 300px;

    .asset-preview {
      width: 100%;
      object-fit: cover;
      height: 100%;
      border-radius: ${theme.shape.borderRadius}px;
    }
  }

  .button {
    background-color: red !important;
    margin: 20px
  }
`;
