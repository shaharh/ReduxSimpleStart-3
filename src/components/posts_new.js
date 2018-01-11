import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
  renderTextField (field) {
    const {meta: {touched, error} } = field;
    const className= `form-group ${touched && error ? 'has-danger' : ''}`;
    return(
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
      <div className="text-danger">
        {touched ? error : ''}
      </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          type="text"
          label="Title"
          name="title"
          component={this.renderTextField}
        />
        <Field
          type="text"
          label="Categories"
          name="categories"
          component={this.renderTextField}
          />
        <Field
          type="textarea"
          label="Content"
          name="content"
          component={this.renderTextField}
        />
      <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if(!values.title) {
    errors.title = "Enter A Title";
  }
  if(!values.categories) {
    errors.categories = "Enter Some Categories";
  }
  if(!values.content) {
    errors.content = "Enter Some Content";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null,{createPost})(PostsNew)
);
