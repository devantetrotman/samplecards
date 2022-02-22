import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";
import CardForm from "./CardForm";
import Header from "./Header";

function AddCard(){
    const [deck, setDeck] = useState({});

    const { deckId } = useParams();

    useEffect(() => {
      async function loadDeck(){
        const deck = await readDeck(deckId);
        setDeck(deck);
      }
      loadDeck();
      }, [deckId])

    return (
        <div>
            <Header />
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
              </ol>
            </nav>
            <h3> {deck.name}: Add card</h3>
            <CardForm />
          </div>
    );
}

export default AddCard;