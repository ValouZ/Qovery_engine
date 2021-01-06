const results = document.getElementById("app-results");
const countResults = document.getElementById("app-count-results");
const elements = document.getElementById("app-elements");
const buttons = document.getElementById("app-buttons").children;
const bill = document.getElementById("app-bill");
const payslip = document.getElementById("app-payslip");
const fees = document.getElementById("app-fees");
let indexRow = 0;
let intervalStatut = false;

// Elements used to make elements appears
let y;
const header = document.getElementById("app-logo");
const qoveryIllustration = document.getElementById("app-qovery-illustration");
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
                // We add the class on the item that are the children of the group div
                arrayElementsToDisplay[i][j].children[0].classList.add("translateLeft");
                arrayElementsToDisplay[i][j].children[1].classList.add("translateRight");
            }

        } else {
            arrayElementsToDisplay[i].classList.add("hide");
        }
    }
    window.addEventListener("scroll", displayOnScroll);
}


// --------------------FUNCTIONS--------------------

// Function that calls the right API.
function selected(e) {
    e.preventDefault();
    if (this == bill) {
        displaySelected('https://secure.askolga.fr/bucket/b744b24d0faad9334a0ecfe777550eceda50c707dd0914ae86a7c8bc15456c3d5fe1f47cb471e/search/08ce4f9d55489fa458bd1b2e1ce43b445c77ce571f06491ff99dfb19b9fa97005fe1f5043359a-show.json', this);
    } else if (this == payslip) {
        displaySelected('https://secure.askolga.fr/bucket/b744b24d0faad9334a0ecfe777550eceda50c707dd0914ae86a7c8bc15456c3d5fe1f47cb471e/search/c53f67111d90e53b638841ae63edc145e833cbb64bada4e6ad6ac660474c64c65fe1f53a5f913-show.json', this);
    } else {
        displaySelected('https://secure.askolga.fr/bucket/b744b24d0faad9334a0ecfe777550eceda50c707dd0914ae86a7c8bc15456c3d5fe1f47cb471e/search/e36ea1889b3687e8357f4796ad7d17cce046b93b104bce8e61e8d1ad194fdc725fe1f4e350766-show.json', this);
    }
}

function setSelectionClass(myButton) {
    for (let j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("selection");
    }
    myButton.classList.add("selection");
}

// Function displaying the content of the called url
function displaySelected(url, myButton) {
    // If the intervalStatut is true, it means that an interval is running and
    // we should not launch an other one yet
    if (!intervalStatut) {
        setSelectionClass(myButton);
        intervalStatut = true;
        elements.innerHTML = "";
        let compteur = 0;
        fetch(url)
            .then(response => response.json())
            .then(function(data) {
                let doc = data.documents;
                for (let i in doc) {
                    let filename = doc[i].filename;
                    if (compteur % 2 == 0) {
                        elements.innerHTML += "<div class='left-row row dark'>" + filename + "</div>";
                    } else {
                        elements.innerHTML += "<div class='right-row row normal'>" + filename + "</div>";
                    }
                    compteur++;
                }
                indexRow = 0;
                let interval = setInterval(() => { displayRow(interval) }, 100);

                if (compteur <= 0)
                    countResults.textContent = "Aucun document trouvé";
                else if (compteur == 1)
                    countResults.textContent = compteur + " document trouvé";
                else
                    countResults.textContent = compteur + " documents trouvés";
            });
    }
}

function displayRow(interval) {
    if (indexRow == elements.children.length - 1) {
        intervalStatut = false;
        clearInterval(interval);
    }
    if (indexRow % 2 == 0)
        elements.children[indexRow].classList.remove("left-row");
    else
        elements.children[indexRow].classList.remove("right-row");
    indexRow++;
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

        // groups[0].classList.remove("translateLeft");
        groups[0].children[0].classList.remove("translateLeft");
        groups[0].children[1].classList.remove("translateRight");
    }

    // Display the second group of the solutions div 
    if (y >= 2400) {
        // groups[1].classList.remove("translateLeft");
        groups[1].children[0].classList.remove("translateLeft");
        groups[1].children[1].classList.remove("translateRight");
    }
}