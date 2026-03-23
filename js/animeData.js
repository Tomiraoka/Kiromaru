const animeDatabase = [
  {
    title: 'My Hero Academia',
    image: 'https://files.ekmcdn.com/allwallpapers/images/my-hero-academia-poster-61x91.5cm-large-new-manga-anime-38926-1-p.jpg',
    type: 'anime'
  },
  {
    title: 'Dandadan',
    image: 'https://m.media-amazon.com/images/M/MV5BYWFhOWMxNTYtZThiMi00ZmQ5LTlmODktN2QwNzUyZjMyZGQzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'anime'
  },
  {
    title: 'Solo Leveling',
    image: 'https://i5.walmartimages.com/seo/LNASI-Solo-Leveling-Anime-Poster-12x18Inch-30x46cm-Unframed_b651d18a-26c6-492e-b24b-21532cf99f4c.91d18e48662bf96bd1c9049164d9f5cb.jpeg',
    type: 'anime'
  },
  {
    title: 'The Apothecary Diaries',
    image: 'https://media.themoviedb.org/t/p/w500/e3ojpANrFnmJCyeBNTinYwyBCIN.jpg',
    type: 'anime'
  },
  {
    title: 'Dr. Stone',
    image: 'https://m.media-amazon.com/images/M/MV5BYzZkYjM1MWMtNTY3Mi00MTMzLTlhNmQtN2ExZjFkYzdjZmFjXkEyXkFqcGc@._V1_.jpg',
    type: 'anime'
  },
  {
    title: 'Demon Slayer',
    image: 'https://m.media-amazon.com/images/M/MV5BMWU1OGEwNmQtNGM3MS00YTYyLThmYmMtN2FjYzQzNzNmNTE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'anime'
  },
  {
    title: 'Fire Force',
    image: 'https://xonomax.com/cdn/shop/files/750185.jpg?v=1721568659',
    type: 'anime'
  },
  {
    title: 'Mushoku Tensei',
    image: 'https://m.media-amazon.com/images/M/MV5BYWQwNjk3MDItNDAxMS00YTQ2LWEyNDctMGYyZTE5OGQxNGQ1XkEyXkFqcGc@._V1_.jpg',
    type: 'anime'
  },
  {
    title: 'Chainsaw Man',
    image: 'https://m.media-amazon.com/images/I/71DOGFSR6bL._UF894,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'Mashle: Magic and Muscles',
    image: 'https://m.media-amazon.com/images/I/71ACFat73qL._AC_UF894,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'The Beginning After The End',
    image: 'https://static.wikia.nocookie.net/voiceacting/images/f/f3/The_Beginning_After_the_End.jpg/revision/latest?cb=20250424173502',
    type: 'anime'
  },
  {
    title: 'Wind Breaker',
    image: 'https://m.media-amazon.com/images/I/71FeAZkqHzL._AC_UF1000,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'Attack on Titan',
    image: 'https://m.media-amazon.com/images/I/61t9ie31jgL._AC_UF894,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'Death Note',
    image: 'https://static.wikia.nocookie.net/listofdeaths/images/8/8c/Death_Note_Poster.jpg/revision/latest?cb=20200709085505',
    type: 'anime'
  },
  {
    title: 'Hunter x Hunter',
    image: 'https://comichub.blob.core.windows.net/high/8607f145-4b79-4a9c-8816-d384bb633598.jpg',
    type: 'anime'
  },
  {
    title: 'One Piece',
    image: 'https://m.media-amazon.com/images/I/81zwj54srRL._AC_UF894,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'Jujutsu Kaisen',
    image: 'https://i.ebayimg.com/images/g/TH8AAOSwNcxlINOt/s-l1200.jpg',
    type: 'anime'
  },
  {
    title: 'Re:Zero - Starting Life in Another World',
    image: 'https://m.media-amazon.com/images/M/MV5BOTIyNGIzY2EtYjMyZS00Y2M0LWE4MTktNmQ3Y2IwZTBhNWE2XkEyXkFqcGc@._V1_.jpg',
    type: 'anime'
  },
  {
    title: 'Kaiju No. 8',
    image: 'https://m.media-amazon.com/images/I/71iNxd5PuIL._AC_UF894,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'Frieren: Beyond Journey\'s End',
    image: 'https://m.media-amazon.com/images/I/71wCsabGOQL._AC_UF894,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'Vinland Saga',
    image: 'https://image.tmdb.org/t/p/original/vUHlpA5c1NXkds59reY3HMb4Abs.jpg',
    type: 'anime'
  },
  {
    title: 'One Punch Man',
    image: 'https://static.posters.cz/image/1300/86559.jpg',
    type: 'anime'
  },
  {
    title: 'KonoSuba',
    image: 'https://m.media-amazon.com/images/I/71usoDBW-cL.jpg',
    type: 'anime'
  },
  {
    title: 'That Time I Got Reincarnated as a Slime',
    image: 'https://m.media-amazon.com/images/M/MV5BM2IwMDM4MDgtZWU2Zi00YjA2LWJhOTItNGUzMWM1N2E4ZTk3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'anime'
  },
  {
    title: 'The Eminence in Shadow',
    image: 'https://i.ebayimg.com/images/g/Cj8AAOSwjX9kQk9Z/s-l1200.jpg',
    type: 'anime'
  },
  {
    title: 'The Saga of Tanya the Evil',
    image: 'https://image.tmdb.org/t/p/original/gpdrbXq1tGJxW9ebqMQHhg9VhaD.jpg',
    type: 'anime'
  },
  {
    title: 'Sword Art Online',
    image: 'https://i5.walmartimages.com/seo/Sword-Art-Online-Key-Art-1-Wall-Poster-14-725-x-22-375-Framed_6d784db4-0256-4e5c-b219-69b543c5e4db.9caff8672efd1be25b57b3da9b876396.jpeg',
    type: 'anime'
  },
  {
    title: 'Toradora!',
    image: 'https://m.media-amazon.com/images/I/71iRZ2PFfGL.jpg',
    type: 'anime'
  },
  {
    title: 'Horimiya',
    image: 'https://i.pinimg.com/736x/86/62/4b/86624b5cec4c124d661792faad4b4e1b.jpg',
    type: 'anime'
  },
  {
    title: 'Kimi ni Todoke',
    image: 'https://postersbase.com/cdn/shop/files/1-Posters-From-Me-to-You_-Kimi-ni-Todoke-Posters-Base.png?v=1730395199&width=1080',
    type: 'anime'
  },
  {
    title: 'Your Lie in April',
    image: 'https://rukminim2.flixcart.com/image/480/480/kvzkosw0/poster/1/a/j/medium-your-lie-in-april-anime-matte-finish-poster-ppoint6744-original-imag8rk4k2kayjfs.jpeg?q=90',
    type: 'anime'
  },
  {
    title: 'Tsukigakirei',
    image: 'https://m.media-amazon.com/images/M/MV5BNjBhOGVkN2MtMzQwZC00ZTI1LTlmMzgtN2RhZDVkNWE0ZDFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'anime'
  },
  {
    title: 'Kaguya-sama: Love Is War',
    image: 'https://m.media-amazon.com/images/M/MV5BMTM1ZWViNWMtZWY2ZC00YmYyLTk1ZGEtMzRjOWI2YTM1OTI3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'anime'
  },
  {
    title: 'Oregairu',
    image: 'https://cdn11.bigcommerce.com/s-64ni4d05jw/images/stencil/1280x1280/products/16184/16596/Poster_Propaganda_-_Oregairu_-_Characters_-_LL0754__37612.1596552610.jpg?c=1',
    type: 'anime'
  },
  {
    title: 'High School DxD',
    image: 'https://www.kinonews.ru/insimgs/2017/poster/poster72710_1.jpg',
    type: 'anime'
  },
  {
    title: 'The Angel Next Door Spoils Me Rotten',
    image: 'https://m.media-amazon.com/images/M/MV5BNDI1OWVjNGYtZmE0NC00Zjk3LWI5ZWItODYxYWU2ZGQ1OTJmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'anime'
  },
  {
    title: 'Grand Blue',
    image: 'https://i.ebayimg.com/images/g/qtUAAOSw-ldhvCtX/s-l400.jpg',
    type: 'anime'
  },
  {
    title: 'Gintama',
    image: 'https://i.ebayimg.com/images/g/R0YAAOSwqhpkQksq/s-l1200.jpg',
    type: 'anime'
  },
  {
    title: 'The Disastrous Life of Saiki K.',
    image: 'https://i.pinimg.com/474x/48/95/80/48958087822dca9bd57c39733647dc2c.jpg',
    type: 'anime'
  },
  {
    title: 'Daily Lives of High School Boys',
    image: 'https://m.media-amazon.com/images/M/MV5BMDVhOTNmMzgtNWNhNy00OGEwLWI4ODEtM2IxZTFjYTQ4ZTU4XkEyXkFqcGc@._V1_.jpg',
    type: 'anime'
  },
  {
    title: 'Azumanga Daioh',
    image: 'https://m.media-amazon.com/images/I/611YcTIGjyL._AC_SL1000__.jpg',
    type: 'anime'
  },
  {
    title: 'Barakamon',
    image: 'https://m.media-amazon.com/images/I/61wTj8BLSEL._AC_UF894,1000_QL80_.jpg',
    type: 'anime'
  },
  {
    title: 'Great Teacher Onizuka',
    image: 'https://media.animationdigitalnetwork.com/images/show/e3fef915-f55b-4d62-8038-3a1a0520eaa5/portrait-with-logo.width=630,height=900,quality=80',
    type: 'anime'
  },
  {
    title: 'The Devil is a Part-Timer!',
    image: 'https://m.media-amazon.com/images/M/MV5BODdjMWIyYjQtNzI4ZC00ZjA1LWJmYzMtYTA1ZjFiNTMxZWI5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'anime'
  }
];