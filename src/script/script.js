

const submit_btn = document.getElementById('submit-btn')
document.addEventListener("DOMContentLoaded", () => {

    function rain() {
        let amount = 120;
        let rain = document.querySelector('.star-rain');
        // let cosmic = document.getElementById('cosmic')
        // cosmic.play()
        let i = 0;
        while (i < amount) {
            let drop = document.createElement('i');
            let size = Math.random() * 5;
            let posX = Math.floor(Math.random() * window.innerWidth);
            let delay = Math.random() * -20;
            let duration = Math.random() * 5;
            drop.style.width = 0.2 + size + 'px';
            drop.style.left = posX + 'px';
            drop.style.animationDelay = delay + 's';
            drop.style.animationDuration = 7 + duration + 's';
            rain.appendChild(drop);
            i++
        }
    }
    rain()
    submit_btn.addEventListener("click", (e) => {
        e.preventDefault()
        const login = document.getElementById("login")
        const userName = login.value.trim()
        fetchData(userName)
    })
})

function fetchData(login) {
    console.log('hello1')
    const url = `https://api.github.com/users/${login}`
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('data=', data)
            const repos_url = data.repos_url
            fetch(repos_url)
                .then(response => response.json())
                .then(repo => {
                    console.log('repo=', repo)
                    fetch(`${data.followers_url}`)
                        .then(response => response.json())
                        .then(followers => {
                            console.log('followers=', followers)
                            displayContent(data, repo, followers);

                        })

                })

        })
}

function displayContent(data, repos, followers) {
    const profile_card = document.querySelector(".profile")
    const repository = document.querySelector(".repositories")
    const fans = document.querySelector(".followers")
    profile_card.innerHTML = `
    <div class="card" style="width: 15rem;">
  <img class="card-img-top" src=${data.avatar_url}  alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${data.name}</h5>
  </div>
  <div class="followings">
  <div class="follow">
  <h6>Followers</h6>
  <h4> ${data.followers}</h4>
  </div>
  <div class="follow">
  <h6>Following</h6>
  <h4>${data.following}</h4>
  </div>
  </div>
</div>
    `;
    repository.innerHTML = ``;
    for (repo of repos) {
        repository.innerHTML += `
<div class="repo-box m-2 ">
<h3> ${repo.name}</h3>
<p>${repo.description}</p>
</div>
           `
    }

    fans.innerHTML = ``;
    for (follower of followers) {
        console.log('last col')
        fans.innerHTML += `
        <div class="friend-list m-2 col-8">
        <div>
        <img class="card-img-top" src=${follower.avatar_url}  alt="Card image cap">
        </div>
        <div>
        <div>
        <h5 class="card-title" id='friend-name'>${follower.login}</h5>
        </div>
        <div class="followings">
          <div class="follow">
          <h6>Followers</h6>
          <h4> none</h4>
          </div>
          <div class="follow">
          <h6>Following</h6>
          <h4>none</h4>
          </div>
          </div>
        </div>
        </div>
                   `


    }
}



