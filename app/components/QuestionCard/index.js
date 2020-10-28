import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function QuestionCard({ header, summary, id }) {
  return <div><Card style={{ width: '25rem',height:'20rem' }}>
  <Card.Body>
<Card.Title>{header}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">View Questionnaire</Card.Link>
    <Card.Link href="#">Start Answering</Card.Link>
  </Card.Body>
</Card></div>;
}

QuestionCard.propTypes = {
  header: PropTypes.any,
  summary: PropTypes.any,
  id: PropTypes.any,
};

export default QuestionCard;
