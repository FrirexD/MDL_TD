const fs = require("fs"); 
let rawdata = fs.readFileSync("users.json","utf8");
// eslint-disable-next-line no-undef
var args = process.argv;



const data = JSON.parse(rawdata);

let countries = []; // tableau d'objets de countries 

let companies = []; // tableau d'objets de companies

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

// pour les country
if(args[2] == "country"){
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
    console.log(countries);
}

//pour les companies on utilise la meme méthode
//on regarde que l'argument est bien Company
else if(args[2] == "company"){
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
    console.log(companies);
}
else{
    //dans le cas ou la commande rentré dans ARGV n'est pas company ou country
    console.log("ERROR: no option specified (type company or country)");
}