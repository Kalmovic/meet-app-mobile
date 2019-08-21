import React, { useMemo, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, subDays, addDays } from 'date-fns';
import PropTypes from 'prop-types';
import { TouchableOpacity, Alert } from 'react-native';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import { MeetupList, DateSelector, Title, Loading } from './styles';
import api from '~/services/api';

export default function Meetups() {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [meetup, setMeetup] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dateFormatted = useMemo(() => format(date, 'MMMM do'), [date]);
  const dateParamFormatted = useMemo(() => format(date, 'yyyy-MM-dd'), [date]);

  useEffect(() => {
    setLoading(true);
    async function loadMeetups() {
      const response = await api.get('meetups', {
        params: {
          date: dateParamFormatted,
        },
      });

      setMeetup(response.data);
      setLoading(false);
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
    setLoading(false);
  }

  async function loadOnRefresh() {
    const response = await api.get('meetups', {
      params: {
        date,
      },
    });
    setMeetup(response.data);
    setRefreshing(false);
  }

  function refreshList() {
    setPage(1);
    setRefreshing(true);
    loadOnRefresh();
  }

  async function handleSubscription(id) {
    try {
      await api.post(`meetups/${id}/subscriptions`);

      Alert.alert('Success!', 'You are now subscribed to this meetup');
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
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

        {loading ? (
          <Loading size="large" color="#f94d6a" />
        ) : (
          <MeetupList
            onEndReachedThreshold={0.2}
            onEndReached={() => loadMore()}
            onRefresh={() => refreshList()}
            refreshing={refreshing}
            data={meetup}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Meetup
                data={item}
                canSub
                action={() => handleSubscription(item.id)}
              />
            )}
          />
        )}
      </Background>
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="format-list-bulleted" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
};
