const filmDatabase = [
  {
    title: 'Your Name',
    image: 'https://ir.ozone.ru/s3/multimedia-s/c1000/6386270596.jpg',
    type: 'film'
  },
  {
    title: 'The Boy and the Heron',
    image: 'https://myhotposters.com/cdn/shop/files/mL7004_grande.jpg?v=1748531370',
    type: 'film'
  },
  {
    title: 'Spirited Away',
    image: 'https://m.media-amazon.com/images/I/61ON14PVzoL.jpg',
    type: 'film'
  },
  {
    title: 'Howl\'s Moving Castle',
    image: 'https://i.ebayimg.com/images/g/h9oAAOSw0BJgHam1/s-l1200.jpg',
    type: 'film'
  },
  {
    title: 'My Neighbor Totoro',
    image: 'https://www.tallengestore.com/cdn/shop/files/MyNeighborTotoro-StudioGhibli-JapanaeseAnimatedMoviePoster_grande.jpg?v=1690726355',
    type: 'film'
  },
  {
    title: 'The Boy and the Beast',
    image: 'https://m.media-amazon.com/images/S/pv-target-images/b99b127a92c8dd7ff3f01b23fdca78f00358fa14d4a823352273da308df5aaf1.jpg',
    type: 'film'
  },
  {
    title: 'Princess Mononoke',
    image: 'https://www.tallengestore.com/cdn/shop/products/PrincessMononoke-StudioGhibli-JapanaeseAnimatedMoviePoster_a1fded11-57ad-43f5-b374-d2fc5154e41a.jpg?v=1691816762',
    type: 'film'
  },
  {
    title: 'Weathering with You',
    image: 'https://m.media-amazon.com/images/M/MV5BMmJiYWI4ZjktMzgyZS00MjBiLThmOTYtZWJmOTUzOTFkMTFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
    type: 'film'
  },
  {
    title: 'The Garden of Words',
    image: 'https://m.media-amazon.com/images/M/MV5BYjdiMDdlMDItOGM4Ny00YmE4LTk0MTEtMGRhM2Y4OWZkZDZkXkEyXkFqcGc@._V1_.jpg',
    type: 'film'
  },
  {
    title: 'The Wind Rises',
    image: 'https://www.logobook.kz/make_nimage.php?uid=12481071',
    type: 'film'
  },
  {
    title: 'Whisper of the Heart',
    image: 'https://m.media-amazon.com/images/I/91K9DUwnZVL._AC_UF894,1000_QL80_.jpg',
    type: 'film'
  },
  {
    title: 'A Silent Voice',
    image: 'https://rukminim2.flixcart.com/image/480/480/kwwfte80/poster/0/r/p/medium-a-silent-voice-movie-matte-finish-poster-am7474-original-imag9h6zbpzaxngh.jpeg?q=90',
    type: 'film'
  },
  {
    title: '5 Centimeters per Second',
    image: 'https://resizing.flixster.com/ALS2Djmyte1w2LK9PSMqX9EH2ug=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2U5OTc4MzE3LWJhNTctNDRkNy04ZjE0LTIyNmM4MmU0ZTU2OC5qcGc=',
    type: 'film'
  },
  {
    title: 'Attack on Titan: The Last Attack',
    image: 'https://i.redd.it/yne99eegmdje1.jpeg',
    type: 'film'
  },
  {
    title: 'The Lord of the Rings: The War of the Rohirrim',
    image: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcThxzvBUOvOS0tgyww6qYId3i_92RKk9uNnQlSQ74LnAdQtdMa1',
    type: 'film'
  },
  {
    title: 'The Colors Within',
    image: 'https://m.media-amazon.com/images/M/MV5BNWYyN2NkMjgtNWYyMy00OWE4LTk5ZGQtZDZkMWJlMmEyZDFmXkEyXkFqcGc@._V1_.jpg',
    type: 'film'
  },
  {
    title: 'The Glassworker',
    image: 'https://m.media-amazon.com/images/M/MV5BNjQzZTE2YWUtZTliOC00ZmUyLWE4ZmUtMjNhZmZlMDg0NDYzXkEyXkFqcGc@._V1_.jpg',
    type: 'film'
  },
  {
    title: 'Delicious in Dungeon',
    image: 'https://m.media-amazon.com/images/I/71uqMHgYN0L._AC_UF894,1000_QL80_.jpg',
    type: 'film'
  },
  {
    title: 'Akira',
    image: 'https://media.posterlounge.com/img/products/720000/716040/716040_poster.jpg',
    type: 'film'
  },
  {
    title: 'The Place Promised in Our Early Days',
    image: 'https://resizing.flixster.com/N42cy1vE5P766p5LTATb5095veM=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2UwMTdiZTMwLWUxNjAtNGM2My05MGRhLWM3MDQ1ZjkyYjJlMC5qcGc=',
    type: 'film'
  },
  {
    title: 'Suzume',
    image: 'https://m.media-amazon.com/images/I/61XRfzUUOvL._UF1000,1000_QL80_.jpg',
    type: 'film'
  },
  {
    title: 'Look Back',
    image: 'https://image.tmdb.org/t/p/original/1QJBTdtyH5aLrhjR3VbuxXNNnzH.jpg',
    type: 'film'
  },
  {
    title: 'Ride Your Wave',
    image: 'https://m.media-amazon.com/images/M/MV5BZDM5YTliZDgtZWYwZC00OWM4LWFiOTYtNDc0N2IxZjNiMjUzXkEyXkFqcGc@._V1_.jpg',
    type: 'film'
  }
];