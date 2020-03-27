import React from "react";
import "./style.scss";
import _ from "lodash";
import shortid from "shortid";
import Textarea from "react-textarea-autosize";
import { IoMdImages } from "react-icons/io";

// import image from "./23.jpg";
class NewPost extends React.Component {
  constructor(props) {
    super(props);
    const textarea = (
      <Textarea
        number={1}
        // ref={`input1`}
        onFocus={e => {
          this.setState({ focusedInput: 1 });
        }}
        onChange={this.handleContentChange}
        placeholder="Tell us about your story"
      />
    );
    this.state = {
      images: new Array(),
      focusedInput: 1,
      textareaCount: 2,
      blog: [textarea],
      textInput: [],
      ordering: [1],
      id: shortid.generate()
    };
  }

  handleContentChange = e => {
    let { textInput } = this.state;
    const index = _.findIndex(
      textInput,
      item =>
        parseInt(item.number) ==
        parseInt(e.target.attributes.getNamedItem("number").value)
    );
    console.log(index);
    if (index > -1) {
      textInput[index] = { ...textInput[index], text: e.target.value };
    } else {
      textInput.push({
        number: parseInt(e.target.attributes.getNamedItem("number").value),
        text: e.target.value
      });
    }
    this.setState({ textInput });
  };

  uploadImage = event => {
    console.table(this.state.textInput);
    if (event.target.files.length == 0) {
      return;
    }
    const textarea = (
      <Textarea
        number={this.state.textareaCount}
        // ref={`input${this.state.textareaCount}`}
        onFocus={e => {
          // console.log(this.setState);
          this.setState({
            focusedInput: parseInt(
              e.target.attributes.getNamedItem("number").value
            )
          });
          // console.log(this.state);
        }}
        // value={`input${this.state.textareaCount}`}
        onChange={this.handleContentChange}
        autoFocus={true}
      />
    );
    const { blog, ordering, images } = this.state;
    let index = 0;
    if (this.state.focusedInput !== 0) {
      index = _.findIndex(blog, item => {
        // console.log(item.props);
        return parseInt(item.props.number) == parseInt(this.state.focusedInput);
      });
    }
    console.log(this.state.focusedInput);
    const orderingIndex = ordering.findIndex(
      item => item == this.state.focusedInput
    );
    ordering.splice(orderingIndex + 1, 0, this.state.textareaCount);
    console.log(ordering);
    // console.log(this.state.focusedInput);

    // console.log(index);

    const imgTempUrl = URL.createObjectURL(event.target.files[0]);
    images.push({ number: this.state.textareaCount, url: imgTempUrl });
    const imageComponent = (
      <div className="img-container">
        <img number={0} src={imgTempUrl} />
      </div>
    );
    blog.splice(index + 1, 0, textarea);
    blog.splice(index + 1, 0, imageComponent);
    this.setState({
      images: this.state.images.concat({
        url: imgTempUrl,
        location: this.state.focusedInput,
        blog,
        ordering,
        images,
        textareaCount: this.state.textareaCount++
      })
    });
    // console.log(this.refs);
  };

  savePost = () => {
    const { ordering, textInput, images } = this.state;
    const blogPost = [];
    for (const item of ordering) {
      const text = _.find(textInput, a => a.number == item);
      const image = _.find(images, a => a.number == item);
      if (image) blogPost.push(image);

      if (text) blogPost.push(text);
    }

    console.log(blogPost);

    const post = {
      title: this.state.postTitle,
      body: blogPost
    };
  };

  render() {
    return (
      <div className="content">
        <input
          type="file"
          id="file"
          ref="imageUploader"
          style={{ display: "none" }}
          onChange={this.uploadImage}
        />
        <button
          className="add-image"
          onClick={() => {
            this.refs.imageUploader.click();
          }}
        >
          <IoMdImages size={25} />
          Add image
        </button>
        <div className="title">
          <input
            type="text"
            onChange={e => {
              this.setState({ postTitle: e.target.value });
            }}
            placeholder="Name your Story"
            autoFocus
          />
        </div>
        <div>
          {this.state.blog.map(item => {
            return item;
          })}
        </div>
        <button className="save" onClick={this.savePost}>
          Publish
        </button>
      </div>
    );
  }
}

export default NewPost;
