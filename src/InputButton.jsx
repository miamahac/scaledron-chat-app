import React from "react";

export default function InputButton({ message, onMessageType, onSendMessage }) {
    return (
        <div>
            <input type="text" 
                   placeholder="Napiši poruku" 
                   value={message}
                   onChange={onMessageType} //event-cim nesto napise-zelimo uhvatit trenutacnu vrijednost
                   //definirat two way binding da uhvati promijene unutar inputa-value i onChange event- stvari se prikazuju i pristup vrijednosti u memoriji-onChange se sprema u state
            />
            
            
            <button onClick={onSendMessage}>Pošalji</button>
        </div>
    )
}

// BUTTON:
// 1. Declare a function called handleClick inside your Button component.
// 2. Implement the logic inside that function (use alert to show the message).
// 3. Add onClick={handleClick} to the <button> JSX.


//sending a message should be an event handler. 

