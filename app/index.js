const React = require('react-native')
const {
  TabBarIOS,
} = React

import AddResult from './components/AddResult'
import Players from './components/Players'
import Results from './components/Results'

const TABS = {
  ADD_RESULT: 2,
  PLAYERS: 0,
  RESULTS: 1,
}

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedTab: TABS.PLAYERS,
    }
  }

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          onPress={() => this._selectTab(TABS.PLAYERS)}
          selected={this.state.selectedTab == TABS.PLAYERS}
          icon={require('./icons/rankings.png')}
          title="Players"
        >
          <Players />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          onPress={() => this._selectTab(TABS.ADD_RESULT)}
          selected={this.state.selectedTab == TABS.ADD_RESULT}
          icon={require('./icons/add-result.png')}
          title="Add Result"
        >
          <AddResult />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          onPress={() => this._selectTab(TABS.RESULTS)}
          selected={this.state.selectedTab == TABS.RESULTS}
          icon={require('./icons/results.png')}
          title="Results"
        >
          <Results />
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }

  _selectTab(tab) {
    this.setState({
      selectedTab: tab,
    })
  }
}
