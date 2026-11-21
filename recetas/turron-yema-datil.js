/* Receta 06 · Turrón de mazapán de yema y dátil */
(window.RECIPES = window.RECIPES || []).push({
  extras: ['yema-dura', 'yemitas'],
  uses: { 'yema-dura': { k: 1 }, 'yemitas': {} },
  origin: "Ala d'Or",
  id: 'yema-datil', num: '06', ready: true,
  title: 'Turrón de yema y dátil',
  short: 'Mazapán de almendra con yema dura, dátiles y nueces.',
  lead: 'Turrón de mazapán de almendra con yema dura, dátiles troceados y nueces. Se hace primero el jarabe, después la mezcla de almendra y, al final, se añaden las nueces.',
  meta: [],
  prepTitle: 'Preparación de la masa',
  assemblyTitle: 'Molde',
  ingredients: [
    { heading: 'Turrón', cols: 2, groups: [
      { n: 1, title: 'Jarabe', note: 'Hasta 122 °C.', items: [['Azúcar', '500 g'], ['Agua', '150 g'], ['Glucosa', '100 g'], ['Colorante de huevo', 'al gusto']] },
      { n: 2, title: 'Mazapán y dátiles', items: [['Almendra', '500 g'], ['Leche condensada', '200 g'], ['[[yema-dura|Yema dura]]', '250 g'], ['Dátiles troceados a cuchillo', '300 g'], ['Vainilla (opcional)', 'por confirmar']] },
      { n: 3, title: 'Nueces', note: 'En granilla, en la picadora pero poco tiempo.', items: [['Nueces', '90 g']] },
      { title: 'Para el molde', text: 'Canela en polvo.' }
    ]}
  ],
  prep: [
    ['Jarabe', 'Pon el agua (150 g) y el azúcar (500 g) al fuego. Añade el color, que es un rojo poco intenso, como el caldo de pescado, y la glucosa (100 g). Hasta 122 °C.', 1],
    ['Mazapán', 'Mezcla la almendra (500 g), la leche condensada (200 g) y la [[yema-dura|yema dura]] (250 g). Cuando esté todo mezclado, añade los dátiles (300 g), troceados a cuchillo.', 2],
    ['Unir', 'Dale unas cuantas vueltas a la mezcla de almendra antes de añadir el jarabe. Añádelo poco a poco y remueve hasta que pierda temperatura.'],
    ['Nueces', 'Cuando la masa ya no se pegue, añade las nueces (90 g), en granilla.', 3]
  ],
  assembly: [
    ['Molde', 'Cubre el molde con canela.'],
    ['Llenar', 'Añade la mezcla poco a poco, con cuidado de las esquinas, y llena hasta 1,5 kg.'],
    ['Molde de avena', 'Con el molde de avena de Mercadona sale uno de 330 g.']
  ],
  tips: [
    ['Orden:', 'el jarabe se hace primero y se añade a la mezcla de almendra poco a poco.'],
    ['Los dátiles', 'se añaden antes del jarabe.'],
    ['Las nueces', 'van lo último, cuando la masa ya no se pega.'],
    ['Esquinas:', 'cuidado al llenar el molde.']
  ],
  pending: [
    'Si la vainilla opcional va en el mazapán o en el jarabe, y cuánta.',
    'Medidas del molde (en la nota: 18 × 8 × 2 de alto), reposo y cómo se corta.'
  ]
});
