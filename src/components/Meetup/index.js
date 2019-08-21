import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import SubsButton from '~/components/Button';

import { Container, Avatar, Info, Name, Text, Line } from './styles';

export default function Meetup({ data, canSub, action }) {
  const dateParsed = useMemo(
    () => format(parseISO(data.date), "MMMM do',' HH:mm"),
    [data.date]
  );

  console.tron.log(data);

  return (
    <Container>
      <Avatar
        source={{
          uri: `http://192.168.0.107:3333/files/${data.File.path}`,
        }}
      />
      <Info>
        <Name>{data.title}</Name>
        <Line>
          <Icon name="today" size={20} color="#999" />
          <Text>{dateParsed}</Text>
        </Line>
        <Line>
          <Icon name="location-on" size={20} color="#999" />
          <Text>{data.location}</Text>
        </Line>
        <Line>
          <Icon name="person" size={20} color="#999" />
          <Text>Leading: {data.User.name}</Text>
        </Line>
        {!data.past && (
          <SubsButton onPress={action}>
            {canSub ? 'Subscribe' : 'Cancel Subscription'}
          </SubsButton>
        )}
      </Info>
    </Container>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    past: PropTypes.bool,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    File: PropTypes.shape({
      url: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  }).isRequired,
  action: PropTypes.func,
  canSub: PropTypes.bool,
};

Meetup.defaultProps = {
  action: null,
  canSub: false,
};
