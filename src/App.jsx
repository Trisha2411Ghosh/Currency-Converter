import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState("")
  const [from,setFrom] = useState("usd")
  const [to,setTo] = useState("inr")
  const [convertedAmount,setConvertedAmount] = useState("")
  const [trigger, setTrigger] = useState(false);

  const currencyInfo = useCurrencyInfo(from,trigger)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () =>{
    setTrigger((prev) => !prev);
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('https://wallpapercave.com/wp/ew3eP0Q.gif')`,
            }}
        >
            <div className="w-full px-8 py-8">
                <div className="w-full max-w-lg mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30 px-6 py-6">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convert()
                           
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount}
                                CurrencyOptions={options}
                                onCurrencyChagnge={(currency)=> setFrom(currency)}
                                onAmountChange={amount => setAmount(amount)}
                                selectCurrency={from}
                                
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                Swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                CurrencyOptions={options}
                                onCurrencyChagnge={(currency)=>setTo(currency)}
                                selectCurrency={to}
                                amountDisable
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default App
