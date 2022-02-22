import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {deleteDeck} from "../utils/api";
import Header from "./Header";


function Decks({ decks, loadDecks }){
  
  // async function loadDeck() {
  //   const newDeck = await listDecks();
  //   const newCards = newDeck.cards;
  //   setDeck(newDeck);
  //   setCards(newCards);
  // }

  // useEffect(() => {
  //   loadDeck(); 
  //   }, []);

  useEffect(() => {
    loadDecks();
  }, [loadDecks])

     async function handleDelete(deckId){
      if (window.confirm("Delete this deck? You won't be able to recover it.")){
         deleteDeck(deckId);
        window.alert("Deck deleted");
        await loadDecks();
      }
    }
  
    return (
          <div>
            <Header />
            <Link to={`/decks/new`}><button className=" btn-primary my-3">Create Deck</button></Link>
              {decks.map((deck) =>(
                <div className="container-lg border border-secondary border-4 my-3 text-center" key={deck.id}>
                  <h2>{deck.name}</h2>
                  <span className="fst-italic">{deck.cards.length} cards</span>
                  <p>{deck.description}</p>
                  <Link className="btn btn-info m-3" to={`/decks/${deck.id}`}>View</Link>
                  <Link className="btn btn-success m-3" to={`/decks/${deck.id}/study`}>Study</Link>
                  <button className="btn btn-danger m-3" onClick={async() => await handleDelete(deck.id)}>Delete</button>
                </div>
              ))}
          </div>
      );
    
}

export default Decks;