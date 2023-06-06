/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router, Routes, Route } from '@solidjs/router';
import Companies from './pages/Companies';
import Vacancies from './pages/Vacancies';
import Events from './pages/Events';
import Editor from './pages/Editor';
import Profile from './pages/Profile';
import PostDetails from './pages/PostDetails';
import VaccancyCreator from './pages/VacancyCreator';
import VaccancyDetails from './pages/VaccancyDetails';
import EventsCreator from './pages/EventsCreator';
import 'flowbite';
import EventDetails from './pages/EventDetails';
import Programming from './pages/Programming';
import OtherProfile from './pages/OtherProfile';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

  render(() => 
    <Router>
      <Routes>
        <Route path={"/"} component={App}/>
        <Route path={"/companies"} component={Companies}/>
        <Route path={"/vaccancies"} component={Vacancies}/>
        <Route path={"/events"} component={Events}/>
        <Route path={"/events/:eventID"} component={EventDetails}/>
        <Route path={"/editor"} component={Editor}/>
        <Route path={"/newEvent"} component={EventsCreator}/>
        <Route path={"/newVaccancy"} component={VaccancyCreator}/>
        <Route path={"/profile"} component={Profile}/>
        <Route path={"/users/:userID"} component={OtherProfile}/>
        <Route path={"/users/:userID/:postID"} component={PostDetails}/>
        <Route path={"/posts/:postID"} component={PostDetails}/>
        <Route path={"/vaccancies/:vaccancyID"} component={VaccancyDetails}/>

        <Route path={"/programming"} component={Programming}/>
      </Routes>
    </Router>,
 root!);
