import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';

// import { Container } from './styles';

export default function Meetups() {
  return (
    <>
      <Header />
      <Background />
    </>
  );
}

Meetups.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
