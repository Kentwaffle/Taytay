document.addEventListener('DOMContentLoaded', () => {
    const inputsearch = document.getElementById('search-bar');
    const suggestions = document.getElementById('suggestions');

    // Object to map movies to their corresponding HTML files
    const movieToHTML = {
        "Taytay": "/taytay.html",
        "News": "/news.html",
        "Services": "/services.html",
        "Safety": "/safety.html",
        "Permits": "/permits.html",
        "Paybills": "/PAYBILLS.html",
        "Officials": "/officials.html",
        "Local": "/local.html",
        "Health": "/health.html",
        "Events": "/events.html",
        "Contacts": "/contacts.html",
    };

    function searchbar() {
        let result = [];
        let input = inputsearch.value;

        if (input.length) {
            result = Object.keys(movieToHTML).filter((movie) => {
                return movie.toLowerCase().startsWith(input.toLowerCase());
            });
        }

        displaysearch(result);
    }

    function displaysearch(result) {
        // Clear previous suggestions
        suggestions.innerHTML = '';

        if (result.length) {
            const ul = document.createElement('ul');
            result.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie; // Display each movie name
                li.setAttribute('data-movie', movie);
                ul.appendChild(li);
            });
            suggestions.appendChild(ul);
        }
    }

    function openHTML(movie) {
        const htmlFile = movieToHTML[movie];
        if (htmlFile) {
            window.location.href = htmlFile;
        }
    }

    // Add event listener for keyup to filter suggestions
    inputsearch.addEventListener('keyup', searchbar);

    // Add event listener for clicks on the suggestions
    suggestions.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            openHTML(event.target.getAttribute('data-movie'));
        }
    });

    // Add event listener for Enter key to open the direct movie or first suggestion
    inputsearch.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const inputValue = inputsearch.value.toLowerCase();
            if (movieToHTML[inputValue]) {
                openHTML(inputValue);
            } else {
                const firstSuggestion = suggestions.querySelector('li');
                if (firstSuggestion) {
                    openHTML(firstSuggestion.getAttribute('data-movie'));
                }
            }
            event.preventDefault(); // Prevent default form submission
        }
    });
});