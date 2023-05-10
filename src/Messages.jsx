import React from "react";

export default function Messages({message, currentMember}) {


    function showMessage(message) {
        const { member, data } = message;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe
          ? "Messages-message currentMember"
          : "Messages-message";


        return (
          <li className={className}>
            <span 
            className="avatar" 
            style={{ backgroundColor: member.clientData.color }} 
            />
            <div className="Message-content">
              <div className="username">
              {member.clientData.username}
              </div>
              <div className="text">
                {data}
              </div>
            </div>
          </li>
        );
      }

      
      return (
        <div>
            <ul className="Messages-list">
            {message && message.map((message) => showMessage(message))}
            {/* https://reactjsguru.com/can-not-read-properties-of-undefined-reading-map/ */}
            </ul>
        </div>
    )
}