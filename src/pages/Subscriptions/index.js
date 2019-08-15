import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';

// import { Container } from './styles';

export default function Subscriptions() {
  return (
    <>
      <Header />
      <Background />
    </>
  );
}

Subscriptions.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};
