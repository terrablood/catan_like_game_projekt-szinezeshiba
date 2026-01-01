

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
function claimlist()
{
    let claims = [];
    return claims;
}
function claimadd(claimlista,x,y,map)
{
    let chunk = [y,x];
    console.log(y,x);
    claimlista.push(chunk);
    //map[y][x][3] = 1
}
function claimkiírás(claimlista)
{
    for(const elem of claimlista)
    {
        console.log(elem[1]);
        console.log(elem[2]);
    }
}
function melyikez(div){ // megszerzi egy div koordinátáit (pozícióját a mapon)
    [sx,sy] = div.id.split(" "); // ["9", "4"]
    return [parseInt(sx), parseInt(sy)];
}
function ezadiv(x,y){ // koordináta (pozíció) alapján megkeres egy divet
    return document.getElementById(`${x} ${y}`);
}
function balkatt(e){
    let vizsgalt = e.target; 
    console.log(vizsgalt);
    [x, y] = melyikez(vizsgalt)
    // a koordináták kiírása konzolba
    console.log(x); 
    console.log(y);
    console.log(map[x][y]);
    claimadd(claimlista,x,y)
}
function kockadobas()
{
    let dobasszam = Math.floor(Math.random() * 6) + 1;
    return dobasszam;
}
function dobaskereses(claimlist,map,dobas)
{
    let lehetsegesek = [];
    for (let i = 0; i < 24; i++) {
        for (let f = 0; f < 24; f++) {
            if(map[i][f][2] == dobas)
            {
                let koordinatak = [i,f];
                lehetsegesek.push(koordinatak);
            }
        }
    }
    let dobottak = [];
    for (let k = 0; k < claimlist.length; k++) {
        for (let l = 0; l < lehetsegesek.length; l++) {
            if(claimlist[k] == lehetsegesek[l])
            {
                let kello = claimlist[k]
                dobottak.push(kello)
            }
        }
    }
    return dobottak;
}
function melyik_nyersanyag_add(biom_, resourcelista)
{
    
    if(biom_ == 0)//mező
    {
        resourcelista[0]++;
    }
    if(biom_ == 1)//erdő
    {
        resourcelista[1]++;
    }
    if(biom_ == 2)//hegység
    {
        resourcelista[2]++;
    }
    if(biom_ == 3)//mocsár
    {
        resourcelista[3]++;
    }
    
}
function resourcelist()
{
    let resourcelista = [0,0,0,0]
    return resourcelista;
}
function mennyiazannyi(dobottak,map,resourcelista)
{
    for (let i = 0; i < dobottak.length; i++) {
        for (let y = 0; y < 24; y++) {
            for (let x = 0; x < 24; x++) {
                if(map[y][x] == dobottak[i])
                {
                    melyik_nyersanyag_add(map[y][x][3],resourcelista);
                }
            }
        }
    }  
}
function neighbouchek(x,y,r) // amikor egy települést tesz le, ellenörzi, hogy van-e claimelhető terület
{
    let valasz = 1;
// 1*1 út
// 3*3 falu/város
// 5*5 főváros
    if(r==3)
    {
        if(x==0||x==24||y==0||y==24)
        {
            valasz = 0
        }
        // y != 0 V y != 24
        // x != 0 V x != 24
    }
    else if(r==5)
    {
        if(x==0||x==1||x==23||x==24||y==0||y==1||y==23||y==24)
        {
            valasz = 0
        }
        // y != 0,1 V y != 23,24
        // x != 0,1 V x != 23,24
    }
    return valasz;
}
function foglalte()
{

}
function kapcsolodike()
{

}
function mitteszel()
{

}



divek_letrehozasa(24,24);
let map = randommapgen();
let claimlista = claimlist();
let nyersanyaglista = resourcelist();
