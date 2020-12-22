const results = document.getElementById("app-results");
const buttons = document.getElementById("app-buttons").children;
const bill = document.getElementById("app-bill");
const payslip = document.getElementById("app-payslip");
const fees = document.getElementById("app-fees");


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", selected);
}

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

function displaySelected(url) {
    results.textContent = "";
    let compteur = 0;
    fetch(url)
        .then(response => response.json())
        .then(function(data) {
            let doc = data.documents;
            for (let i in doc) {
                results.innerHTML += "<div class='row'>" + doc[i].filename + "</div>";
                console.log(doc[i]);
                compteur++;
            }
            console.log(compteur)
        });
}