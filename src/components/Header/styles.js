import { css } from '@emotion/react'

export default theme => css`
    .root {
        flex-grow: 1;

        .main-header {
            background-color: royalblue;
        }

        .menu-button {
            margin-right: 1rem;
        }

        .title {
            flex-grow: 1;
        }

        .button {
            color: red;
        }
    }
`
