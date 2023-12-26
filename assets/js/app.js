const container = document.querySelector('.container');

container.innerHTML = 
`
<div class="person-card">
<div class="background-image">
    <img class="bg-img" src="assets/img/bg-image.png" alt="">
</div>
<span class="profile-image">
    <img src="https://picsum.photos/id/91/200/200" alt="">
</span>
<div class="person-information">
    <div class="person-identity">
        <span class="full-name">Barış Kahraman</span>
        <span class="user-name">
            <span class="special-character">@</span>
            <span class="userName-input">bariskahraman34</span>
        </span>
    </div>
    <span class="email"><a href="mailto:boriskahra34@gmail.com">boriskahra34@gmail.com</a></span>
    <div class="followers-following">
        <i class="fa-solid fa-user-group"></i>
        <span class="followers-number">15</span>
        <span class="followers">Followers</span>
        <span class="followers-number">13</span>
        <span class="following">Following</span>
    </div>
    <div class="location">
        <i class="fa-solid fa-location-dot"></i>
        <span class="location-span">Turkey</span>
    </div>
    <span class="site">
        <i class="fa-solid fa-link"></i>
        <a href="boris-web-pag.netlify.app">www.boriskahra.com</a>
    </span>
    <span class="bio">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, illo quibusdam vel eos harum voluptate commodi a, ipsa at dignissimos, incidunt perferendis ut vero sed. Distinctio amet et cumque enim.</span>
</div>
</div>
`