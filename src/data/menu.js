import jollofRice from '../assets/images/jollof-rice.jpg';
import chickenShawarma from '../assets/images/chicken-shawarma.jpg';
import friedRiceChicken from '../assets/images/fried-rice-chicken.jpg';
import suya from '../assets/images/suya.jpg';
import plantainChicken from '../assets/images/plantain-chicken.jpg';
import springRolls from '../assets/images/spring-rolls.jpg';
import asun from '../assets/images/asun.jpg';
import egusi from '../assets/images/egusi-pounded-yam.jpg';

/**
 * Menu data. To add a meal, drop a photo in src/assets/images, import it
 * above and append an object to this array. Everything else (menu grid,
 * cart, ordering flow) updates automatically.
 *
 * Prices are whole naira amounts.
 */
export const menuItems = [
  {
    id: 'smoky-jollof-rice',
    name: 'Smoky Jollof Rice',
    description:
      'Party style jollof with tomatoes, chicken sauce and diced plantain',
    price: 5000,
    image: jollofRice,
  },
  {
    id: 'chicken-shawarma',
    name: 'Chicken Shawarma',
    description:
      'Toasted wrap packed with grilled chicken, sausage, crunchy cabbage and creamy garlic sauce',
    price: 3500,
    image: chickenShawarma,
  },
  {
    id: 'fried-rice-chicken',
    name: 'Fried Rice & Chicken',
    description:
      'Nigerian fried rice with mixed vegetables and liver, served with crispy fried chicken',
    price: 5500,
    image: friedRiceChicken,
  },
  {
    id: 'suya',
    name: 'Suya',
    description:
      'Flame-grilled beef skewers rubbed in spicy yaji, with fresh onions, tomatoes and cabbage',
    price: 4000,
    image: suya,
  },
  {
    id: 'plantain-chicken',
    name: 'Plantain & Chicken',
    description:
      'Golden fried dodo with juicy peppered grilled chicken and sautéed peppers',
    price: 4500,
    image: plantainChicken,
  },
  {
    id: 'spring-rolls',
    name: 'Spring Rolls',
    description:
      'Crispy rolls filled with seasoned chicken and vegetables, served with sweet chilli dip',
    price: 2500,
    image: springRolls,
  },
  {
    id: 'peppered-asun',
    name: 'Peppered Asun',
    description:
      'Smoky grilled goat meat tossed in scotch bonnet, bell peppers and onions',
    price: 6000,
    image: asun,
  },
  {
    id: 'egusi-pounded-yam',
    name: 'Egusi & Pounded Yam',
    description:
      'Rich melon seed soup with spinach, beef and stockfish, served with smooth pounded yam',
    price: 6500,
    image: egusi,
  },
];

/** Flat delivery fee (in naira) applied to every order. */
export const DELIVERY_FEE = 1500;
