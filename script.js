const followers = document.querySelector("#followers");

document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();

  let name = document.querySelector("#username").value.trim();
  if (!name) {
    followers.innerHTML = "<strong>Please enter a username.</strong>";
    return;
  }

  let url = 'https://api.github.com/users/' + name;

  const info = new XMLHttpRequest();
  info.open('GET', url);

  info.onreadystatechange = function () {
    if (info.readyState === 4) {
      const data = JSON.parse(this.responseText);

      if (info.status === 200) {
        followers.innerHTML = `
          <div class="profile-card">
            <img src="${data.avatar_url}" alt="${data.name || data.login}">
            <h2>${data.name || "No Name Available"}</h2>
            <p>${data.bio || "No bio provided."}</p>
            <p><strong>Location:</strong> ${data.location || "Unknown"}</p>
            <div class="stats">
              <div>
                <strong>${data.followers}</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>${data.following}</strong>
                <span>Following</span>
              </div>
               <div>
                <strong>${data.public_repos}</strong>
                <span>Public Repos</span>
              </div>
            </div>
            <a href="${data.html_url}"><strong>Link to Github</strong></a>
          </div>
        `;
      } 
      else if (data.message === 'Not Found') {
        followers.innerHTML = "<strong>User not found.</strong>";
      }
      else if (data.message && data.message.includes("API rate limit exceeded")) {
        followers.innerHTML = "<strong>Rate limit exceeded. Please try later.</strong>";
      }
    }
  };

  info.send();
});
