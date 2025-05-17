const form = document.getElementById("form");
const userInfo = document.getElementById("userInfo");
const postsContainer = document.getElementById("posts");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userId = document.getElementById("userId").value;

  async function fetchUser(userId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (!response.ok) throw new Error("User not found");
      const user = await response.json();

      userInfo.innerHTML = `
            <div class="card">
              <div class="card-body text-center">
                <h5 class="card-title">User: ${user.id}</h5>
                <p class="card-text"><strong>Name:</strong> ${user.name}</p>
                <p class="card-text"><strong>Email:</strong> ${user.email}</p>
                <p class="card-text"><strong>Address:</strong> ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</p>
               <div class="text-center">
                 <button id="getPostsBtn" class="btn btn-primary mt-2">Show Posts</button>
                </div>
              </div>
            </div>
          `;

      postsContainer.innerHTML = "";
      form.reset();

      document
        .getElementById("getPostsBtn")
        .addEventListener("click", function () {
          fetchUserPosts(user.id);
        });
    } catch (error) {
      userInfo.innerHTML = `
            <div class="alert alert-danger text-center">No Match found! Please try Again!</div>
          `;
      postsContainer.innerHTML = "";
    }
  } 

  async function fetchUserPosts(userId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const posts = await response.json();

      postsContainer.innerHTML = `
            <h4 class="mt-4 text-center">User Postings</h4>
            ${posts
              .map(
                (post) => `
              <div class="card mb-3 text-center">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.body}</p>
                </div>
              </div>
            `
              )
              .join("")}
          `;
    } catch (error) {
      postsContainer.innerHTML = `<div class="alert alert-danger">Failed to fetch posts.</div>`;
    }
  }

  fetchUser(userId);
});
