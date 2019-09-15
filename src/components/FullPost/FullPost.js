import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    updatePostHandler = () => {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
            axios.get('/posts/' + this.props.id)
                .then(response => {
                    this.setState({
                        loadedPost: response.data
                    })
                })
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            })
    }

    componentDidUpdate() {
        this.updatePostHandler();
    }

    render () {
        const style = { textAlign: 'center' };
        let post = <p style={style}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={style}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;