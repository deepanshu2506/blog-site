import React, { Component } from "react";
import { MdPersonOutline } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroller";
import "./style.scss";
import "./cardLoader.scss";
class Home extends Component {
  constructor(props) {
    super(props);
    // this.state = { posts: [], hasMoreItems: true };
    this.state = {
      posts: []
    };
  }

  fetchPosts = () => {
    let posts = [];
    for (var i = 0; i < 10; i++) {
      posts.push(
        <div className="post">
          <div className="type">NFDJF</div>
          <div className="title">Lorem Ipsum Dolor</div>
          <div className="content-container">
            <div className="post-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                <a href="">read more</a>
              </p>
              <div className="post-info">
                <div className="avatar">
                  <MdPersonOutline />
                </div>
                <div className="user-info">
                  <div className="user-name">Deepanshu Vangani</div>
                  <div className="date-time">
                    12/3/2020 12:52pm <span>13 min read</span>
                  </div>
                </div>
              </div>
            </div>
            <img src="https://picsum.photos/700" />
          </div>
        </div>
      );
    }

    setTimeout(() => {
      this.setState({
        posts: this.state.posts.concat(posts)
      });
    }, 3000);
  };

  render() {
    // const loader = <div className="loader">Loading ...</div>;
    return (
      <div className="content">
        <div className="post-area">
          <InfiniteScroll
            dataLength={this.state.posts.length}
            loadMore={this.fetchPosts}
            hasMore={true}
            loader={<div class="card-loader card-loader--tabs"></div>}
          >
            {this.state.posts}
          </InfiniteScroll>
        </div>
        <div className="right-pane"> </div>
      </div>
    );
  }
}

export default Home;
