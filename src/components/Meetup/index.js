import React, { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { View } from 'react-native';
import SubsButton from '~/components/Button';

import {
  Container,
  Avatar,
  Info,
  Name,
  When,
  Location,
  Organizer,
} from './styles';

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
        <When>{dateParsed}</When>
        <Location>{data.location}</Location>
        <Organizer>Leading: {data.User.name}</Organizer>
        {!data.past && (
          <SubsButton onPress={action}>
            {canSub ? 'Subscribe' : 'Cancel Subscription'}
          </SubsButton>
        )}
      </Info>
    </Container>
  );
}
