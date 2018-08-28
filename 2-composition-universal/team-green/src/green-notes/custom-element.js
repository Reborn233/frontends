/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
import render from './render';
import {
  ALL,
  DOING,
  FINISHED,
  note
} from '../constant';

class GreenNotes extends HTMLElement {
  static get observedAttributes() {
    return ['status'];
  }
  connectedCallback() {
    this.refresh = this.refresh.bind(this);
    this.handleClickDel = this.handleClickDel.bind(this);
    this.handleClickFinished = this.handleClickFinished.bind(this);
    this.log('绿色 列表组件 已连接');
    this.render();
    window.addEventListener('blue:form:submit', this.refresh);
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    this.log('列表属性状态改变', attr, newValue);
    this.render();
  }
  refresh() {
    this.log('input 提交事件 "blue:form:submit"');
    this.render();
  }
  render() {
    note.notes = JSON.parse(fetch('notes')) || note.notes;
    const status = this.getAttribute('status');
    this.innerHTML = render(status);
    this.addListener();
  }
  addListener() {
    const $dels = document.querySelectorAll('.btn');
    const $contents = document.querySelectorAll('.content');
    Array.prototype.forEach.call($dels, $del => (
      $del.addEventListener('click', this.handleClickDel)
    ));
    Array.prototype.forEach.call($contents, $content => (
      $content.addEventListener('click', this.handleClickFinished)
    ));
  }
  removeListener() {
    const $dels = document.querySelectorAll('.btn');
    const $contents = document.querySelectorAll('.content');
    Array.prototype.forEach.call($dels, $del => (
      $del.removeEventListener('click', this.handleClickDel)
    ));
    Array.prototype.forEach.call($contents, $content => (
      $content.removeEventListener('click', this.handleClickFinished)
    ));
  }
  handleClickDel(e) {
    const notes = note.notes;
    const id = e.currentTarget.parentNode.getAttribute('name');
    const index = notes.findIndex(e => e.id === Number(id));
    notes.splice(index, 1);
    save('notes', notes);
    this.dispatchEvent(new CustomEvent('green:notes:delete', {
      bubbles: true,
    }));
    this.render();
  }
  handleClickFinished(e) {
    const notes = note.notes;
    const id = e.currentTarget.parentNode.getAttribute('name');
    const row = notes.filter(item => item.id === Number(id))[0]
    row.finished = !row.finished;
    save('notes', notes);
    this.render();
  }
  disconnectedCallback() {
    window.removeEventListener('blue:form:submit', this.refresh);
    this.removeListener();
    this.log('已断开');
  }
  log(...args) {
    console.log('💚 绿色微服务', ...args);
  }
}

export default GreenNotes;
