import React, {useState, useEffect} from "react";
import {useHistory, useParams, useLocation} from "react-router-dom";
import {readCard, updateCard, createCard} from "../utils/api";

function CardForm(){
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    const location = useLocation();
    const history = useHistory();
    const { deckId, cardId } = useParams();

    useEffect(() => {
      async function loadCard(){
        if (location.pathname.includes("/edit")){
            const card = await readCard(cardId);
            setFront(card.front);
            setBack(card.back);
        }
        else{
            setFront("Front side of card")
            setBack("Front side of card")
        }
      }
      loadCard();
      }, [cardId, location.pathname])

    function handleCardEditSubmit(e){
        e.preventDefault();
        updateCard({ front: front, back: back, id: cardId, deckId: Number(deckId)});
        history.push(`/decks/${deckId}`);
    }

    function handleCardCreateSubmit(e){
        e.preventDefault();
        createCard(deckId, { front: front, back: back});
        window.alert("Card Created!");
        setFront("Front side of card");
        setBack("Back side of card");
    }


    return(
        <div>
            {location.pathname.includes("/edit") ?
                <form onSubmit={handleCardEditSubmit}>
                    <label for="front">Front</label>
                    <textarea className="col-12" value={front} onChange={(e) => setFront(e.target.value)} name="front">{front}</textarea>
                    <label for="back">Back</label>
                    <textarea className="col-12" value={back} onChange={(e) => setBack(e.target.value)} name="back">{back}</textarea>
                    <button className="btn btn-success m-3" type="submit">Save</button>
                    <button className="btn btn-warning m-3" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
                </form>
            : 
            <form onSubmit={handleCardCreateSubmit}>
                <label for="front">Front</label>
                <textarea className="col-12" value={front} onChange={(e) => setFront(e.target.value)} name="front">{front}</textarea>
                <label for="back">Back</label>
                <textarea className="col-12" value={back} onChange={(e) => setBack(e.target.value)} name="back">{back}</textarea>
                <button className="btn btn-warning m-3" onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                <button className="btn btn-success m-3" type="submit">Save</button>
            </form>
            }
        </div>
    );
}

    export default CardForm;