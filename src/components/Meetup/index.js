import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { View } from 'react-native';

import {
  Container,
  Avatar,
  Info,
  Name,
  When,
  Location,
  Organizer,
  SubsButton,
} from './styles';

export default function Meetup({ data }) {
  const dateParsed = useMemo(
    () => format(parseISO(data.date), "MMMM do',' HH:mm"),
    [data.date]
  );

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
        <SubsButton onPress={() => {}} enabled={data.past}>
          Subscribe
        </SubsButton>
      </Info>
    </Container>
  );
}
