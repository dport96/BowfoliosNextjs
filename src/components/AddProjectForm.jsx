'use client';

import React from 'react';
import { Card, Col, Container, Row, Form, Button, Alert } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Select from 'react-select';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { addProjectAction } from '@/lib/actions';
import { ComponentIDs, PageIDs } from '@/lib/ids';
import ClientOnly from './ClientOnly';

const AddProjectForm = ({ allInterests, allProfiles }) => {
  const addProjectSchema = z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().optional(),
    homepage: z.string().optional(),
    picture: z.string().optional(),
    interests: z.array(z.string()).min(1, 'At least one interest is required'),
    participants: z.array(z.string()).optional(),
  });

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(addProjectSchema),
    defaultValues: { interests: [], participants: [] },
  });

  const [formError, setFormError] = React.useState(null);

  const interestOptions = allInterests.map(i => ({ value: i, label: i }));
  const profileOptions = allProfiles.map(p => ({ value: p, label: p }));

  const onSubmit = async (data) => {
    try {
      await addProjectAction(data);
      swal('Success', 'Project added successfully', 'success');
      reset();
    } catch (e) {
      setFormError(e.message);
    }
  };

  return (
    <ClientOnly>
      <Container id={PageIDs.addProjectPage} className="py-5">
        <Row className="justify-content-center">
          <Col xs={10}>
            <Col className="text-center"><h2>Add Project</h2></Col>
            {formError && <Alert variant="danger">{formError}</Alert>}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col xs={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control id={ComponentIDs.addProjectFormName} {...register('name')} isInvalid={!!errors.name} />
                        <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Picture URL</Form.Label>
                        <Form.Control id={ComponentIDs.addProjectFormPicture} {...register('picture')} />
                      </Form.Group>
                    </Col>
                    <Col xs={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>Homepage</Form.Label>
                        <Form.Control id={ComponentIDs.addProjectFormHomePage} {...register('homepage')} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} id={ComponentIDs.addProjectFormDescription} {...register('description')} />
                  </Form.Group>
                  <Row>
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Interests</Form.Label>
                        <Controller
                          name="interests"
                          control={control}
                          render={({ field }) => (
                            <Select
                              isMulti
                              options={interestOptions}
                              onChange={opts => field.onChange(opts.map(o => o.value))}
                            />
                          )}
                        />
                        {errors.interests && <div className="text-danger small mt-1">{errors.interests.message}</div>}
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Participants</Form.Label>
                        <Controller
                          name="participants"
                          control={control}
                          render={({ field }) => (
                            <Select
                              isMulti
                              options={profileOptions}
                              onChange={opts => field.onChange(opts.map(o => o.value))}
                            />
                          )}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button id={ComponentIDs.addProjectFormSubmit} type="submit" variant="primary">Submit</Button>
                </Card.Body>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
    </ClientOnly>
  );
};

AddProjectForm.propTypes = {
  allInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
  allProfiles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddProjectForm;
