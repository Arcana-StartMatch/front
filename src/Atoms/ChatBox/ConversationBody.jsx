import envoi_msg_icon from "../../img/envoyer_msg.svg";
import messages_icon from "../../img/chatbox_icon.svg";

import { useState, useRef, useEffect } from "react";
import "./conversationBody.css";
export default function ConversationBody() {
  const [etape, setEtape] = useState(0);
  const [films, setFilms] = useState([]);
  const [criteres, setCriteres] = useState([]);

  // Tableau des questions et reponses
  const questionsReponses = [
    {
      question: "Bonjour, quel genre de film recherchez-vous ?",
      reponses: [
        {
          texte: "Un film d'action",
          action: () => setCriteres([...criteres, "action"]),
        },
        {
          texte: "Une comedie",
          action: () => setCriteres([...criteres, "comedie"]),
        },
        {
          texte: "Un film d'horreur",
          action: () => setCriteres([...criteres, "horreur"]),
        },
        {
          texte: "Autre",
          action: () => setEtape(1),
        },
      ],
    },
    {
      question: "Quel est votre âge ?",
      reponses: [
        {
          texte: "Moins de 18 ans",
          action: () => setCriteres([...criteres, "-18"]),
        },
        {
          texte: "Entre 18 et 25 ans",
          action: () => setCriteres([...criteres, "18-25"]),
        },
        {
          texte: "Plus de 25 ans",
          action: () => setCriteres([...criteres, "+25"]),
        },
        {
          texte: "Autre",
          action: () => setEtape(2),
        },
      ],
    },
    {
      question: "Quel est votre niveau d'etudes ?",
      reponses: [
        {
          texte: "Baccalaureat",
          action: () => setCriteres([...criteres, "bac"]),
        },
        {
          texte: "Licence",
          action: () => setCriteres([...criteres, "licence"]),
        },
        {
          texte: "Master",
          action: () => setCriteres([...criteres, "master"]),
        },
        {
          texte: "Doctorat",
          action: () => setCriteres([...criteres, "doctorat"]),
        },
        {
          texte: "Autre",
          action: () => setEtape(3),
        },
      ],
    },
    {
      question:
        "Voici quelques films qui correspondent à vos criteres. Avez-vous besoin d'aide pour faire votre choix ?",
      films: 1,
      reponses: [
        {
          texte: "Recommencer ...",
          action: () => setEtape(0),
        },
      ],
    },
  ];

  const newMessage = useRef("");
  const dernierMessage = useRef("");

  const sendNewMsg = function (e) {
    /* setMessages([
      ...messages,
      {
        message: newMessage.current.value,
        timestamp: new Date().getTime(),
        date: new Date().toLocaleString(),
      },
    ]);
    // // Scroll to the newly added message
    // const newMessageElement = document.getElementById("dernier_message");
    // newMessageElement.scrollIntoView(true);

    newMessage.current.value = "";
    */
  };
  useEffect(() => {
    if (criteres.length != 0 || etape != 0) {
      setEtape((etape + 1) % 4);
    }
  }, [criteres]);
  useEffect(() => {
    console.log(etape);
    if (etape === 3 && films.length === 0) {
      setFilms(["Film A", "Film B", "Film C"]);
    }
    dernierMessage.current.scrollTop = dernierMessage.current.scrollTopMax;
  }, [etape, films]);

  return (
    <>
      <div className="messages_icon">
        <>
          <img src={messages_icon} alt="icone des messages" />
          <h1>Chat bot</h1>
        </>
      </div>

      <div className="chatBot_messages" ref={dernierMessage}>
        <div
          style={{
            width: "100%",
            textAlign: "left",
          }}
        >
          <span className="chatBot_message">
            <div
              style={{
                textAlign: "justify",
                padding: "7px",
              }}
            >
              <p>{questionsReponses[etape].question}</p>
            </div>
          </span>
        </div>
        {etape > 0 && questionsReponses[etape].films ? (
          films.map((film, index) => (
            <div
              style={{
                width: "100%",
                textAlign: "right",
              }}
              key={"div1" + index}
            >
              <span
                key={"div" + index}
                className="chatBot_message_rep chatBot_message"
              >
                <div
                  style={{
                    textAlign: "justify",
                    padding: "7px",
                  }}
                >
                  <p key={index}>{film}</p>
                </div>
              </span>
            </div>
          ))
        ) : (
          <></>
        )}
        {questionsReponses[etape].reponses?.map((reponse, index) => (
          <div
            style={{
              width: "100%",
              textAlign: "right",
            }}
            key={"div1" + index}
          >
            <span
              key={"div" + index}
              className="chatBot_message_rep chatBot_message"
            >
              <div
                style={{
                  textAlign: "justify",
                  padding: "7px",
                }}
              >
                <button key={"abc" + index} onClick={reponse.action}>
                  {reponse.texte}
                </button>
              </div>
            </span>
          </div>
        ))}
      </div>

      <div className="footer_chatBot">
        <input type="text" className="saisie_chatBot" ref={newMessage} />
        <img
          src={envoi_msg_icon}
          className="envoi_message"
          onClick={sendNewMsg}
          alt="Envoyer un message au chatbot"
        />
      </div>
    </>
  );
}
