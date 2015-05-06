
var Root = React.createClass({
  mixins: [reactMessenger],
  displayName: 'root',
  recieveMessage: {
    '*': function() {
      console.log('arguments', arguments);
      console.log('*')
    },
    child : function(){
      console.log('args ', arguments);
      console.log('child');
    },
    parent : function() {
      console.log('args', arguments);
      console.log('parent');
    }

  },
  render : function() {
    return (
      <div className="root">
      <Parent />
      </div>
    );
  }

});


var Parent = React.createClass({
  mixins: [reactMessenger],
  displayName: 'parent',

  recieveMessage : function() {
    console.log('PARENT')
  },

  clicked: function() {
    this.sendMessage('parent', {foobar: 'numberwang'});
  },

  render  : function() {
    return (
      <div>
      <button onClick={this.clicked} > parent </button>
      <div className="child">
      <Child  />
      <Sibling />
      </div>
      </div>
    );
  }

});

var Child = React.createClass({
  mixins: [reactMessenger],
  displayName : 'child',
  clicked : function() {
    this.sendMessage('child', {payload: [1,2,3]});
  },

  render : function() {
    return (
      <button onClick={this.clicked} >child </button>
    )
  }

});

var Sibling =  React.createClass({
  mixins: [reactMessenger],
  displayName : 'sibling',
  clicked : function() {
    this.sendMessage('sibling', {payload: [1,2,3]});
  },

  render : function() {
    return (
      <button onClick={this.clicked} >sibling </button>
    )
  }

});

React.render(<Root />, document.getElementById('example'));
