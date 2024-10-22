let liczba = 0;
let interwal;
let graAktywna = false;
let wynik = 0;
let oczekiwanieNaKlik = false;

const startBtn = document.getElementById('start');
const przyciskNapoj = document.getElementById('przycisk-napoju');
const licznikElem = document.getElementById('licznik');
const wynikElem = document.getElementById('wynik');
const komunikatElem = document.getElementById('komunikat');
const graElem = document.getElementById('gra');
const ustawieniaElem = document.getElementById('ustawienia-gry');

startBtn.addEventListener('click', rozpocznijGre);
przyciskNapoj.addEventListener('click', kliknieciePrzycisku);

function rozpocznijGre() {
    const szybkosci = parseInt(document.getElementById('poziom-trudnosci').value);
    liczba = wynik = 0;
    oczekiwanieNaKlik = graAktywna = true;
    komunikatElem.innerText = '';
    wynikElem.innerText = 'Wynik: ' + wynik;
    ustawieniaElem.style.display = 'none';
    graElem.style.display = 'block';
    interwal = setInterval(zwiekszLiczbe, szybkosci);
}

function zwiekszLiczbe() {
    const szybkosci = parseInt(document.getElementById('poziom-trudnosci').value);
    liczba++;
    licznikElem.innerText = liczba;

    if (czyPodzielnaLubZawiera7(liczba)) {
        oczekiwanieNaKlik = true;
        setTimeout(() => {
            if (oczekiwanieNaKlik) {
                koniecGry('Przegrałeś! Nie kliknąłeś w odpowiednim momencie.');
            }
        }, (szybkosci / 1.5));
    } else {
        oczekiwanieNaKlik = false;
    }
}

function kliknieciePrzycisku() {
    if (!graAktywna) return;

    if (czyPodzielnaLubZawiera7(liczba)) {
        wynik++;
        wynikElem.innerText = 'Wynik: ' + wynik;
        oczekiwanieNaKlik = false;
    } else {
        koniecGry('Przegrałeś! Kliknąłeś za wcześnie.');
    }
}

function czyPodzielnaLubZawiera7(n) {
    return n % 7 === 0 || n.toString().includes('7');
}

function koniecGry(komunikat) {
    graAktywna = false;
    clearInterval(interwal);
    komunikatElem.innerText = komunikat;
    ustawieniaElem.style.display = 'block';
    graElem.style.display = 'none';
    startBtn.innerText = 'Zagraj ponownie';
}
