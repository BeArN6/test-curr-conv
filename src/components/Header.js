import { useState } from 'react';

import usdimg from '../img/usd.png';
import euroimg from '../img/euro.png';

const Header = ({usdLatest, eurLatest}) => {

    // const calculateCurrRate = (curr1, curr2) => {
    //     const usdVal = currency.USD;
    //     if(curr1.indexOf('USD') === -1 && curr2.indexOf('USD') === -1){
    //         const result = (usdVal/curr1[1])*curr2[1];
    //         return result.toFixed(4);
    //     } else{
    //         return usdVal.toFixed(4);
    //     }
    // }

    const [currVal, updateCurrVal] = useState([
        {
            id: 1,
            img: usdimg,
            name: 'USD/UAH',
            value: usdLatest.toFixed(4)
        },
        {
            id: 2,
            img: euroimg,
            name: 'EUR/UAH',
            value: eurLatest.toFixed(4)
        }
    ])

    return ( 
        <div className="header">
            <div className="wrapper">
                <div className="header__course flex">
                    {
                        currVal.map(key => (
                            <div className="header__courseitem flex" key={key.id}>
                                <img src={key.img} alt="" />
                                <span>{key.name}</span>
                                <span>-</span>
                                <span>{key.value} ₴</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
     );
}
 
export default Header;