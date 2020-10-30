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
import ReposList from 'components/ReposList';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import './styles.css';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';
import Questionnaire from 'components/Questionnaire';

const key = 'home';

export function QuestionList({
  username,
  showAnswerBox,
  onSubmitForm,
  onChangeUsername,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  return (
    <article>
      <Helmet>
        <title>Resume Builder</title>
        <meta name="description" content="An Intelligent Resume Builder" />
      </Helmet>
      <div>
        <Card className="text-center">
          <Card.Header className="main-header">Questionnaire - </Card.Header>
          <Card.Body className="main-body">
            <Questionnaire
              showanswerbox={showAnswerBox}
              questions={[
                'List your Skills',
                'How much years of work experience do you have',
                'Technical Achievements',
              ]}
            />
          </Card.Body>
          <Card.Footer className="text-muted main-footer">
            Create Intelligent Resumes!
          </Card.Footer>
        </Card>
      </div>
    </article>
  );
}

QuestionList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  showAnswerBox: PropTypes.bool,
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
)(QuestionList);
