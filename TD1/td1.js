const { timeStamp } = require('console');
const fs = require('fs'); 
let rawdata = fs.readFileSync('users.json','utf8');
var args = process.argv;



const data = JSON.parse(rawdata);

let countries = [];
let companies = [];

function inCountries(countrytable, string){
    for(let i = 0;i<countrytable.length;i++){
        if(countrytable[i].Country == string){
            return true;
        }
    }
    return false;
}


function inCompanies(companytable, string){
    for(let i = 0;i<companytable.length;i++){
        if(companytable[i].Company == string){
            return true;
        }
    }
    return false;
}




if(args[2] == "country"){
    for(let i = 0; i < data.length; i++){
        if(!inCountries(countries,data[i].country)){
            let obj = {Country:data[i].country, Count:1};
            countries.push(obj);
        }
        else{   
            let j = 0;
            while(countries[j].Country != data[i].country){ 
                j++;
            }
            countries[j].Count++ ;
        }
    }
    

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
else if(args[2] == "company"){
    for(let i = 0; i < data.length; i++){
        if(!inCompanies(companies,data[i].company)){
            //Listing all the different companies
            let obj = {Company:data[i].company, Count:1};
            companies.push(obj);
        }
        else{   
            let j = 0;
            while(companies[j].Company != data[i].company){ 
                j++;
            }
            companies[j].Count++ ;
        }
    }
    
    
    for(let i = 0;i < companies.length;i++){ 
        let tmp = companies[i];
        let j = i-1;
        while((j>=0) && (companies[j].Count < tmp.Count)){
            companies[j+1] = companies[j];
            j--;
        }
        companies[j+1] = tmp;
    }


    console.log(companies);
}
else{
    console.log("ERROR: no option specified (type company or country)");
}