'use client';

import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageIDs } from '@/lib/ids';

const ProfilesClient = ({ profiles }) => {
  if (!profiles) return null;
  return (
    <Container id={PageIDs.profilesPage} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {profiles.map((profile, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Header>
                <Image src={profile.picture} width={50} alt={profile.firstName} />
                <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
                <Card.Subtitle><span className="text-muted">{profile.title}</span></Card.Subtitle>
              </Card.Header>
              <Card.Body>
                <Card.Text>{profile.bio}</Card.Text>
                <div className="mb-2">
                  {profile.interests.map((interest, i) => (
                    <Badge key={i} bg="info" className="me-1">{interest.interest.name}</Badge>
                  ))}
                </div>
                <h5>Projects</h5>
                {profile.projects.map((p, i) => (
                  <Image key={i} src={p.project.picture} width={50} className="me-1" alt="Project" />
                ))}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProfilesClient;
