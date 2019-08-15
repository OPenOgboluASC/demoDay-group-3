const signUp = document.getElementById("signUp");
const googleSu = document.getElementById("googleSU");
const form = document.getElementById("su");
const prof = document.getElementById("profPic");
form.style.marginTop = '30px';
let accounts = []; 
var provider = new firebase.auth.GoogleAuthProvider();

var database = firebase.database().ref("users");

function onClickSU(event) {
    event.preventDefault();
    let nameF = document.getElementById("first").value;
    let nameL = document.getElementById("last").value;
    let email = document.getElementById("su_email").value;
    let pass = document.getElementById("su_pass").value;
    let cPass = document.getElementById("su_cPass").value;
    let mess = document.createElement("p");
    mess.id = "messageSU";
    for(let acc of accounts){
        if(acc.getUser() == user){
            mess.innerHTML = "This email is already in use";
            
            return;
        }
    }
    if(pass == cPass){
      accounts.push(new Account(email, pass));
      firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        console.log("Sign Up Successful");
        const user = {
          name: {
            first: nameF,
            last: nameL
          },
          email: email
        }
        database.push(user);
    } else {
        mess.innerHTML = "Your Confirm Password does not match your Password";
    }
}
signUp.addEventListener('click', onClickSU);
googleSu.addEventListener('click',function(event) {
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