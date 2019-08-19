import styled from 'styled-components/native';

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const DateSelector = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 20px;
  max-height: 40px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 25px;
  margin: 0 50px;
`;
