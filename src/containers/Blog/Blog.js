import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    getPosts = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Jakub'
                    }
                });
                this.setState({
                    posts: updatedPosts
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true
                })
            });
    }

    componentDidMount () {
        this.getPosts();
    }

    postSelectedHandler = (id) => this.setState({selectedPostId: id})

    render () {
        const style = { textAlign: 'center' };
        let posts = <p style={style}>Something wen wrong...</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)} />
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;