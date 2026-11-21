/* Receta 04 · Turrón de mazapán de coco */
(window.RECIPES = window.RECIPES || []).push({
  extras: ['gianduja', 'praline'],
  uses: { 'gianduja': { need: 100 }, 'praline': { need: 60 } },
  origin: "Ala d'Or",
  id: 'coco', num: '04', ready: true,
  title: 'Turrón de coco',
  short: 'Mazapán de almendra con coco, en cinco capas con gianduja.',
  lead: 'Turrón de mazapán de almendra con coco rallado. Se monta en cinco capas de turrón de 280 g, con cuatro capas finas de gianduja (25 g cada una) entre ellas.',
  meta: [],
  stack: {
    label: 'Capas del molde, de arriba abajo: coco, gianduja, coco, gianduja, coco, gianduja, coco, gianduja y coco',
    caption: 'Cinco capas de turrón de coco y cuatro de gianduja, empezando y acabando por turrón.',
    items: [
      ['lay', 'coco', 'Coco'], ['lay', 'gian', 'Gianduja'],
      ['lay', 'coco', 'Coco'], ['lay', 'gian', 'Gianduja'],
      ['lay', 'coco', 'Coco'], ['lay', 'gian', 'Gianduja'],
      ['lay', 'coco', 'Coco'], ['lay', 'gian', 'Gianduja'],
      ['lay', 'coco', 'Coco']
    ]
  },
  prepTitle: 'Preparación de la masa',
  assemblyTitle: 'Montaje de las capas',
  ingredients: [
    { heading: 'Turrón', cols: 2, groups: [
      { title: 'Mazapán', items: [['Almendra', '250 g'], ['Leche condensada', '100 g']] },
      { title: 'Almíbar', note: 'Se hace recién antes de añadirlo.', items: [['Azúcar', '225 g'], ['Agua', '80 g']] },
      { title: 'Jarabe', note: 'Hasta 114 °C.', items: [['Azúcar', '650 g'], ['Agua', '200 g']] },
      { title: 'Coco y glucosa', items: [['Coco rallado', '400 g'], ['Glucosa', '200 g']], note: 'Ten comprados 500 g de coco rallado.' }
    ]}
  ],
  prep: [
    ['Calentar la glucosa', 'Pon la glucosa en el horno calentado a 42 °C, solo para que no esté fría. Debe estar más caliente hasta que se despegue de las paredes.'],
    ['Almíbar', 'Haz el almíbar con 225 g de azúcar y 80 g de agua, hasta que hierva.'],
    ['Mazapán', 'Haz el mazapán con 250 g de almendra y 100 g de leche condensada, y añade el almíbar recién hecho.'],
    ['Jarabe', 'En un cazo, pon 650 g de azúcar y 200 g de agua al fuego hasta llegar a 114 °C.'],
    ['Coco y jarabe', 'A la mezcla del mazapán añade el coco (400 g) y el jarabe.'],
    ['Glucosa', 'Revuélvelo muy bien y añade la glucosa. Sigue meneando. Si queda demasiado líquido, añade una cucharada de coco, hasta una consistencia manejable pero pegajosa.']
  ],
  assembly: [
    ['Primera capa', 'Pon una capa de coco de 280 g, bien aplanada y con mucho cuidado en las esquinas.'],
    ['Gianduja', 'Pon encima una capa de 25 g de [[gianduja|gianduja]].'],
    ['Seguir alternando', 'Otra capa de coco, otra de gianduja, y así hasta tener 5 capas de turrón y 4 de gianduja. Empieza y acaba por turrón.'],
    ['Tapar', 'Pon el papel de la tapa y tapa, dando balanceos hasta aplanarlo y nivelarlo perfecto.']
  ],
  tips: [
    ['La glucosa', 'se calienta en el horno a 42 °C solo para que no esté fría.'],
    ['El almíbar', 'se añade recién hecho.'],
    ['Consistencia:', 'manejable pero pegajosa. Si queda líquida, una cucharada de coco.'],
    ['Esquinas:', 'mucho cuidado en cada capa de coco.'],
    ['Coco:', 'ten comprados 500 g, aunque la receta lleva 400 g.']
  ],
  pending: [
    'Reposo antes de desmoldar y cómo se corta.'
  ]
});
