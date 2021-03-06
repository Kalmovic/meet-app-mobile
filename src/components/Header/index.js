import React from 'react';

import { Container, Image } from './styles';
import logo from '~/assets/M.png';

export default function Header() {
  return (
    <Container>
      <Image source={logo} />
    </Container>
  );
}
