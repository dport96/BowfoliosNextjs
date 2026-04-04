import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { PageIDs } from '@/lib/ids';

const LandingPage = () => (
  <div id={PageIDs.landingPage}>
    <div className="landing-green-background">
      <Container className="text-center">
        <h1 className="pt-4 text-white" style={{ fontSize: '36pt' }}>Welcome to Bowfolios</h1>
        <h3 className="pb-4 text-white">Profiles, projects, and interest areas for the UH Community</h3>
      </Container>
    </div>
    <div className="landing-white-background py-5">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: '#376551' }}>Start by making your profile....</h2>
        <Row md={1} lg={2} className="g-4">
          <Col>
            <Image src="/images/home-page.png" width={500} fluid alt="Home Page Preview" />
          </Col>
          <Col>
            <Image src="/images/profiles-page.png" width={500} fluid alt="Profiles Page Preview" />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-green-background py-5">
      <Container className="justify-content-center text-center">
        <h2 style={{ color: 'white' }}>...then add your projects</h2>
        <Row md={1} lg={2} className="g-4">
          <Col>
            <Image src="/images/add-project-page.png" width={500} fluid alt="Add Project Page Preview" />
          </Col>
          <Col>
            <Image src="/images/projects-page.png" width={500} fluid alt="Projects Page Preview" />
          </Col>
        </Row>
      </Container>
    </div>
    <div className="landing-white-background text-center py-5">
      <h2 style={{ color: '#376551' }}>
        Connect to people and projects with shared interests!
      </h2>
      <Container>
        <Row md={1} lg={2} className="g-4">
          <Col>
            <Image src="/images/interests-page.png" width={500} fluid alt="Interests Page Preview" />
          </Col>
          <Col>
            <Image src="/images/filter-page.png" width={500} fluid alt="Filter Page Preview" />
          </Col>
        </Row>
      </Container>
    </div>
  </div>
);

export default LandingPage;
