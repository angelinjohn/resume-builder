/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import QuestionCard from 'components/QuestionCard';
import AtPrefix from './AtPrefix';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import './styles.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function SelfIntro({
  username,
  loading,
  error,
  repos,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  return (
    <article>
      <Helmet>
        <title>Resume Builder</title>
        <meta
          name="description"
          content="An Intelligent Resume Builder"
        />
      </Helmet>
      <div>
      <Card className="text-center">
  <Card.Header className="main-header">Resume Builder</Card.Header>
  <Card.Body className="main-body">
    <Card.Title>Hey There!</Card.Title>
    <QuestionCard header="Tender Foot"/>
    <QuestionCard header="Tender Foot2"/>
    <QuestionCard header="Tender Foot3"/>
    <Card.Text> Please enter the basic details as you would want in your Resume.</Card.Text>
    <Form>
    <Form.Group controlId="formBasicName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="name" placeholder="Enter Name" />
  </Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group controlId="formContactNo">
    <Form.Label>Contact Number</Form.Label>
    <Form.Control type="cno" placeholder="Enter Contact Number" />
  </Form.Group>
  <Form.Group controlId="formAddress">
    <Form.Label>Address</Form.Label>
    <Form.Control type="address" placeholder="Enter Address" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Next
  </Button>
</Form>
  </Card.Body>
  <Card.Footer className="text-muted main-footer">2 days ago</Card.Footer>
</Card>
      </div>
    </article>
  );
}

SelfIntro.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SelfIntro);
