import { css } from '@emotion/react'

export default theme => css`
    .box {
        h1 {
            text-align: center;
            padding: 10px;
            margin-bottom: 1rem;
        }
    }

    .flex-form {
        display: flex;
        flex-direction: column;
        max-width: 400px;
        margin: auto;

        input {
            padding: 0.5rem 1rem;
        }

        div {
            margin-bottom: 0.25rem;
        }

        button {
            margin: 0.5rem 0;
            background-color: #f17c03;
            color: #ffffff;
        }

        .login {
            display: flex;

            p {
                margin-right: 5px;
            }
        }
    }
`
