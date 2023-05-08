import { useEffect, useState } from 'react';
import './App.css';
import Messages from './Messages';
import InputButton from './InputButton';


export default function App() {

//Random imena, prezimena i boja
function randomUser() {
  const firstNames = [
    'Lloyd', 'Melissa', 'Latisha', 'Garfield', 'Bonita', 'Lupe', 'Antonio', 'Jamey', 'Kay', 'Valarie',
  ];

  const lastNames = [
    'Blake', 'Moody', 'Santana', 'Riddle', 'Ramos', 'Bernard', 'Sweeney','Solis', 'Gentry', 'Dunlap',
  ];
 
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return firstName + lastName;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}  



//state-ovi aplikacije - prvo message i member def
const [message, setMessages] = useState([]);

const [member, setMembers] = useState({
  username: randomUser(),
  color: randomColor(),
})


///////////////////
const [drone, setDrone] = useState();

useEffect(() => {
  const drone = new window.Scaledrone('3LFouKRYUiPgLdbk', {
    data: member,
  });
  setDrone(drone);
}, [member]
);

useEffect(() => {
  if (drone) {
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      member.id = drone.clientId;
      setMembers(member);
    });

//     const room = drone.subscribe("observable-room");
//     room.on("message", (message) => {
//       setMessages((prevState) => [...prevState, message]);
//     });
//   }
// }, [drone, member]);

const room = drone.subscribe("observable-room");
room.on("message", (message) => {
  setMessages((prevState) => [...prevState, message]);
});
}
}, [drone, member]);


const onSendMessage = (message) => {
  drone.publish({ room: "observable-room", message });
  console.log("poslano " + message);

};
/////////////////



  //  //Za Input:
  function onMessageType(event) {
    setMessages(event.target.value);
 
  }
  
  //Za button: MOJE
//   function onSendMessage(event) {
//     // sendMessage(message); - With an event handler, you can be sure that sendMessage(message) will only run if the user presses the button.
// console.log('Poslana poruka: ' + message);
// }

useEffect(() => {
  console.log(message); 
}, [message])


  return (
    <div className="App">
 <header className="App-header">
<h1>Chat app</h1>
      </header>
      <main>

    <Messages
          messages={message}
          currentMember={member}
        />
    <InputButton
          name={message}
          onMessageType={onMessageType}
          onSendMessage={onSendMessage}
    />

    </main>
    </div>
  );
}


