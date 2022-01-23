const foodItems = [
  {
    name: 'Chicken Golden Delight',
    imgURL: 'pizzas/Chicken_Golden_Delight.jpg',
    category: 'Pizza',
    description: 'Barbeque chicken with a topping of golden corn loaded with extra cheese. Worth its weight in gold!',
    price: {
      small: 159,
      medium: 399,
      large: 699
    },
    veg: false,
    size: {
      small: 'small',
      medium: 'medium',
      large: 'large'
    },
    rating: 3.9,
    available: true,
    discount: 20
  },
  {
    name: 'Farmhouse',
    imgURL: 'pizzas/Farmhouse.jpg',
    category: 'Pizza',
    description: 'A pizza that goes ballistic on veggies! Check out this mouth watering overload of crunchy, crisp capsicum, succulent mushrooms and fresh tomatoes',
    price: {
      small: 99,
      medium: 199,
      large: 399
    },
    veg: true,
    size: {
      small: 'small',
      medium: 'medium',
      large: 'large'
    },
    rating: 3.1,
    available: true,
    discount: 30
  },
  {
    name: 'Indian Tandoori Paneer',
    imgURL: 'pizzas/IndianTandooriPaneer.jpg',
    category: 'Pizza',
    description: 'It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum I red paprika I mint mayo',
    price: {
      small: 125,
      medium: 259,
      large: 499
    },
    veg: true,
    size: {
      small: 'small',
      medium: 'medium',
      large: 'large'
    },
    rating: 3.5,
    available: true,
    discount: 15
  },
  {
    name: 'Chicken Double Whooper',
    imgURL: 'burgers/Chicken_Double_Whooper.jpg',
    category: 'Burger',
    description: 'Stuffed with two thick layers of spicy and yummy grilled chicken with veggies on top!',
    price: 199,
    veg: false,
    rating: 4.7,
    available: true,
    discount: 9
  },
  {
    name: 'Classic Veg',
    imgURL: 'burgers/BK_Classic_Veg.jpg',
    category: 'Burger',
    description: 'Enjoy this yummy burger sandwiched with veg patty, lettuce and much more!',
    price: 69,
    veg: true,
    rating: 3.8,
    available: true,
    discount: 0
  },
  {
    name: 'Mousse Cake',
    imgURL: 'sides/Mousse_Cake.jpg',
    category: 'Sides',
    description: 'A Creamy & Chocolaty indulgence with layers of rich, fluffy Butterscotch Cream and delicious Dark Chocolate Cake',
    price: 99,
    veg: true,
    rating: 4.5,
    available: true,
    discount: 0
  }
]

module.exports = foodItems

