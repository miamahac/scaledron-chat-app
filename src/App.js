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
  return firstName + " " + lastName;
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

const [drone, setDrone] = useState();


useEffect(() => {
  const drone = new window.Scaledrone('SeD8rFMLxbFQhuaq', {
    data: member,
  });
  

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log('Successfully connected to Scaledrone');

      member.id = drone.clientId;
      setMembers(member);
    });


const room = drone.subscribe("observable-room");
room.on("message", (message) => {
  setMessages((prevState) => [...prevState, message]);
});
console.log('Successfully joined room');

setDrone(drone);
}, []);


const onSendMessage = (message) => {
  drone.publish({ 
    room: "observable-room", 
    message });
  console.log("poslano " + message);
};






  return (
    <div className="App">
 <header className="App-header">
<h1>Chat app</h1>
      </header>
    <Messages
          message={message}
          currentMember={member}
        />
    <InputButton
          onSendMessage={onSendMessage}
    />
    </div>
  );
}


// dupliciraju se poruke
//ako se posalje prazna poruka baca error
// Warning: Each child in a list should have a unique "key" prop.
// Check the render method of `Messages`. See https://reactjs.org/link/warning-keys for more information.
//     at li
//     at Messages (http://localhost:3000/static/js/bundle.js:292:5)
//     at div
//     at App (http://localhost:3000/static/js/bundle.js:46:81)
// o