 // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZYqW8L10oMrUFMZL0-JO6TafhznIKM_Y",
  authDomain: "chatter-box-fdd05.firebaseapp.com",
  databaseURL: "https://chatter-box-fdd05-default-rtdb.firebaseio.com",
  projectId: "chatter-box-fdd05",
  storageBucket: "chatter-box-fdd05.appspot.com",
  messagingSenderId: "30415007040",
  appId: "1:30415007040:web:cd107948b47f7a904cdea5"
};

 // Initialize Firebase
firebase.initializeApp(firebaseConfig); 

user_name = localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML = "Welcome " + user_name + " !!";


 function addroom() {
     Room_names = document.getElementById("room_name").value;

     firebase.database().ref("/").child(Room_names).update({
         purpose: "adding room name"
     });

     localStorage.setItem("room_name", Room_names);

     window.location = "kwitter_page.html";
 }

 function getData() {
     firebase.database().ref("/").on('value', function (snapshot) {
         document.getElementById("output").innerHTML = "";
         snapshot.forEach(function (childSnapshot) {
             childKey = childSnapshot.key;
             Room_names = childKey;
             //Start code
             console.log("Room Name - " + Room_names);
             row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
             document.getElementById("output").innerHTML += row;
             //End code
         });
     });
 }
 getData();

 function redirectToRoomName(name) {
     console.log(name);
     localStorage.setItem("room_name", name);
     window.location = "kwitter_page.html"
 }

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
