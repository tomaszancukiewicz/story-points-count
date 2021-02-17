'use babel';

import StoryPointsCountView from './story-points-count-view';
import { CompositeDisposable } from 'atom';

export default {

  storyPointsCountView: null,
  modalPanel: null,
  subscriptions: null,
  timeoutId: null,

  activate(state) {
    this.storyPointsCountView = new StoryPointsCountView(state.storyPointsCountViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.storyPointsCountView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'story-points-count:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    clearTimeout(this.timeoutId);
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.storyPointsCountView.destroy();
  },

  serialize() {
    return {
      storyPointsCountViewState: this.storyPointsCountView.serialize()
    };
  },
  toggle() {
    console.log('StoryPointsCount was toggled!');
    this.show();
    this.timeoutId = setTimeout(() => {
      this.hide();
    }, 2000);
  },

// [1]
// [2]
// [20] [3]
  countStoryPoints(text) {
    const lines = text.split(/[\r\n]+/);
    const stories = lines.map(s => {
      let storiesTextLine = s.match(/\[[0-9\s]+\]\s*$/g);
      if (storiesTextLine == null) return null;
      let storiesLine = storiesTextLine.map(i => parseInt(i.replace(/[^0-9]/, "")));
      return storiesLine[storiesLine.length - 1]
    });
    const sum = stories
      .filter(s => s != null)
      .reduce((acc, val) => acc + val, 0);
    return sum;
  },

  show() {
    const editor = atom.workspace.getActiveTextEditor();
    const wholeText = editor.getText();
    const sum = this.countStoryPoints(wholeText);
    this.storyPointsCountView.setCount(sum);
    this.modalPanel.show();
  },

  hide() {
    this.modalPanel.hide();
  }
};
