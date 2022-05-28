import { useState, useEffect } from 'react';

import Converter from "./components/Converter";
import Header from "./components/Header";

function App() {

  // const apiKey = 'z4ORHFWR3LWdqOt9SvJ9kGgxnZtjPRfQhkoM';
  // const requestOptions = {
  //     method: 'GET',
  // };

  const [usdLatest, updateUsdLatest] = useState();
  const [eurLatest, updateEurLatest] = useState();
  

  let myHeaders = new Headers();
  myHeaders.append("apikey", "NDplVNAZE9O8EdsZZErYHI30L6zlgtHF");

  let requestOptions = {
    method: 'GET',
    headers: myHeaders
  };

  useEffect(() => {
    fetch("https://api.apilayer.com/fixer/latest?symbols=USD,EUR,UAH&base=USD", requestOptions)
    .then(response => response.json())
    .then(result => {
      updateUsdLatest(result.rates.UAH);
    })
    .catch(error => console.log('error', error));

    fetch("https://api.apilayer.com/fixer/latest?symbols=UAH&base=EUR", requestOptions)
    .then(response => response.json())
    .then(result => {
      updateEurLatest(result.rates.UAH);
    })
    .catch(error => console.log('error', error));
  }, []);

  // const changeExp = (value) => {
  //   updateExchRate(value);
  // }

  // useEffect(() => {
  //   fetch(`https://currencyapi.net/api/v1/rates?key=${apiKey}&base=USD&output=JSON`, requestOptions)
  //   .then((response) => response.json())
  //   .then((json) => {
  //     updateUsdLatest(json.rates.UAH);
  //     updateEurLatest(json.rates.UAH)
  //   });
  // }, []);

  // useEffect(() => {
  //   fetch(`https://currencyapi.net/api/v1/rates?key=${apiKey}&base=USD&output=JSON`, requestOptions)
  //   .then((response) => response.json())
  //   .then((json) => {
  //     updateCurrInfo([json]);
  //   });
  // },[]);

  if(usdLatest !== undefined && eurLatest !== undefined){
    return (
      <div className="App">
        <Header usdLatest={usdLatest} eurLatest={eurLatest} />
        <Converter 
          requestOptions={requestOptions} />
      </div>
    );
  }
}

export default App;
