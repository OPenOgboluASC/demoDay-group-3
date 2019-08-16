const signIn = document.getElementById("signIn");
const googleSi = document.getElementById("googleSI");
const logout = document.getElementById("logout");
const form = document.getElementById("si");
form.style.marginTop = '30px';
let accounts = [];
var provider = new firebase.auth.GoogleAuthProvider();
let user;
let signedIn = false;

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var user = firebase.auth().currentUser;

      if(user != null) {
        var photo = user.photoURL;
        const prof = document.getElementById("profPic");
        prof.src = photo;
      }
    } else {
      // No user is signed in.
    }
  });

function onClickSI(event) {
    event.preventDefault();
    let email = document.getElementById("si_email").value;
    let pass = document.getElementById("si_pass").value;
    let mess = document.getElementById("messageSI");
    if(accounts.length > 0){
        for(let acc of accounts){
            if(acc.getUser() == email && acc.getPass() == pass){
                firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                  });
                console.log("Sign In Successful");
                mess.innerHTML = "Sign In Successful";
                // user = firebase.auth().currentUser();
                // prof.src = user.photoURL;
                // location.assign("index.html");
                return;
            }
        }
        mess.innerHTML = "Your username or password is incorrect";
    }
}

signIn.addEventListener('click', onClickSI);
logout.addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
})
googleSi.addEventListener('click',function(event) {
    event.preventDefault();
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        
        // if(user != null) {
        //     location.assign("C:/Users/ASCStudent/Documents/ASC/demoDay/index.html");
        //     const prof = document.getElementById("profPic");
        //     prof.src = user.photoURL;
        //     prof.style.height = '10px';
        //     prof.style.transform = 'scale(0.1,0.1)';
        // }
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      if(signedIn){
          signedIn = false;
          location.assign("index.html");
      }
});

class Account {
    constructor(user, pass){
        this.user = user;
        this.password = pass;
    }
    getUser() {
        return this.user;
    }
    getPass() {
        return this.password;
    }
}