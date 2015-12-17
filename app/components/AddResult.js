const React = require('react-native')
const {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} = React

import Client from '../client'

export default class extends React.Component {
  constructor() {
    super()

    this.state = {
      loser_id: null,
      players: [],
      winner_id: null,
    }
  }

  componentDidMount() {
    Client.players().then((body) => {
      const players = body.data
        .map((player) => {
          return {
            id: player.id,
            name: player.attributes.name,
          }
        })
        .sort((a, b) => {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        })

      this.setState({
        players: players,
      })
    })
  }

  render() {
    const winners = this.renderWinners()
    const losers = this.renderLosers()

    return (
      <View style={style.container}>
        <View style={style.playersContainer}>
          <Text style={style.label}>Winner</Text>
          <View style={style.players}>
            {winners}
          </View>
        </View>
        <View style={style.playersContainer}>
          <Text style={style.label}>Second</Text>
          <View style={style.players}>
            {losers}
          </View>
        </View>
      </View>
    )
  }

  renderLosers() {
    return this.state.players.map((player) => {
      const selectedStyle = player.id == this.state.loser_id
        ? style.selectedLoser
        : null

      return this.renderPlayer(player, selectedStyle, this.selectLoser.bind(this))
    })
  }

  renderPlayer(player, selectedStyle, callback) {
    let styles = [style.player, selectedStyle]

    return (
      <TouchableOpacity
        key={player.id}
        onPress={() => callback(player)}
        style={styles}
      >
        <Text style={style.name}>{player.name}</Text>
      </TouchableOpacity>
    )
  }

  renderWinners() {
    return this.state.players.map((player) => {
      const selectedStyle = player.id == this.state.winner_id
        ? style.selectedWinner
        : null

      return this.renderPlayer(player, selectedStyle, this.selectWinner.bind(this))
    })
  }

  selectLoser(player) {
    this.setState({
      loser_id: player.id,
    })
  }

  selectWinner(player) {
    this.setState({
      winner_id: player.id,
    })
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  label: {
    fontSize: 32,
    textAlign: 'center',
  },
  name: {
    fontSize: 32,
  },
  player: {
    backgroundColor: '#dddddd',
    borderRadius: 30,
    margin: 10,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  players: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  playersContainer: {
    paddingTop: 30,
  },
  selectedLoser: {
    backgroundColor: '#cc0000',
  },
  selectedWinner: {
    backgroundColor: '#00cc00',
  },
})
