const Products = require('./models/Products');

const Users = require('./models/Users');

const Reviews = require('./models/Reviews');

Products.bulkCreate([
  {
    barcode: 7868000790101,
    brand: 'reebok',
    model: 'ghostbusters ecto boots',
    color: 'grey',
    price: 144.97,
    size: 7,
    stock: 10,
    url_path: '/01.jpg',
  },
  {
    barcode: 7868000790102,
    brand: 'reebok',
    model: 'club c 85 vintage shoes',
    color: 'beige',
    price: 85,
    size: 8,
    stock: 9,
    url_path: '/02.jpg',
  },
  {
    barcode: 7868000790103,
    brand: 'reebok',
    model: "nanoflex tr womea's training shoes",
    color: 'pink',
    price: 64.97,
    size: 6,
    stock: 11,
    url_path: '/03.jpg',
  },
  {
    barcode: 7868000790104,
    brand: 'adidas',
    model: 'forum 84 low shoes',
    color: 'brown',
    price: 100,
    size: 8,
    stock: 23,
    url_path: '/04.jpg',
  },
  {
    barcode: 7868000790105,
    brand: 'adidas',
    model: 'ultraboost 22 shoes',
    color: 'almost lime',
    price: 190,
    size: 10,
    stock: 21,
    url_path: '/05.jpg',
  },
  {
    barcode: 7868000790106,
    brand: 'adidas',
    model: 'puremotion adapt shoes',
    color: 'burgundy',
    price: 46,
    size: 5,
    stock: 13,
    url_path: '/06.jpg',
  },
  {
    barcode: 7868000790107,
    brand: 'adidas',
    model: 'supernova w',
    color: 'sky rush',
    price: 70,
    size: 6,
    stock: 15,
    url_path: '/07.jpg',
  },
  {
    barcode: 7868000790108,
    brand: 'adidas',
    model: 'nmd_r1',
    color: 'bright orange',
    price: 150,
    size: 7,
    stock: 0,
    url_path: '/08.jpg',
  },
  {
    barcode: 7868000790109,
    brand: 'nike',
    model: 'pegasus trail 4',
    color: '5 colors',
    price: 150,
    size: 12,
    stock: 31,
    url_path: '/09.jpg',
  },
  {
    barcode: 7868000790110,
    brand: 'nike',
    model: 'pegasus trail 3',
    color: 'purple',
    price: 130,
    size: 14,
    stock: 3,
    url_path: '/10.jpg',
  },
  {
    barcode: 7868000790111,
    brand: 'inov',
    model: 'f-lite fly g 295',
    color: 'red/black',
    price: 170,
    size: 13,
    stock: 5,
    url_path: '/11.jpg',
  },
  {
    barcode: 7868000790112,
    brand: 'inov',
    model: 'bare-xf 210 v3',
    color: 'green/gum',
    price: 120,
    size: 6,
    stock: 7,
    url_path: '/12.jpg',
  },
  {
    barcode: 7868000790113,
    brand: 'inov',
    model: 'fastlift 360',
    color: 'khaki',
    price: 190,
    size: 8,
    stock: 0,
    url_path: '/13.jpg',
  },
]);

Users.bulkCreate([
 
  {
    name: 'admin',
    surname: 'admin',
    email: 'admin@admin.com',
    password: 'administrador',
    address: 'admin house',
    dni: 44264445,
    isAdmin: true,
    superAdmin: false,
  },
  {
    name: 'freddie',
    surname: 'mercury',
    email: 'freddie@hotmail.com',
    password: '999cito',
    address: '742 evergreen terrace',
    dni: 1001597283,
    isAdmin: false,
    superAdmin: false,
  },
  {
    name: 'phil',
    surname: 'anselmo',
    email: 'phil@gmail.com',
    password: 'siLaVidaMeDaPalo93',
    address: '90 bedford st.',
    dni: 1717853103,
    isAdmin: false,
    superAdmin: false,
  },
  {
    name: 'bruce',
    surname: 'dickinson',
    email: 'bruce@gmail.com',
    password: 'esViernes45',
    address: '129 west 81st street, apartment 5a',
    dni: 1713022414,
    isAdmin: false,
    superAdmin: false,
  },
  {
    name: 'till',
    surname: 'lindemann',
    email: 'till@hotmail.com',
    password: '666TNOTB',
    address: 'likeastone12',
    dni: 1726649054,
    isAdmin: false,
    superAdmin: false,
  },
  {
    name: 'trent',
    surname: 'reznor',
    email: 'trent@hotmail.com',
    password: 'smellsLikeTeenSpirit23',
    address: '84 beacon St.',
    dni: 1708799505,
    isAdmin: false,
    superAdmin: false,
  },
  {
    name: 'james',
    surname: 'keenan',
    email: 'james@hotmail.com',
    password: 'ichHabeKeineLust67',
    address: '308 negra arroyo lane',
    dni: 1103054292,
    isAdmin: false,
    superAdmin: false,
  },
  {
    name: 'ronnie',
    surname: 'dio',
    email: 'ronnie@gmail.com',
    password: 'ohnneDich15',
    address: '3828 piermont drive',
    dni: 1715511026,
    isAdmin: false,
    superAdmin: false,
  },
]);

Reviews.bulkCreate([
  {
    review: 'Awesome product',
    rating: 4,
  },
  {
    review:
      'These are literally the most uncomfortable shoes I have ever worn. Feel like the circulation to my toes is cut off when walking bc they’re so stiff.',
    rating: 1,
  },
  {
    review: 'Cute but way too small.',
    rating: 5,
  },
  {
    review: 'I love the fact that it came as expected, no complaints.',
    rating: 5,
  },
  {
    review:
      "Bought these for cross-fit classes and I'm in love with them! Perfect!.",
    rating: 4,
  },
  {
    review:
      'Fit, comfy and suitable for cardio and weight lifting training also looking great',
    rating: 4,
  },
  {
    review:
      "I love this design and really wanted to keep it but unfortunately it didn't really fit me personally. I was slipping out and as I walked I was feeling pressure on the top of my feet. Maybe it's just the shape of my feet but otherwise really great shoes.",
    rating: 4,
  },
  {
    review:
      'Got them as a gift for my wife on Valentine’s Day. She’s in love with them.',
    rating: 5,
  },
  {
    review:
      'Over priced. Looked like it was stored under a box of other shoes for a year. Box looked like it was under a stack of other shoes for a year. Do to this leather was creased and folded up and had some blinishes.',
    rating: 2,
  },
  {
    review: 'I bought it for my grandson and he loves it.',
    rating: 4,
  },
  {
    review:
      'Was afraid because at first it seemed not cushion enough but as it turns out it is perfect of lifting weights and keeping balance while doing lunges and such. And they are cute.',
    rating: 5,
  },
  {
    review: 'Nice leather, comfortable and good fit. Would buy again.',
    rating: 5,
  },
  {
    review:
      'Shoes came on time and they fit like a glove no problem what so ever happy that they came just in time for my birthday I have zero compliments.',
    rating: 4,
  },
  {
    review:
      "I bought these for my son and he loves them. They're easy to clean and he wears them on his 'nice outings.",
    rating: 5,
  },
  {
    review:
      'It is to high on the back of the ankle so hurts.. and also mod foot or is way to tight',
    rating: 2,
  },
  {
    review:
      'Been looking everywhere for these for my boyfriend and finally found them! He absolutely loves them and have been wearing them everyday!',
    rating: 5,
  },
  {
    review:
      'What can I say. Love them. Just look at them. I thought they would go for way more from what they cost',
    rating: 4,
  },
  {
    review:
      'Great comfort, great quality, and great shoe all round . Fit as expected.',
    rating: 4,
  },
  {
    review: 'These shoes are similar to other shoes but newer.',
    rating: 3,
  },
  {
    review: 'Great looking, true to size',
    rating: 4,
  },
  {
    review: 'Great sneakers, could not find ANYWHERE, only here',
    rating: 5,
  },
  {
    review: 'Excellent quality',
    rating: 4,
  },
  {
    review: 'Item was as expected!',
    rating: 4,
  },
  {
    review: 'The size fit perfectly I’m so satisfied by quality',
    rating: 4,
  },
  {
    review: "I don't dislike anything about the sneakers",
    rating: 3,
  },
  {
    review: 'Very useful',
    rating: 5,
  },
  {
    review: 'Love the style and the price',
    rating: 4,
  },
  {
    review:
      'Bought this shoes for my daughter. Its so lovely and she adores it',
    rating: 5,
  },
  {
    review: 'The product was as advertised and I am satisfied',
    rating: 5,
  },
  {
    review: 'Value for money',
    rating: 4,
  },
  {
    review: 'Great fit.',
    rating: 4,
  },
  {
    review: 'Great color, comfortable, cool looking shoe!',
    rating: 4,
  },
  {
    review: 'Nice',
    rating: 3,
  },
  {
    review: 'Love the product',
    rating: 5,
  },
  {
    review: '',
    rating: 5,
  },
  {
    review: 'I love the fact that it came as expected, no complaints.',
    rating: 5,
  },
  {
    review:
      'I returned these since rhey were yoo tight and had no arch support.',
    rating: 1,
  },
  {
    review:
      'These shoes were ridiculously small. Like a full size small . Cute sneakers so may reorder bigger',
    rating: 3,
  },
]);
