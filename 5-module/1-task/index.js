function hideSelf() {
  const btn = document.querySelector('.hide-self-button');

  btn.addEventListener('click', hideButton);

  function hideButton() {
    btn.hidden = true;
  }
}
