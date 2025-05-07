// Import App functions ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// obect of my unique database URL
const appSettings = {
    databaseURL: "https://playground-888e0-default-rtdb.europe-west1.firebasedatabase.app/"
}

// variable for my unique DB loading into App function
const app = initializeApp(appSettings);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// variable to gather a snapshot of live DB entrys
const shoppingListInDB = ref(database, "duduList");

// DOM Elements
let itemList = document.getElementById("cart-list");
const cartButton = document.getElementById("add-to-cart-button");
const inputBar = document.getElementById("input-box");

onValue(shoppingListInDB, function(snapshot) {

    itemList.innerHTML = "";
    // If/Else statement to see if any entries are in the DB.
    if (snapshot.exists()) {


        // three Variables to store DB information
        let dbItemsArray = Object.entries(snapshot.val());
        let dbItemKeysArray = Object.keys(snapshot.val());
        let DatabaseListValue = Object.values(snapshot.val());
        
        // Listen for deletions.
        for (let i = 0; i < dbItemsArray.length; i++) {

            let newListItem = document.createElement("li");
            newListItem.textContent = DatabaseListValue[i];
            itemList.append(newListItem);

            newListItem.addEventListener("long-press", function() {
                let exactLocationOfItemInDB = ref(database, `duduList/${dbItemKeysArray[i]}`)
                remove(exactLocationOfItemInDB)

            })
        }

    } else {
        itemList.textContent = "no items in the list yet";
    }

});

cartButton.addEventListener("click", function() {
    let currentInput = inputBar.value

    push(shoppingListInDB, currentInput)

    inputBar.value = "";
})

