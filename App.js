// imports -> general
import * as Location from 'expo-location';
import { useState } from 'react';
// imports -> components
import { Button, StyleSheet, Text, View } from 'react-native';

// Main component
export default function App() {
  // states
  const [locationsData, setLocationsData] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(false);

  // functions -> handleChange
  const handleChangeShowHistory = () => {
    setShowHistory((prev) => !prev);
  };

  // functions -> getData
  const getLocation = async () => {
    setLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('El permiso a la ubicación ha sido denegada');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setLocationsData([...locationsData, { latitude, longitude }]);
    setLoading(false);
  };

  // component -> locationsList
  const locationsList = (locationsData) => {
    let listElement = [];

    locationsData.map((loc, index) =>
      listElement.push(
        <Text key={index}>
          <span style={{ fontWeight: 'bold' }}>Latitud:</span> {loc.latitude},
          <span style={{ fontWeight: 'bold' }}> Longitud:</span> {loc.longitude}
        </Text>
      )
    );

    return listElement;
  }; // locationsList

  // View
  return (
    <View style={styles.container}>
      <Button title="LOCATION NOW" onPress={getLocation} />
      <br />
      {loading && <Text>Cargando...</Text>}
      <br />
      {locationsData.length > 0 && (
        <Button
          title={!showHistory ? 'Mostrar Historial' : 'Ocultar Hitorial'}
          onPress={handleChangeShowHistory}
        />
      )}
      <br />
      {showHistory && locationsList(locationsData)}
    </View>
  ); // return
} // App

// Main styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); // styles
