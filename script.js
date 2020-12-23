const results = document.getElementById("app-results");
const countResults = document.getElementById("app-count-results");
const elements = document.getElementById("app-elements");
const buttons = document.getElementById("app-buttons").children;
const bill = document.getElementById("app-bill");
const payslip = document.getElementById("app-payslip");
const fees = document.getElementById("app-fees");

// Elements used to make elements appears
let y;
const howText = document.getElementsByClassName("how-text")[0];
const howIllustration = document.getElementById("app-how-illustration");
const groups = document.getElementsByClassName("group");

// Array of the content we want to hide before the scroll
let arrayElementsToDisplay = [howText, howIllustration, groups];

// --------------------EVENT LISTENER--------------------

// Eventlistener to display the content of the selected API
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", selected);
}
// Eventlistener to display on scroll the content (only desktop)
if (document.documentElement.clientWidth >= 1440) {
    // console.log("Page is more than 1440px");

    // Add the class hide to the content we want to hide in the arrayElementsToDisplay ARRAY
    for (let i = 0; i < arrayElementsToDisplay.length; i++) {

        // if the length is not udnefined, then this is an array
        if (arrayElementsToDisplay[i].length != undefined) {

            for (let j = 0; j < arrayElementsToDisplay[i].length; j++) {
                arrayElementsToDisplay[i][j].classList.add("hide");
            }

        } else {
            arrayElementsToDisplay[i].classList.add("hide");
        }
    }

    window.addEventListener("scroll", displayOnScroll);
}



// --------------------FUNCTIONS--------------------

// Set a class to the clicked button to sho it and call the right API.
function selected(e) {
    e.preventDefault();
    for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("selection");
    }
    this.classList.add("selection");
    if (this == bill) {
        displaySelected('https://secure.askolga.fr/bucket/b744b24d0faad9334a0ecfe777550eceda50c707dd0914ae86a7c8bc15456c3d5fe1f47cb471e/search/08ce4f9d55489fa458bd1b2e1ce43b445c77ce571f06491ff99dfb19b9fa97005fe1f5043359a-show.json');
    } else if (this == payslip) {
        displaySelected('https://secure.askolga.fr/bucket/b744b24d0faad9334a0ecfe777550eceda50c707dd0914ae86a7c8bc15456c3d5fe1f47cb471e/search/c53f67111d90e53b638841ae63edc145e833cbb64bada4e6ad6ac660474c64c65fe1f53a5f913-show.json');
    } else {
        displaySelected('https://secure.askolga.fr/bucket/b744b24d0faad9334a0ecfe777550eceda50c707dd0914ae86a7c8bc15456c3d5fe1f47cb471e/search/e36ea1889b3687e8357f4796ad7d17cce046b93b104bce8e61e8d1ad194fdc725fe1f4e350766-show.json');
    }
}

// Function displaying the content of the called url
function displaySelected(url) {
    elements.innerHTML = "";
    let compteur = 0;
    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let doc = data.documents;
            for (let i in doc) {
                if (compteur % 2 == 0)
                    elements.innerHTML += "<div class='row dark'>" + doc[i].filename + "</div>";
                else
                    elements.innerHTML += "<div class='row normal'>" + doc[i].filename + "</div>";
                compteur++;
            }
            countResults.textContent = compteur + " documents trouvés";
        });
}

// Function used to dislay on scroll the content
function displayOnScroll() {
    y = this.pageYOffset;
    // console.log(y);

    // Display the title "How does it work" and the text with it
    if (y >= 200) {
        howText.classList.remove("hide");
    }

    // Display the illustration of the section "How does it work"
    if (y >= 400) {
        howIllustration.classList.remove("hide");
    }

    // Display the first group of the solutions div 
    if (y >= 1850) {
        groups[0].classList.remove("hide");
    }

    // Display the second group of the solutions div 
    if (y >= 2400) {
        groups[1].classList.remove("hide");
    }
}
