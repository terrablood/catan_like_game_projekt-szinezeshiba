

function keveres(l){ // Fisher-Yates-Knuth shuffle
    let i=l.length;
    while(i!=0){
        let j=Math.floor(Math.random()*i);
        i--;
        [l[i], l[j]] = [l[j], l[i]];
    }
    return l;
}

// 24*24 = 576
function biomok(){ 
    let a = [];
    // mező 192 -> 1
    // erdő 192 -> 2
    // hegység 128 -> 3
    // mocsár 64 -> 4
    
    for (let i = 0; i < 192; i++) {
        a.push(0);
        // a[i].classList.add('mező');
    }
    for (let i = 0; i < 192; i++) {
        a.push(1);
        // a[i].classList.add('erdő');

    }
    for (let i = 0; i < 128; i++) {
        a.push(2);
        // a[i].classList.add('hegység');

    }
    for (let i = 0; i < 64; i++) {
        a.push(3);
        // a[i].classList.add('mocsár');

    }
    return a;
    
}
function lelohelyek(){
    let a = [];
    for (let i = 0; i < 18; i++) {
        a.push(1);
    }
    for (let i = 0; i < 558; i++) {
        a.push(0);
    }

    return a;
}
function kockaszam(){
    let a = [];
    for (let i = 1; i < 7; i++) {
        for (let j = 0; j < 96; j++) {
        a.push(i);
        }
    }
    return a;
}
function claim(){
    let a = [];
    for (let i = 0; i < (24*24); i++) {
        a.push(0);
    }
    return a;
}
function foglalt(){
    let a = [];
    for (let i = 0; i < (24*24); i++) {
        a.push(0);
    }
    return a;
}
function matrixhajtogatas(biom, lelohely, kockaszam, claim, foglalt)
{
    let index = 0;
    let map = [];
    for (let i = 0; i < 24; i++) {
        let line = [];
        for (let j = 0; j < 24; j++) {
            let cell = [];
            console.log(biom);
            cell.push(biom[index]);
            cell.push(lelohely[index]);
            cell.push(kockaszam[index]);
            cell.push(claim[index]);
            cell.push(foglalt[index]);
            index++;
            line.push(cell);
        }
        map.push(line);
    }
    return map;
}
function divek_letrehozasa(x,y){
    let container = document.querySelector(".container");
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            let div = document.createElement("div");
            div.id = `${i}_${j}`;
            div.onclick = balkatt;
            div.classList.add("mezo")
            container.appendChild(div);
        }
    }
}// id meg kell próbálnom beilleszteni a szinezést a generáláson bélűlre!
function randommapgen(){
    let a = biomok();
    let biomokk = keveres(a);// ez dönti el hogy melyik biomból menyi van és hol
    let b = lelohelyek();
    let lelohelyee = keveres(b);// ez mutatja, hogy lelőhely-e
    let c = kockaszam();
    let kockaszamm = keveres(c);// ez tárolja,, hogy melyik koordinátának mi a száma
    let d = claim();
    let claimm = keveres(d);// megmutatja, hogy claimelve vvan e és ki által
    let e = foglalt();
    let foglaltt = keveres(e);// megmutatja hogy foglalt-e a terület
    let f = matrixhajtogatas(biomokk,lelohelyee,kockaszamm,claimm,foglaltt)
    return f;
}
function balkatt(){
    alert("balkatt!")
}
document.addEventListener("DOMContentLoaded", () => {
    divek_letrehozasa(24,24);
    let map = randommapgen();
    
});