import * as React from 'react'
import {Component} from 'react'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {push, goBack} from 'react-router-redux'
import {User} from 'firebase'
import {AppState, AppUi} from '../store.ts'
import {hidePrompt} from '../actions/ui.ts'

import {showSidebar, hideSidebar} from '../actions/ui.ts'

import Flex from '../components/Layout/Flex.tsx'
import {Snackbar, Drawer, MenuItem} from 'material-ui'

function mapProps(state: { store: AppState }) {
  return {
    user: state.store.user,
    showSidebar: state.store.ui.showSidebar,
    showPrompt: state.store.ui.showPrompt,
    promptMessage: state.store.ui.promptMessage,
    promptAction: state.store.ui.promptAction,
    promptHandler: state.store.ui.promptHandler,
  }
}

interface AppProps {
  user: User
  showSidebar: boolean
  showPrompt: boolean
  promptMessage: string
  promptAction: string
  promptHandler: (any?) => any
  dispatch: Dispatch<any>
}

class App extends Component<AppProps, {}> {
  hidePrompt() {
    this.props.dispatch(hidePrompt())
  }

  toggleSidebar(open) {
    this.props.dispatch(open ? showSidebar() : hideSidebar())
  }

  navigateTo(path) {
    this.props.dispatch(push(path))
    this.toggleSidebar(false)
  }

  render() {
    const {showSidebar, showPrompt, promptMessage, promptAction, promptHandler} = this.props

    return <Flex>
      <Drawer
        open={showSidebar}
        docked={false}
        onRequestChange={open => this.toggleSidebar(open) }
        >
        <MenuItem onTouchTap={() => this.navigateTo('/settings')}>settings</MenuItem>
        <MenuItem onTouchTap={() => location.reload()}>reload</MenuItem>
      </Drawer>

      {this.props.children}

      <Snackbar
        open={showPrompt}
        message={promptMessage}
        autoHideDuration={4000}
        action={promptAction}
        onActionTouchTap={() => promptHandler() }
        onRequestClose={() => this.hidePrompt() }/>
    </Flex>
  }
}

export default connect(mapProps)(App)