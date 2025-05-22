const channelsData = [
  {
    id: 1,
    network: "telegram",
    channelName: "Канал 1",
    description: "Описание канала 1 ",
    services: [
      { id: 1, name: "Услуга 1", price: 100, status: "active" },
      { id: 2, name: "Услуга 2", price: 200, status: "unActive" },
    ],
  },
  {
    id: 2,
    network: "instagram",
    channelName: "Канал 2",
    description: "Описание канала 2",
    services: [
      { id: 1, name: "Услуга 1", price: 150, status: "active" },
      { id: 2, name: "Услуга 2", price: 250, status: "active" },
    ],
  },
  {
    id: 3,
    network: "telegram",
    channelName: "Канал 3",
    description: "Описание канала 3",
    services: [
      { id: 1, name: "Услуга 1", price: 150, status: "active" },
      { id: 2, name: "Услуга 2", price: 250, status: "active" },
      { id: 3, name: "Услуга 3", price: 150, status: "unActive" },
      { id: 4, name: "Услуга 4", price: 250, status: "active" },
    ],
  },
  // {
  //   id: 4,
  //   networkIcon: "/img/network/instagram.jpg",
  //   channelName: "Канал 2",
  //   description: "Описание канала 2",
  //   services: [
  //     { id: 1, name: "Услуга 1", price: 150 },
  //     { id: 2, name: "Услуга 2", price: 250 },
  //   ],
  // },
];

export default channelsData;
