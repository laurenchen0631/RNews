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
import Article from './components/Article';

const RootStack = createStackNavigator(
    {
        TopHeadlines: {
            screen: TopHeadlines,
            navigationOptions: () => ({
                title: '頭條新聞',
                headerBackTitle: null,
            }),
        },
        Article: {
            screen: Article,
            navigationOptions: {
                title: '頭條新聞',
            },
        },
    },
    {
        initialRouteName: 'TopHeadlines',
    },
);

export default RootStack;
