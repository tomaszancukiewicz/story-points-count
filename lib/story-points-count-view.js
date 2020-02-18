'use babel';

export default class StoryPointsCountView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('story-points-count');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'The StoryPointsCount package is Alive! It\'s ALIVE!';
    message.classList.add('message');

    this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setCount(count) {
    const displayText = `There are ${count} story points.`;
    this.element.children[0].textContent = displayText;
  }

}
