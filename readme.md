# Filesquash Components 😍

This is a pure web component with no dependencies for [Filesquash](https://filesquash.io). It is built using [StencilJS](https://stenciljs.com).

## Upload Widget

### Vanilla example:

```html
  <filesquash-widget token="YOUR_TOKEN" id="widget"></filesquash-widget>
```

To get the Filesquash URI when upload is completed you should create an event listener as follows:

```js
  const widget = document.getElementById('widget');
  widget.addEventListener(
    'uploadCompleted',
    data => console.log(data)
  )
```

### React example:

You'll need a wrapper:

```js
import React, { Component } from 'react'
import kebabCase from 'lodash/kebabCase'

export class UploadWidget extends Component {
  constructor(props) {
    super(props)

    this.onUploadComplete = this.onUploadComplete.bind(this)
  }

  componentDidMount () {
    this.component.addEventListener('uploadCompleted', this.onUploadComplete)
  }

  componentWillUnmount () {
    this.component.removeEventListener('uploadCompleted', this.onUploadComplete)
  }

  onUploadComplete (data) {
    this.props.onComplete(data)
  }

  _handleRef = (component) => {
    this.component = component
  };

  render () {
    const newProps = {
      ...Object.keys(this.props).reduce((accumulator, key) => ({
        ...accumulator,
        [kebabCase(key)]: this.props[key]
      }), {})
    }
    return (
      <filesquash-widget
        {...newProps}
        ref={this._handleRef}
        token={this.props.token}
        id='widget' />
    )
  }
}
```

Using the wrapper:

```jsx
  <UploadWidget
    token={this.state.info.api_token}
    onComplete={(data) => console.log(data)}
    buttonText='Upload new files'
  />
```

## Image Preview

### Example usage:

```html
  <filesquash-img
    src="https://cdn.stocksnap.io/img-thumbs/960w/QKW5BYR0Q2.jpg"
    project-id="YOUR_PROJECT_ID"
    size="560x"
    filters="filters:quality(keep);crop=130x120:830x608/"
  ></filesquash-img>
```

## Using this component

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/filesquash-widget@0.1.1/dist/filesquash.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc
