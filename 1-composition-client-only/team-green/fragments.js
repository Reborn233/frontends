/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window */
(function fragments() {

  class GreenNotes extends HTMLElement {

    connectedCallback() {
      this.refresh = this.refresh.bind(this);
      this.handleClickDel = this.handleClickDel.bind(this);
      this.handleClickFinished = this.handleClickFinished.bind(this);
      this.log('connected');
      this.render();
      window.addEventListener('blue:form:submit', this.refresh);
    }
    refresh() {
      this.log('input 提交事件 "blue:form:submit"');
      this.render();
    }
    render() {
      const noData = `<p class="center">no data</p>`
      this.innerHTML = `
        <div class="tab-container item-green">
          <ol>
            ${filterData().length === 0 ? noData:filterData().map(this.renderNote).join('')}
          </ol>
        </div>
      `;
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
      this.dispatchEvent(new CustomEvent('green:notes:delete', {
        bubbles: true,
      }));
      save('notes',notes);
      this.render();
    }
    handleClickFinished(e) {
      const notes = note.notes;
      const id = e.currentTarget.parentNode.getAttribute('name');
      const row = notes.filter(item => item.id === Number(id))[0]
      row.finished = !row.finished;
      save('notes',notes);
      this.render();
    }
    renderNote(note) {
      const del = note.finished ? 'del' : '';
      return `
        <li name="${note.id}">
          <span class="content ${del}">${note.content}</span>
          <span class="btn">删除</span>
        </li>
      `;
    }
    disconnectedCallback() {
      window.removeEventListener('blue:form:submit', this.refresh);
      this.removeListener();
      this.log('disconnected');
    }
    log(...args) {
      console.log('green-notes', ...args);
    }
  }
  window.customElements.define('green-notes', GreenNotes);
}());
