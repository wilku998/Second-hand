import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import Navigation from '../components/Navigation/Navigation';
import OnlyNotAuthRoute from './OnlyNotAuthRoute';
import Item from '../components/Item/Item';

interface IProps {
    history: any
};

const AppRouter = ({history}: IProps) => {
    return (
        <Router history={history}>
          <Navigation />
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/items/:id" component={Item} />
                <OnlyNotAuthRoute path="/login" component={Login}/>
            </Switch>
        </Router>
    )
}

export default AppRouter