import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api";
import Header from "./Header";


function EditDeck(){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const { deckId } = useParams();
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        await updateDeck({name: name, description: description, id: deckId});
        history.push(`/decks/${deckId}`);
    }

    useEffect(() => {
      async function loadDeck(){
        const newDeck = await readDeck(deckId);
        setName(newDeck.name);
        setDescription(newDeck.description);
      }
      loadDeck(); 
      }, [deckId])



    return (
        <div>
            <Header />
            <nav className="fs-4" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
              </ol>
            </nav>
            <h3>Edit Deck</h3>
            <form onSubmit={handleSubmit}>
                <label className="fw-bold" for="name">Name</label>
                <input className="col-12" type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                <label className="fw-bold mt-3" for="description">Description</label>
                <textarea className="col-12" value={description} onChange={(e) => setDescription(e.target.value)} name="description">{description}</textarea>
                <button className="btn btn-success m-3" type="submit">Submit</button>
                <button className="btn btn-warning m-3" onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
            </form>
        </div>
    );
}

export default EditDeck;