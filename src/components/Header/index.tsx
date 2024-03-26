import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import { Container, Title } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <StaticImage
        style={{
          height: '50px',
          width: '50px'
        }}  
        alt='logo-app'
        src='../../images/noun-planning-4894990.png'
      />
      <Title>
        Task Manager
      </Title>
    </Container>
  );
};

export default Header;
