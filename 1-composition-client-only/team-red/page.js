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

function save(key, data) {
  if (typeof data === 'string') {
    localStorage.setItem(key, data);
  }
  if (typeof data === 'object') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

function fetch(key) {
  const notes = localStorage.getItem(key)
  return notes ? notes : null;
}

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
 * 主页面渲染
 */
function renderPage() {
  note.notes = JSON.parse(fetch('notes')) || note.notes;
  $app.innerHTML = `
    <h2 class="center">Notes</h2>
    <blue-form></blue-form>
    <div class="tab">
      ${tabs.map(renderTab).join('')}
    </div>
    <green-notes></green-notes>
  `;
};

function rerender() {
  removeListeners();
  renderPage();
  addListeners();
}

/**
 * tabs切换事件
 */
function handleClickTab(e) {
  const status = e.currentTarget.getAttribute('name');
  state.status = status;
  rerender();
};

/**
 * 添加事件监听
 */
function addListeners() {
  const $tabs = document.querySelectorAll('.tab .tab-item');
  Array.prototype.forEach.call($tabs, $tab => (
    $tab.addEventListener('click', handleClickTab)
  ));
};

/**
 * 移除事件监听
 */
function removeListeners() {
  const $tabs = document.querySelectorAll('.tab .tab-item');
  Array.prototype.forEach.call($tabs, $tab => (
    $tab.removeEventListener('click', handleClickTab)
  ));
};

renderPage();
addListeners();
