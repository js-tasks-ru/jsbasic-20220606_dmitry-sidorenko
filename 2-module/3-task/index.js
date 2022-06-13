let calculator = {
  read: function(a, b) {
    this.left = a;
    this.right = b;
  },
  sum: function() {
    return this.left + this.right;
  },
  mul: function() {
    return this.left * this.right;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
