import React, { useMemo, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Background from '~/components/Background';
import Header from '~/components/Header';
import image from '~/assets/julho2.png';

import {
  MeetupList,
  DateSelector,
  Title,
  Meetup,
  Avatar,
  Info,
  When,
  Name,
  Location,
  Organizer,
  SubsButton,
} from './styles';
import api from '~/services/api';

export default function Meetups() {
  const [date, setDate] = useState(new Date());
  const [meetup, setMeetup] = useState([]);

  const dateFormatted = useMemo(() => format(date, 'MMMM do'), [date]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: { date },
      });

      console.tron.log(response.data);
      setMeetup(response.data);
    }
    loadMeetups();
  }, [date]);

  function HandlePrevDay() {
    setDate(subDays(date, 1));
  }

  function HandleAddDay() {
    setDate(addDays(date, 1));
  }

  return (
    <>
      <Background>
        <Header />
        <DateSelector>
          <TouchableOpacity onPress={HandlePrevDay}>
            <Icon name="keyboard-arrow-left" size={35} color="#fff" />
          </TouchableOpacity>
          <Title>{dateFormatted}</Title>
          <TouchableOpacity onPress={HandleAddDay}>
            <Icon name="keyboard-arrow-right" size={35} color="#fff" />
          </TouchableOpacity>
        </DateSelector>

        <MeetupList
          data={meetup}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup>
              <Avatar
                source={{
                  uri: `http://192.168.0.107:3333/files/${item.File.path}`,
                }}
              />
              <Info>
                <Name>{item.title}</Name>
                <When>{item.date}</When>
                <Location>{item.location}</Location>
                <Organizer>Leading: {item.User.name}</Organizer>
                <SubsButton>Subscribe</SubsButton>
              </Info>
            </Meetup>
          )}
        />
      </Background>
    </>
  );
}

Meetups.navigationOptions = {
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};
