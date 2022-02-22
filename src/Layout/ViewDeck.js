import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {deleteCard, deleteDeck, readDeck} from "../utils/api";
import Header from "./Header";


function ViewDeck(){
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    const { deckId } = useParams();

    const history = useHistory();

    // const loadDeck = useCallback(async() => {
    //   const newDeck = await readDeck(deckId);
    //   const newCards = newDeck.cards;
    //   setDeck(newDeck);
    //   setCards(newCards);
    // }, [deckId]) 
    
    async function loadDeck(){
      const newDeck = await readDeck(deckId);
      const newCards = newDeck.cards;
      setDeck(newDeck);
      setCards(newCards);
    }

    useEffect(() => {
      loadDeck(); 
      }, []);

    async function handleDeckDelete(){
      if (window.confirm("Delete this deck? You won't be able to recover it.")){
        await deleteDeck(deckId);
        window.alert("Deck deleted");
        history.push("/");
      }
    }

    async function handleCardDelete(cardId){
        if (window.confirm("Delete this card? You won't be able to recover it.")){
          await deleteCard(cardId);
          window.alert("Card deleted");
          await loadDeck();
        }
      }
  
  
      return (
          <div>
            <Header />
            <nav className="fs-4" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
              </ol>
            </nav>
            <div className="container-lg border border-secondary border-4 my-3 text-center">
              <h3>{deck.name}</h3>
              <p>{deck.description}</p>
              <Link className="btn btn-warning m-3" to={`/decks/${deckId}/edit`}>Edit</Link>
              <Link className="btn btn-success m-3" to={`/decks/${deckId}/study`}>Study</Link>
              <Link className="btn btn-info m-3" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
              <button className="btn btn-danger m-3" onClick={handleDeckDelete}>Delete</button>
            </div>
            <div>
              <h2 className="text-center">Cards</h2>
              {cards.map((card) =>(
                  <div className="container-lg border border-secondary border-4 my-3 text-center" key={card.id}>
                    <p className="mt-3">{card.front}</p>
                    <p>{card.back}</p>
                    <Link className="btn btn-warning m-3" to={`/decks/${deckId}/cards/${card.id}/edit`}>Edit</Link>
                    <button className="btn btn-danger m-3" onClick={async() => await handleCardDelete(card.id)}>Delete</button>
                  </div>
                ))}
              </div>
          </div>
      );
    
}

export default ViewDeck;