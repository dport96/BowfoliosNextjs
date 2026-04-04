'use client';

import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { PageIDs } from '@/lib/ids';

const InterestsClient = ({ interests }) => {
  if (!interests) return null;
  return (
    <Container id={PageIDs.interestsPage} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {interests.map((interest, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title className="mt-0">{interest.name}</Card.Title>
                {interest.profiles.map((p, i) => (
                  <Image key={i} roundedCircle src={p.profile.picture} width={50} alt="Profile" />
                ))}
                {interest.projects.map((p, i) => (
                  <Image key={i} roundedCircle src={p.project.picture} width={50} alt="Project" />
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InterestsClient;
