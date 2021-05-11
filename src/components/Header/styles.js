import { css } from '@emotion/react'

export default theme => css`
    .root {
        flex-grow: 1;

        .menu-button {
            margin-right: ${theme.spacing(2)};
        }

        .title {
            flex-grow: 1;
            color: red;
        }

        .button {
            color: green !important;
        }
    }
`
