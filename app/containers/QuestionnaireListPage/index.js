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
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import H2 from 'components/H2';
import QuestionCard from 'components/QuestionCard';
import './styles.css';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import messages from './messages';
import Section from './Section';
import Input from './Input';
import AtPrefix from './AtPrefix';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function QuestionnaireListPage({
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
        <meta name="description" content="An Intelligent Resume Builder" />
      </Helmet>
      <div>
        <Card className="text-center">
          <Card.Header className="main-header">Resume Builder</Card.Header>
          <Card.Body className="main-body">
            <CardDeck>
              <QuestionCard
                header="Tender Foot"
                subtitle="For Newbies"
                text=" If you are a newly grad, this should suit you."
              />
              <QuestionCard
                header="Expert"
                subtitle="For the Experienced"
                text="If you have spent a reasonable number of years in the industry and is looking for a job switch"
              />
              <QuestionCard
                header="Portfolio"
                subtitle="For Showcasing your Projects"
                text="Go ahead if you want to showcase your projects creatively"
              />
            </CardDeck>
          </Card.Body>
          <Card.Footer className="text-muted main-footer">
            Create Intelligent Resumes!
          </Card.Footer>
        </Card>
      </div>
    </article>
  );
}

QuestionnaireListPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
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
)(QuestionnaireListPage);
