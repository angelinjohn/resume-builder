import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import Form from 'react-bootstrap/Form';

function Questionnaire({ showanswerbox, questions }) {
  if (!showanswerbox) {
    const QuestionAnswerView = props => (
      <div>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>{props.item}</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </div>
    );
    return (
      <Form>
        <List items={questions} component={QuestionAnswerView} />
      </Form>
    );
    return <List items={questions} component={ListItem} />;

    return null;
  }
}

Questionnaire.propTypes = {
  showanswerbox: PropTypes.bool,
  error: PropTypes.any,
  repos: PropTypes.any,
};

export default Questionnaire;
