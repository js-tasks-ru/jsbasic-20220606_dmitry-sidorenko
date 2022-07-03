/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #elem = document.createElement('table');

  constructor(rows) {
    this.#elem.innerHTML = `
                  <thead>
                    <tr>
                      <th>Имя</th>
                      <th>Возраст</th>
                      <th>Зарплата</th>
                      <th>Город</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>`;
    let tableBody = this.#elem.querySelector('tbody');
    for (let row of rows) {
      let newRow = document.createElement('tr');
      newRow.innerHTML = `
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.salary}</td>
                <td>${row.city}</td>
                <td><button>X</button></td>`;
      tableBody.append(newRow);
    }

    this.#elem.addEventListener('click', (event) => {
      if (event.target.nodeName === 'BUTTON') {
        event.target.closest('tr').remove();
      }
    });
  }

  get elem() {
    return this.#elem;
  }
}
