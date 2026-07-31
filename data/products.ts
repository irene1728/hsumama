export type Product = {
  id: number;
  slug: string;
  name: string;
  image: string;

  category:
    | "pork"
    | "chicken"
    | "beef"
    | "lamb"
    | "sausage"
    | "seafood"
    | "soup";

  price: number | null;

  description: string;

  weight: string | null;

  storage: string;

  delivery: string;

  featured: boolean;
};

export const products: Product[] = [

{
  id: 1,
  slug: "buddha-jumps-over-the-wall",
  name: "佛跳牆",
  image: "/images/products/buddha-jumps-over-the-wall.jpg",

  category: "soup",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

 {
  id: 2,
  slug: "german-pork-knuckle",
  name: "德式德國豬腳",
  image: "/images/products/german-pork-knuckle.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: true,
},

{
  id: 3,
  slug: "salted-pork",
  name: "鹹豬肉條／肉片（生）",
  image: "/images/products/salted-pork.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: true,
},

 {
  id: 4,
  slug: "spicy-chicken",
  name: "川味椒麻雞（熟）",
  image: "/images/products/spicy-chicken.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 5,
  slug: "soy-chicken",
  name: "油雞",
  image: "/images/products/soy-chicken.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: true,
},

 {
  id: 6,
  slug: "crispy-pork-knuckle",
  name: "滷脆皮圓蹄",
  image: "/images/products/crispy-pork-knuckle.jpg",

  category: "pork",

  price:230,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 7,
  slug: "crispy-pork-knuckle-half",
  name: "滷脆皮圓蹄（半邊月）",
  image: "/images/products/crispy-pork-knuckle-half.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 8,
  slug: "braised-pork-knuckle",
  name: "滷紅燒蹄膀（腳庫）",
  image: "/images/products/braised-pork-knuckle.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: true,
},

{
  id: 9,
  slug: "pork-ring",
  name: "滷豬腳圈",
  image: "/images/products/pork-ring.jpg",

  category: "pork",

  price:150,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: true,
},

{
  id: 10,
  slug: "diced-pork",
  name: "滷豬腳丁",
  image: "/images/products/diced-pork.jpg",

  category: "pork",

  price:90,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 11,
  slug: "black-pepper-pork-rib",
  name: "滷黑胡椒子排",
  image: "/images/products/black-pepper-pork-rib.jpg",

  category: "pork",

  price:150,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 12,
  slug: "pork-rib",
  name: "滷豬肋排（拾支骨）",
  image: "/images/products/pork-rib.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 13,
  slug: "mustard-pork-hock",
  name: "滷梅干虎掌",
  image: "/images/products/mustard-pork-hock.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 14,
  slug: "german-pork-knuckle-butterfly",
  name: "滷德國豬腳（蝴蝶切）",
  image: "/images/products/german-pork-knuckle-butterfly.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 15,
  slug: "pork-shank",
  name: "滷豬棒腿",
  image: "/images/products/pork-shank.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 16,
  slug: "chicken-feet",
  name: "滷雞爪凍",
  image: "/images/products/chicken-feet.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: true,
},

{
  id: 17,
  slug: "chicken-gizzard",
  name: "滷雞胗",
  image: "/images/products/chicken-gizzard.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 18,
  slug: "duck-wing",
  name: "滷鴨翅",
  image: "/images/products/duck-wing.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 19,
  slug: "black-pepper-wheel-pork",
  name: "滷黑胡椒飛輪豬排",
  image: "/images/products/black-pepper-wheel-pork.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 20,
  slug: "japanese-pork-roll",
  name: "日式拉麵－梅花網捲／三層網捲（熟）",
  image: "/images/products/japanese-pork-roll.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 21,
  slug: "black-pepper-pork-cutlet",
  name: "黑胡椒日式豬排（拾支）（生）",
  image: "/images/products/black-pepper-pork-cutlet.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 22,
  slug: "crispy-pork-rib",
  name: "排骨酥（生／熟）",
  image: "/images/products/crispy-pork-rib.jpg",

  category: "pork",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 23,
  slug: "honey-pork-steak",
  name: "蜜汁梅花豬排",
  image: "/images/products/honey-pork-steak.jpg",

  category: "pork",

  price:160,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 24,
  slug: "garlic-sausage",
  name: "蒜味香腸",
  image: "/images/products/garlic-sausage.jpg",

  category: "sausage",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 25,
  slug: "kaoliang-sausage",
  name: "高粱酒香腸",
  image: "/images/products/kaoliang-sausage.jpg",

  category: "sausage",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 26,
  slug: "original-sausage",
  name: "原味香腸",
  image: "/images/products/original-sausage.jpg",

  category: "sausage",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 27,
  slug: "black-pepper-beef-steak",
  name: "黑胡椒嫩肩牛排",
  image: "/images/products/black-pepper-beef-steak.jpg",

  category: "beef",

  price:220,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 28,
  slug: "black-pepper-beef-short-rib",
  name: "黑胡椒帶骨牛小排",
  image: "/images/products/black-pepper-beef-short-rib.jpg",

  category: "beef",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 29,
  slug: "black-pepper-beef-skewer",
  name: "黑胡椒牛肉串",
  image: "/images/products/black-pepper-beef-skewer.jpg",

  category: "beef",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 30,
  slug: "black-pepper-diced-beef",
  name: "黑胡椒骰子牛",
  image: "/images/products/black-pepper-diced-beef.jpg",

  category: "beef",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 31,
  slug: "cumin-lamb-rib",
  name: "新疆孜然羊小排",
  image: "/images/products/cumin-lamb-rib.jpg",

  category: "lamb",

  price:220,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 32,
  slug: "teriyaki-chicken-thigh",
  name: "照燒雞腿排",
  image: "/images/products/teriyaki-chicken-thigh.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 33,
  slug: "lemon-chicken-wing",
  name: "檸檬二節翅（熟）",
  image: "/images/products/lemon-chicken-wing.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 34,
  slug: "garlic-chicken-wing",
  name: "蒜味雞翅",
  image: "/images/products/garlic-chicken-wing.jpg",

  category: "chicken",

  price:140,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 35,
  slug: "garlic-chicken-tail",
  name: "蒜味七里香串",
  image: "/images/products/garlic-chicken-tail.jpg",

  category: "chicken",

  price:160,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 36,
  slug: "garlic-chicken-heart",
  name: "蒜味雞心串",
  image: "/images/products/garlic-chicken-heart.jpg",

  category: "chicken",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

{
  id: 37,
  slug: "pacific-saury",
  name: "秋刀魚",
  image: "/images/products/pacific-saury.jpg",

  category: "seafood",

  price: null,

  description: "",

  weight: null,

  storage: "冷凍保存",

  delivery: "黑貓冷凍宅配",

  featured: false,
},

];