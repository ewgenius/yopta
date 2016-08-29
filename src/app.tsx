import * as React from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import './styles/main.scss'

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'

import App from './components/App.tsx'

configure()

const container = document.querySelector('#root')

const theme = getMuiTheme({
  appBar: {
    height: 56
  }
})

render(<MuiThemeProvider muiTheme={theme}>
  <App />
</MuiThemeProvider>, container)