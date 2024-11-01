const product_02_image_01 = "https://img.freepik.com/free-photo/delicious-lobster-gourmet-seafood_23-2151713031.jpg?semt=ais_hybrid";
const product_02_image_02 = "https://img.freepik.com/free-photo/holiday-dinner-with-roasted-chicken-potatoes-food-photography_53876-124086.jpg?semt=ais_hybrid";
const product_02_image_03 = "https://img.freepik.com/free-photo/rice-dish-with-sauce-mushrooms_23-2148195600.jpg?semt=ais_hybrid";

const product_03_image_01 = "https://img.freepik.com/free-photo/tasty-thanksgiving-meal-top-view_23-2148663987.jpg?semt=ais_hybrid";
const product_03_image_02 = "https://img.freepik.com/free-photo/view-delicious-meat-cutlets-baked-with-potatoes-tomatoes-black-plate-spices-garlics-cutlery-set-wine-green-black-mix-colors-background_179666-46898.jpg?semt=ais_hybrid";
const product_03_image_03 = "https://img.freepik.com/free-photo/grilled-zucchini-with-vegetables-tomato-sauce-concept-vegetarian-food_127032-2749.jpg?semt=ais_hybrid";

const product_04_image_01 = "https://img.freepik.com/free-photo/exotic-salad-bowl-with-mango-tofu-nuts_1220-7914.jpg?semt=ais_hybrid";
const product_04_image_02 = "https://img.freepik.com/free-photo/overhead-view-smoothie-breakfast-ceramic-plate-white-table-near-epipremnum-aureum-plant_23-2148067210.jpg?semt=ais_hybrid";
const product_04_image_03 = "https://img.freepik.com/free-photo/zucchini-pasta-red-sauce-sauteed-vegetables-zucchini-carrot-onion-garlic-tomatoes_127032-2640.jpg?semt=ais_hybrid";

const products = [
  // Salads
  {
    id: "01",
    title: "Greek Salad",
    price: 12.0,
    image01: product_02_image_01,
    image02: product_02_image_02,
    image03: product_02_image_03,
    category: "Salads",
    desc: "A refreshing Greek salad with feta cheese, olives, and a tangy vinaigrette.",
  },
  {
    id: "02",
    title: "Caesar Salad",
    price: 10.0,
    image01: product_03_image_01,
    image02: product_03_image_02,
    image03: product_03_image_03,
    category: "Salads",
    desc: "Classic Caesar salad with croutons, parmesan, and creamy dressing.",
  },

  // Starters
  {
    id: "03",
    title: "Spring Rolls",
    price: 8.0,
    image01: product_02_image_01,
    image02: product_02_image_02,
    image03: product_02_image_03,
    category: "Starters",
    desc: "Crispy spring rolls filled with vegetables and served with a sweet chili dip.",
  },
  {
    id: "04",
    title: "Garlic Bread",
    price: 6.0,
    image01: product_03_image_01,
    image02: product_03_image_02,
    image03: product_03_image_03,
    category: "Starters",
    desc: "Freshly baked garlic bread with a buttery, garlic-infused spread.",
  },

  // Rice Dishes
  {
    id: "05",
    title: "Vegetable Fried Rice",
    price: 12.0,
    image01: product_04_image_01,
    image02: product_04_image_02,
    image03: product_04_image_03,
    category: "Rice Dishes",
    desc: "Flavorful fried rice with mixed vegetables and aromatic spices.",
  },
  {
    id: "06",
    title: "Chicken Biryani",
    price: 15.0,
    image01: product_02_image_01,
    image02: product_02_image_02,
    image03: product_02_image_03,
    category: "Rice Dishes",
    desc: "Aromatic basmati rice layered with tender chicken and spices.",
  },

  // Curries
  {
    id: "07",
    title: "Butter Chicken",
    price: 16.0,
    image01: product_03_image_01,
    image02: product_03_image_02,
    image03: product_03_image_03,
    category: "Curries",
    desc: "Rich and creamy butter chicken with a blend of spices and a tomato-based sauce.",
  },
  {
    id: "08",
    title: "Vegetable Korma",
    price: 14.0,
    image01: product_04_image_01,
    image02: product_04_image_02,
    image03: product_04_image_03,
    category: "Curries",
    desc: "Mild and creamy vegetable korma cooked in a cashew-based sauce.",
  },

  // Desserts
  {
    id: "09",
    title: "Chocolate Cake",
    price: 8.0,
    image01: product_02_image_01,
    image02: product_02_image_02,
    image03: product_02_image_03,
    category: "Desserts",
    desc: "Rich and moist chocolate cake topped with a decadent ganache.",
  },
  {
    id: "10",
    title: "Fruit Tart",
    price: 9.0,
    image01: product_03_image_01,
    image02: product_03_image_02,
    image03: product_03_image_03,
    category: "Desserts",
    desc: "A buttery tart filled with custard and topped with fresh fruits.",
  },
];

export default products;
