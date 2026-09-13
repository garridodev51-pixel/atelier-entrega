const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const STUDIO = {
  name: "Estúdio Garrido",
  tagline: "Entrega de fotografias com a mesma elegância do ensaio",
  city: "Maranhão",
  adminPin: "garrido2026",
};

export const JOB_TEMPLATES = {
  Casamento: {
    folders: ["Making of", "Cerimônia", "Retratos", "Festa"],
    message: "Obrigado por nos deixar registrar esse dia. As fotos estão em alta e podem ser baixadas uma a uma ou todas juntas.",
  },
  Ensaio: {
    folders: ["Seleção final"],
    message: "Suas fotos do ensaio estão prontas. Navegue com calma e baixe o que quiser guardar.",
  },
  Evento: {
    folders: ["Cobertura", "Detalhes"],
    message: "A cobertura do evento está disponível nesta página exclusiva.",
  },
  Formatura: {
    folders: ["Solenidade", "Família", "Festa"],
    message: "Parabéns! As fotos da formatura estão nesta página, prontas para download.",
  },
  "15 anos": {
    folders: ["Making of", "Retratos", "Festa"],
    message: "As fotos dos 15 anos estão nesta galeria exclusiva, organizadas por momento.",
  },
  Newborn: {
    folders: ["Ensaio"],
    message: "As fotos do ensaio recém-nascido estão prontas. Guarde com carinho.",
  },
  Outro: {
    folders: ["Fotos"],
    message: "Suas fotos estão prontas nesta página. Baixe uma a uma ou o álbum completo.",
  },
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
    message: "Obrigado por nos deixar registrar esse dia.",
    collections: [
      { id: "cerimonia", name: "Cerimônia", photos: [{ id: "c1", name: "cerimonia-01.jpg", src: u("photo-1519741497674-611481863552") }, { id: "c2", name: "cerimonia-02.jpg", src: u("photo-1465495976277-4387d4b0b4c6") }] },
      { id: "festa", name: "Festa", photos: [{ id: "f1", name: "festa-01.jpg", src: u("photo-1519225421980-715cb0215aed") }, { id: "f2", name: "festa-02.jpg", src: u("photo-1464366400600-7168b8af9bc3") }] },
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
    message: "As fotos do ensaio estão prontas.",
    collections: [
      { id: "externas", name: "Externas", photos: [{ id: "e1", name: "familia-01.jpg", src: u("photo-1511895426328-dc8714191300") }, { id: "e2", name: "familia-02.jpg", src: u("photo-1476703993599-0035a21b17a9") }] },
    ],
  },
  {
    id: "seed-formatura",
    slug: "formatura-turma-2026",
    title: "Formatura Turma 2026",
    client: "Turma 2026",
    date: "2026-12-05",
    type: "Formatura",
    password: "turma2026",
    cover: u("photo-1523050854058-8df90110c9f1"),
    message: "As fotos da formatura estão nesta página.",
    collections: [
      { id: "solenidade", name: "Solenidade", photos: [{ id: "s1", name: "formatura-01.jpg", src: u("photo-1523050854058-8df90110c9f1") }] },
    ],
  },
  {
    id: "seed-15anos",
    slug: "15-anos-larissa",
    title: "15 anos Larissa",
    client: "Larissa Mendes",
    date: "2026-06-14",
    type: "15 anos",
    password: "larissa15",
    cover: u("photo-1519225421980-715cb0215aed"),
    message: "As fotos dos 15 anos estão nesta página exclusiva.",
    collections: [
      { id: "festa15", name: "Festa", photos: [{ id: "q1", name: "15-01.jpg", src: u("photo-1519225421980-715cb0215aed") }] },
    ],
  },
  {
    id: "seed-evento",
    slug: "evento-corporativo-aurora",
    title: "Evento Corporativo Aurora",
    client: "Aurora",
    date: "2026-05-20",
    type: "Evento",
    password: "aurora",
    cover: u("photo-1540575467063-178a50c2df87"),
    message: "A cobertura do evento está nesta página.",
    collections: [
      { id: "cobertura", name: "Cobertura", photos: [{ id: "ev1", name: "evento-01.jpg", src: u("photo-1540575467063-178a50c2df87") }] },
    ],
  },
  {
    id: "seed-newborn",
    slug: "newborn-bebe-lucas",
    title: "Newborn Lucas",
    client: "Família Costa",
    date: "2026-04-02",
    type: "Newborn",
    password: "lucas",
    cover: u("photo-1519689680058-324335c77eba"),
    message: "As fotos do Lucas estão nesta página.",
    collections: [
      { id: "ensaio-nb", name: "Ensaio", photos: [{ id: "n1", name: "lucas-01.jpg", src: u("photo-1519689680058-324335c77eba") }] },
    ],
  },
];
