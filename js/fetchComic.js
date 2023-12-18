// Variabler för att hålla koll på den högsta comicnumret och nuvarande comicnummer
var max = -1;
var Comicnummer = -1;

// När sidan laddas
window.onload = function() {
    // Hämta senaste serien
    getComic('latest');

    // slumpa-knappen
    let slumpad = document.getElementById('slumpa');
    slumpad.addEventListener('click', function() {
        // Slumpa ett nummer mellan 1 och max och hämta serien
        getComic(Math.floor(Math.random() * max) + 1);
    });

    // nästa-knappen
    let nasta = document.getElementById('nasta');
    nasta.addEventListener('click', function() {
        // Om nuvarande comicnummer är mindre än max, öka det och hämta serien
        if (Comicnummer < max) {
            Comicnummer = Comicnummer + 1;
            getComic(Comicnummer.toString());
        }
    });

    // första-knappen
    let forsta = document.getElementById('forsta');
    forsta.addEventListener('click', function() {
        // Om nuvarande comicnummer inte är 1, hämta första serien
        if (Comicnummer != 1) {
            getComic("1");
        }
    });

    // förra-knappen
    let forra = document.getElementById('forra');
    forra.addEventListener('click', function() {
        // Om nuvarande comicnummer är större än 1, minska det och hämta serien
        if (Comicnummer > 1) {
            Comicnummer = Comicnummer - 1;
            getComic(Comicnummer.toString());
        }
    });

    // sista-knappen
    let sista = document.getElementById('sista');
    sista.addEventListener('click', function() {
        // Om nuvarande comicnummer inte är max, hämta senaste serien
        if (Comicnummer != max) {
            getComic('latest');
        }
    });

    // Funktion för att hämta serien baserat på comicnummer
    function getComic(which) {
        fetch('https://xkcd.vercel.app/?comic=' + which)
            .then(function(response) {
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then(function(data) {
                // Uppdatera max om det nya comicnumret är större
                if (max < data.num) {
                    max = data.num;
                }
                // Visa serien
                appendComic(data);
            });
    }

    // Funktion för att visa serien
    function appendComic(data) {
        let mainComic = document.getElementById('mainComic');
        mainComic.innerHTML = "";

        // Skapa HTML-element för titel
        let titel = document.createElement('H1');
        titel.innerHTML = data.title;
        mainComic.appendChild(titel);

        // Skapa Date-objekt för att formatera datum
        let dateTime = new Date(data.year, data.month - 1, data.day);
        let formattedDate = dateTime.toLocaleString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });

        // Skapa HTML-element för datum
        let date = document.createElement('p');
        date.innerHTML = formattedDate;
        mainComic.appendChild(date);

        // Skapa HTML-element för figure (bild och caption)
        let figure = document.createElement('figure');
        mainComic.appendChild(figure);

        // Skapa HTML-element för bild
        let img = document.createElement('img');
        img.src = data.img;
        figure.appendChild(img);

        // Skapa HTML-element för caption
        let caption = document.createElement('figcaption');
        caption.innerHTML = data.num;
        figure.appendChild(caption);

        // Lägg till figure i mainComic
        mainComic.appendChild(figure);

        // Uppdatera nuvarande comicnummer
        Comicnummer = data.num;
    }
};
