'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { ComponentIDs, PageIDs } from '@/lib/ids';

const SignInPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false,
    });

    if (result.error) {
      setError('Invalid email or password');
    } else {
      router.push('/home');
      router.refresh();
    }
  };

  return (
    <Container id={PageIDs.signInPage} className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Login to your account</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control id={ComponentIDs.signInFormEmail} name="email" type="email" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control id={ComponentIDs.signInFormPassword} name="password" type="password" required />
                </Form.Group>
                <Button id={ComponentIDs.signInFormSubmit} variant="primary" type="submit" className="w-100">Sign In</Button>
              </Form>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
            <Card.Footer className="text-center">
              New here? <Link href="/signup">Register</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
