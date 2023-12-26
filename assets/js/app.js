const container = document.querySelector('.container');
const getPersonButton = document.querySelector('#getPerson');

let savePerson = JSON.parse(localStorage.getItem('personEntries')) || [];

function savePersonToLocalStorage(){
    return localStorage.setItem('personEntries',JSON.stringify(savePerson));
}

getPersonButton.addEventListener('click',function(){
    const answer = prompt('Hangi Kullanıcıyı Eklemek İstiyorsun ?');
    fetchGithub(answer);
})

async function fetchGithub(person){
    const response = await fetch(`https://api.github.com/users/${person}`,{
        headers:{Authorization:'Bearer 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'}
    });
    const data = await response.json();
    savePerson.push({
        avatar_url:data.avatar_url,
        name:data.name,
        company:data.company,
        login:data.login,
        email:data.email,
        followers:data.followers,
        following:data.following,
        location:data.location,
        blog:data.blog,
        bio:data.bio,
        html_url:data.html_url
    })
    savePersonToLocalStorage();
    getPerson();
}

async function getPerson(){
    container.innerHTML = "";
    for (const person of savePerson) {
        container.innerHTML += 
            `
            <div class="person-card">
                <div class="background-image">
                    <img class="bg-img" src="assets/img/bg-image.png" alt="">
                </div>
                <span class="profile-image">
                    <img src="${person.avatar_url}" alt="">
                </span>
                <div class="person-information">
                    <div class="person-identity">
                        <span class="full-name">${person.name ? person.name : "No name information"}</span>
                        <span class="user-name">
                            <span class="special-character"><i class="fa-solid fa-at"></i></span>
                            <span class="userName-input">${person.login}</span>
                        </span>
                    </div>
                    <span class="company">
                        <i class="fa-solid fa-building"></i>
                        ${person.company ? person.company : "No company information"}
                    </span>

                    <span class="email">${person.email ? `<a href="mailto:${person.mail}">` : ''}
                        <i class="fa-solid fa-envelope"></i>
                        ${person.email ? person.email : "No email information"}</a>
                    </span>

                    <div class="followers-following">
                        <i class="fa-solid fa-user-group"></i>
                        <span class="followers-number">${person.followers}</span>
                        <span class="followers">Followers</span>
                        <span class="followers-number">${person.following}</span>
                        <span class="following">Following</span>
                    </div>
                    <div class="location">
                        <i class="fa-solid fa-location-dot"></i>
                        <span class="location-span">${person.location ? person.location : "No location information"}</span>
                    </div>
                    <span class="site">
                        <i class="fa-solid fa-link"></i>
                        ${person.blog ? `<a href="${person.blog}" target="_blank">${person.blog}</a>` : "No blog information"}
                    </span>
                    <span class="bio">${person.bio ? person.bio : "No bio information"}</span>
                    <span class="social-media-links"> 
                        <a class="github-url" href="${person.html_url ? person.html_url : "No github information"}"target="_blank">
                            <i class="fa-brands fa-github fa-2x"></i>
                        </a>
                    </span>
                </div>
            </div>
            `
    }
    
} 

fetchGithub('bariskahraman34');
fetchGithub('furkanczay');