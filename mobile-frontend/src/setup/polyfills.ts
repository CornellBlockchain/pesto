// Hermes lacks DOM Event/EventTarget implementations. The Aptos SDK expects
// those globals, so we shim them via `event-target-shim` and lightweight
// event classes that emulate the browser APIs we rely on.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { EventTarget } = require('event-target-shim');

type EventInitLite = {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
};

function EventPolyfill(this: any, type: string, init: EventInitLite = {}) {
  if (!(this instanceof EventPolyfill)) {
    throw new TypeError('Event must be called with new');
  }
  const self = this as any;
  self.type = type;
  self.bubbles = init.bubbles ?? false;
  self.cancelable = init.cancelable ?? false;
  self.composed = init.composed ?? false;
  self.isTrusted = false;
  self.timeStamp = Date.now();
  self.defaultPrevented = false;
  self.target = null;
  self.currentTarget = null;
  self.eventPhase = 0;
}

EventPolyfill.prototype.stopPropagation = function stopPropagation(this: any) {};
EventPolyfill.prototype.stopImmediatePropagation = function stopImmediatePropagation(this: any) {};
EventPolyfill.prototype.preventDefault = function preventDefault(this: any) {
  if (this.cancelable) {
    this.defaultPrevented = true;
  }
};
EventPolyfill.prototype.composedPath = function composedPath(this: any) {
  return this.currentTarget ? [this.currentTarget] : [];
};

Object.defineProperties(EventPolyfill, {
  NONE: { value: 0, writable: false },
  CAPTURING_PHASE: { value: 1, writable: false },
  AT_TARGET: { value: 2, writable: false },
  BUBBLING_PHASE: { value: 3, writable: false },
});

type CustomEventInitLite<T> = EventInitLite & { detail?: T };

function CustomEventPolyfill<T>(this: any, type: string, init: CustomEventInitLite<T> = {}) {
  EventPolyfill.call(this, type, init);
  this.detail = init.detail as T;
}

CustomEventPolyfill.prototype = Object.create(EventPolyfill.prototype);
CustomEventPolyfill.prototype.constructor = CustomEventPolyfill;

Object.defineProperties(CustomEventPolyfill, {
  NONE: { value: (EventPolyfill as any).NONE },
  CAPTURING_PHASE: { value: (EventPolyfill as any).CAPTURING_PHASE },
  AT_TARGET: { value: (EventPolyfill as any).AT_TARGET },
  BUBBLING_PHASE: { value: (EventPolyfill as any).BUBBLING_PHASE },
});

const globalObject = global as unknown as {
  Event?: typeof globalThis.Event;
  EventTarget?: typeof EventTarget;
  CustomEvent?: typeof globalThis.CustomEvent;
};

if (typeof globalObject.Event === 'undefined') {
  globalObject.Event = EventPolyfill as any;
}

if (typeof globalObject.EventTarget === 'undefined' && typeof EventTarget !== 'undefined') {
  globalObject.EventTarget = EventTarget as typeof globalThis.EventTarget;
}

if (typeof globalObject.CustomEvent === 'undefined') {
  globalObject.CustomEvent = CustomEventPolyfill as any;
}
