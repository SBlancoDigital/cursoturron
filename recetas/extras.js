/* Recetas extra: se abren como una ventana encima de la receta que las usa.
   kind 'free'   → cantidad libre (se hace la que se necesite).
   kind 'linked' → se recalcula con la cantidad que gasta el turrón.
   yield = gramos que salen de la receta tal como está escrita (si se sabe).
   uses  = otras recetas extra que lleva dentro (need: gramos que gasta, a ×1). */
window.EXTRAS = {
  'yema-dura': {
    title: 'Yema dura', kind: 'linked',
    lead: 'Yema cocida y dura, para usar en los turrones. Es la receta base: cada turrón la ajusta a la cantidad que necesita.',
    ingredients: [{ heading: 'Yema dura', cols: 2, groups: [
      { title: 'Masa', items: [['Huevos', '3 (170 g)'], ['Azúcar', '170 g'], ['Maicena (10 %)', '17 g'], ['Cream of tartar', 'una puntita'], ['Vainilla', 'una puntita'], ['Colorante de huevo', 'al gusto']] }
    ]}],
    prep: [
      ['Mezclar', 'Mezcla bien los huevos, el azúcar y el cream of tartar, sin que haga espuma.'],
      ['Maicena', 'Añade la maicena y vuelve a mezclar. Añade la vainilla (una puntita) y el colorante. Que quede muy mezclado y sin grumos.'],
      ['Cocer', 'Cuécelo en el microondas en tandas de 1 minuto, removiendo entre una y otra, o directamente al fuego sin dejar de remover para que no se pegue.'],
      ['Enfriar', 'Cuando esté cocida, extiéndela sobre mármol y enfríala lo más rápido posible, para que no se ponga verde.']
    ],
    tips: [
      ['Sin espuma', 'y sin ningún grumo.'],
      ['Cream of tartar:', 'una puntita ayuda a que no se ponga verde.'],
      ['Enfriar rápido', 'sobre mármol es lo más importante.']
    ],
    pending: [
      'Cuántos gramos de yema dura salen de esta receta ya cocida (ahora se escala por proporción).',
      'En el turrón de yema (150 g), si es la misma receta que la del Pan de Cádiz.'
    ]
  },

  'yemitas': {
    title: 'Yemitas', kind: 'free',
    lead: 'Bolitas de yema dura rebozadas en azúcar, que se hacen con lo que sobra.',
    ingredients: [{ heading: 'Yemitas', groups: [
      { title: 'Proporción', note: 'Por cada parte de yema dura.', items: [['Azúcar en polvo', '1 parte'], ['Azúcar en grano', '2 partes']] }
    ]}],
    prep: [
      ['Proporción', 'Por cada parte de yema dura: una parte de azúcar en polvo y dos partes de azúcar en grano.'],
      ['Bolitas', 'Haz bolitas con la masa y pásalas por el azúcar en grano.'],
      ['Reposo', 'Déjalas reposar como mínimo hasta el día siguiente.'],
      ['Versiones', 'La original es sin nada. También se pueden hacer con una de estas tres opciones: nueces muy finitas, fruta confitada o piñones.']
    ],
    pending: [
      'Qué lleva la primera línea de la nota, y si el azúcar en polvo va dentro de la masa.',
      'Cuánta masa lleva cada bolita.'
    ]
  },

  'pasta-limon': {
    title: 'Pasta de limón', kind: 'linked', yield: 100,
    lead: 'Pasta casera de limón: la misma cantidad de piel y de azúcar, trituradas juntas.',
    ingredients: [{ heading: 'Pasta de limón (casera)', groups: [
      { title: 'Masa', note: 'Salen 100 g de pasta.', items: [['Piel de limón', '50 g'], ['Azúcar (el mismo peso)', '50 g']] }
    ]}],
    prep: [
      ['Triturar', 'Tritura la piel de limón con el mismo peso de azúcar, con la Thermomix o una picadora potente, hasta que quede lo más fina y compacta posible.']
    ],
    pending: ['Cuánto pesa la pasta una vez triturada (aquí se supone que es la suma de la piel y el azúcar).']
  },

  'naranja-confitada': {
    title: 'Naranja confitada', kind: 'free',
    lead: 'Gajos de naranja confitados. Se ponen sobre la capa de nueces del Pan de Cádiz, junto con cerezas confitadas.',
    ingredients: [{ heading: 'Naranja confitada', groups: [
      { title: 'Ingredientes', items: [['Naranja en gajos', '1 kg'], ['Azúcar', '500 g'], ['Agua', '250 g']] }
    ]}],
    prep: [
      ['Cocer los gajos', 'Cuece los gajos tres veces, 5 minutos cada vez, tirando el agua y poniéndolos con agua fría en cada ocasión.']
    ],
    pending: ['Cómo se hace el confitado con el azúcar y el agua (cantidades de la receta: 1 kg de naranja, 500 g de azúcar y 250 g de agua), y cuánto tiempo.']
  },

  'mazapan-basto': {
    title: 'Mazapán basto (mazapán cocido para forro)', kind: 'linked',
    lead: 'Se prepara al día siguiente, para forrar el Pan de Cádiz. La cantidad está pensada para cubrirlo entero.',
    ingredients: [{ heading: 'Mazapán cocido para forro', cols: 2, groups: [
      { title: 'Almendra', items: [['Harina de almendra', '250 g']] },
      { title: 'Almíbar', note: 'Cuando hierve, se apaga.', items: [['Azúcar', '50 g'], ['Agua', '30 g']] },
      { title: 'Jarabe', note: 'Hasta 115 °C.', items: [['Azúcar', '190 g'], ['Agua', '65 g']] }
    ]}],
    prep: [
      ['Almíbar', 'Cuece 50 g de azúcar con 30 g de agua. Cuando hierva, apágalo.'],
      ['Jarabe', 'Cuece 190 g de azúcar con 65 g de agua hasta 115 °C.'],
      ['Calentar la almendra', 'Pon el secador sobre el cuenco de la almendra (250 g) mientras la vas meneando.'],
      ['Añadir el almíbar', 'Cuando la almendra esté caliente y el almíbar esté listo, añádelo e intégralo. La masa debe quedar manejable y blandita.'],
      ['Añadir el jarabe', 'Cuando la otra mezcla (el jarabe) esté a 115 °C, añádela. Mézclalo bien, baja los bordes y menea hasta que pierda un poco de temperatura.'],
      ['Reposo', 'Pon un rollo de film estirado, muy grande, o dos. Coloca la mezcla encima formando un cuadrado y tápalo muy bien, para que no se seque mientras se enfría.']
    ],
    tips: [['Al enfriar:', 'tápalo muy bien con film para que no se seque.'], ['La masa', 'debe quedar manejable y blandita.']]
  },

  'glasa-real': {
    title: 'Glasa real', kind: 'free',
    lead: 'Glasa blanca para decorar el Pan de Cádiz cuando ya está frío. No hay cantidades: se hace a ojo, la que se necesite.',
    ingredients: [{ heading: 'Glasa real', groups: [
      { title: 'Ingredientes', items: [['Clara de huevo', 'un poco'], ['Azúcar glas', 'la que admita']] }
    ]}],
    prep: [
      ['Montar un poco', 'Pon un poco de clara de huevo y remuévela un poco, hasta que haga un poco de espuma.'],
      ['Azúcar glas', 'Añade azúcar glas hasta que, al coger la glasa con la cuchara en vertical, ya no se caiga y quede como una gota.']
    ]
  },

  'praline': {
    title: 'Praliné', kind: 'linked', yield: 100,
    lead: 'Mitad avellana tostada y mitad azúcar, muy triturados.',
    ingredients: [{ heading: 'Praliné', groups: [
      { title: 'Masa', note: 'Salen 100 g de praliné.', items: [['Avellana tostada', '50 g'], ['Azúcar', '50 g']] }
    ]}],
    prep: [
      ['Triturar', 'Tritura muy bien la avellana tostada con el azúcar, a partes iguales, hasta que al apretarlo entre los puños la mezcla mantenga la forma que le hemos dado.']
    ],
    tips: [['Punto:', 'al apretarlo entre los puños, mantiene la forma.']]
  },

  'gianduja': {
    title: 'Gianduja', kind: 'linked', yield: 1000,
    lead: 'Chocolate negro de cobertura con praliné. Se usa en capas finas entre las de coco.',
    uses: { 'praline': { need: 600 } },
    ingredients: [{ heading: 'Gianduja', groups: [
      { title: 'Masa', note: 'Salen 1000 g de gianduja.', items: [['Chocolate negro de cobertura (aprox. 48 %)', '400 g'], ['[[praline|Praliné]]', '600 g']] }
    ]}],
    prep: [
      ['Mezclar', 'Mezcla el chocolate negro de cobertura con el praliné, en la proporción de 400 a 600.']
    ],
    aside: ['Gianduja rápida, si hay prisa', 'Para no tener que fabricarla: 100 g de Nocilla y 100 g de avellana, con una vuelta de microondas.'],
    pending: ['Cómo se mezcla y se funde el chocolate con el praliné.', 'Qué se hace con la Nocilla y la avellana después del microondas.']
  }
};
