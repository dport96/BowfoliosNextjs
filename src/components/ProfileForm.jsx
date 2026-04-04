'use client';

import React from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select from 'react-select';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { updateProfile } from '@/lib/actions';
import { ComponentIDs, PageIDs } from '@/lib/ids';

// Define Zod schema for validation
const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  title: z.string().optional(),
  picture: z.string().optional(),
  interests: z.array(z.string()).optional(),
  projects: z.array(z.string()).optional(),
});

const ProfileForm = ({ model, allInterests, allProjects }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...model,
      interests: model.interests || [],
      projects: model.projects || [],
    },
  });

  const [formError, setFormError] = React.useState(null);

  const interestOptions = allInterests.map(i => ({ value: i, label: i }));
  const projectOptions = allProjects.map(p => ({ value: p, label: p }));

  const onSubmit = async (data) => {
    try {
      await updateProfile({ ...data, email: model.email });
      swal('Success', 'Profile updated!', 'success');
    } catch (e) {
      setFormError(e.message);
    }
  };

  return (
      <Container id={PageIDs.homePage} className="py-5">
        <h2 className="text-center mb-4">Your Profile</h2>
        {formError && <Alert variant="danger">{formError}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control id={ComponentIDs.homeFormFirstName} {...register('firstName')} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control id={ComponentIDs.homeFormLastName} {...register('lastName')} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control as="textarea" rows={3} id={ComponentIDs.homeFormBio} {...register('bio')} />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control {...register('title')} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Picture URL</Form.Label>
                    <Form.Control {...register('picture')} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Interests</Form.Label>
                    <Controller
                      name="interests"
                      control={control}
                      render={({ field }) => (
                        <Select
                          isMulti
                          options={interestOptions}
                          value={interestOptions.filter(o => field.value?.includes(o.value))}
                          onChange={opts => field.onChange(opts.map(o => o.value))}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Projects</Form.Label>
                     <Controller
                      name="projects"
                      control={control}
                      render={({ field }) => (
                        <Select
                          isMulti
                          options={projectOptions}
                          value={projectOptions.filter(o => field.value?.includes(o.value))}
                          onChange={opts => field.onChange(opts.map(o => o.value))}
                        />
                      )}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button id={ComponentIDs.homeFormSubmit} type="submit" variant="primary">Update</Button>
            </Card.Body>
          </Card>
        </Form>
      </Container>
  );
};

ProfileForm.propTypes = {
  model: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    title: PropTypes.string,
    picture: PropTypes.string,
    interests: PropTypes.array,
    projects: PropTypes.array,
  }).isRequired,
  allInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
  allProjects: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProfileForm;
