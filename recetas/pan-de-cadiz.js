/* Receta 01 · Pan de Cádiz */
(window.RECIPES = window.RECIPES || []).push(
{
    id: 'pan-de-cadiz', num: '01', ready: true,
    title: 'Pan de Cádiz',
    short: 'Mazapán de almendra en cuatro capas: limón, nueces, yema y chocolate.',
    meta: [],
    extras: ['yema-dura', 'pasta-limon', 'naranja-confitada', 'mazapan-basto', 'glasa-real'],
    uses: { 'yema-dura': { k: 0.66 }, 'pasta-limon': { need: 20 }, 'mazapan-basto': {} },
    stack: {
      label: 'Capas del molde, de arriba abajo: chocolate, tiras de fruta confitada, yema, naranja confitada y cerezas, nueces, limón',
      caption: 'Así se ve en el molde, de arriba abajo, con canela entre capas.',
      items: [
        ['lay', 'choco', 'Chocolate'],
        ['fr', '', 'tiras de fruta confitada'],
        ['lay', 'yema', 'Yema'],
        ['fr', '', 'naranja confitada y cerezas'],
        ['lay', 'nuez', 'Nueces'],
        ['lay', 'limon', 'Limón con fruta']
      ]
    },
    ingredients: [
      { heading: 'Mazapán base', groups: [
        { n: 1, title: 'Primera parte', items: [['Nata para montar', '50 g'], ['Leche condensada', '50 g'], ['Chocolate blanco', '90 g']] },
        { n: 2, title: 'Segunda parte', items: [['Harina de almendra', '580 g'], ['Azúcar en grano', '125 g'], ['Patata bien escurrida, pesada en crudo', '75 g']] },
        { n: 3, title: 'Jarabe', items: [['Azúcar', '500 g'], ['Agua', '100 g'], ['Glucosa (sirope)', '125 g']] }
      ]},
      { heading: 'Las cuatro capas', intro: 'Cada capa lleva 400 g de mazapán base.', cols: 2, groups: [
        { title: 'Limón', items: [['Licor seco (ron, whisky, vodka…)', '6 gotas'], ['Colorante', 'al gusto'], ['[[pasta-limon|Pasta de limón]]', '20 g'], ['Fruta confitada en dados', '80 g']] },
        { title: 'Nueces', note: 'Encima: naranja confitada con cerezas.', items: [['Nueces troceadas', '80 g'], ['Vainilla', 'por confirmar'], ['Licor', '2 cucharadas']] },
        { title: 'Yema', note: 'Encima: tiras de fruta confitada.', items: [['[[yema-dura|Yema dura]]', '125 g'], ['Colorante de huevo', 'al gusto'], ['Vainilla azucarada', 'al gusto']] },
        { title: 'Chocolate', items: [['Cacao en polvo', '25 g'], ['Pasta de naranja (opcional)', 'al gusto']] }
      ]},
      { heading: 'Además', groups: [
        { title: 'Decorar y forrar', text: 'Cerezas confitadas, fruta confitada en tiras (verde, clara y roja, o bien orejones o dátiles), canela en polvo y papel film para forrar el molde. Las recetas extra (yema dura, pasta de limón, naranja confitada, mazapán basto y glasa real) se abren desde los enlaces.' }
      ]}
    ],
    prep: [
      ['Primera parte', 'Funde e integra la nata para montar (50 g), la leche condensada (50 g) y el chocolate blanco (90 g), siempre en este orden: primero la nata, luego la leche condensada y al final el chocolate, para que no se pegue. El fundido se hace en el microondas en tandas de 1 minuto, o al baño maría.', 1],
      ['Segunda parte', 'Mezcla la harina de almendra (580 g), el azúcar en grano (125 g) y la patata (75 g, bien escurrida pero pesada en crudo). Une esta mezcla con la de la primera parte.', 2],
      ['Jarabe', 'Cuece 500 g de azúcar con 100 g de agua y 125 g de glucosa (sirope) hasta 126\u00a0°C. Hay que esperar un buen rato hasta que la temperatura suba a 126\u00a0°C.', 3],
      ['Hueco para el jarabe', 'Pega la mezcla de la segunda parte a las paredes del bol, dejando un hueco en el centro donde se verterá el jarabe. Calienta el bol por fuera con un secador de pelo para que la masa no se pegue.'],
      ['Incorporar el jarabe', 'Ve añadiendo el jarabe poco a poco, para que no salpique, y mezcla.'],
      ['Punto', 'La masa está lista cuando deja de pegarse al bol. Ese es el mazapán base.'],
      ['Mantener caliente', 'Guarda el mazapán en el horno a 42\u00a0°C mientras montas las capas.'],
      ['Molde', 'Fórralo con papel film y espolvoréalo con canela.']
    ],
    assembly: [
      ['Limón', 'Mezcla 400 g de mazapán con 6 gotas de licor seco (ron, whisky, vodka…) y el colorante. Añade 20 g de pasta de limón y 80 g de fruta confitada cortada en dados. Pon la mezcla bien mezclada dentro del molde ya forrado.'],
      ['Nueces', 'Haz una capa de canela sobre el limón. Mezcla 400 g de mazapán con 80 g de nueces troceadas, vainilla y 2 cucharadas de licor, que dan buen color. Ponlo en el molde. Encima coloca la naranja confitada con las cerezas, sin que toquen los bordes del molde, y cúbrelo bien de canela: aquí es imprescindible, absorbe la poca humedad que pueda haber.'],
      ['Yema', 'Prepara la [[yema-dura|yema dura]]. Mezcla muy bien 400 g de mazapán con 125 g de esa yema, colorante de huevo y vainilla azucarada hasta tener una masa homogénea. Ponla en el molde como una capa nueva.'],
      ['Tiras de fruta confitada', 'Sobre la yema coloca las tiras de fruta confitada a lo largo del molde, en tres filas: una verde, una clara y una roja, cada fila con dos piezas puestas una tras otra. Que no toquen los bordes del molde. Se pueden cambiar por orejones o dátiles. Cúbrelo bien de canela, que absorbe la humedad de la fruta.'],
      ['Chocolate', 'Mezcla 400 g de mazapán con 25 g de cacao en polvo y, si quieres, pasta de naranja (es opcional). Pon la capa en el molde, cubre con canela y aprieta bien.'],
      ['Cierre', 'Tapa con film. Nunca en la nevera.']
    ],
    extra: [
      { title: 'Segundo día: mazapán cocido para forro', steps: [
        ['Mazapán basto', 'Prepara el [[mazapan-basto|mazapán cocido para forro]] (mazapán basto), al día siguiente. Se tapa muy bien con film mientras se enfría.']
      ]},
      { title: 'Al día siguiente: cortar las piezas y decorar', photo: { src: 'assets/img/pan-de-cadiz-decorado.jpg', alt: 'Pan de Cádiz decorado con una estrella, lunas, gotas y medios círculos de mazapán rayado', caption: 'Así queda: estrella en el centro, lunas y gotas por encima y medios círculos por el borde de abajo.' }, steps: [
        ['Dar forma de cilindro', 'Amasa la masa solo lo justo, a mano, para darle forma de cilindro.'],
        ['Aplanar', 'Aplánala entre dos papeles de horno hasta que tenga el grosor de dos monedas de 1\u00a0€, una encima de otra.'],
        ['Hacer el patrón', 'Dibuja el patrón en papel, ponlo encima de la masa y córtala siguiendo el contorno. Se cortan estrellas, lunas, gotas y medios círculos para el borde de abajo.'],
        ['Pintar y pegar', 'Pinta el pan de Cádiz con licor seco (ron, whisky, vodka...), bien mojado pero sin que quede ningún charco. Pinta también por detrás cada pieza cortada, para asegurarte de que se pega, y colócala.'],
        ['Secar', 'Deja que se seque.']
      ]},
      { title: 'Hornear y decorar con glasa real', photo: { src: 'assets/img/pan-de-cadiz-glasa.jpg', alt: 'Pan de Cádiz horneado, dorado, decorado con glasa real blanca siguiendo el dibujo de las piezas', caption: 'El pan de Cádiz terminado: la glasa real dibuja el contorno de las piezas y festonea el borde de abajo.' }, steps: [
        ['Harina', 'Espolvorea con harina para que seque bien. Antes de hornearlo, límpialo muy bien.'],
        ['Pintar con huevo', 'Bate un huevo entero y pinta el pan 2 veces antes de hornearlo.'],
        ['Hornear', 'Hornea a 230\u00a0°C. El tiempo depende de cada horno.'],
        ['Pintar al salir', 'Justo cuando salga del horno, vuelve a pintarlo.'],
        ['Enfriar', 'Deja que el pan se enfríe del todo.'],
        ['Glasa real', 'Prepara la [[glasa-real|glasa real]]. No hay cantidades: se hace a ojo, la que necesites.'],
        ['Decorar', 'Con la glasa real, decora el pan cuando ya esté frío, siguiendo el contorno de las piezas.']
      ]}
    ],
    confit: ['Naranja confitada', 'Va sobre la capa de nueces, junto con cerezas confitadas. Receta: [[naranja-confitada|naranja confitada]].'],
    tips: [
      ['Orden en la primera parte:', 'nata, leche condensada y chocolate, en ese orden, para que el chocolate no se pegue.'],
      ['La patata', 'va bien escurrida, pero el peso (75 g) es el de la patata cruda.'],
      ['El secador', 'calienta el bol por fuera para que la masa no se pegue al verter el jarabe.'],
      ['El jarabe', 'se añade poco a poco para que no salpique.'],
      ['Punto del mazapán:', 'está bien cuando no se pega al bol.'],
      ['Calor:', 'el mazapán base se guarda en el horno a 42\u00a0°C mientras se montan las capas.'],
      ['Canela:', 'en todo, siempre bien cubierto: en el molde forrado, entre capas y sobre la fruta, porque absorbe la humedad.'],
      ['Fruta:', 'que no toque los bordes del molde.'],
      ['Al terminar:', 'apretar bien la última capa, cubrir con film y no meter nunca en la nevera.']
    ],
    pending: [
      'Cantidad de pasta de naranja de la capa de chocolate (opcional).',
      'Cantidades de vainilla de las capas y cream of tartar.',
      'Cómo se cuece la patata antes de escurrirla.',
      'Qué fruta es cada tira confitada y cuánta se usa.',
      'Medidas exactas del molde, reposo antes de desmoldar y cómo se corta.',
      'Si la masa de la decoración es el mismo mazapán de forro, y cómo se hace el rayado de las piezas.',
      'Cuánto tiempo hay que dejar secar la decoración.',
      'Tiempo orientativo de horno (la nota dice 230\u00a0°C, pero el tiempo depende de cada horno).',
      'Pasos que faltan del segundo día (forrar el bloque con el mazapán de forro) y del sábado (acabar, cortar y presentar).'
    ]
  }
);
