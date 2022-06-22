function highlight(table) {
  let dataRows = table.querySelectorAll('tbody > tr');

  for (let row of dataRows) {
    if (row.cells[3].hasAttribute('data-available')) {
    row.cells[3].getAttribute('data-available') === 'true'
      ? row.classList.add('available')
      : row.classList.add('unavailable');
    } else {
      row.setAttribute('hidden', true);
    }

    if (+row.cells[1].textContent < 18) {
      row.style.textDecoration = 'line-through';
    }

    row.cells[2].textContent === 'm' ? row.classList.add('male') : row.classList.add('female');
  }
}
