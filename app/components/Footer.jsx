import React from 'react';
import { Col, Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="footer mt-auto py-3 bg-dark text-white">
    <Container>
      <Col className="text-center">
        The Bowfolios Project <br />
        University of Hawaii <br />
        Honolulu, HI 96822 <br />
        <a className="text-white" href="https://bowfolios.github.io">https://bowfolios.github.io</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
