import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import Header from '~/components/Header';
import image from '~/assets/julho2.png';

import {
  DateSelector,
  Title,
  Meetup,
  Avatar,
  Info,
  Date,
  Name,
  Location,
  Organizer,
  SubsButton,
} from './styles';

export default function Meetups() {
  return (
    <>
      <Background>
        <Header />
        <DateSelector>
          <Icon name="keyboard-arrow-left" size={35} color="#fff" />
          <Title>16 of June</Title>
          <Icon name="keyboard-arrow-right" size={35} color="#fff" />
        </DateSelector>

        <Meetup>
          <Avatar source={image} />
          <Info>
            <Name>Meetup de Jovens</Name>
            <Date>Rua Guilherme Gembala, 260</Date>
            <Location>Rua Guilherme Gembala, 260</Location>
            <Organizer>Organizador: Diego Fernandes</Organizer>
            <SubsButton>Subscribe</SubsButton>
          </Info>
        </Meetup>
      </Background>
    </>
  );
}

Meetups.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
