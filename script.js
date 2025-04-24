
const flagApi = 'https://flagsapi.com/US/shiny/64.png';
const inputBox = document.querySelector("input"); 
const btn = document.querySelector("button");
const countryBox = document.querySelectorAll(".country-box");
const flagOption = document.querySelectorAll("option");
let countryList_country;
let countryList_currency;
let currencyFrom ="INR";
let currencyTo ="INR";
let countryFrom = "IN";
let countryTo ="IN"

const getInput=()=>{ 
  if(!inputBox.value)
  {
    inputBox.value=1;
  }
  else if(inputBox.value<1)
  {
    inputBox.value=1;
  }
return inputBox.value;
}

const convertCurrency = async () =>{
const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.4.23/v1/currencies/inr.json'
const urlFrom = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.4.23/v1/currencies/${currencyFrom.toLowerCase()}.json`;

let response = await fetch(urlFrom);
let result = await response.json();
console.log(result);
let crf = currencyFrom.toLowerCase();
let crt = currencyTo.toLowerCase();
let exchangeRate = result[crf][crt];
console.log(exchangeRate);
console.log("below");
const inputCurrency = getInput();
console.log(inputCurrency)
let convertedCurrency = (exchangeRate*inputCurrency).toFixed(1);
document.querySelector(".converted-currency").innerText = `${inputCurrency} ${currencyFrom} = ${convertedCurrency} ${currencyTo}`;
document.querySelector(".exchg-value").innerText = `${exchangeRate.toFixed(2)}`;
document.querySelector(".exchg-currency").innerText = currencyFrom;
}



btn.addEventListener("click", (e)=>{
  e.preventDefault();
 const inputCurrency = getInput();
 console.log(inputCurrency);
//  inputBox.value = "";
  console.log(currencyFrom);
  console.log(currencyTo);
  
  convertCurrency();
})




document.querySelectorAll("#select").forEach((select)=>{
    select.addEventListener("change", async (e)=>{
        console.log(e.target.selectedOptions[0].getAttribute("name"));
        let selectedCountryCode = e.target.selectedOptions[0].getAttribute("name");
        let imgUrl = `https://flagsapi.com/${selectedCountryCode}/shiny/64.png`;
        console.log(imgUrl);
        select.parentElement.querySelector(".flag").querySelector("img").src = imgUrl;
        console.log(select.parentElement.querySelector(".flag").querySelector("img"));
        console.log(select);
        
        // get the value of the currancy 
        if(select.getAttribute("name") =="from-country")
        { 
          currencyFrom = e.target.value;
          console.log("from value =", currencyFrom);
          // console.log((select.parentElement).parentElement.querySelector("h5").textContent());
          select.parentElement.parentElement.querySelector("h5").innerText = e.target.selectedOptions[0].getAttribute("data-name");


        }
        else if(select.getAttribute("name") =="to-country")
        {
          currencyTo = e.target.value;
          console.log("to value =", currencyTo)
          select.parentElement.parentElement.querySelector("h5").innerText = e.target.selectedOptions[0].getAttribute("data-name");
        }
        
    })
})


window.addEventListener("load", ()=>{
  let select= document.querySelectorAll("#select");
  for(let i=0;i<select.length;i++)
  {
     countryList_currency =  Object.keys(countryList);
     countryList_country =  Object.values(countryList);


    for(let j=0; j<countryList_country.length;j++)
    { 
        let newOption = document.createElement("option");
        newOption.value = countryList_currency[j];
        newOption.textContent = countryList_currency[j];
        
        newOption.setAttribute("name", `${countryList_country[j][0]}`);
        newOption.setAttribute("data-name", `${countryList_country[j][1]}`)
        console.log();
        select[i].append(newOption);
    }
  }
 document.querySelectorAll("option").forEach((option)=>{
  if(option.getAttribute("name") === "IN")
  {
    option.selected = true;
  }
 })
})
