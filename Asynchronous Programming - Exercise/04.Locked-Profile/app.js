function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    let mainDiv = document.getElementById('main');
    mainDiv.replaceChildren();

    fetch(url)
    .then(resp => resp.json())
    .then(data =>{
        
        for(let info in data){
            let profileDiv = document.createElement('div');
            profileDiv.classList.add('profile');

            profileDiv.innerHTML = `
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user1Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user1Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user1Username" value="${data[info].username}" disabled readonly />
            <div class="hidden" style="display:none">
                <hr>
                <label>Email:</label>
                <input type="email" name="user1Email" value="${data[info].email}" disabled readonly />
                <label>Age:</label>
                <input type="text" name="user1Age" value="${data[info].age}" disabled readonly />
            </div>
            
            <button>Show more</button>`;
            
            let btn = profileDiv.lastChild;
            btn.addEventListener('click', (ev) => {
                let lockBtn = profileDiv.querySelector('input[value="lock"]');
                let unlockBtn = profileDiv.querySelector('input[value="unlock"]');

                if (unlockBtn.checked) {
                    let hiddenDiv = profileDiv.querySelector('.hidden');
                    if (ev.target.textContent === 'Show more') {
                        hiddenDiv.style.display = 'inline-block'
                        ev.target.textContent = 'Hide It'
                    } else {
                        hiddenDiv.style.display = 'none'
                        ev.target.textContent = 'Show more'
                    }
            
                   
                }

            })

            mainDiv.appendChild(profileDiv)
        }
       
    })
}