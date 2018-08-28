/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
import render from './render';

class BlueForm extends HTMLElement {
  connectedCallback() {
    this.refresh = this.refresh.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.log('蓝色 输入框组件 已连接');
    this.render();
    window.addEventListener('green:notes:delete', this.refresh);
  }
  refresh() {
    this.log('列表 删除事件 "green:notes:delete"');
    this.render();
  }
  render() {
    const nodes = JSON.parse(fetch('notes')) || []
    const len = nodes.length;
    this.innerHTML = render(len);
    document.getElementById('form').addEventListener('submit', this.handleInput);
  }
  handleInput(e) {
    e.preventDefault();
    const notes = JSON.parse(fetch('notes')) || []
    const $input = document.getElementById('input');
    if (!$input.value) {
      return
    }
    const item = {
      id: notes[notes.length - 1].id + 1,
      content: $input.value,
      finished: false,
    };
    notes.push(item);
    save('notes', notes);
    this.dispatchEvent(new CustomEvent('blue:form:submit', {
      bubbles: true,
    }));
    this.render();
    document.getElementById('input').focus();
  }
  disconnectedCallback() {
    document.getElementById('form').removeEventListener('submit', this.handleInput);
    this.log('已断开');
  }
  log(...args) {
    console.log('🔵 蓝色微服务', ...args);
  }
}

export default BlueForm;
