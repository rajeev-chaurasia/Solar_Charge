import React, { Component } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class QRCodeScanner extends Component {
  state = {
    hasPermission: null,
    scanned: false,
  }

  componentDidMount = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    this.setState({ hasPermission: status === 'granted' })
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true })
    data = JSON.parse(data)
    console.log(data)
    if (data.type === 'stationId') {
      const stationId = data.value
      console.log(stationId)
      this.props.navigation.navigate('Transaction', {
        stationID: stationId,
      })
    } else {
       alert('Invalid QR Type. Please scan Station QR code.')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: '#fff' }}>
            Camera permission is not granted
          </Text>
        ) : (
          <BarCodeScanner
            onBarCodeScanned={
              this.state.scanned ? undefined : this.handleBarCodeScanned
            }
            style={StyleSheet.absoluteFillObject}
          />
        )}
        {this.state.scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: '30%',
    alignSelf: 'center',
    height: '40%',
    width: '70%',
  },
})
