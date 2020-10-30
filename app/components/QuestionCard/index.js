import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function QuestionCard({ header, subtitle, text }) {
  return (
    <div>
      <Card style={{ width: '20rem', height: '22rem' }}>
        <Card.Body>
          <Card.Title>{header}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
          <Card.Text>{text}</Card.Text>
          <div>
            <Link to={{ pathname: `/QuestionList`, showanswerbox: 'false' }}>
              <Card.Link href="#">View Questionnaire</Card.Link>
            </Link>
          </div>
          <div>
            <Link to={{ pathname: `/QuestionList`, showanswerbox: 'true' }}>
              <Card.Link href="#">Start Answering</Card.Link>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

QuestionCard.propTypes = {
  header: PropTypes.any,
  subtitle: PropTypes.any,
  text: PropTypes.any,
};

export default QuestionCard;
