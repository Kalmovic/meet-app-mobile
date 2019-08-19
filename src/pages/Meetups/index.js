import React, { useMemo, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, subDays, addDays } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import image from '~/assets/julho2.png';

import { MeetupList, DateSelector, Title } from './styles';
import api from '~/services/api';

export default function Meetups() {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetup, setMeetup] = useState([]);
  const dateFormatted = useMemo(() => format(date, 'MMMM do'), [date]);
  const dateParamFormatted = useMemo(() => format(date, 'yyyy-MM-dd'), [date]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date: dateParamFormatted,
          page: 1,
        },
      });

      setMeetup(response.data);
    }

    loadMeetups();
  }, [date, dateParamFormatted]);

  async function loadMore() {
    const nextPage = page + 1;
    const response = await api.get('meetups', {
      params: {
        date: dateParamFormatted,
        page: nextPage,
      },
    });

    setMeetup(nextPage >= 2 ? [...meetup, ...response.data] : response.data);
    setPage(nextPage);
  }

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
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          data={meetup}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
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
