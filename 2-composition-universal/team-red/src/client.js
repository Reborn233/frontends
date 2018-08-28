/* globals document, window */
/* eslint-disable no-use-before-define */
import renderPage from './page/render';

const $app = document.getElementById('app');

window.addEventListener('popstate', () => {
  rerender(window.location.pathname.substr(1));
});

/**
 * tabs切换事件
 */
function handleClickTab(e) {
  e.preventDefault();
  const status = e.currentTarget.getAttribute('name');
  window.history.pushState(null, null, status);
  rerender(status);
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

function rerender(status) {
  removeListeners();
  $app.innerHTML = renderPage(status);
  addListeners();
}

addListeners();
