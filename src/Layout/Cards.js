import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck} from "../utils/api";
import Header from "./Header";

function Cards(){
    const [cards, setCards] = useState([]);
    const [decksName, setDecksName] = useState("");
    const [currentCardId, setCurrentCardId] = useState(0)
    const [flipped, setFlipped] = useState(false);

    const {deckId} = useParams();
    const history = useHistory();

    useEffect(() => {
      async function loadDeck(){
        const deck = await readDeck(deckId);
        const cards = deck.cards;
        setDecksName(deck.name);
        setCards(cards);
      }
      loadDeck();
      }, [deckId])

      function nextClick(){
        if (currentCardId + 1 >= cards.length){
            if (window.confirm("Restart cards? Click Cancel to return to home.")){
                setCurrentCardId(0);
            }
            else{
                history.push("/");
            }
            

        }
        else {
            setCurrentCardId(currentCardId + 1);
        }
        setFlipped(false);
      }
      

    return (
        <div>
            <Header />
            <nav className="fs-4" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{decksName}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
              </ol>
            </nav>
            <h3 className="my-3 text-center">{`Study: ${decksName}`}</h3>
            {cards.length >= 3 ? (
                <div className="container-lg border border-secondary border-4 my-3 text-center">
                  <h2>{`Card ${currentCardId + 1} of ${cards.length}`}</h2>
                  <p>{flipped ? cards[currentCardId].back : cards[currentCardId].front}</p>
                  <button className="btn btn-info m-3" onClick={() => setFlipped(!flipped)}>Flip</button>
                  {flipped ? <button className="btn btn-success m-3" onClick={nextClick}>Next</button> : <span></span>}
                  </div>
            ) : (
                <div>
                    <h3>Not Enough Cards</h3>
                    <p>{`You need at least 3 cards to study. There are ${cards.length} cards in this deck.`}</p>
                    <Link to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
                </div>
            )}
          </div>
    );
}

export default Cards;