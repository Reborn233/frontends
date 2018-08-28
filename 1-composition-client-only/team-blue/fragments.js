/* eslint-disable no-use-before-define, no-console, class-methods-use-this */
/* globals HTMLElement, window, CustomEvent */
(function fragments() {

  class BlueForm extends HTMLElement {
    connectedCallback() {
      this.refresh = this.refresh.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.log('connected');
      this.render();
      window.addEventListener('green:notes:delete', this.refresh);
    }
    refresh() {
      this.log('notes 删除事件 "green:notes:delete"');
      this.render();
    }
    render() {
      const len = note.notes.length;
      this.innerHTML =  `
        <form id="form" class="item-blue">
          <input id="input" type="text" placeholder="写点什么...">
          <p class="hint">一共 ${len} 件事情</p>
        </form>
      `;
      document.getElementById('form').addEventListener('submit', this.handleInput);
    }
    handleInput(e){
      e.preventDefault();
      const notes = note.notes;
      const $input = document.getElementById('input');
      if(!$input.value){
        return
      }
      const item = {
        id: notes[notes.length - 1].id + 1,
        content: $input.value,
        finished: false,
      };
      notes.push(item);
      this.dispatchEvent(new CustomEvent('blue:form:submit', {
        bubbles: true,
      }));
      save('notes',notes);
      this.render();
      document.getElementById('input').focus();
    }
    disconnectedCallback() {
      document.getElementById('form').removeEventListener('submit', this.handleInput);
      this.log('disconnected');
    }
    log(...args) {
      console.log('blue-form', ...args);
    }
  }
  window.customElements.define('blue-form', BlueForm);

}());
