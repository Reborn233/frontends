import {
  tabs,
  ALL,
  DOING,
  FINISHED
} from '../constant'

/**
 * tabs渲染
 */
function renderTab(tab, status) {
  const active = status === tab.value ? 'active' : '';
  return `
  <div class="tab-item ${active}" name="${tab.value}">
    <a href="/${tab.value}" type="button">${tab.label}</a>
  </div>
  `;
};

export default function renderPage(status) {
  if([ALL,DOING,FINISHED].indexOf(status) === -1){
    return `<h1>Not Page Found</h1>`
  }
  return `
    <h2 class="center">Notes</h2>
    <blue-form></blue-form>
    <div class="tab">
      ${tabs.map((tab)=>renderTab(tab,status)).join('')}
    </div>
    <green-notes status="${status}"><!--#include virtual="/green-notes?status=${encodeURIComponent(status)}" --></green-notes>
  `;
};
