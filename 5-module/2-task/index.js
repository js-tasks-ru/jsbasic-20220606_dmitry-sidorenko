function toggleText() {
  const btn = document.querySelector('.toggle-text-button');

  btn.addEventListener('click', toggleText);

  function toggleText() {
    document.querySelector('#text').toggleAttribute('hidden');
  }
}
