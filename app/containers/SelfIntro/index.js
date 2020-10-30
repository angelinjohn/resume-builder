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
  makeSelectBasicInfo,
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
import { updateBasicInfo } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Link } from 'react-router-dom';

const key = 'home';

export function SelfIntro({ username, basicinfo, error, repos, onSubmitForm }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  // useEffect(() => {
  //   // When initial state username is not null, submit the form to load repos
  //   if (username && username.trim().length > 0)
  // }, []);

  const getFormData = () => {
    'test';
  };
  return (
    <article>
      <Helmet>
        <title>Resume Builder</title>
        <meta name="description" content="An Intelligent Resume Builder" />
      </Helmet>
      <div>
        <Card className="text-center">
          <Card.Header className="main-header">Resume Builder</Card.Header>
          <Card.Body className="main-body">
            <Card.Title>Hey There!</Card.Title>
            <Card.Text>
              {' '}
              Please enter the basic details as you would want in your Resume.
            </Card.Text>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  value={basicinfo.name}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={basicinfo.email}
                />
              </Form.Group>
              <Form.Group controlId="formContactNo">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="cno"
                  placeholder="Enter Contact Number"
                  value={basicinfo.contact}
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  placeholder="Enter Address"
                  value={basicinfo.address}
                />
              </Form.Group>
              <Link to="/QuestionnaireListPage">
                <Button variant="primary" type="submit">
                  Next
                </Button>
              </Link>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted main-footer">
            Create Intelligent Resumes!
          </Card.Footer>
        </Card>
      </div>
    </article>
  );
}

SelfIntro.propTypes = {
  basicinfo: PropTypes.any,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  basicinfo: makeSelectBasicInfo(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      data = getFormData();
      dispatch(updateBasicInfo(data));
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
