function openContentDetails(title, imageUrl, contentType) {
  console.log(`Opening ${contentType}:`, title);
  
  try {
    if (!title || !imageUrl || !contentType) {
      throw new Error("Missing required parameters");
    }

    const contentData = {
      title: title,
      image: imageUrl,
      type: contentType
    };

    localStorage.setItem('selectedAnime', JSON.stringify(contentData));
    
    localStorage.removeItem('selectedTitle');
    localStorage.removeItem('selectedImage');
    localStorage.removeItem('contentType');

    const page = contentType === 'anime' 
      ? 'pages/anime-details.html' 
      : 'pages/film-details.html';
    
    window.location.href = page;
  } catch (error) {
    console.error('Error in openContentDetails:', error);
    alert('An error occurred while loading the page'); 
  }
}

function scrollCarousel(direction) {
  const carousel = document.getElementById('carousel');
  if (carousel) {
    carousel.scrollBy({ 
      left: direction * 300, 
      behavior: 'smooth' 
    });
  }
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const backgrounds = document.querySelectorAll('.slide-bg');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  backgrounds.forEach(bg => bg.classList.remove('active'));

  slides[index].classList.add('active');
  backgrounds[index].classList.add('active');
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + slides.length) % slides.length;
  showSlide(currentSlide);
}

setInterval(() => {
  changeSlide(1);
}, 5000);

function openAnimeDetails(title, imageUrl, contentType) {
  try {
    const animeData = {
      title: title,
      image: imageUrl,
      type: contentType
    };
    
    localStorage.setItem('selectedAnime', JSON.stringify(animeData));
    
    localStorage.removeItem('selectedTitle');
    localStorage.removeItem('selectedImage');
    localStorage.removeItem('contentType');

    if (contentType === 'anime') {
      window.location.href = 'pages/anime-details.html';
    } else if (contentType === 'film') {
      window.location.href = 'pages/film-details.html';
    }
  } catch (error) {
    console.error('Error in openAnimeDetails:', error);
    alert('An error occurred while loading the anime.'); 
  }
}

window.openContentDetails = openContentDetails;
window.scrollCarousel = scrollCarousel;
window.changeSlide = changeSlide; 
window.showSlide = showSlide;