import {
  DOING,
  FINISHED,
  note
} from '../constant';

function renderNote(note) {
  const del = note.finished ? 'del' : '';
  return `
    <li name="${note.id}">
      <span class="content ${del}">${note.content}</span>
      <span class="btn">删除</span>
    </li>
  `;
}

function filterData(status) {
  let res = [];
  if (status === DOING) {
    res = note.notes.filter(e => !e.finished)
  } else if (status === FINISHED) {
    res = note.notes.filter(e => e.finished)
  } else {
    res = note.notes
  }
  return res;
}


export default function renderNotes(status) {
  const noData = `<p class="center">no data</p>`
  return `
    <div class="tab-container item-green">
      <ol>
        ${filterData(status).length === 0 ? noData:filterData(status).map(renderNote).join('')}
      </ol>
    </div>
  `;
}
