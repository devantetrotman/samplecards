import React, {useState, useEffect, useCallback} from "react";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import {Route, Switch} from "react-router-dom";
import NewDeck from "./NewDeck";
import Decks from "./Decks";
import Cards from "./Cards";
import AddCard from "./AddCard";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";



function Layout() {
  const [decks, setDecks] = useState([]);

  const loadDecks = useCallback(async() => {
    const theDecks = await listDecks();
    setDecks(theDecks);
  }, [])

  useEffect(() => {
    loadDecks();
  }, [loadDecks])

  // useEffect(() => {
  //   async function loadDecks(){
  //     const theDecks = await listDecks();
  //     setDecks(theDecks);
  //   }
  //   loadDecks();
  // }, [setDecks])

  return (
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks decks={decks} loadDecks={loadDecks} />
          </Route>
          <Route path="/decks/new">
            <NewDeck  />
          </Route>
          <Route path="/decks/:deckId/study">
            <Cards  />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="*">  
            <NotFound />
          </Route>
        </Switch>
      </div>
  );
}

export default Layout;
