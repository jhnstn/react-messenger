
(function(root, factory) {

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = factory();
    }
    exports.reactMessenger = factory();
  } else {
    root.reactMessenger = factory();
  }

}(typeof window !== "undefined" ? window : this, function() {

  'use strict';

  var reactMessenger = {

    sendMessage: function(route, message, source) {
      this.sendMessageToParent(route, message, source || this);
    },

    // Declare 'receiveMessage' on your component.
    _receiveMessage: function(route, message, source) {
      var routeReceiver;
      var receiver = this.constructor.prototype.receiveMessage;

      if (typeof receiver === 'object') {
        routeReceiver = receiver[route] || receiver['*'];
      }

      (routeReceiver || receiver) && (routeReceiver || receiver).call(this, message, route, source);
    },

    sendMessageToParent: function(route, message, source) {
      if (this._owner) {
        this._owner._receiveMessage(route, message, source);
        this._owner.sendMessage(route, message, source);
      }
    }

  };

  return reactMessenger;

}));
