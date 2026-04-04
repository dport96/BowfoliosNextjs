'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ComponentIDs } from '@/lib/ids';

const NavBar = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const pathname = usePathname();

  const navbarClassName = currentUser ? 'bg-dark' : 'bg-light';

  return (
    <Navbar expand="lg" className={navbarClassName}>
      <Container>
        <Navbar.Brand as={Link} href="/" className="align-items-center">
          <span style={{ fontWeight: 800, fontSize: '24px' }}>
            <Image src="/images/logo.png" width={50} className="mb-1" alt="Logo" /> Bowfolios
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={ComponentIDs.basicNavbarNav} />
        <Navbar.Collapse id={ComponentIDs.basicNavbarNav}>
          <Nav className="me-auto">
            {currentUser && <Nav.Link as={Link} id={ComponentIDs.homeMenuItem} href="/home" active={pathname === '/home'}>Home</Nav.Link>}
            <Nav.Link as={Link} id={ComponentIDs.profilesMenuItem} href="/profiles" active={pathname === '/profiles'}>Profiles</Nav.Link>
            <Nav.Link as={Link} id={ComponentIDs.projectsMenuItem} href="/projects" active={pathname === '/projects'}>Projects</Nav.Link>
            <Nav.Link as={Link} id={ComponentIDs.interestsMenuItem} href="/interests" active={pathname === '/interests'}>Interests</Nav.Link>
            {currentUser && (
              <>
                <Nav.Link as={Link} id={ComponentIDs.addProjectMenuItem} href="/addproject" active={pathname === '/addproject'}>Add Project</Nav.Link>
                <Nav.Link as={Link} id={ComponentIDs.filterMenuItem} href="/filter" active={pathname === '/filter'}>Filter</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {!currentUser ? (
              <NavDropdown title="Login" id={ComponentIDs.loginDropdown}>
                <NavDropdown.Item as={Link} id={ComponentIDs.loginDropdownSignIn} href="/signin"><PersonFill /> Sign In</NavDropdown.Item>
                <NavDropdown.Item as={Link} id={ComponentIDs.loginDropdownSignUp} href="/signup"><PersonPlusFill /> Sign Up</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title={currentUser} id={ComponentIDs.currentUserDropdown}>
                <NavDropdown.Item id={ComponentIDs.currentUserDropdownSignOut} onClick={() => signOut({ callbackUrl: '/' })}><BoxArrowRight /> Sign Out</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
