const fs = require("fs"); 
//const { abort } = require("process");
let rawdata = fs.readFileSync("users.json","utf8");
// args utilisé sans le menu 
//var args = proc.argv;
const proc = require("process");

const data = JSON.parse(rawdata);


//---Pour les inputs de Keybords---
const readline = require("readline");

readline.emitKeypressEvents(proc.stdin);

if(proc.stdin.isTTY) proc.stdin.setRawMode(true);
Menuprint();
// Listen to Keypress 
proc.stdin.on("keypress", (str, key)=> {  if(key.name == "1") { CallMenu(1); } if(key.name == "2" ) { CallMenu(2); } if(key.name == "q"){proc.exit();} if(key.name == "u"){user_loggin();}  } );
//--- Imputs keybord fin---


//fonction qui permet de savoir si le countries fait déjà parti du tableau d'objets countries 
function inCountries(countrytable, string){
    for(let i = 0;i<countrytable.length;i++){
        if(countrytable[i].Country == string){
            return true;
        }
    }
    return false;
}

// fonction qui permet de savoir si la companie fait déjà parti du tableau d'objets companies
function inCompanies(companytable, string){
    for(let i = 0;i<companytable.length;i++){
        if(companytable[i].Company == string){
            return true;
        }
    }
    return false;
}

//fonction qui permet d'appller les fonctions de count des entreprises / pays 
function CallMenu( k )
{
    //initialisation des tableaux à chaque appel pour éviter le cumul de données
    let countries = []; // tableau d'objets de countries 

    let companies = []; // tableau d'objets de companies

    // pour les country
    if(  k == 1 ){ //if keypress = 1  
        //pour chaque élément de notre liste 
        for(let i = 0; i < data.length; i++){
            //on ajoute le contry dans notre tableau lorsqu'il ne fait pas partie du tableau 
            // On regarde s'il en fait partie avec notre fonction inCountries
            if(!inCountries(countries,data[i].country)){
                let obj = {Country:data[i].country, Count:1};
                countries.push(obj);
            }
            //si le Country fait déjà parti du tableau alors on incrémente de 1 notre Objet
            // on incrémente avec Count
            else{   
                let j = 0;
                while(countries[j].Country != data[i].country){ 
                    j++;
                }
                countries[j].Count++ ;
            }
        }
        
        //fonction de tri Pour avoir dans l'ordre décroissant
        for(let i = 0;i < countries.length;i++){        
            let tmp = countries[i];
            let j = i-1;
            while((j>=0) && (countries[j].Count < tmp.Count)){
                countries[j+1] = countries[j];
                j--;
            }
            countries[j+1] = tmp;
        }

        //Printing final elements
        Print_table(countries);
    }

    //pour les companies on utilise la meme méthode
    //on regarde que l'argument est bien Company
    else if(k == 2){ // keypress = 2 
        //pour chaque élément de notre liste
        for(let i = 0; i < data.length; i++){
            //si la company ne fait pas partie de notre tableau on l'ajoute avec un coupteur dans un objet 
            //On regarde si la company ne fait pas partie de notre tableau avec la fonction inCompanies
            if(!inCompanies(companies,data[i].company)){
                let obj = {Company:data[i].company, Count:1};
                companies.push(obj);
            }
            // si la company fait déjà partie de notre tableau alors on incrémente son compteur
            else{   
                let j = 0;
                while(companies[j].Company != data[i].company){ 
                    j++;
                }
                companies[j].Count++ ;
            }
        }
        
        //tri des objets dans notre tableau dans l'ordre décroissant
        for(let i = 0;i < companies.length;i++){ 
            let tmp = companies[i];
            let j = i-1;
            while((j>=0) && (companies[j].Count < tmp.Count)){
                companies[j+1] = companies[j];
                j--;
            }
            companies[j+1] = tmp;
        }

        //print les companies
        Print_table(companies);
    }
    else{
        //dans le cas ou la commande rentré dans ARGV n'est pas company ou country
        console.log("ERROR: no option specified (type company or country)");
    }
    Menuprint();
}

//fonction d'affichage du Menu avec les couleurs dédiées 
function Menuprint ()
{
    console.log("\n__________________");
    console.log(" \n Menu :");
    console.log("__________________");
    console.log("press to access : ");
    console.log("\x1b[36m%s\x1b[0m ","1 --> Countries "); //cyan
    console.log("\x1b[33m%s\x1b[0m","2 --> Companies "); //yellow 
    console.log("\x1b[32m%s\x1b[0m","u --> user loggin "); //Green 
    console.log("\x1b[31m%s\x1b[0m","q --> QUIT "); //pink/ red 
    console.log("__________________");
    
}
function Print_table(table)
{
    for(let i of table)
    {
        console.log(i);
    }
}
function user_loggin()
{

}