import styled from 'styled-components/native';
import Button from '~/components/Button';

export const DateSelector = styled.View`
  flex: 1;
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

export const Meetup = styled.View`
  margin: 30px;
  border-radius: 4px;
  background: #fff;
`;

export const Info = styled.View`
  margin: 15px 25px 25px 25px;
`;

export const Avatar = styled.Image`
  width: 100%;
  height: 200px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 3px;
`;

export const Date = styled.Text`
  color: #999;
  margin: 3px 0;
  font-size: 16px;
`;

export const Location = styled.Text`
  color: #999;
  margin: 3px 0;
  font-size: 16px;
`;

export const Organizer = styled.Text`
  color: #999;
  margin: 3px 0;
  font-size: 16px;
`;

export const SubsButton = styled(Button)`
  margin-top: 10px;
`;
