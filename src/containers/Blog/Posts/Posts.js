import React, { Component } from 'react';
import axios from './../../../axios';
// import { Link } from 'react-router-dom';

import Post from './../../../components/Post/Post';

import './Posts.css';

class Posts extends Component {
  state = {
      posts: []
  }

  getPosts = () => {
      axios.get('/posts')
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
              // this.setState({
              //     error: true
              // })
          });
  }

  componentDidMount () {
      this.getPosts();
  }

  // postSelectedHandler = (id) => this.setState({selectedPostId: id})
  postSelectedHandler = (id) => {
      this.props.history.push({pathname: '/' + id})
  }

  render () {
    const style = { textAlign: 'center' };
    let posts = <p style={style}>Something wen wrong...</p>
    if (!this.state.error) {
        posts = this.state.posts.map(post => {
            return (
                // using router history push instead of link
                // <Link to={'/' + post.id} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)} />
                // </Link>
            );
        });
    }

    return (
      <section className="Posts">
        {posts}
      </section>
    )
  }
}

export default Posts;