export default class EventEmitter {
  #listeners = new Set();
  subscribe(fn) { 
    this.#listeners.add(fn); 
    return () => this.#listeners.delete(fn); 
  }
  emit(data) { 
    this.#listeners.forEach(fn => fn(data)); 
  }
}