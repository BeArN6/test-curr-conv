import { useState, useEffect } from 'react';

import usd from '../img/usd.png';
import euro from '../img/euro.png';
import uah from '../img/uah.png';
import gbp from '../img/gbp.png';
import jpy from '../img/jpy.png';
import equal from '../img/equal.png';
import Select from 'react-select';

const Converter = ({requestOptions}) => {

    const [selectOpt, updateSelectOpt] = useState([
        { value: 'USD', label: <div className="select__option"><img src={usd} alt="" /><span>USD</span></div> },
        { value: 'EUR', label: <div className="select__option"><img src={euro} alt="" /><span>EUR</span></div> },
        { value: 'UAH', label: <div className="select__option"><img src={uah} alt="" /><span>UAH</span></div> },
        { value: 'GBP', label: <div className="select__option"><img src={gbp} alt="" /><span>GBP</span></div> },
        { value: 'JPY', label: <div className="select__option"><img src={jpy} alt="" /><span>JPY</span></div> },
    ]);

    const [fromCurr, updateFromCurr] = useState(selectOpt[0]);
    const [toCurr, updateToCurr] = useState(selectOpt[1]);
    const [exchRate, updateExchRate] = useState();

    const [amountFrom, updateAmountFrom] = useState('');
    const [amountTo, updateAmountTo] = useState('');

    useEffect(() => {
        fetch(`https://api.apilayer.com/fixer/latest?symbols=${toCurr.value}&base=${fromCurr.value}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const firstEl = result.rates[Object.keys(result.rates)[0]];
            updateExchRate(firstEl);
        })
        .catch(error => console.log('error', error));
    }, [fromCurr, toCurr]);
    

    const changeCurrency = (e, convName) => {
        let currencyIndex;
        selectOpt.map((key, index) => {
            if(key.value === e.value){
                currencyIndex = index;
            }
            return key;
        });

        const result = selectOpt[currencyIndex];
        const index = (currencyIndex === 2) ? currencyIndex - 1 : currencyIndex + 1;
        const convItem = (convName === 'from') ? toCurr : fromCurr;
        if(result === convItem && convName === 'from'){
            updateToCurr(selectOpt[index]);
        } else if(result === convItem && convName === 'to'){
            updateFromCurr(selectOpt[index]);
        }

        updateAmountFrom('');
        updateAmountTo('');
        return result;
    }

    const changeAmount = (e, inputName) => {
        const currVal = +(e.target.value);
        if(isNaN(currVal) || currVal === undefined || currVal === '' || currVal === null){
            updateAmountFrom('');
            updateAmountTo('');
        } else{
            if(inputName === 'from'){
                // console.log(currVal, exchRate);
                updateAmountFrom(currVal);
                updateAmountTo(currVal*exchRate);
            } else{
                // console.log(currVal, exchRate);
                updateAmountTo(currVal);
                updateAmountFrom(currVal/exchRate);
            }
        }
        
    }

    return ( 
        <div className="converter">
            <div className="wrapper">
                <h2 className="title">Currency converter</h2>
                <div className="converter__box">
                    <p className="converter__subtitle">Please choose your currency and enter value into a field</p>
                    <div className="converter__wrap flex">
                        <div className="converter__item flex">
                            <div className="converter__select">
                                <Select 
                                    options={selectOpt}
                                    value={fromCurr}
                                    onChange={e => updateFromCurr(changeCurrency(e, 'from'))}
                                    />
                            </div>
                            <div className="converter__input">
                                <input type="number"
                                    value={amountFrom}
                                    onChange={(e) => changeAmount(e, 'from')} />
                            </div>
                        </div>
                        <div className="converter__equal">
                            <img src={equal} alt="" />
                        </div>
                        <div className="converter__item flex">
                            <div className="converter__select">
                                <Select 
                                    options={selectOpt}
                                    value={toCurr}
                                    onChange={e => updateToCurr(changeCurrency(e, 'to'))} />
                            </div>
                            <div className="converter__input">
                                <input type="number"
                                    value={amountTo}
                                    onChange={(e) => changeAmount(e, 'to')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Converter;