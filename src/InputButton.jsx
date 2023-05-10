import React from "react";
import { useState, useEffect } from "react";

export default function InputButton(props) {
    const [ text, setTexts] = useState("");

      //  //Za Input:
  function onMessageType(event) {
    setTexts(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    setTexts("");
    props.onSendMessage(text);
  }




  //ispisuje svako slovo u konzoli
    useEffect(() => {
        console.log(text); 
    }, [text])
  

    return (
        <div>
        <form onSubmit={onSubmit}>
            <input type="text" 
                   placeholder="Napiši poruku" 
                   value={text}
                   onChange={onMessageType} //event-cim nesto napise-zelimo uhvatit trenutacnu vrijednost
                   //definirat two way binding da uhvati promijene unutar inputa-value i onChange event- stvari se prikazuju i pristup vrijednosti u memoriji-onChange se sprema u state
            />
            
            
            <button>Pošalji</button>

            {/* //onSendMessage bilo na button */}
        </form>    
        </div>
    )
}

// BUTTON:
// 1. Declare a function called handleClick inside your Button component.
// 2. Implement the logic inside that function (use alert to show the message).
// 3. Add onClick={handleClick} to the <button> JSX.


//sending a message should be an event handler. 

