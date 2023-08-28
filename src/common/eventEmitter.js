import EventEmitter3 from 'eventemitter3';

const eventEmitter = new EventEmitter3();

const EventEmitter = {
  subscribe: (event, callback) => { eventEmitter.on(event, callback); },
  unsubscribe: (event, listener) => { eventEmitter.off(event, listener); },
  dispatch: (event, data) => { eventEmitter.emit(event, data); },
};

export {
  EventEmitter,
};
