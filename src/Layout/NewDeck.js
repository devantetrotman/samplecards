import React, {useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../utils/api";
import Header from "./Header";


function NewDeck(){
    const [name, setName] = useState("Deck Name");
    const [description, setDescription] = useState("Brief description of the deck");
    const [decks, setDecks] = useState([]);

    const history = useHistory();

    useEffect(() => {
      async function loadDecks(){
        const theDecks = await listDecks();
        setDecks(theDecks);
      }
      loadDecks();
    }, [setDecks])

    async function handleSubmit(e){
        e.preventDefault();
        await createDeck({ name: name, description: description});
        history.push(`/decks/${decks.length + 1}`);
    }



    return (
        <div>
            <Header />
            <nav className="fs-4" aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
              </ol>
            </nav>
            <h3>Create Deck</h3>
            <form onSubmit={handleSubmit}>
                <label className="fw-bold" for="name">Name</label>
                <input className="col-12" type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" />
                <label className="fw-bold mt-3" for="description">Description</label>
                <textarea className="col-12" value={description} onChange={(e) => setDescription(e.target.value)} name="description">{description}</textarea>
                <button className="btn btn-success m-3" type="submit">Submit</button>
                <button className="btn btn-warning m-3" onClick={() => history.push("/")}>Cancel</button>
            </form>
        </div>
    );
}

export default NewDeck;