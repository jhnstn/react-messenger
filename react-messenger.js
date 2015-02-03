
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

    _recieveMessage: function(route, message, source) {

      var routeReciever;
      var reciever = this.constructor.prototype.recieveMessage;

      if(typeof reciever == 'object') {
        routeReciever = reciever[route] || reciever['*'];
      }

      (routeReciever || reciever) && (routeReciever || reciever).call(this, message, route, source);

    },

    sendMessageToParent: function(route, message,source) {
      if(this._owner) {
        this._owner._recieveMessage(route,message,source);
        this._owner.sendMessage(route, message, source);
      }
    }

  };

  return reactMessenger;
}));
