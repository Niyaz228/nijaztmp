export interface Product {
  name: string;
  image?: string;
  detail?: string;
  group?: string;
}
export interface Category {
  slug: string;
  name: string;
  short: string;
  intro: string;
  image?: string;
  type: string;
  products: Product[];
}
const pressed: Product[] = [
  { name: 'Кирпичик', image: 'brick' },
  { name: 'Кирпичик без фаски' },
  { name: 'Старый город' },
  { name: 'Римский Брук' },
  { name: 'Травница', image: 'grass' },
  { name: 'Катушка', image: 'coil' },
  { name: 'Ромб' },
  { name: 'Волна' },
];
const cast: Product[] = [
  ...[
    'Черепашка (ластрико)',
    'Бубна (звезда)',
    'Калифорния (5 кирпичей)',
    'Доска',
    'Старый камень',
    'Корабельная доска',
    'Гладкая',
  ].map((name) => ({
    name,
    group: '30 × 30 × 3',
    image: name === 'Бубна (звезда)' ? 'star' : undefined,
  })),
  ...['8 кирпичей', 'Доска', 'Паутинка'].map((name) => ({
    name,
    group: '40 × 40 × 5',
    image: name === '8 кирпичей' ? 'eight-bricks' : undefined,
  })),
  { name: 'Скол', group: '45 × 45 × 5' },
  { name: 'Калейдоскоп', group: '50 × 50 × 5' },
  { name: 'Черепашка', group: '50 × 50 × 5' },
];
export const tactileProducts: Product[] = [
  {
    name: 'Усечённый конус',
    image: 'tactile-cones',
    detail: '40 × 40 × 6 · 40 × 40 × 9 · 30 × 30 × 9 см',
  },
  {
    name: 'Продольный риф',
    image: 'tactile-lines',
    detail: '40 × 40 × 6 · 40 × 40 × 9 · 30 × 30 × 9 см',
  },
  {
    name: 'Диагональный риф',
    image: 'tactile-diagonal',
    detail: '40 × 40 × 6 · 40 × 40 × 9 см',
  },
];
export const categories: Category[] = [
  {
    slug: 'trotuarnaya-plitka',
    name: 'Тротуарная плитка',
    short: 'Для дорожек, дворов и площадок',
    intro:
      'Вибропрессованная и вибролитьевая плитка собственного производства. Выберите форму для вашего участка — стоимость и подходящий вариант обсудим по телефону.',
    image: 'brick',
    type: 'paving',
    products: [],
  },
  {
    slug: 'zabory',
    name: 'Заборы',
    short: 'Железобетонные и комбинированные',
    intro:
      'Производим и устанавливаем заборы для частных участков и организаций. Четыре направления — от простых железобетонных ограждений до комбинированных решений.',
    image: 'fence',
    type: 'fence',
    products: [
      { name: 'Простые железобетонные', image: 'fence' },
      { name: 'Железобетонные люкс' },
      { name: 'Железобетонные ультрабетон' },
      { name: 'Комбинированные' },
    ],
  },
  {
    slug: 'taktilnaya-plitka',
    name: 'Тактильная плитка',
    short: 'Для доступной городской среды',
    intro:
      'Производим бетонную тактильную плитку для благоустройства доступной среды. Три рисунка поверхности, варианты размеров и поставка по всей Беларуси.',
    image: 'tactile-cones',
    type: 'tactile',
    products: tactileProducts,
  },
  {
    slug: 'metallokonstrukcii',
    name: 'Металлоконструкции',
    short: 'Ворота и калитки',
    intro:
      'Изготавливаем ворота и калитки, доставляем и устанавливаем. Позвоните, чтобы обсудить конструкцию и размеры для вашего объекта.',
    image: 'gates',
    type: 'metal',
    products: [{ name: 'Ворота', image: 'gates' }, { name: 'Калитки' }],
  },
  {
    slug: 'ogranichiteli-parkovki',
    name: 'Ограничители парковки',
    short: 'Для обустройства парковочных мест',
    intro:
      'Ограничители парковки собственного производства. Доступные исполнения, размеры и условия установки уточняйте по телефону.',
    type: 'parking',
    products: [],
  },
];
export const subcategories: Category[] = [
  {
    slug: 'trotuarnaya-plitka/vibropressovannaya',
    name: 'Вибропрессованная плитка',
    short: 'Восемь форм для благоустройства',
    intro:
      'Кирпичик, старый город, травница и другие формы. Выберите рисунок мощения, а цвет, толщину и стоимость уточните у нас по телефону.',
    image: 'brick',
    type: 'paving',
    products: pressed,
  },
  {
    slug: 'trotuarnaya-plitka/vibrolitevaya',
    name: 'Вибролитьевая плитка',
    short: 'Разнообразие рисунков и форм',
    intro:
      'Плитка с разными рисунками поверхности — для дорожек, дворов и площадок. Варианты сгруппированы по размеру. Поможем подобрать продукцию по телефону.',
    image: 'star',
    type: 'paving',
    products: cast,
  },
];
export const allCategories = [...categories, ...subcategories];
export const categoryHref = (slug: string) => `/catalog/${slug}/`;
