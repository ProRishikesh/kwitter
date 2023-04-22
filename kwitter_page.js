//YOUR FIREBASE LINKS
const firebaseConfig = {
    apiKey: "AIzaSyCZYqW8L10oMrUFMZL0-JO6TafhznIKM_Y",
    authDomain: "chatter-box-fdd05.firebaseapp.com",
    databaseURL: "https://chatter-box-fdd05-default-rtdb.firebaseio.com",
    projectId: "chatter-box-fdd05",
    storageBucket: "chatter-box-fdd05.appspot.com",
    messagingSenderId: "30415007040",
    appId: "1:30415007040:web:cd107948b47f7a904cdea5"
};


firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
Room_names = localStorage.getItem("room_name");

function send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(Room_names).push({
        name: user_name,
        message: msg,
        like: 0
    });

    document.getElementById("msg").value = "";
}


function getData() {
    firebase.database().ref("/" + Room_names).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: " + like + "</span></button><hr>";

                row = name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(Room_names).child(message_id).update({
        like: updated_likes
    });
}

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
