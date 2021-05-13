import { css } from '@emotion/react'

export default theme => css`
    .root {
        flex-grow: 1;

        .main-header {
            background-color: #f17c03;

            svg {
                font-size: 2rem;
                color: #fff;
            }
        }

        .menu-button {
            margin-right: 1rem;
        }

        .title {
            flex-grow: 1;
        }

        .button {
            color: #ffffff;
            border: 1px solid #ffffff;
        }
    }
`
