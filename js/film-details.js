document.addEventListener('DOMContentLoaded', function() {
  const selectedAnime = localStorage.getItem('selectedAnime');
  let item;
  
  if (selectedAnime) {
    try {
      item = JSON.parse(selectedAnime);
    } catch (error) {
      console.error('Error parsing selectedAnime:', error);
    }
  }

  if (!item || item.type !== 'film') {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const image = urlParams.get('image');
    
    if (title && image) {
      item = {
        title: title,
        image: image,
        type: 'film'
      };
    } else {
      window.location.href = 'films.html';
      return;
    }
  }

  const title = item.title;
  const image = item.image;

  const filmDetailsContainer = document.getElementById('filmDetails');

  filmDetailsContainer.innerHTML = `
    <div class="film-poster">
      <img src="${image}" alt="${title}">
    </div>
    <div class="film-info">
      <h1 class="film-title">${title}</h1>
      <div class="film-meta">
        <span><i class="fas fa-star"></i> ${generateRating(title)}</span>
        <span><i class="fas fa-calendar-alt"></i> ${generateYear(title)}</span>
        <span><i class="fas fa-clock"></i> ${generateDuration(title)}</span>
      </div>
      <p class="film-description">${generateDescription(title)}</p>
      <div class="video-player-section">
        <div id="youtubePlayer" class="youtube-player">
          <iframe id="youtubeIframe" width="100%" height="400" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;
  
  const youtubeIframe = document.getElementById('youtubeIframe');

  const defaultVideos = {
    "Your Name": "https://www.youtube.com/embed/e58zJupEIgE?si=numN_M8b2QfaR4y8",
    "The Boy and the Heron": "https://www.youtube.com/embed/srP6BRLlGUY?si=VeeXH4t8VXVPJQI-",
    "Spirited Away": "https://www.youtube.com/embed/aVnNmzQTrJM?si=oG-e0ag_CWU3wMs6",
    "Howl's Moving Castle": "https://www.youtube.com/embed/8X60yJ7ssfE?si=e5tdsUEfBvgrR7ZJ",
    "My Neighbor Totoro": "https://www.youtube.com/embed/WorhXcGq6gA?si=rGS7wf_iD-JJJYrh",
    "The Boy and the Beast": "https://www.youtube.com/embed/zDBTF5PMp-A?si=qtIlo_h6NPHpv7sy",
    "Princess Mononoke": "https://www.youtube.com/embed/-Kokp-cwl_A?si=MxGxlPsP7t2IliXS",
    "Weathering with You": "https://www.youtube.com/embed/l_VrW6hhP00?si=56uaiL1wptiBsKJj",
    "The Garden of Words": "https://www.youtube.com/embed/ZY7kmwakOcI?si=nor2yogtlhczEozE",
    "The Wind Rises": "https://www.youtube.com/embed/NXX_XWsHFgg?si=6e6-6XFEPd_6q5Ox",
    "Whisper of the Heart": "https://www.youtube.com/embed/0U9PGhM_DW0?si=OrWxkpHrRS5mQuXz",
    "A Silent Voice": "https://www.youtube.com/embed/U1cNZd0KYro?si=NY2jD-flWZdELKjy",
    "5 Centimeters per Second": "https://www.youtube.com/embed/9QQRLljUqpQ?si=O32wGmFrv12l0gJB",
    "Attack on Titan: The Last Attack": "https://www.youtube.com/embed/U_3bHOB2g8A?si=PTAcebAQTQaBf6_8",
    "The Lord of the Rings: The War of the Rohirrim": "https://youtu.be/XtvZme4LIWw?si=2gwebZ-r5C3s6BMJ",
    "The Colors Within": "https://www.youtube.com/embed/erIVDCpY0qY?si=L_LsPiCwIflk_gh0",
    "The Glassworker": "https://www.youtube.com/embed/T29egHveoN8?si=gEzRz7oTyiB4aCxn",
    "Delicious in Dungeon": "https://www.youtube.com/embed/vBCEEwB1_Fg?si=rJoLHzx2xh0Jpzrg&amp;start=8",
    "Akira": "https://www.youtube.com/embed/ICTH_nN5HpM?si=twXXNMyYyDV1CFFZ&amp;start=7",
    "The Place Promised in Our Early Days": "https://www.youtube.com/embed/GqsymGg0vHA?si=5nvWYVt5dHeYq1Ga&amp;start=3",
    "Suzume": "https://www.youtube.com/embed/Ys6cpzWRwLw?si=HygOwenOiyXl5Rxt&amp;start=9",
    "Look Back": "https://www.youtube.com/embed/bAi5RomB2gw?si=cER1cYveBptb2_lj",
    "Ride Your Wave": "https://www.youtube.com/embed/vgAycaBJ7uw?si=9VfOizRbL3kywHPA&amp;start=3"
  };

  function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  if (defaultVideos[title]) {
    const videoId = getYouTubeVideoId(defaultVideos[title]);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      youtubeIframe.src = embedUrl;
    }
  }
});

function generateDescription(title) {
  const descriptions = {
    "Your Name": "Mitsuha Miyamizu, a high school girl from a rural town, longs to live the life of a boy in Tokyo. Taki Tachibana, a boy living in Tokyo, dreams of escaping his busy city life. When they mysteriously begin swapping bodies, they navigate each other's lives through written messages and journal entries. As their connection deepens, a cosmic event threatens to separate them forever, forcing Taki to embark on a desperate journey across time and space to find Mitsuha before their memories of each other fade away completely.",
    "The Boy and the Heron": "During World War II, young Mahito Maki loses his mother in a hospital fire. A year later, his father remarries his deceased wife's sister, Natsuko, and moves the family to her rural estate. There, Mahito encounters a mysterious gray heron that claims his mother is still alive and can be found in an abandoned tower on the property. Following the heron into a surreal and magical world, Mahito embarks on a transformative journey through grief, acceptance, and the complex nature of family bonds, confronting both the beauty and darkness of the human spirit.",
    "Spirited Away": "Ten-year-old Chihiro Ogino and her parents accidentally wander into a mysterious abandoned amusement park that serves as a gateway to the spirit world. When her parents are transformed into pigs after eating food meant for the gods, Chihiro must work at the bathhouse run by the witch Yubaba to survive. With the help of the mysterious Haku and other strange creatures, she embarks on a journey of self-discovery, learning about courage, friendship, and the importance of remembering one's true identity to save her parents and return to the human world.",
    "Howl's Moving Castle": "Sophie Hatter, a young hat-maker, is cursed by the Witch of the Waste, transforming her into an old woman. Seeking to break the curse, she finds refuge in the moving castle of the notorious wizard Howl. Inside, she befriends Calcifer, a fire demon bound to Howl by a mysterious contract. As war threatens the kingdom, Sophie uses her newfound confidence and love to help Howl confront his own fears and vanity, discovering that true beauty lies within and that love has the power to break any curse.",
    "My Neighbor Totoro": "When their mother falls ill, sisters Satsuki and Mei move with their father to an old house in the countryside. There, they discover that the nearby forest is inhabited by magical creatures, including Totoro—a large, gentle spirit who becomes their friend. Together, they experience adventures that blur the line between imagination and reality, from flying on a catbus to helping a magical tree grow overnight. This heartwarming story celebrates the wonder of childhood and the power of believing in magic when facing life's challenges.",
    "The Boy and the Beast": "Ren, a nine-year-old orphan who runs away from his foster family, wanders into the beast realm of Jutengai. There, he becomes the apprentice of Kumatetsu, a brawler beast who needs a disciple to compete for the position of lord. Despite their clashing personalities, the two form an unlikely bond as Ren grows into a strong young man. Years later, when darkness threatens both the human and beast worlds, their relationship is tested in ways that will determine the fate of both realms and reveal the true meaning of family.",
    "Princess Mononoke": "In the late Muromachi period, Ashitaka, a young prince of the Emishi tribe, kills a demon possessed by a boar god, but is cursed in the process. To find a cure, he travels west, where he discovers a war between the gods of the forest and the humans of Iron Town, led by the ambitious Lady Eboshi. Caught between the two sides is San, a human girl raised by wolves who fights to protect the forest. Ashitaka must find a way to heal the rift between humanity and nature before both are destroyed.",
    "Weathering with You": "High school student Hodaka Morishima runs away from his rural home to Tokyo, where he struggles to survive in the rainy city. He finds work with a small publishing company and meets Hina Amano, a girl with the power to temporarily stop the rain and bring sunshine. They start a business selling her services, but using her power takes a toll on Hina's body. As Tokyo faces unprecedented weather disasters, Hodaka must make an impossible choice between saving the city or saving the girl who brought light into his life.",
    "The Garden of Words": "Takao Akizuki, a 15-year-old aspiring shoemaker, skips school on rainy mornings to sketch shoes in Shinjuku Garden. There, he repeatedly encounters Yukari Yukino, a mysterious older woman who seems to be skipping work. Their chance meetings become a ritual, and they share quiet moments together without revealing their identities. As the rainy season ends, Takao discovers Yukari's painful secret, forcing him to confront his feelings and decide what path his life will take in this visually stunning meditation on loneliness and human connection.",
    "The Wind Rises": "Jiro Horikoshi, a young man with dreams of designing beautiful airplanes, is haunted by a childhood vision of the Italian aviation pioneer Caproni. As he pursues his passion in pre-war Japan, he meets Naoko Satomi, the love of his life, during the Great Kanto Earthquake. Their romance unfolds against the backdrop of Japan's rapid militarization, forcing Jiro to reconcile his artistic dreams with the reality that his creations will be used as weapons of war in this bittersweet story about following one's passion despite the consequences.",
    "Whisper of the Heart": "Shizuku Tsukishima, a bookish 14-year-old, notices that the same name appears on all her library books: Seiji Amasawa. Her curiosity leads her to discover the boy behind the name—a dreamer who aspires to become a master violin maker. Inspired by his dedication, Shizuku decides to pursue her own dream of becoming a writer. As they support each other's ambitions, they learn about love, creativity, and the importance of finding one's own path in life during the transitional period between childhood and adulthood.",
    "A Silent Voice": "Shoya Ishida, a former bully who tormented a deaf classmate named Shoko Nishimiya in elementary school, is now an outcast consumed by guilt. Years later, seeking redemption, he reconnects with Shoko and attempts to make amends. Through their difficult journey of reconciliation, both must confront their past traumas and the people who shaped them. The story explores the nature of bullying, disability, forgiveness, and the possibility of genuine connection after causing irreparable harm to someone who deserved kindness.",
    "5 Centimeters per Second": "The film follows the relationship between Takaki Toono and Akari Shinohara, childhood friends separated by distance. Through three interconnected segments, their story spans years, exploring how time and distance affect their feelings for each other. From their first kiss in a snowy field to their eventual adult lives, the film poignantly captures the painful beauty of first love, the inevitability of change, and the lingering question of what might have been if circumstances had been different.",
    "Attack on Titan: The Last Attack": "The final battle for humanity's fate unfolds as Eren Yeager, now transformed into the Founding Titan, unleashes the Rumbling—a cataclysmic event that threatens to destroy all life beyond Paradis Island. The Survey Corps, once his closest allies, must stop him despite their own doubts and sacrifices. As old friendships are tested and the true history of the Titans is revealed, the remaining members of the Corps fight for a future they may never see, questioning what freedom truly means and whether humanity deserves to survive.",
    "The Lord of the Rings: The War of the Rohirrim": "Set centuries before the events of The Lord of the Rings, this story follows Helm Hammerhand, the legendary King of Rohan, as he defends his kingdom against the invading Dunlendings led by Wulf. When Wulf seeks revenge for his father's death, Helm and his people retreat to the stronghold of Helm's Deep, where they endure a brutal winter siege. The tale explores themes of honor, sacrifice, and the founding of the legendary fortress that would later play a crucial role in the War of the Ring.",
    "The Colors Within": "Totsuko Higurashi, a high school girl with the unique ability to see people's emotions as colors, struggles with the overwhelming sensory input. She befriends Kimi Sakunomiya, a girl whose vibrant color fascinates her, and Rui Kagehira, a music enthusiast. Together, they form a band, using music to express feelings they can't put into words. Through their creative collaboration, they learn to understand themselves and each other, discovering that true connection comes from embracing vulnerability and finding harmony in differences.",
    "The Glassworker": "In a coastal city that values craftsmanship above all, young apprentice Vincent dreams of becoming a master glassworker like his father. When war threatens their peaceful community, Vincent must choose between following tradition and protecting those he loves. His relationships with the reclusive master artisan and a mysterious girl who arrives in the city challenge his understanding of art, purpose, and sacrifice. Through the metaphor of glassmaking, the film explores how beauty can emerge from the most fragile and dangerous circumstances.",
    "Delicious in Dungeon": "In a fantasy world where dungeon exploration is a profession, adventurers Laios, Marcille, and Chilchuck become trapped after their party member Falin is eaten by a red dragon. With limited supplies, they must survive by cooking and eating the monsters they encounter. What begins as a desperate struggle for survival becomes a culinary adventure as they discover the surprising flavors and properties of dungeon creatures while racing against time to rescue Falin before she is digested completely.",
    "Akira": "In 2019, Neo-Tokyo is a city on the brink of collapse following World War III. Kaneda, a biker gang leader, tries to save his friend Tetsuo after Tetsuo gains devastating psychic abilities from a government experiment. As Tetsuo's power spirals out of control, he becomes obsessed with finding Akira, the source of all psychic power, leading to a confrontation that threatens to destroy the entire city. This groundbreaking cyberpunk epic explores themes of power, corruption, and humanity's capacity for both destruction and renewal.",
    "The Place Promised in Our Early Days": "In an alternate post-war Japan where Hokkaido is occupied by a mysterious Union, three childhood friends—Hiroki, Takuya, and Sayuri—dream of flying to a towering structure visible across the Tsugaru Strait. Years later, Sayuri falls into a coma, and the boys discover that her condition is connected to the tower they once dreamed of visiting. Separated by distance and ideology, they must overcome their differences to save the girl they both love and uncover the secrets of the place they promised to reach together.",
    "Suzume": "Suzume Iwato, a 17-year-old girl living in a quiet Kyushu town, encounters a young man searching for abandoned doors. When she opens one, she inadvertently releases a supernatural force that threatens to cause earthquakes across Japan. Joined by the mysterious Souta, who becomes transformed into a chair, Suzume travels across the country closing these doors. Her journey becomes a quest for closure regarding her mother's death during the 2011 Tohoku earthquake, exploring themes of grief, healing, and the connections between past and present.",
    "Look Back": "Fujino, a popular elementary school student known for her manga, is challenged by the reclusive Kyomoto, whose artistic skills surpass her own. Their rivalry pushes both to improve, leading to a friendship that shapes their lives. As they grow and pursue their dreams in the manga industry, their paths diverge, but the impact they have on each other's art and lives remains. This short film explores the creative process, the pain of loss, and the enduring influence of artistic relationships that span years and circumstances.",
    "Ride Your Wave": "Hinako Mukaimizu, a university student who loves surfing, moves to a coastal town where she meets Minato Hinageshi, a firefighter. After a whirlwind romance, Minato dies in a drowning accident while saving someone. Hinako discovers that whenever she sings their song, Minato appears in water, allowing her to maintain their connection. As she learns to live with grief, she must decide whether holding on to the past prevents her from riding the waves of the future in this touching story about love, loss, and moving forward."
  };
  return descriptions[title] || "This beautifully animated film tells a captivating story filled with emotional depth, stunning visuals, and memorable characters. Audiences of all ages will appreciate the themes of love, friendship, and personal growth woven throughout this cinematic masterpiece, which showcases the artistry and storytelling excellence that defines great animation.";
}

function generateRating(title) {
  const ratings = {
    "Your Name": "8.6/10",
    "The Boy and the Heron": "8.5/10",
    "Spirited Away": "8.6/10",
    "Howl's Moving Castle": "8.2/10",
    "My Neighbor Totoro": "8.2/10",
    "The Boy and the Beast": "8.0/10",
    "Princess Mononoke": "8.4/10",
    "Weathering with You": "8.1/10",
    "The Garden of Words": "8.0/10",
    "The Wind Rises": "7.8/10",
    "Whisper of the Heart": "8.0/10",
    "A Silent Voice": "8.3/10",
    "5 Centimeters per Second": "7.9/10",
    "Attack on Titan: The Last Attack": "9.0/10",
    "The Lord of the Rings: The War of the Rohirrim": "8.8/10",
    "The Colors Within": "8.2/10",
    "The Glassworker": "8.1/10",
    "Delicious in Dungeon": "7.9/10",
    "Akira": "8.0/10",
    "The Place Promised in Our Early Days": "7.8/10",
    "Suzume": "8.1/10",
    "Look Back": "8.0/10",
    "Ride Your Wave": "7.9/10"
  };
  return ratings[title] || "Rating not available";
}

function generateYear(title) {
  const years = {
    "Your Name": "2016",
    "The Boy and the Heron": "2023",
    "Spirited Away": "2001",
    "Howl's Moving Castle": "2004",
    "My Neighbor Totoro": "1988",
    "The Boy and the Beast": "2018",
    "Princess Mononoke": "1997",
    "Weathering with You": "2019",
    "The Garden of Words": "2013",
    "The Wind Rises": "2013",
    "Whisper of the Heart": "1995",
    "A Silent Voice": "2016",
    "5 Centimeters per Second": "2007",
    "Attack on Titan: The Last Attack": "2023",
    "The Lord of the Rings: The War of the Rohirrim": "2024",
    "The Colors Within": "2019",
    "The Glassworker": "2022",
    "Delicious in Dungeon": "2023",
    "Akira": "1988",
    "The Place Promised in Our Early Days": "2022",
    "Suzume": "2022",
    "Look Back": "2023",
    "Ride Your Wave": "2021"
  };
  return years[title] || "Year not specified";
}

function generateDuration(title) {
  const durations = {
    "Your Name": "1h 46m",
    "The Boy and the Heron": "2h 4m",
    "Spirited Away": "2h 5m",
    "Howl's Moving Castle": "1h 59m",
    "My Neighbor Totoro": "1h 26m",
    "The Boy and the Beast": "1h 59m",
    "Princess Mononoke": "2h 14m",
    "Weathering with You": "1h 52m",
    "The Garden of Words": "46m",
    "The Wind Rises": "2h 6m",
    "Whisper of the Heart": "1h 51m",
    "A Silent Voice": "2h 10m",
    "5 Centimeters per Second": "1h 3m",
    "Attack on Titan: The Last Attack": "1h 25m",
    "The Lord of the Rings: The War of the Rohirrim": "1h 30m",
    "The Colors Within": "1h 36m",
    "The Glassworker": "1h 28m",
    "Delicious in Dungeon": "1h 40m",
    "Akira": "2h 4m",
    "The Place Promised in Our Early Days": "1h 31m",
    "Suzume": "2h 1m",
    "Look Back": "1h 45m",
    "Ride Your Wave": "1h 36m"
  };
  return durations[title] || "Duration not specified";
}