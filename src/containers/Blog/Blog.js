import React, { Component } from 'react';

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import './Blog.css';

class Blog extends Component {

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            {/* active is redundant and it's just for example*/}
                            <li><NavLink
                                to="/posts/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*
                    exact = absolute path name of Route
                    switch = render only one of the routes
                */}
                <Switch>
                    {/* order of routes matters, because the first route consume others and so on */}
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts" component={Posts} />
                    {/* using more route levels than one like this in posts file */}
                    {/* or use /posts/:id instead of switch */}
                    {/*  <Route path="/:id" exact component={FullPost} /> */}

                    <Redirect from="/" to="/posts" />
                    {/* previous row is same as following */}
                    {/* <Route path="/posts" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;