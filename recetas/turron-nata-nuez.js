/* Receta 05 · Turrón de mazapán de nata y nuez */
(window.RECIPES = window.RECIPES || []).push({
  id: 'nata-nuez', num: '05', ready: true,
  title: 'Turrón de nata y nuez',
  short: 'Mazapán de almendra con nata, jarabe a 110 °C y nueces troceadas.',
  lead: 'Turrón de mazapán de almendra con nata y nueces. Se preparan tres mezclas, se une el jarabe de nata y azúcar con la almendra, se añade la glucosa y, al final, las nueces troceadas a mano.',
  meta: [],
  prepTitle: 'Preparación de la masa',
  assemblyTitle: 'Moldes',
  ingredients: [
    { heading: 'Turrón', cols: 2, groups: [
      { n: 1, title: 'Primera mezcla', items: [['Nata', '80 g'], ['Azúcar', '80 g'], ['Leche condensada', '80 g']] },
      { n: 2, title: 'Segunda mezcla', note: 'Hasta 110 °C. La glucosa se añade después, cuando todo esté bien mezclado.', items: [['Nata', '220 g'], ['Azúcar', '650 g'], ['Glucosa', '80 g']] },
      { n: 3, title: 'Tercera mezcla', items: [['Almendra', '550 g'], ['La primera mezcla', 'toda']] },
      { title: 'Al final', items: [['Nueces', '380 g']] }
    ]}
  ],
  prep: [
    ['Mezcla 1', 'En un bol, pon la nata (80 g), el azúcar (80 g) y la leche condensada (80 g). Fúndelo al microondas: tiene que quedar un poco caliente.', 1],
    ['Mezcla 2', 'En una cacerola, a poder ser de fondo redondo (un wok también va bien), pon 220 g de nata y 650 g de azúcar. Mézclalo bien con una cuchara.', 2],
    ['Mezcla 3', 'Añade la mezcla 1 a los 550 g de almendra y mezcla bien.', 3],
    ['Cocer la mezcla 2', 'Pon la mezcla 2 a fuego muy suave. Cuando hierva, espera 2 minutos para que llegue a 110 °C.'],
    ['Unir', 'Añade poco a poco la mezcla 3 y ve removiendo. Al principio se hace un pegote, pero poco a poco va cediendo. Si tienes batidora, puedes ponerla en marcha mientras echas la mezcla hirviendo sobre la mezcla 3.'],
    ['Glucosa', 'Cuando esté bien mezclado, añade la glucosa (80 g). Si ves que se enfría, ponlo a fuego muy, muy flojo.'],
    ['Nueces', 'Cuando ya esté bien mezclado, añade las nueces (380 g), troceadas con la mano, y remueve hasta que no se pegue.']
  ],
  assembly: [
    ['Moldes', 'Ponlo en los moldes.']
  ],
  tips: [
    ['Mezcla 1:', 'se funde al microondas y tiene que estar un poco caliente.'],
    ['Cacerola:', 'a poder ser de fondo redondo; un wok también va bien.'],
    ['Jarabe:', 'fuego muy suave; cuando hierve, 2 minutos más hasta 110 °C.'],
    ['Al principio', 'la masa hace un pegote, pero poco a poco va cediendo.'],
    ['Batidora:', 'si hay, se puede poner en marcha al echar la mezcla hirviendo.'],
    ['Si se enfría:', 'fuego muy, muy flojo.'],
    ['Nueces:', 'troceadas con la mano.']
  ],
  pending: [
    'Medidas del molde, cuánto se pone en cada uno y reposo antes de desmoldar.',
    'Cómo se corta.'
  ]
});
