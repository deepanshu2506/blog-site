import React, { Component } from "react";
import {
  MdPersonOutline,
  MdSearch,
  MdEmail,
  MdBookmarkBorder
} from "react-icons/md";

// import styled from 'sty'

import { Link } from "react-router-dom";

// import SearchBar from "material-ui-search-bar";

//stylesheet
import "./style.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { menuOpen: true, notificationOpen: true };
  }

  render() {
    return (
      <div className="header">
        <div className="user-menu" hidden={this.state.menuOpen}>
          <ul>
            <li>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/add-new-post"
              >
                new post
              </Link>
            </li>
            <li>My post</li>
          </ul>
        </div>
        <div className="notification-menu" hidden={this.state.notificationOpen}>
          no notifications to display
        </div>
        <div className="logo">
          <h1>Medium</h1>
        </div>
        <div className="search">
          <div className="searchbox">
            <input type="text" placeholder="Search..." />
            <button>
              <MdSearch
                size={25}
                style={{ verticalAlign: "baseline", color: "#555" }}
              />
            </button>
          </div>
        </div>
        <div className="nav">
          <div
            className="icon"
            onClick={() => {
              this.setState({
                notificationOpen: this.state.notificationOpen ? false : true
              });
            }}
          >
            <MdEmail />
          </div>
          <div className="icon">
            <MdBookmarkBorder />
          </div>
          <div
            className="avatar"
            onClick={() => {
              this.setState({ menuOpen: this.state.menuOpen ? false : true });
            }}
          >
            <MdPersonOutline />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
