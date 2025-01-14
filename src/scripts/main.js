/* eslint-disable indent */
'use strict';

const container = document.querySelector('.container');
const table = container.querySelector('table');
const tableBody = table.querySelector('tbody');

const tableData = {
  rows: table.rows,
  columns: table.rows[0].cells,
  appendRowBtn: container.querySelector('.append-row'),
  removeRowBtn: container.querySelector('.remove-row'),
  appendColumnBtn: container.querySelector('.append-column'),
  removeColumnBtn: container.querySelector('.remove-column'),
  minCount: 2,
  maxCount: 10,
};

function disabledCheck() {
  const { minCount, maxCount, rows, columns } = tableData;

  if (rows.length === minCount) {
    tableData.removeRowBtn.disabled = true;
  } else {
    tableData.removeRowBtn.disabled = false;
  }

  if (columns.length === minCount) {
    tableData.removeColumnBtn.disabled = true;
  } else {
    tableData.removeColumnBtn.disabled = false;
  }

  if (rows.length === maxCount) {
    tableData.appendRowBtn.disabled = true;
  } else {
    tableData.appendRowBtn.disabled = false;
  }

  if (columns.length === maxCount) {
    tableData.appendColumnBtn.disabled = true;
  } else {
    tableData.appendColumnBtn.disabled = false;
  }
}

function appendRow() {
  tableBody.insertAdjacentHTML(
    'beforeend',
    `
    <tr>
      ${(() => {
        let rowContent = '';

        for (let i = 0; i < tableData.columns.length; i++) {
          rowContent += `<td></td>`;
        }

        return rowContent;
      })()}
    </tr>
  `,
  );
}

function deleteRow() {
  tableBody.removeChild(tableBody.lastElementChild);
}

function appendColumn() {
  tableBody.querySelectorAll('tr').forEach((row) => {
    row.insertAdjacentHTML('beforeend', '<td></td>');
  });
}

function deleteColumn() {
  tableBody.querySelectorAll('tr').forEach((row) => {
    row.removeChild(row.lastElementChild);
  });
}

function main() {
  container.addEventListener('click', (ev) => {
    const target = ev.target;

    const { rows, columns, minCount, maxCount } = tableData;

    switch (target.className.split(' ')[0]) {
      case 'append-row':
        if (rows.length === maxCount) {
          return;
        }
        appendRow();
        break;
      case 'remove-row':
        if (rows.length === minCount) {
          return;
        }
        deleteRow();
        break;
      case 'remove-column':
        if (columns.length === minCount) {
          return;
        }
        deleteColumn();
        break;
      case 'append-column':
        if (columns.length === maxCount) {
          return;
        }
        appendColumn();
        break;
    }
    disabledCheck();
  });
}

main();
