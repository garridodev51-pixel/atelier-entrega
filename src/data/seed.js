const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const STUDIO = {
  name: "Estúdio Garrido",
  tagline: "Entrega de fotografias com a mesma elegância do ensaio",
  city: "Maranhão",
  adminPin: "garrido2026",
};

export const SEED_GALLERIES = [
  {
    id: "seed-casamento",
    slug: "casamento-ana-pedro",
    title: "Casamento Ana & Pedro",
    client: "Ana Souza e Pedro Lima",
    date: "2026-08-22",
    type: "Casamento",
    password: "anaepedro",
    cover: u("photo-1519741497674-611481863552"),
    message:
      "Obrigado por nos deixar registrar esse dia. As fotos estão em alta e podem ser baixadas uma a uma ou todas juntas.",
    expiresAt: "2027-08-22",
    collections: [
      {
        id: "cerimonia",
        name: "Cerimônia",
        photos: [
          { id: "c1", name: "cerimonia-01.jpg", src: u("photo-1519741497674-611481863552") },
          { id: "c2", name: "cerimonia-02.jpg", src: u("photo-1465495976277-4387d4b0b4c6") },
          { id: "c3", name: "cerimonia-03.jpg", src: u("photo-1511285560929-80b456fea0bc") },
          { id: "c4", name: "cerimonia-04.jpg", src: u("photo-1606800052052-a08af7148866") },
        ],
      },
      {
        id: "festa",
        name: "Festa",
        photos: [
          { id: "f1", name: "festa-01.jpg", src: u("photo-1519225421980-715cb0215aed") },
          { id: "f2", name: "festa-02.jpg", src: u("photo-1464366400600-7168b8af9bc3") },
          { id: "f3", name: "festa-03.jpg", src: u("photo-1478144592103-25e218a98748") },
          { id: "f4", name: "festa-04.jpg", src: u("photo-1520854221256-17451cc331bf") },
        ],
      },
      {
        id: "retratos",
        name: "Retratos",
        photos: [
          { id: "r1", name: "retrato-01.jpg", src: u("photo-1583939003579-730e3918a45a") },
          { id: "r2", name: "retrato-02.jpg", src: u("photo-1529634597493-8c96403656c0") },
          { id: "r3", name: "retrato-03.jpg", src: u("photo-1591604466107-ec97de577aff") },
          { id: "r4", name: "retrato-04.jpg", src: u("photo-1544078751-58fee2d8a03b") },
        ],
      },
    ],
  },
  {
    id: "seed-ensaio",
    slug: "ensaio-familia-oliveira",
    title: "Ensaio Família Oliveira",
    client: "Família Oliveira",
    date: "2026-07-10",
    type: "Ensaio",
    password: "oliveira",
    cover: u("photo-1511895426328-dc8714191300"),
    message: "Selecionamos as fotos finais do ensaio. Baixem com calma e guardem com carinho.",
    expiresAt: "2027-07-10",
    collections: [
      {
        id: "externas",
        name: "Externas",
        photos: [
          { id: "e1", name: "familia-01.jpg", src: u("photo-1511895426328-dc8714191300") },
          { id: "e2", name: "familia-02.jpg", src: u("photo-1476703993599-0035a21b17a9") },
          { id: "e3", name: "familia-03.jpg", src: u("photo-1609220136736-443140cff224") },
          { id: "e4", name: "familia-04.jpg", src: u("photo-1542037104857-ffbb0b9155fb") },
        ],
      },
    ],
  },
];
