import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { MeetupList } from './styles';
import api from '~/services/api';

function Subscriptions({ isFocused }) {
  const [subMeetup, setSubMeetup] = useState([]);

  async function loadSubsMeetups() {
    const response = await api.get('subscriptions');
    console.tron.log(response);
    setSubMeetup(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadSubsMeetups();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      Alert.alert('Success', 'You are unsubscribed from this meeup.');
      loadSubsMeetups();
    } catch (err) {
      Alert.alert('Erro', err.response.data.error);
    }
  }

  return (
    <>
      <Header />
      <Background>
        <MeetupList
          data={subMeetup}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetup
              action={() => handleCancel(item.Meetup.id)}
              data={item.Meetup}
            />
          )}
        />
      </Background>
    </>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon,
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool,
};

Subscriptions.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(Subscriptions);
