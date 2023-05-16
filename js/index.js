// const searchForm = document.getElementById('searchForm');
// const searchInput = document.getElementById('searchInput');
// const searchResults = document.getElementById('searchResults');
// const repositories = document.getElementById('repositories');

// searchForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const query = searchInput.value.trim();
//   if (query !== '') {
//     searchUsers(query);
//   }
// });

// async function searchUsers(query) {
//   const url = `https://api.github.com/search/users?q=${query}`;
//   const options = {
//     headers: {
//       'Accept': 'application/vnd.github.v3+json'
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();

//     if (response.ok) {
//       displayUsers(data.items);
//     } else {
//       displayError(data.message);
//     }
//   } catch (error) {
//     displayError('An error occurred while fetching user data.');
//   }
// }

// function displayUsers(users) {
//   searchResults.innerHTML = '';
//   repositories.innerHTML = '';

//   users.forEach(user => {
//     const userElement = document.createElement('div');
//     userElement.classList.add('user');

//     const avatar = document.createElement('img');
//     avatar.src = user.avatar_url;

//     const username = document.createElement('a');
//     username.href = user.html_url;
//     username.textContent = user.login;

//     userElement.appendChild(avatar);
//     userElement.appendChild(username);
//     searchResults.appendChild(userElement);

//     userElement.addEventListener('click', () => {
//       getUserRepositories(user.login);
//     });
//   });
// }

// async function getUserRepositories(username) {
//   const url = `https://api.github.com/users/${username}/repos`;
//   const options = {
//     headers: {
//       'Accept': 'application/vnd.github.v3+json'
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();

//     if (response.ok) {
//       displayRepositories(data);
//     } else {
//       displayError(data.message);
//     }
//   } catch (error) {
//     displayError('An error occurred while fetching repository data.');
//   }
// }

// function displayRepositories(repositories) {
//   searchResults.style.display = 'none';
//   repositories.innerHTML = '';

//   repositories.forEach(repo => {
//     const repoElement = document.createElement('div');
//     repoElement.textContent = repo.name;
//     repositories.appendChild(repoElement);
//   });

//   repositories.style.display = 'block';
// }

// function displayError(message) {
//   searchResults.innerHTML = '';
//   repositories.innerHTML = '';

//   const errorElement = document.createElement('p');
//   errorElement.textContent = `Error: ${message}`;
//   searchResults.appendChild(errorElement);
// }
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and lists
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    // Add event listener to the form submission
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission
  
      // Clear previous search results
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      // Get the search query from the input field
      const searchQuery = document.getElementById('search').value.trim();
  
      if (searchQuery !== '') {
        // Perform the GitHub search API request
        fetch(`https://api.github.com/search/users?q=${searchQuery}`)
          .then((response) => response.json())
          .then((data) => {
            // Display user search results
            displayUserResults(data.items);
  
            // Fetch repositories for the first user
            if (data.items.length > 0) {
              const firstUser = data.items[0];
              fetch(`https://api.github.com/users/${firstUser.login}/repos`)
                .then((response) => response.json())
                .then((repos) => {
                  // Display repositories for the first user
                  displayReposResults(repos);
                })
                .catch((error) => {
                  console.error('Error fetching repositories:', error);
                });
            }
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      }
    });
  
    // Function to display user search results
    function displayUserResults(users) {
      users.forEach((user) => {
        const li = document.createElement('li');
        li.textContent = user.login;
        userList.appendChild(li);
      });
    }
  
    // Function to display repositories for a user
    function displayReposResults(repos) {
      repos.forEach((repo) => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        reposList.appendChild(li);
      });
    }
  });