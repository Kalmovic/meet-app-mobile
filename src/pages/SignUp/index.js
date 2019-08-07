import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/M.png';
import Background from '~/components/Background';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Full name"
          />
          <FormInput
            icon="mail-outline"
            keyBoardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Type your email"
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Type your secret password"
          />

          <SubmitButton onPress={() => {}}>Log in</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Already have account</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
