import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";
import CardForm from "./CardForm";
import Header from "./Header";


function EditCard(){
    const [deckName, setDeckName] = useState("");

    const { deckId, cardId } = useParams();

    useEffect(() => {
      async function loadCard(){
        const deck = await readDeck(deckId);
        setDeckName(deck.name);
      }
      loadCard();
      }, [cardId, deckId]) //Trying getting rid of this useeffect

    return (
        <div>
            <Header />
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deckName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
              </ol>
            </nav>
            <h3>Edit Card</h3>
            <CardForm />
        </div>
    );
}

export default EditCard;