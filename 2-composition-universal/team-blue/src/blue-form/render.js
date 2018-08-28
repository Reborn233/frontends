export default function renderForm(len) {
  return  `
    <form id="form" class="item-blue">
      <input id="input" type="text" placeholder="写点什么...">
      <p class="hint">一共 ${len} 件事情</p>
    </form>
  `;
}
