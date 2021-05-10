import React from "react"

import { useTheme } from "@material-ui/core/styles"
import styles from "./styles"
import { Button as MuiButton } from "@material-ui/core"

const Button = ({ children }) => {
  const theme = useTheme()
  console.log(styles(theme))
  return (
    <div css={styles(theme)}>
      <MuiButton className={"button"} variant="contained">{children}</MuiButton>
    </div>
  )
}

export default Button
