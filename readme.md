# Filesquash Components 😍

This is a pure web component with no dependencies for [Filesquash](https://filesquash.io). It is built using [StencilJS](https://stenciljs.com).

## Upload Widget

### Example usage:

```html
  <filesquash-widget token="YOUR_TOKEN" id="widget"></filesquash-widget>
```

## Image Preview

### Example usage:

```html
  <filesquash-img
    src="https://cdn.stocksnap.io/img-thumbs/960w/QKW5BYR0Q2.jpg"
    project-id="YOUR_PROJECT_ID"
    size="560x"
    filters="blur=10;mirror=true"
  ></filesquash-img>
```

## Using this component

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/filesquash-widget@0.0.1/dist/filesquash.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install my-name --save`
- Put a script tag similar to this `<script src='node_modules/filesquash-widget/dist/filesquash.js></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc
