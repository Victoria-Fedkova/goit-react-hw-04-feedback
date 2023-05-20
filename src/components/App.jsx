import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';
import { Container } from './App.styled';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let id;
    if (message) {
      id = setTimeout(() => {
        setMessage('');
      }, 1500);
    }
    return () => clearTimeout(id);
  }, [message]);

  const totalFeedback = useMemo(() => {
    return good + neutral + bad;
  }, [good, neutral, bad]);

  const positiveFeedbackPercentage = useMemo(() => {
    return Math.round((good / totalFeedback) * 100);
  }, [good, totalFeedback]);

  const handleLeaveFeedback = useCallback(e => {
    const { name } = e.currentTarget;
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        return;
    }

    let message = '';
    if (name === 'bad') {
      message = 'Sorry to heard that 😢! Thank you for the feedback';
    } else if (name === 'neutral') {
      message = 'OK! Thank you 🙂';
    } else {
      message = 'Great! Thank you 😍';
    }

    setMessage(message);
  }, []);

  const createMessage = name => {
    // setTimeout(() => {
    //   message = '';
    //   this.setState(prevState => ({ ...prevState }));
    // }, 1500); // костиль для ререндеру message, щоб зникало повідомлення, бо по умові ДЗ не можна змінювати state
  };

  return (
    <Container>
      <Section title="Please leave your feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handleLeaveFeedback}
          message={message}
        />
      </Section>

      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={
              positiveFeedbackPercentage ? positiveFeedbackPercentage : 0
            }
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </Container>
  );
};

export default App;
