(() => {
    const db = firebase.database();
    const tweetsDB = db.ref('/tweets');
    const postContainer = document.getElementById('post-container');
    const newPost = document.getElementById('new-post');
    const post = data => {
        const state = data.val();

        return `<figure class="profile-avatar post-section-avatar">
              <img src="images/avatar.png" alt="BP" class="profile-image">
          </figure>
          <div class="post-contentent">
              <div class="post-author">
                  <h3 class="post-author-name">${state.username}</h3>
                  <span class="post-delimiter fa fa-circle"></span>
                  <span class="post-date">${time_ago(new Date(state.date))}</span>
              </div>
              <p class="post-text">${state.message}</p>
              <div class="post-footer">
                  <div class="post-reaction">
                      <button class="far fa-thumbs-up like-btn" data-id="${data.key}"></button>
                      <span class="post-likes">${state.likes}</span>
                  </div>

                  <div class="post-reaction dislike-contentainer">
                      <button class="far fa-thumbs-down dislike-btn" data-id="${data.key}"></button>
                      <span class="post-dislikes">${state.dislikes}</span>
                  </div>
              </div>
          </div>
          <div class="post-close">
              <button class="post-close fa fa-times" data-id="${data.key}"></button>
          </div>`;
    };

    newPost.addEventListener('submit', event => {
        if (!validateUser()) return;
        event.preventDefault();

        const message = document.getElementById("new-post-text").value;
        tweet.post(message);
    });


    firebase.auth().onAuthStateChanged(user => {
        document.getElementById("profile-name").innerText = firebase.auth().currentUser.displayName;
        auth.getUserStats(user.uid).once('value').then(snap => {
            const data = snap.val();
            const tweets = data ? data.tweets : 0;
            const likes = data ? data.likes : 0;

            document.getElementById("profile-posts-count").innerHTML = tweets;
            document.getElementById("profile-likes-count").innerHTML = likes;
        })
    });

    tweetsDB.on('child_added', data => {

        document.getElementById("loader").style.display = "none";

        const content = document.createElement('div');
        content.classList.add("post");
        content.setAttribute("id", data.key);

        content.innerHTML = post(data);

        const reacts = content.querySelectorAll('.post-reaction');
        for (const react of reacts) {

            react.addEventListener('click', event => {
                const id = event.target.getAttribute('data-id');
                if (event.target.parentElement.classList.contains('dislike-container')) {
                    tweet.incrementDislikes(id);
                } else {
                    tweet.incrementLikes(id);
                }
            });
        }


        const remove = content.querySelector('.post-close');
        remove.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            const stat = db.ref('tweets/' + id);

            stat.once('value').then(snap => {
                if (snap.val().userId == firebase.auth().currentUser.uid) {
                    tweet.delete(id);

                    const userRef = db.ref('users/' + snap.val().userId);
                    userRef.once('value').then(snap => {
                        if (snap.val()) {
                            const tweets = parseInt(snap.val()['tweets']) - 1;

                            userRef.update({
                                tweets: tweets
                            });
                        }
                    });
                    document.getElementById(id).style.display = "none";
                }
            })
        })

        postContainer.insertBefore(content, postContainer.firstChild);
    });

    tweetsDB.on('child_changed', data => {
        const tweet = document.getElementById(data.key);
        const dataVal = data.val();

        tweet.querySelector('.post-likes').innerText = dataVal.likes;
        tweet.querySelector('.post-dislikes').innerText = dataVal.dislikes;
    });

    function validateUser() {
        if (!firebase.auth().currentUser) {
            // user is not logged in
            window.location = 'index.html?error=accessDenied';
            return false;
        }

        return true;
    }

    // Helper function for converting time from milliseconds to human readable format
    function time_ago(time) {
        const time_formats = [
            [60, 'seconds', 1], // 60
            [120, '1 minute ago', '1 minute from now'], // 60*2
            [3600, 'minutes', 60], // 60*60, 60
            [7200, '1 hour ago', '1 hour from now'], // 60*60*2
            [86400, 'hours', 3600], // 60*60*24, 60*60
            [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
            [604800, 'days', 86400], // 60*60*24*7, 60*60*24
            [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
            [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
            [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
            [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
            [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
            [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
            [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
            [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
        ];
        let seconds = (+new Date() - time) / 1000,
            token = 'ago',
            list_choice = 1;

        if (seconds === 0) {
            return 'Just now'
        }
        if (seconds < 0) {
            seconds = Math.abs(seconds);
            token = 'from now';
            list_choice = 2;
        }
        let i = 0,
            format;
        while (format = time_formats[i++])
            if (seconds < format[0]) {
                if (typeof format[2] === 'string')
                    return format[list_choice];
                else
                    return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
            }
        return time;
    }
})();