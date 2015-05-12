# React Messenger

> state goes down and events flow up

Message bus for React components

## Usage

Given a delete button component:

```jsx
<button className="delete" onClick={ this.sendMessage('deleteItem', { id: this.props.id }) }>
  Delete
</button>
```

That's rendered in a card component:

```js
receiveMessage: function(message, route, source) {
  if (route === 'deleteItem') {
    this.setState({ isUpdating: true });
  }
},
```

That's rendered in a list component that's the root component:

```js
receiveMessage: {
  'deleteItem': function(message, route, source) {
    this.props.store.deleteItem(message.id).then(this.render);
  }.bind(this),
  '*': function(message, route, source) {
    console.log('Message', message, 'not handled for route', route, 'sent by source', source);
  }
}
```

## License

The MIT License (MIT)

Copyright (c) 2015  Jason Johnston

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
