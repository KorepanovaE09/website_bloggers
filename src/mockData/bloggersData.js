const bloggersData = [
  {
    id: 1,
    src: "/img/3.jpg",
    alt: "фото профиля",
    category: "История",
    network: {
      instagram: {
        icon: "/icons/instagram.png",
        link: "https://instagram.com/historyqueen",
        name: "History Queen",
        description: "Погружаемся в интересные исторические факты и неожиданные открытия.",
        followers: 15400,
        reach: "12 300",
        cpv: "0.45 ₽",
        er: "6.2%",
        services: [
          { name: "Рилс", price: 5000 },
          { name: "История", price: 3000 },
          { name: "Пост", price: 4000 },
        ],
      },
      youtube: {
        icon: "/icons/youtube.png",
        link: "https://youtube.com/@historyqueen",
        name: "History Queen",
        description: "Видео об истории, мифах и загадках прошлого.",
        followers: 22100,
        reach: "18 000",
        cpv: "0.60 ₽",
        er: "4.8%",
        services: [
          { name: "Интеграция", price: 15000 },
          { name: "Упоминание в видео", price: 7000 },
        ],
      },
      telegram: {
        icon: "/icons/telegram.png",
        link: "https://t.me/historyqueen",
        name: "История в деталях",
        description: "Каждый день — новая историческая загадка или факт.",
        followers: 5300,
        reach: "4000",
        cpv: "0.38 ₽",
        er: "7.1%",
        services: [
          { name: "Реклама в посте", price: 2000 },
          { name: "Закрепленный пост", price: 5000 },
        ],
      },
      vk: {
        icon: "/icons/vk.png",
        link: "https://vk.com/historyqueen",
        name: "История и факты",
        description: "Делимся фактами и фото из прошлого мира.",
        followers: 1800,
        reach: "1400",
        cpv: "0.52 ₽",
        er: "5.6%",
        services: [
          { name: "Пост", price: 3500 },
          { name: "История", price: 2500 },
        ],
      },
    },
  },
  {
    id: 2,
    src: "/img/1.jpg",
    alt: "фото профиля",
    category: "Путешествия",
    network: {
      instagram: {
        icon: "/icons/instagram.png",
        link: "https://instagram.com/travel_with_katya",
        name: "Travel with Katya",
        description: "Вдохновляющие фотографии из путешествий по миру.",
        followers: 20400,
        reach: "17 800",
        cpv: "0.35 ₽",
        er: "8.3%",
        services: [
          { name: "Рилс", price: 6000 },
          { name: "История", price: 3200 },
          { name: "Пост", price: 4500 },
        ],
      },
      youtube: {
        icon: "/icons/youtube.png",
        link: "https://youtube.com/@travelkatya",
        name: "Katya Travels",
        description: "Блоги о путешествиях, советы туристам и интересные маршруты.",
        followers: 40200,
        reach: "35 000",
        cpv: "0.40 ₽",
        er: "7.0%",
        services: [
          { name: "Интеграция", price: 18000 },
          { name: "Упоминание в видео", price: 9000 },
        ],
      },
      telegram: {
        icon: "/icons/telegram.png",
        link: "https://t.me/travel_katya",
        name: "Катя в пути",
        description: "Путевые заметки, фото, маршруты и советы.",
        followers: 7500,
        reach: "5800",
        cpv: "0.41 ₽",
        er: "7.5%",
        services: [
          { name: "Реклама в посте", price: 2200 },
          { name: "Закрепленный пост", price: 5200 },
        ],
      },
      vk: {
        icon: "/icons/vk.png",
        link: "https://vk.com/travelkatya",
        name: "Путешествия с Катей",
        description: "Фото из поездок, советы и истории из разных уголков мира.",
        followers: 3100,
        reach: "2600",
        cpv: "0.47 ₽",
        er: "6.9%",
        services: [
          { name: "Пост", price: 3700 },
          { name: "История", price: 2700 },
        ],
      },
    },
  },
  {
    id: 3,
    src: "/img/2.jpg",
    alt: "фото профиля",
    category: "Образование",
    network: {
      instagram: {
        icon: "/icons/instagram.png",
        link: "https://instagram.com/math_expert",
        name: "Math Expert",
        description: "Публикации и сторис о математике, ЕГЭ и лайфхаках для учёбы.",
        followers: 9800,
        reach: "8000",
        cpv: "0.33 ₽",
        er: "8.1%",
        services: [
          { name: "Рилс", price: 4200 },
          { name: "История", price: 2700 },
          { name: "Пост", price: 3500 },
        ],
      },
      youtube: {
        icon: "/icons/youtube.png",
        link: "https://youtube.com/@mathexpert",
        name: "Математика просто",
        description: "Уроки, разборы и советы по подготовке к экзаменам.",
        followers: 30500,
        reach: "25000",
        cpv: "0.38 ₽",
        er: "6.5%",
        services: [
          { name: "Интеграция", price: 16000 },
          { name: "Упоминание в видео", price: 7500 },
        ],
      },
      telegram: {
        icon: "/icons/telegram.png",
        link: "https://t.me/mathexpert_channel",
        name: "Математика для всех",
        description: "Советы, задачи и полезные ссылки по математике.",
        followers: 6200,
        reach: "5000",
        cpv: "0.39 ₽",
        er: "7.8%",
        services: [
          { name: "Реклама в посте", price: 2400 },
          { name: "Закрепленный пост", price: 4800 },
        ],
      },
      vk: {
        icon: "/icons/vk.png",
        link: "https://vk.com/mathexpert",
        name: "Математика легко",
        description: "Пояснения, схемы и подготовка к контрольным.",
        followers: 2700,
        reach: "2200",
        cpv: "0.43 ₽",
        er: "6.2%",
        services: [
          { name: "Пост", price: 3300 },
          { name: "История", price: 2600 },
        ],
      },
    },
  },
];

export default bloggersData;
