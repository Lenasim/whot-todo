import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { height, width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Whot To Do</Text>
      <View style={styles.card}>
        <TextInput style={styles.input} placeholder={"New To Do"}>

        </TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdd835',
    alignItems: 'center',
  },
  title: {
    color: '#455a64',
    fontSize: 30,
    marginVertical: 30,
    fontWeight: '200'
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    width: width - 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    //shadow
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(50, 50, 50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOrrset: {
          height: -10,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    }),
  }
});
