'use client';

import React, { useState } from 'react';
import { Container, Card, Image, Badge, Row, Col, Form, Button } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { ComponentIDs, PageIDs } from '@/lib/ids';
import ClientOnly from './ClientOnly';

const FilterProfiles = ({ allInterests, initialProfiles }) => {
  const [filteredProfiles, setFilteredProfiles] = useState(initialProfiles);
  const { handleSubmit, control } = useForm();

  const interestOptions = allInterests.map(i => ({ value: i, label: i }));

  const onSubmit = (data) => {
    const selected = data.interests || [];
    if (selected.length === 0) {
      setFilteredProfiles(initialProfiles);
    } else {
      setFilteredProfiles(
        initialProfiles.filter(profile => selected.every(interest => profile.interests.includes(interest))),
      );
    }
  };

  return (
    <ClientOnly>
      <Container id={PageIDs.filterPage} className="py-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="align-items-end mb-4">
            <Col md={10}>
              <Form.Group>
                <Form.Label>Filter by Interests</Form.Label>
                <Controller
                  name="interests"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id={ComponentIDs.filterFormInterests}
                      isMulti
                      options={interestOptions}
                      onChange={opts => field.onChange(opts.map(o => o.value))}
                    />
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button id={ComponentIDs.filterFormSubmit} type="submit" variant="primary" className="w-100 mt-auto">Filter</Button>
            </Col>
          </Row>
        </Form>

        <Row xs={1} md={2} lg={4} className="g-2">
          {filteredProfiles.map((profile, index) => (
            <Col key={index}>
              <Card className="h-100">
                <Card.Header>{profile.picture && <Image src={profile.picture} width={50} alt="Profile" />}</Card.Header>
                <Card.Body>
                  <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{profile.title}</Card.Subtitle>
                  <Card.Text>{profile.bio}</Card.Text>
                </Card.Body>
                <Card.Body>
                  {profile.interests.map((interest, j) => <Badge key={j} bg="info" className="me-1">{interest}</Badge>)}
                </Card.Body>
                <Card.Footer>
                  <h5>Projects</h5>
                  {profile.projects.map((pic, j) => pic && <Image key={j} src={pic} width={50} className="me-1" alt="Project" />)}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </ClientOnly>
  );
};

FilterProfiles.propTypes = {
  allInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
  initialProfiles: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
    interests: PropTypes.arrayOf(PropTypes.string),
    projects: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default FilterProfiles;
