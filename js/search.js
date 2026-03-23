document.addEventListener('DOMContentLoaded', function () {
  const style = document.createElement('style');
  style.innerHTML = `
    .search-dropdown {
      overflow-y: auto;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
    .search-dropdown::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
  `;
  document.head.appendChild(style);

  const searchInput = document.getElementById('searchInput');
  const searchError = document.getElementById('searchError');
  
  let searchDropdown = document.getElementById('searchDropdown');
  if (!searchDropdown) {
    searchDropdown = document.createElement('div');
    searchDropdown.id = 'searchDropdown';
    searchDropdown.className = 'search-dropdown';
    searchDropdown.style.display = 'none';
    
    const searchContainer = searchInput?.parentElement;
    if (searchContainer) {
      searchContainer.appendChild(searchDropdown);
    }
  }

  searchInput?.addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    
    if (searchTerm.length >= 1) {
      const matches = searchAnime(searchTerm);
      showSearchResults(matches);
    } else {
      hideSearchResults();
    }
  });

  searchInput?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const searchTerm = this.value.trim().toLowerCase();
      if (searchTerm) {
        const matches = searchAnime(searchTerm);
        if (matches.length > 0) {
          selectAnime(matches[0]);
        } else {
          showError('Title not found. Try another query.');
        }
      }
    }
  });

  document.addEventListener('click', function(e) {
    if (!searchInput?.contains(e.target) && !searchDropdown?.contains(e.target)) {
      hideSearchResults();
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      hideSearchResults();
      searchInput?.blur();
    }
  });

  function searchAnime(term) {
    let allData = [];
    
    if (typeof animeDatabase !== 'undefined') {
      allData = allData.concat(animeDatabase);
    }
    if (typeof filmDatabase !== 'undefined') {
      allData = allData.concat(filmDatabase);
    }

    if (allData.length === 0) return [];
    
    return allData.filter(item => 
      item.title.toLowerCase().includes(term)
    ).slice(0, 8);
  }

  function showSearchResults(matches) {
    if (!searchDropdown) return;
    
    if (matches.length === 0) {
      searchDropdown.innerHTML = '<div class="search-no-results">No results found</div>';
    } else {
      const resultsHTML = matches.map(item => `
        <div class="search-result-item" onclick="selectAnime(${JSON.stringify(item).replace(/"/g, '&quot;')})">
          <img src="${item.image}" alt="${item.title}" class="search-result-image">
          <div class="search-result-info">
            <div class="search-result-title">${item.title}</div>
            <div class="search-result-type">${item.type === 'anime' ? 'Anime Series' : 'Anime Movie'}</div>
          </div>
        </div>
      `).join('');
      
      searchDropdown.innerHTML = resultsHTML;
    }
    
    searchDropdown.style.display = 'block';
  }

  function hideSearchResults() {
    if (searchDropdown) {
      searchDropdown.style.display = 'none';
    }
  }

  function selectAnime(item) {
    try {
      localStorage.setItem('selectedAnime', JSON.stringify(item));
      
      if (searchInput) {
        searchInput.value = '';
      }
      
      hideSearchResults();
      
      if (item.type === 'film') {
        const pathPrefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        window.location.href = pathPrefix + 'film-details.html';
      } else {
        const pathPrefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
        window.location.href = pathPrefix + 'anime-details.html';
      }
    } catch (error) {
      console.error('Error selecting item:', error);
      showError('An error occurred while loading the content.');
    }
  }

  function showError(message) {
    if (searchError) {
      searchError.textContent = message;
      searchError.style.display = 'block';
      setTimeout(() => {
        searchError.style.display = 'none';
      }, 3000);
    }
  }

  window.selectAnime = selectAnime;
});