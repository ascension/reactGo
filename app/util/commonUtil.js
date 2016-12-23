export function bindClassMethods(...methodNames) { // eslint-disable-line
  methodNames.forEach(methodName => { this[methodName] = this[methodName].bind(this); }); // eslint-disable-line
} // eslint-disable-line