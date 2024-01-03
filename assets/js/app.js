const container = document.querySelector('.card-container');
const getPersonButton = document.querySelector('#getPerson');
const copyright = document.querySelector('.copyright-content');

const year = new Date().getFullYear();

copyright.innerText = `Powered by Barış Kahraman, © Copyright ${year} - All Rights Reserved.`

let savePerson = JSON.parse(localStorage.getItem('personEntries')) || [];

function savePersonToLocalStorage(){
    return localStorage.setItem('personEntries',JSON.stringify(savePerson));
}

function bindRemovePerson(){
    const removeBtns = document.querySelectorAll('.remove-user');
    for (const removeBtn of removeBtns) {
        removeBtn.addEventListener('click',function(){
            const answer = confirm('Bu kişiyi kaldırmak istediğinizden emin misiniz?');
            if(answer){
                let personCardIndex = parseInt(removeBtn.parentElement.parentElement.id)
                savePerson.splice(personCardIndex,1);
                savePersonToLocalStorage();
                getPerson();
            }
        })
    }
}

// let isAnyUserExist;
getPersonButton.addEventListener('click',function(e){
    e.preventDefault();
    const answer = prompt('Lütfen eklemek istediğiniz kullanıcının, kullanıcı adını giriniz.');
    // for (const localPerson of savePerson) {
    //     if(answer == localPerson.login){
    //         isAnyUserExist = 1
    //     }
    // }
    // if(isAnyUserExist == 1){
    //     alert('Bu kullanıcı zaten mevcut.');
    // }else{
    //     fetchGithub(answer)
    // }
    if(!answer){
        return
    }
    if(exist(answer)){
        alert('Bu kullanıcı zaten mevcut')
    }else{
        fetchGithub(answer);
    }
})



function exist(userName){
    const filtered = savePerson.filter((person) => {
        return person.login == userName;
    })
    return filtered.length > 0 ;
}



async function fetchGithub(person){
    if(exist(person)){
        return
    }
    
    const response = await fetch(`https://api.github.com/users/${person}`);
    
    const data = await response.json();
    console.log(data)
    
    if(response.ok == false){
        alert('Böyle bir kullanıcı bulunmuyor.');
    }else{
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
            html_url:data.html_url,
            twitter_username:data.twitter_username,
            public_repos:data.public_repos,
            public_gists:data.public_gists
        })
        savePersonToLocalStorage();
        getPerson();
    }
    
}

async function getPerson(){
    container.innerHTML = "";
    let idCounter = 0;
    for (const person of savePerson) {
        container.innerHTML += 
            `
            <div class="person-card" id="${idCounter}">
                <div class="background-image">
                    <img class="bg-img" src="assets/img/bg-image.png" alt="">
                    <div class="remove-user">
                        <i class="fa-solid fa-xmark remove-mark"></i>
                    </div>
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
                        <span class="icons"><i class="fa-solid fa-building"></i></span>
                        ${person.company ? person.company : "No company information"}
                    </span>

                    <span class="email">${person.email ? `<a href="mailto:${person.mail}">` : ''}
                        <span class="icons"><i class="fa-solid fa-envelope"></i></span>
                        ${person.email ? person.email : "No email information"}</a>
                    </span>

                    <div class="followers-following">
                        <span class="icons"><i class="fa-solid fa-user-group"></i></span>
                        <span class="followers-number">${person.followers}</span>
                        <span class="followers">Followers</span>
                        <span class="followers-number">${person.following}</span>
                        <span class="following">Following</span>
                    </div>
                    <div class="location">
                        <span class="icons"><i class="fa-solid fa-location-dot"></i></span>
                        <span class="location-span">${person.location ? person.location : "No location information"}</span>
                    </div>
                    <span class="site">
                        <span class="icons"><i class="fa-solid fa-link"></i></span>
                        ${person.blog ? `<a href="${person.blog}" target="_blank">${person.blog}</a>` : "No blog information"}
                    </span>
                    <span class="site">
                        <span class="icons"><i class="fa-brands fa-git-alt" style="margin-right:5px;" ></i></span>
                        Public Repos:
                        ${person.public_repos}
                    </span>
                    <span class="site">
                        <span class="icons"><i class="fa-brands fa-square-git"></i></span>
                        <span class="github">GitHub</span>
                        <span class="gist">Gist:</span>
                        <span class="publicGist">${person.public_gists}</span>
                    </span>
                    <span class="bio">${person.bio ? person.bio : "No bio information"}</span>
                    <span class="social-media-links"> 
                        <a class="github-url" href="${person.html_url ? person.html_url : "No github information"}"target="_blank">
                            <i class="fa-brands fa-github fa-2x"></i>
                        </a>
                        ${person.twitter_username ? `<a href="https://twitter.com/${person.twitter_username}" target="_blank">
                        <i class="fa-brands fa-twitter fa-2x"></i>
                        </a>`:""}
                    </span>
                </div>
            </div>
            `
            idCounter++;
    }

    bindRemovePerson();
} 


fetchGithub('bariskahraman34');
fetchGithub('furkanczay')

getPerson();