/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import LandingPage from 'containers/LandingPage/Loadable';
import SelfIntro from 'containers/SelfIntro/Loadable';
import QuestionnaireListPage from 'containers/QuestionnaireListPage/Loadable';
import QuestionList from 'containers/QuestionList/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';

import GlobalStyle from '../../global-styles';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Helmet titleTemplate="Resume Builder" defaultTitle="Resume Builder">
        <meta name="description" content="A Resume Builder application" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/SelfIntro" component={SelfIntro} />
        <Route
          path="/QuestionnaireListPage"
          component={QuestionnaireListPage}
        />
        <Route path="/QuestionList" component={QuestionList} />
      </Switch>
      {/* <Footer /> */}
      <GlobalStyle />
    </AppWrapper>
  );
}
