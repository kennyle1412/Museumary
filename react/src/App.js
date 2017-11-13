import React from 'react';
import Header from './Header';

import { Switch, Route } from 'react-router-dom';

import Home from './Home';

import Artist from './components/Artist';
import Work from './components/Work';
import Type from './components/Type';
import Venue from './components/Venue';
import About from './components/About';

import FullArtists from './components/FullArtists';
import FullWorks from './components/FullWorks';
import FullTypes from './components/FullTypes';
import FullVenues from './components/FullVenues';

import SearchResults from './components/SearchResults';

const App = () => {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path='/' component={Home}/>

                <Route exact path='/artists/:number' component={Artist} />
                <Route exact path='/works/:number' component={Work} />
                <Route exact path='/types/:number' component={Type} />
                <Route exact path='/venues/:number' component={Venue} />

                <Route path='/artists' component={FullArtists} />
                <Route path='/works' component={FullWorks} />
                <Route path='/types' component={FullTypes} />
                <Route path='/venues' component={FullVenues} />

                <Route path='/about' component={About}/>
                <Route path='/results' component={SearchResults}/>
            </Switch>
        </div>
    );
};

export default App;
