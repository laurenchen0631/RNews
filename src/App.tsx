/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TopHeadlines from './components/TopHeadlines';

const RootStack = createStackNavigator(
    {
        TopHeadlines,
    },
    {
        initialRouteName: 'TopHeadlines',
    }
);

export default RootStack;

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <RootStack />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
