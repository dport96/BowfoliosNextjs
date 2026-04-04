'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import swal from 'sweetalert';
import { ComponentIDs, PageIDs } from '@/lib/ids';

const SignUpPage = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      swal('Success', 'Account created! Please sign in.', 'success');
      router.push('/signin');
    } else {
      const data = await res.json();
      setError(data.message || 'Registration failed');
    }
  };

  return (
    <Container id={PageIDs.signUpPage} className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Register your account</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control id={ComponentIDs.signUpFormEmail} name="email" type="email" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control id={ComponentIDs.signUpFormPassword} name="password" type="password" required />
                </Form.Group>
                <Button id={ComponentIDs.signUpFormSubmit} variant="primary" type="submit" className="w-100">Sign Up</Button>
              </Form>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
            <Card.Footer className="text-center">
              Already have an account? <Link href="/signin">Login</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
