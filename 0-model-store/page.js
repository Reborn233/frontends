/* eslint-disable no-use-before-define */
/* globals document */
const $app = document.getElementById('app');

// data
const ALL = 'all';
const DOING = 'doing';
const FINISHED = 'finished';
const note = {
  name: 'Reborn',
  notes: [{
      id: 1,
      content: 'Vue js',
      finished: false
    },
    {
      id: 2,
      content: 'React js',
      finished: true
    },
    {
      id: 3,
      content: 'Angular js',
      finished: false
    },
  ],
};
const state = {
  status: ALL,
  id: 0,
};
const tabs = [{
    label: '全部',
    value: ALL
  },
  {
    label: '进行中',
    value: DOING
  },
  {
    label: '已完成',
    value: FINISHED
  }
];

function save(key, data) {
  if (typeof data === 'string') {
    localStorage.setItem(key, data);
  }
  if (typeof data === 'object') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function fetch(key){
  return localStorage.getItem(key);
}

/**
 * 数据过滤
 */
function filterData() {
  let res = [];
  if (state.status === DOING) {
    res = note.notes.filter(e => !e.finished)
  } else if (state.status === FINISHED) {
    res = note.notes.filter(e => e.finished)
  } else {
    res = note.notes
  }
  return res;
};

/**
 * input渲染
 */
function renderForm() {
  const len = note.notes.length;
  return `
    <input id="input" type="text" placeholder="写点什么...">
    <p class="hint">一共 ${len} 件事情</p>
  `;
};

/**
 * tabs渲染
 */
function renderTab(tab) {
  const active = state.status === tab.value ? 'active' : '';
  return `
  <div class="tab-item ${active}" name="${tab.value}">
    ${tab.label}
  </div>
  `;
};

/**
 * note渲染
 */
function renderNote(note) {
  const del = note.finished ? 'del' : '';
  return `
  <li name="${note.id}">
    <span class="content ${del}">${note.content}</span>
    <span class="btn">删除</span>
  </li>
  `;
};

/**
 * 主页面渲染
 */
function renderPage() {
  note.notes = JSON.parse(fetch('notes'));
  const noData = `<p class="center">no data</p>`
  $app.innerHTML = `
    <h2 class="center">Notes</h2>
    <form id="form" class="item-blue">
    ${renderForm()}
    </form>
    <div class="tab">
      ${tabs.map(renderTab).join('')}
    </div>
    <div class="tab-container item-green">
      <ol>
        ${filterData().length === 0 ? noData:filterData().map(renderNote).join('')}
      </ol>
    </div>
  `;
};

/**
 * 页面重绘
 */
function rerender() {
  removeListeners();
  renderPage();
  addListeners();
  document.getElementById('input').focus();
};

/**
 * tabs切换事件
 */
function handleClickTab(e) {
  const status = e.currentTarget.getAttribute('name');
  state.status = status;
  rerender();
};

/**
 * note点击删除事件
 */
function handleClickDel(e) {
  const notes = note.notes;
  const id = e.currentTarget.parentNode.getAttribute('name');
  const index = notes.findIndex(e => e.id === Number(id));
  notes.splice(index, 1);
  save('notes',notes);
  rerender();
};

/**
 * note点击完成事件
 */
function handleClickFinished(e) {
  const notes = note.notes;
  const id = e.currentTarget.parentNode.getAttribute('name');
  const row = notes.filter(item => item.id === Number(id))[0]
  row.finished = !row.finished;
  save('notes',notes);
  rerender();
};

/**
 * input输入事件
 */
function handleInput(e) {
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
  save('notes',notes);
  rerender();
};

/**
 * 添加事件监听
 */
function addListeners() {
  const $tabs = document.querySelectorAll('.tab .tab-item');
  const $dels = document.querySelectorAll('.btn');
  const $contents = document.querySelectorAll('.content');
  Array.prototype.forEach.call($tabs, $tab => (
    $tab.addEventListener('click', handleClickTab)
  ));
  Array.prototype.forEach.call($dels, $del => (
    $del.addEventListener('click', handleClickDel)
  ));
  Array.prototype.forEach.call($contents, $content => (
    $content.addEventListener('click', handleClickFinished)
  ));
  document.getElementById('form').addEventListener('submit', handleInput);
};

/**
 * 移除事件监听
 */
function removeListeners() {
  const $tabs = document.querySelectorAll('.tab .tab-item');
  const $dels = document.querySelectorAll('.btn');
  const $contents = document.querySelectorAll('.content');
  Array.prototype.forEach.call($tabs, $tab => (
    $tab.removeEventListener('click', handleClickTab)
  ));
  Array.prototype.forEach.call($dels, $del => (
    $del.addEventListener('click', handleClickDel)
  ));
  Array.prototype.forEach.call($contents, $content => (
    $content.addEventListener('click', handleClickFinished)
  ));
  document.getElementById('form').removeEventListener('submit', handleInput);
};

renderPage();
addListeners();
