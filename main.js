import React from 'react';
import ReactDOM from 'react-dom';
import { Col } from 'react-bootstrap';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import ProjectList from './src/components/ProjectList';

const App = () => (
  <Col md={8} mdOffset={2}>
        <Header headerText='Selected projects' subheadText='in reverse chronological order' />
        <ProjectList />
        <Footer footerText='Vikis Satkevičius, 2017. To get in touch, write to vikiss at an immensely popular email provider that starts with a g' />
  </Col>
  );

ReactDOM.render(<App />, document.getElementById('app'));
