import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Index from './components/Index';
import forumDis from './components/forumDis';
import forumGameDis from './components/forumGameDis';
import Post from './components/Post';
import NavBar from './components/NavBar';
import Create from './components/Create';
import Tiptap from './components/Tiptap';
import upload from './components/upload';
import Main from './components/main';
import Edit from './components/Edit'

import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./sass/ForumGamerDis.css"
import "./sass/ForumStyle.css"
import "./sass/ForumDis.css"
import "./sass/Post.css"
import "./sass/NavBar.css"
import "./sass/create.css"
import './sass/Tiptap.css'
import'./sass/style.css'


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/forum" component={Index} exact />
                        <Route path="/forum/dis/:DiscNum" component={forumDis} />
                        <Route path="/forum/gamedis" component={forumGameDis} />
                        <Route path="/forum/post/:articleId" component={Post} />
                        <Route path="/forum/create" component={Create} />
                        <Route path="/logoin" component={Main} />
                        <Route path="/edit/:articleId" component={Edit} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App