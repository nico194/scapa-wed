import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import TutorPage from './pages/tutorPage/TutorPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import PictogramsPage from './pages/pictograms/PictogramsPage'

const App = () => {
    return(
        <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/menu" component={TutorPage} />
                    <Route path="/categories" component={CategoriesPage} />
                    <Route path="/pictograms" component={PictogramsPage} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
