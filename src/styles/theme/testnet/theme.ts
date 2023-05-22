import { deepmerge } from '@mui/utils'
import { createTheme } from '@mui/material/styles'
import { COLORS } from './colors'
import { defaultTheme } from '../defaultTheme'

export const testnetTheme = createTheme(
  deepmerge(defaultTheme, {
    palette: {
      background: {
        default: COLORS.testnetLight,
        empty: COLORS.white,
      },
      layout: {
        main: COLORS.brandExtraDark,
        border: COLORS.testnet,
        darkBorder: COLORS.testnet,
        hoverBorder: COLORS.testnet,
        secondary: COLORS.testnet,
        secondaryBackground: COLORS.white,
      },
    },
  }),
)
