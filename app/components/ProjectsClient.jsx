'use client';

import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PageIDs } from '@/lib/ids';

const ProjectsClient = ({ projects }) => {
  if (!projects) return null;
  return (
    <Container id={PageIDs.projectsPage} className="py-3">
      <Row xs={1} md={2} lg={4} className="g-2">
        {projects.map((project, index) => (
          <Col key={index}>
            <Card className="h-100">
              <Card.Body>
                <Card.Img src={project.picture} className="mb-2" />
                <Card.Title className="mt-0">{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
              </Card.Body>
              <Card.Body>
                {project.interests.map((interest, i) => (
                  <Badge key={i} bg="info" className="me-1">{interest.interest.name}</Badge>
                ))}
              </Card.Body>
              <Card.Footer>
                {project.profiles.map((p, i) => (
                  <Image key={i} roundedCircle src={p.profile.picture} width={50} className="me-1" alt="Participant" />
                ))}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsClient;
