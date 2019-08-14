const signIn = document.getElementById("signIn");
const googleSi = document.getElementById("googleSI");
let accounts = [];
var provider = new firebase.auth.GoogleAuthProvider();

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
                return;
            }
        }
        mess.innerHTML = "Your username or password is incorrect";
    }
}

signIn.addEventListener('click', onClickSI);
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