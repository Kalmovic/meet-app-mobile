import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  margin: 30px;
  border-radius: 4px;
  background: #fff;
`;

export const Info = styled.View`
  margin: 15px 25px 15px 25px;
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

export const When = styled.Text`
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
  margin-bottom: 10px;
  font-size: 16px;
`;

export const SubsButton = styled(Button)`
  opacity: ${props => (props.enabled ? 0.6 : 1)};
`;
