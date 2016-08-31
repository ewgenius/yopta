import * as React from 'react'
import {render} from 'react-dom'
import * as configure from 'react-tap-event-plugin'
import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles'
import './styles/main.scss'

import App from './components/App.tsx'
import LoginView from './containers/views/LoginView.tsx'

configure()

const container = document.querySelector('#root')
const theme = getMuiTheme({
  appBar: {
    height: 56
  }
})

render(<MuiThemeProvider muiTheme={theme}>
  <LoginView />
</MuiThemeProvider>, container)