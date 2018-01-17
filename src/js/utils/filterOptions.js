const OptionsEnum = Object.freeze({
  CONTAINS: Symbol('contains'),
  NOT_CONTAINS: Symbol('notContains'),
  EQUAL: Symbol('equal'),
  NOT_EQUAL: Symbol('notEqual'),
  GREATER_THAN: Symbol('greaterThan'),
  EQUAL_GREATER_THAN: Symbol('equalGreaterThan'),
  LESS_THAN: Symbol('lessThan'),
  EQUAL_LESS_THAN: Symbol('equalLessThan')
});

const TextOptions = new Map([
  ['CONTAINS', 'Contém'],
  ['NOT_CONTAINS', 'Não Contém'],
  ['EQUAL', 'Igual'],
  ['NOT_EQUAL', 'Diferente']
]);

const NumberOptions = new Map([
  ['EQUAL', 'Igual'],
  ['NOT_EQUAL', 'Diferente'],
  ['GREATER_THAN', 'Maior'],
  ['EQUAL_GREATER_THAN', 'Maior ou igual'],
  ['LESS_THAN', 'Menor'],
  ['EQUAL_LESS_THAN', 'Menor ou igual']
]);

export { OptionsEnum, TextOptions, NumberOptions };
