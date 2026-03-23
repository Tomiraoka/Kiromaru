document.addEventListener('DOMContentLoaded', function() {
  let animeData;
  
  try {
    const storedData = localStorage.getItem('selectedAnime');
    if (storedData) {
      animeData = JSON.parse(storedData);
    } else {
      animeData = {
        title: localStorage.getItem('selectedTitle'),
        image: localStorage.getItem('selectedImage'),
        type: localStorage.getItem('contentType') || 'anime'
      };
    }
  } catch (error) {
    console.error('Error parsing data:', error);
    animeData = {
      title: localStorage.getItem('selectedTitle'),
      image: localStorage.getItem('selectedImage'),
      type: localStorage.getItem('contentType') || 'anime'
    };
  }
  
  if (!animeData || !animeData.title || !animeData.image) {
    console.error('Anime data not found');
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const image = urlParams.get('image');
    const type = urlParams.get('type') || 'anime';
    
    if (title && image) {
      animeData = { title, image, type };
    } else {
      window.location.href = 'index.html';
      return;
    }
  }

  const detailsContainer = document.getElementById('animeDetails');
  
  detailsContainer.innerHTML = `
    <div class="anime-poster">
      <img src="${animeData.image}" alt="${animeData.title}">
    </div>
    <div class="anime-info">
      <h1 class="anime-title">${animeData.title}</h1>
      <div class="anime-meta">
        <span><i class="fas fa-star"></i> ${generateRating(animeData.title)}</span>
        <span><i class="fas fa-calendar-alt"></i> ${generateYear(animeData.title)}</span>
        <span><i class="fas fa-film"></i> ${generateEpisodes(animeData.title)}</span>
      </div>
      <p class="anime-description">${generateDescription(animeData.title)}</p>
      <div class="video-player-section">
        <div id="youtubePlayer" class="youtube-player">
          <iframe id="youtubeIframe" width="100%" height="400" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  `;
  
  const youtubeIframe = document.getElementById('youtubeIframe');

  const defaultVideos = {
    "My Hero Academia": "https://www.youtube.com/embed/8kuEkGQH2Eg?si=35X-iCvvpr6-0cPV&amp;start=53",
    "Dandadan": "https://www.youtube.com/embed/Rlii5KfVdhU?si=JKecbK_mJTGUmoU8&amp;start=18",
    "Solo Leveling": "https://www.youtube.com/embed/SkRql-8dbsY?si=ni0mvuN3SItb3XO0&amp;start=3",
    "The Apothecary Diaries": "https://www.youtube.com/embed/2im_9A58aEI?si=nWf9hY1rEDxzoPM6",
    "Dr. Stone": "https://www.youtube.com/embed/b9oBeuOmB4k?si=OC1SK1wT9H88TMWc&amp;start=6",
    "Demon Slayer": "https://www.youtube.com/embed/6qrF_T6WXaA?si=HsuRReZz7VTFN_KH&amp;start=6",
    "Fire Force": "https://www.youtube.com/embed/COLuksQvJs0?si=vkGQLQGIQIOOo-uq&amp;start=21",
    "Mushoku Tensei": "https://www.youtube.com/embed/ldu8bNKTSL8?si=U_395CXyl1pdMZZn&amp;start=7",
    "Chainsaw Man": "https://www.youtube.com/embed/J9MS6s0OJp8?si=V3weKKSvn_Gfprix&amp;start=12",
    "Mashle: Magic and Muscles": "https://www.youtube.com/embed/qhetdUvb5p0?si=5pxw2Xzci_ys7J7j&amp;start=22",
    "The Beginning After The End": "https://www.youtube.com/embed/DK__tPqt-d8?si=yU8PFaB1BmLKXDT5&amp;start=37",
    "Wind Breaker": "https://www.youtube.com/embed/hHMdsa-VkB4?si=iGHNa2N7VGrzbm_v&amp;start=8",
    "Attack on Titan": "https://www.youtube.com/embed/z_bzgkzT6cU?si=nR-RX5urhlaVxeXh&amp;start=25",
    "Death Note": "https://www.youtube.com/embed/39VPW6f4Ci0?si=ES2bmLSO9S0bJoph",
    "Hunter x Hunter": "https://www.youtube.com/embed/K4YL0vqgfiE?si=Z92ucsWtaofvwLsu&amp;start=9",
    "One Piece": "https://www.youtube.com/embed/i0BKHO18XgA?si=8dIWyw6AiN8CWsKE&amp;start=17",
    "Jujutsu Kaisen": "https://www.youtube.com/embed/bwdVf5wH2F8?si=-vEqLRiI-kS_famF&amp;start=7",
    "Re:Zero - Starting Life in Another World": "https://www.youtube.com/embed/lSZBAvN7V7Q?si=Onw03GqNDuPW9ucU&amp;start=10",
    "Kaiju No. 8": "https://www.youtube.com/embed/wSBD4Unp9sw?si=ebAYB7kpHv4ej4P-&amp;start=6",
    "Frieren: Beyond Journey's End": "https://www.youtube.com/embed/DIqyjD7kzeM?si=0rG47cWvWTZIi75l&amp;start=5",
    "Vinland Saga": "https://www.youtube.com/embed/Kaei5q1gm24?si=f_np1ogB8oAUXUps&amp;start=4",
    "One Punch Man": "https://www.youtube.com/embed/omf-PXqQG2g?si=tWw0ud0j4Wc76qQi&amp;start=36",
    "KonoSuba": "https://youtu.be/OSkMx93iJwA?si=Da8AoHr0m17bAXS8",
    "That Time I Got Reincarnated as a Slime": "https://www.youtube.com/embed/wIU4yJVxiaQ?si=aMEhCbEHaTdKcByX&amp;start=53",
    "The Eminence in Shadow": "https://www.youtube.com/embed/0USCRUYzKbE?si=Vgy38if8ilxwchRa&amp;start=46",
    "The Saga of Tanya the Evil": "https://www.youtube.com/embed/Ur4y6x2bQOQ?si=H-76irTWn_V3Vy9b&amp;start=33",
    "Sword Art Online": "https://www.youtube.com/embed/UGKluQg7F5g?si=sR0jx2UeQtwRSowA&amp;start=24",
    "I Got a Cheat Skill in Another World": "",
    "Uncle from Another World": "https://youtu.be/4W4Xb0MYj0U?si=8E-FZx9_1G2uT8Sh",
    "Toradora!": "https://www.youtube.com/embed/9tCK8cA0BX0?si=fbTdmjiOe8FuxsPf&amp;start=34",
    "Horimiya": "https://www.youtube.com/embed/OsNamx0RtgM?si=sUrAX1XtklQ2f0Gz&amp;start=5",
    "Kimi ni Todoke": "https://youtu.be/u4AQURZoVNI?si=AbkLgrrsQRShRlhk",
    "Your Lie in April": "https://www.youtube.com/embed/f4gdoy0lj40?si=KRaSfL4P6Zqk4x30&amp;start=74",
    "Tsukigakirei": "https://www.youtube.com/embed/8fct2tCbEEs?si=GK4sD1rk23v6YZt0&amp;start=21",
    "Blue Spring Ride": "https://youtu.be/ZiiQlxCwcL0?si=CRPKVfIzIT4wNwgo",
    "Kaguya-sama: Love Is War": "https://www.youtube.com/embed/aFGmODdi7cE?si=Kv8wMVokzr9-vaOO&amp;start=21",
    "Oregairu": "https://youtu.be/45ETXZZtgTI?si=fmsBhyELdthNNyv1",
    "High School DxD": "https://www.youtube.com/embed/gHiLy_9CPN4?si=NRPqNY3Vm4z4Iba_&amp;start=8",
    "The Angel Next Door Spoils Me Rotten": "https://www.youtube.com/embed/Q618XYHODQc?si=vQgql6xsBDBLKCsw&amp;start=7",
    "Grand Blue": "https://www.youtube.com/embed/vhQU9Tzsls4?si=qV1_P-F2l0D4tC9k&amp;start=27",
    "Gintama": "https://www.youtube.com/embed/HAHrnJtNwIU?si=8_DvowNCRynOEyuc&amp;start=39",
    "The Disastrous Life of Saiki K.": "https://www.youtube.com/embed/SDqlEEq8MbI?si=44XodlbZkt3iHADL&amp;start=22",
    "Daily Lives of High School Boys": "https://youtu.be/jpu4sfoIGck?si=FJI0GrSmzmm5xiU-",
    "Azumanga Daioh": "https://youtu.be/22bQw9fPlfY?si=8rQf6YaQlSB3OxvC",
    "Barakamon": "https://www.youtube.com/embed/4yRa86O-Dy0?si=pVsw6Z7ubYPEISvV&amp;start=20",
    "Great Teacher Onizuka": "https://youtu.be/Ok1KGWH0f7k?si=417wqEK9Sb5lfLCc",
    "The Devil is a Part-Timer!": "https://www.youtube.com/embed/r9N_o6JY90Y?si=1ADz3rN9yTO3acdg&amp;start=2"
  };

  function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  if (defaultVideos[animeData.title]) {
    const videoId = getYouTubeVideoId(defaultVideos[animeData.title]);
    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      youtubeIframe.src = embedUrl;
    }
  }
});

function generateDescription(title) {
  const descriptions = {
    "My Hero Academia": "In a world where superpowers known as 'Quirks' have become commonplace, Izuku Midoriya is one of the few born without any abilities. Despite this, his unwavering determination and heroic spirit catch the attention of the world's greatest hero, All Might, who chooses him as his successor. Izuku enrolls in the prestigious U.A. High School, where he faces countless challenges, powerful rivals, and dangerous villains, all while learning what it truly means to become a hero who saves others with a smile.",
    "Dandadan": "Momo Ayase, a high school girl who believes in ghosts, and Ken Takakura, an occult enthusiast convinced of extraterrestrial life, engage in a heated debate about which supernatural phenomena are real. To settle their argument, they challenge each other to visit locations associated with both ghosts and aliens. Their journey leads them into a bizarre world where the supernatural and extraterrestrial collide, forcing them to confront terrifying entities and uncover secrets beyond human comprehension.",
    "Solo Leveling": "Sung Jin-Woo is the weakest E-rank hunter in a world where portals connecting to dungeons filled with monsters have become a reality. After a near-death experience in a double dungeon, he awakens with a mysterious system that allows him to level up like a video game character. As he grows stronger, Jin-Woo discovers that his new abilities come with responsibilities and secrets that could threaten the entire world, transforming him from the weakest hunter into humanity's greatest hope.",
    "The Apothecary Diaries": "Maomao, a young apothecary with a brilliant mind and extensive knowledge of medicinal herbs, is kidnapped and sold into service at the imperial court. Working as a servant in the rear palace, she uses her expertise to solve mysterious illnesses and poisonings among the concubines. Her intelligence catches the attention of the influential eunuch Jinshi, who recognizes her talents and involves her in increasingly complex cases that unravel dark secrets hidden within the palace walls.",
    "Dr. Stone": "After a mysterious flash petrifies all of humanity for thousands of years, genius teenager Senku Ishigami awakens to find the world has returned to a primitive state. Determined to rebuild civilization using science, he teams up with his childhood friend Taiju and later the powerful warrior Tsukasa. Together, they work to restore modern technology while navigating a world divided between those who embrace science and those who prefer the purity of the stone world.",
    "Demon Slayer": "Tanjiro Kamado returns home to find his family slaughtered by demons, with his sister Nezuko being the sole survivor—but transformed into a demon herself. Determined to find a cure and avenge his family, Tanjiro joins the Demon Slayer Corps, embarking on a perilous journey across Japan. Alongside his comrades, he faces powerful demons and tragic backstories while fighting to protect humanity and restore his sister's humanity.",
    "Fire Force": "In a world where spontaneous human combustion turns people into living infernos called Infernals, the Fire Force is established to combat these threats. Shinra Kusakabe, a third-generation pyrokinetic nicknamed the 'Devil's Footprints,' joins Special Fire Force Company 8. As he pursues his goal of becoming a hero, he uncovers a conspiracy that threatens to engulf the world in flames, all while investigating the mysterious fire that claimed his family years ago.",
    "Mushoku Tensei": "A 34-year-old unemployed recluse dies after saving a group of teenagers from a speeding truck and is reincarnated in a fantasy world as Rudeus Greyrat. Retaining the memories of his previous life, he resolves to live this new life without regrets, mastering magic, building meaningful relationships, and overcoming his past traumas. His journey spans decades as he navigates love, family, and the complexities of a world filled with adventure and danger.",
    "Chainsaw Man": "Denji, a young man burdened with his father's debt, works as a Devil Hunter alongside his pet devil Pochita. After being betrayed and killed, Denji merges with Pochita to become Chainsaw Man, a hybrid being capable of transforming parts of his body into chainsaws. Now working for the Public Safety Bureau, he hunts devils while dreaming of a simple life filled with food, a girlfriend, and a place to call home in a world where nothing is as it seems.",
    "Mashle: Magic and Muscles": "In a world where magic is everything and those without it are persecuted, Mash Burnedead is born without magical abilities. Raised in secret by his adoptive father, Mash's lack of magic is compensated by his incredible physical strength. When his identity is discovered, he must enroll in Easton Magic Academy and pretend to be a top student, using his muscles to overcome magical challenges and uncover a conspiracy threatening the magical world.",
    "The Beginning After The End": "King Grey, a powerful warrior who achieved everything in his previous life, is reincarnated as Arthur Leywin in a world filled with magic and mythical creatures. Born into a loving family, he retains the memories and combat experience of his past life, allowing him to master magic at an extraordinary pace. As he grows, Arthur discovers that this new world faces threats similar to those of his previous life, forcing him to protect his loved ones while navigating political intrigue and ancient powers.",
    "Wind Breaker": "Haruka Sakura enrolls at Furin High School, a school infamous for its delinquent students, determined to rise to the top and become the strongest. However, he quickly discovers that the school has transformed into a protective force for the town, known as the 'Boufuurin.' As Haruka navigates the complex dynamics of loyalty and strength, he learns that true strength comes from protecting others rather than simply defeating them.",
    "Attack on Titan": "Humanity lives within massive walled cities to protect themselves from Titans, gigantic humanoid creatures that devour humans without reason. Eren Yeager witnesses his mother being eaten by a Titan, sparking a burning desire for revenge. He joins the Survey Corps with his adopted sister Mikasa and friend Armin, dedicating his life to eradicating the Titans. As they uncover the truth behind the Titans' existence, they discover that the real enemies might be closer than they ever imagined.",
    "Death Note": "Brilliant high school student Light Yagami discovers a mysterious notebook dropped by a death god named Ryuk. The Death Note grants its user the ability to kill anyone by writing their name while picturing their face. Determined to create a utopia free of crime, Light becomes the vigilante Kira, targeting criminals worldwide. This attracts the attention of the world's greatest detective, L, leading to a thrilling cat-and-mouse game of intellect and morality.",
    "Hunter x Hunter": "Young Gon Freecss discovers that his absent father is a legendary Hunter—an elite member of humanity with permission to explore uncharted territories. Determined to follow in his father's footsteps, Gon takes the dangerous Hunter Exam, where he befriends Kurapika, Leorio, and Killua. Together, they navigate a world of deadly creatures, powerful enemies, and personal growth, each pursuing their own dreams while facing challenges that test their bonds and resolve.",
    "One Piece": "Monkey D. Luffy dreams of becoming the Pirate King by finding the legendary treasure left behind by Gol D. Roger. After gaining the powers of the Gum-Gum Fruit, which turns his body into rubber, he sets sail from his village, gathering a diverse crew of skilled individuals. Together, the Straw Hat Pirates journey across the Grand Line, facing powerful enemies, forming alliances, and uncovering the mysteries of the Void Century and the Will of D.",
    "Jujutsu Kaisen": "High school student Yuji Itadori swallows a cursed object—the finger of the most powerful curse in history, Ryomen Sukuna—to save his friends from a deadly curse. By doing so, he becomes the vessel for Sukuna himself. Recruited by the Tokyo Metropolitan Jujutsu Technical School, Yuji trains to control Sukuna's power while hunting down other cursed objects. He joins Megumi, Nobara, and Gojo in a battle against curses born from negative human emotions.",
    "Re:Zero - Starting Life in Another World": "Subaru Natsuki, a ordinary teenager, is summoned to a fantasy world on his way home from the convenience store. When he and his new ally Emilia are killed, Subaru discovers his unique ability—'Return by Death,' which sends him back in time upon death. Forced to relive traumatic events and make impossible choices, Subaru must navigate political conspiracies, deadly enemies, and his own mental anguish to protect those he loves.",
    "Kaiju No. 8": "Kafka Hibino dreamed of joining the Defense Force to fight Kaiju alongside his childhood friend Mina Ashiro. Years later, working as a cleanup crew member, Kafka is attacked by a parasitic Kaiju that transforms him into a humanoid Kaiju himself. Labeled 'Kaiju No. 8,' he must hide his identity while pursuing his dream, using his newfound powers to protect humanity while being hunted by the very organization he wishes to join.",
    "Frieren: Beyond Journey's End": "Frieren, an elven mage, was once part of the hero's party that defeated the Demon King. After their journey ends, she watches her mortal companions age and die while she remains unchanged. Fifty years later, she embarks on a new journey to understand humanity, taking on a young apprentice and retracing her past adventures. Through her travels, she learns about the value of human connection and the fleeting nature of time.",
    "Vinland Saga": "Thorfinn, a young Icelandic warrior, joins the mercenary band of Askeladd after witnessing his father's murder at Askeladd's hands. Driven by revenge, he dedicates his life to killing Askeladd in an honorable duel, participating in brutal Viking raids across England. As he grows, Thorfinn questions the violence that has defined his life and seeks a new purpose—finding the peaceful land of Vinland and creating a world without slavery or war.",
    "One Punch Man": "Saitama, a hero for fun, has trained so intensely that he can defeat any opponent with a single punch. Despite his overwhelming power, he struggles with the boredom of effortless victory and the lack of recognition from the public. He takes on cyborg Genos as his disciple and joins the Hero Association, climbing the ranks while facing increasingly powerful monsters and discovering that true heroism involves more than just strength.",
    "KonoSuba": "After dying a humiliating death, Kazuma Sato is offered the chance to be reincarnated in a fantasy world. He chooses to take the goddess Aqua with him as his cheat item, but their relationship quickly deteriorates. Together with the explosion-obsessed mage Megumin and the masochistic crusader Darkness, Kazuma forms a dysfunctional adventuring party. Their misadventures are filled with financial ruin, absurd quests, and the constant chaos of their own making.",
    "That Time I Got Reincarnated as a Slime": "Satoru Mikami, a corporate worker, is stabbed and reincarnated in a fantasy world as a slime with powerful abilities. Naming himself Rimuru Tempest, he befriends a dragon sealed in a cave and gains even more power. Using his unique skills and knowledge from his past life, Rimuru builds a peaceful nation for all races, establishing diplomatic relations with neighboring countries while preparing for threats from those who fear his growing influence.",
    "The Eminence in Shadow": "Cid Kagenou has dreamed of becoming a shadowy mastermind who operates in the shadows, controlling events from behind the scenes. Reborn in a fantasy world, he creates the Shadow Garden organization to battle the cult of Diablos—a fictional enemy he invented. However, Cid unknowingly uncovers a real conspiracy, and his delusions of grandeur become reality as his followers believe in his fabricated prophecies and he becomes the legend he always wanted to be.",
    "The Saga of Tanya the Evil": "An arrogant Japanese salaryman is killed by a disgruntled subordinate and is reincarnated by a being he calls 'Being X' as Tanya Degurechaff, a young girl in an alternate World War I-era Europe. Determined to defy Being X and live a comfortable life, Tanya becomes a soldier to rise through the ranks quickly. Her ruthless efficiency and magical abilities make her a feared commander, earning her the nickname 'the Devil of the Rhine' as she embraces the brutality of war.",
    "Sword Art Online": "In 2022, ten thousand players are trapped in the virtual reality MMORPG Sword Art Online, unable to log out. The creator announces that dying in the game means death in real life. Kirito, a solo player, must navigate the deadly game, forming alliances with other players like Asuna while fighting to clear all one hundred floors. Their journey explores the nature of reality, love, and what it means to truly live in a world where death is permanent.",
    "I Got a Cheat Skill in Another World": "Yuuya Tenjou, a bullied and overweight teenager, discovers a door that connects his world to another realm. In this fantasy world, his physical and magical abilities are enhanced to supernatural levels, transforming him into a powerful and handsome individual. Moving between worlds, he uses his new abilities to gain wealth, confidence, and respect, experiencing the life he always dreamed of while uncovering the truth behind his family's mysterious past.",
    "Uncle from Another World": "After being in a coma for seventeen years, Yosuke wakes up with memories of living in a fantasy world. His nephew Takafumi discovers that Yosuke—now his uncle—has brought back magical abilities from his otherworldly adventures. As they navigate modern Japan together, the uncle recounts his misadventures in the fantasy realm, where his love for Sega consoles and lack of social skills made him an outcast despite his immense power.",
    "Toradora!": "Ryuji Takasu has a kind heart but terrifying eyes that make everyone think he's a delinquent. He discovers that his classmate Taiga Aisaka, the violent and aggressive 'Palmtop Tiger,' lives next door to him. They form an unlikely alliance to help each other pursue their crushes: Ryuji's best friend Yuusaku and Taiga's best friend Minori. Their scheme leads to unexpected feelings and a story about love, friendship, and finding the person who accepts you completely.",
    "Horimiya": "Popular and academically gifted Kyoko Hori hides a secret: she spends her afternoons caring for her younger brother while her parents work. Izumi Miyamura, a quiet and gloomy classmate, has his own secrets: he has nine piercings and tattoos hidden under his school uniform. When they accidentally discover each other's hidden sides, a unique friendship develops that blossoms into romance, revealing that people are rarely what they appear to be at first glance.",
    "Kimi ni Todoke": "Sawako Kuronuma, nicknamed 'Sadako' for her resemblance to the horror character, is misunderstood by her classmates due to her shy and awkward nature. Despite her desire to make friends, her appearance and demeanor isolate her. Popular boy Kazehaya Shouta sees past her reputation and helps her break out of her shell. As Sawako slowly gains friends and confidence, she discovers that the love she desperately wants might be closer than she ever realized.",
    "Your Lie in April": "Kousei Arima was a prodigy pianist who dominated competitions until his mother's death caused him to lose the ability to hear his own playing. Two years later, he meets Kaori Miyazono, a free-spirited violinist with a unique style who helps him rediscover the joy of music. Through their musical collaboration, Kousei confronts his trauma and learns to express emotions he had buried, unaware that Kaori harbors a secret that will change his life forever.",
    "Tsukigakirei": "Kotaro Azumi and Akane Mizuno are shy middle school students who meet during their final year. Through their shared experiences—class assignments, track and field competitions, and family pressures—they develop feelings for each other. Their innocent romance navigates the awkwardness of first love, the challenges of communication, and the anxieties of growing up, portrayed with realism and tenderness that captures the essence of young love.",
    "Blue Spring Ride": "In middle school, Futaba Yoshioka had a mutual crush on Kou Mabuchi, but he moved away before she could confess. Now in high school, Futaba has changed her image to fit in with her peers, only to discover that Kou has returned under a different name and personality. As they reconnect, Futaba struggles between her desire to be accepted and her true feelings for the boy who remembers her as she used to be, navigating the complexities of teenage romance.",
    "Kaguya-sama: Love Is War": "Student council president Miyuki Shirogane and vice president Kaguya Shinomiya are both brilliant and proud individuals who have fallen in love with each other. However, their pride prevents them from confessing first, leading them to devise elaborate schemes to force the other to confess. Their psychological battles, filled with humor and genuine emotion, reveal the lengths people will go to avoid vulnerability while desperately wanting connection.",
    "Oregairu": "Hachiman Hikigaya, a cynical high school student who believes youth is a lie, is forced to join the Service Club after writing an essay about how flawed society is. Working with the club's sole member, the beautiful but equally cynical Yukino Yukinoshita, and later the cheerful Yui Yuigahama, Hachiman helps solve others' problems using unconventional methods. Through these experiences, he confronts his own distorted views on relationships and discovers what genuine connection truly means.",
    "High School DxD": "Issei Hyoudou, a perverted high school student, is killed on his first date by a fallen angel. He is resurrected as a devil by Rias Gremory, a beautiful upperclassman who becomes his master. As Issei joins Rias's group of devils, he discovers a world of angels, fallen angels, and mythical creatures engaged in ancient conflicts. With his unique Sacred Gear, Issei grows from a weak devil into one of the most powerful beings in the supernatural world.",
    "The Angel Next Door Spoils Me Rotten": "Mahiru Shiina, the most popular girl in school known as 'the angel,' lives alone next door to the average and messy Amane Fujimiya. After Amane helps her in the rain, Mahiru begins taking care of him, cooking his meals and cleaning his apartment. As they spend more time together, their relationship deepens from simple kindness to genuine affection, showing how love can grow from the small, everyday moments of caring for another person.",
    "Grand Blue": "Iori Kitahara moves to a coastal town to attend university and stay at his uncle's dive shop. Expecting a typical college life, he is instead swept up by the university's diving club, whose members spend more time drinking and partying than diving. With his cousin Chisa, Iori navigates the absurd world of Japanese drinking culture, naked parties, and scuba diving, learning about friendship and the importance of living life to its fullest, no matter how ridiculous.",
    "Gintama": "In an alternate Japan where aliens have conquered Earth and banned swords, former samurai Gintoki Sakata works as a freelancer with his companions Shinpachi and Kagura. Together, they take on any job for money, from finding lost pets to fighting intergalactic criminals. The series blends absurd comedy, action, and heartfelt moments, using the backdrop of samurai culture clashing with alien technology to explore themes of identity, loyalty, and what it means to never give up.",
    "The Disastrous Life of Saiki K.": "Kusuo Saiki was born with a multitude of psychic abilities that would make him the most powerful being on Earth. However, he just wants to live a normal, quiet life free from attention. His powers make this nearly impossible, as he constantly deals with bizarre classmates, embarrassing situations, and the constant threat of being discovered. Through his internal monologue, Saiki navigates a world that refuses to let him be ordinary, no matter how hard he tries.",
    "Daily Lives of High School Boys": "The series follows the everyday lives of three high school boys—Tadakuni, Hidenori, and Yoshitake—as they navigate the absurdities of adolescence. From trying to appear cool in front of girls to engaging in ridiculous role-playing games, their experiences reflect the awkwardness, humor, and profound mundanity of teenage life. The episodic format captures the small moments that define friendship and growing up, reminding viewers that sometimes the most mundane days become unforgettable memories.",
    "Azumanga Daioh": "Follow six girls through their high school years in a series of vignettes capturing the joys, frustrations, and absurdities of everyday life. From the child prodigy Chiyo to the athletic Tomo, the eccentric Sakaki to the teacher who seems perpetually late, each character brings a unique perspective to shared experiences. The series explores the bonds formed during these formative years, celebrating the humor and heart found in friendship and the passage of time.",
    "Barakamon": "Seishuu Handa, a talented but arrogant calligrapher, punches a prominent art critic for criticizing his work and is exiled to the remote Goto Islands to reflect. There, he meets the energetic Naru and other eccentric island residents who challenge his rigid worldview. Through his interactions with the community, Handa rediscovers his passion for calligraphy and learns that art—and life—cannot be controlled but must be embraced with an open heart and a sense of humor.",
    "Great Teacher Onizuka": "Eikichi Onizuka, a former biker gang leader, becomes a teacher at a prestigious middle school with one goal: to find a wife. Despite his unorthodox methods and questionable motivations, Onizuka genuinely cares about his students and uses unconventional approaches to solve their problems, from bullying to family issues. His dedication transforms the lives of his students, proving that being a great teacher is about understanding and compassion rather than following rules.",
    "The Devil is a Part-Timer!": "Demon Lord Satan is forced to retreat through a portal to modern-day Tokyo after being defeated by the hero Emilia. Stripped of nearly all his powers, he works at a fast-food restaurant to survive, aiming to regain his strength and conquer the world. However, as he adjusts to human life, he discovers that hero Emilia has followed him and now works as a telemarketer. Their rivalry continues in the most mundane of settings, exploring themes of ambition, identity, and the value of hard work."
  };
  
  return descriptions[title] || "This fascinating anime features an engaging storyline, well-developed characters, and stunning animation. The series explores themes of friendship, personal growth, and the challenges of pursuing one's dreams, making it a must-watch for fans of the genre who appreciate deep storytelling and memorable moments.";
}

function generateRating(title) {
  const ratings = {
    "My Hero Academia": "8.7/10",
    "Dandadan": "8.8/10",
    "Solo Leveling": "7.7/10",
    "The Apothecary Diaries": "8.2/10",
    "Dr. Stone": "8.3/10",
    "Demon Slayer": "8.6/10",
    "Fire Force": "8.1/10",
    "Mushoku Tensei": "8.5/10",
    "Chainsaw Man": "8.7/10",
    "Mashle: Magic and Muscles": "7.9/10",
    "The Beginning After The End": "8.0/10",
    "Wind Breaker": "7.8/10",
    "Attack on Titan": "9.0/10",
    "Death Note": "8.6/10",
    "Hunter x Hunter": "9.1/10",
    "One Piece": "8.7/10",
    "Jujutsu Kaisen": "8.6/10",
    "Re:Zero - Starting Life in Another World": "8.3/10",
    "Kaiju No. 8": "8.4/10",
    "Frieren: Beyond Journey's End": "9.1/10",
    "Vinland Saga": "8.8/10",
    "One Punch Man": "8.7/10",
    "KonoSuba": "8.1/10",
    "That Time I Got Reincarnated as a Slime": "8.1/10",
    "The Eminence in Shadow": "8.3/10",
    "The Saga of Tanya the Evil": "8.3/10",
    "Sword Art Online": "7.5/10",
    "I Got a Cheat Skill in Another World": "7.2/10",
    "Uncle from Another World": "8.0/10",
    "Toradora!": "8.2/10",
    "Horimiya": "8.1/10",
    "Kimi ni Todoke": "8.3/10",
    "Your Lie in April": "8.6/10",
    "Tsukigakirei": "8.3/10",
    "Blue Spring Ride": "8.4/10",
    "Kaguya-sama: Love Is War": "8.5/10",
    "Oregairu": "8.1/10",
    "High School DxD": "7.5/10",
    "The Angel Next Door Spoils Me Rotten": "8.2/10",
    "Grand Blue": "8.1/10",
    "Gintama": "8.7/10",
    "The Disastrous Life of Saiki K.": "8.3/10",
    "Daily Lives of High School Boys": "8.1/10",
    "Azumanga Daioh": "8.1/10",
    "Barakamon": "8.2/10",
    "Great Teacher Onizuka": "8.7/10",
    "The Devil is a Part-Timer!": "8.1/10"
  };
  
  return ratings[title] || "8.0/10";
}

function generateYear(title) {
  const years = {
    "My Hero Academia": "2016",
    "Dandadan": "2024",
    "Solo Leveling": "2023",
    "The Apothecary Diaries": "2023",
    "Dr. Stone": "2019",
    "Demon Slayer": "2019",
    "Fire Force": "2019",
    "Mushoku Tensei": "2021",
    "Chainsaw Man": "2022",
    "Mashle: Magic and Muscles": "2023",
    "The Beginning After The End": "2024",
    "Wind Breaker": "2022",
    "Attack on Titan": "2013",
    "Death Note": "2006",
    "Hunter x Hunter": "2011",
    "One Piece": "1999",
    "Jujutsu Kaisen": "2020",
    "Re:Zero - Starting Life in Another World": "2016",
    "Kaiju No. 8": "2024",
    "Frieren: Beyond Journey's End": "2023",
    "Vinland Saga": "2019",
    "One Punch Man": "2015",
    "KonoSuba": "2016",
    "That Time I Got Reincarnated as a Slime": "2018",
    "The Eminence in Shadow": "2022",
    "The Saga of Tanya the Evil": "2017",
    "Sword Art Online": "2012",
    "I Got a Cheat Skill in Another World": "2022",
    "Uncle from Another World": "2022",
    "Toradora!": "2008",
    "Horimiya": "2021",
    "Kimi ni Todoke": "2019",
    "Your Lie in April": "2014",
    "Tsukigakirei": "2017",
    "Blue Spring Ride": "2022",
    "Kaguya-sama: Love Is War": "2019",
    "Oregairu": "2013",
    "High School DxD": "2012",
    "The Angel Next Door Spoils Me Rotten": "2023",
    "Grand Blue": "2009",
    "Gintama": "2006",
    "The Disastrous Life of Saiki K.": "2016",
    "Daily Lives of High School Boys": "2012",
    "Azumanga Daioh": "2002",
    "Barakamon": "2014",
    "Great Teacher Onizuka": "1999",
    "The Devil is a Part-Timer!": "2022"
  };
  
  return years[title] || "2020";
}

function generateEpisodes(title) {
  const episodes = {
    "My Hero Academia": "6 seasons",
    "Dandadan": "1 season",
    "Solo Leveling": "1 season",
    "The Apothecary Diaries": "1 season",
    "Dr. Stone": "2 seasons",
    "Demon Slayer": "3 seasons",
    "Fire Force": "2 seasons",
    "Mushoku Tensei": "2 seasons",
    "Chainsaw Man": "1 season",
    "Mashle: Magic and Muscles": "1 season",
    "The Beginning After The End": "1 season",
    "Wind Breaker": "1 season",
    "Attack on Titan": "4 seasons",
    "Death Note": "37 ep.",
    "Hunter x Hunter": "148 ep.",
    "One Piece": "1000+ ep.",
    "Jujutsu Kaisen": "2 seasons",
    "Re:Zero - Starting Life in Another World": "2 seasons",
    "Kaiju No. 8": "1 season",
    "Frieren: Beyond Journey's End": "1 season",
    "Vinland Saga": "2 seasons",
    "One Punch Man": "2 seasons",
    "KonoSuba": "3 seasons",
    "That Time I Got Reincarnated as a Slime": "2 seasons",
    "The Eminence in Shadow": "1 season",
    "The Saga of Tanya the Evil": "12 ep.",
    "Sword Art Online": "4 seasons",
    "I Got a Cheat Skill in Another World": "1 season",
    "Uncle from Another World": "1 season",
    "Toradora!": "25 ep.",
    "Horimiya": "13 ep.",
    "Kimi ni Todoke": "1 season",
    "Your Lie in April": "22 ep.",
    "Tsukigakirei": "12 ep.",
    "Blue Spring Ride": "1 season",
    "Kaguya-sama: Love Is War": "3 seasons",
    "Oregairu": "3 seasons",
    "High School DxD": "4 seasons",
    "The Angel Next Door Spoils Me Rotten": "1 season",
    "Grand Blue": "14 ep.",
    "Gintama": "367 ep.",
    "The Disastrous Life of Saiki K.": "24 ep.",
    "Daily Lives of High School Boys": "12 ep.",
    "Azumanga Daioh": "26 ep.",
    "Barakamon": "12 ep.",
    "Great Teacher Onizuka": "43 ep.",
    "The Devil is a Part-Timer!": "12 ep."
  };
  
  return episodes[title] || "24 ep.";
}