import { useEffect, useState } from 'react';
import './App.css';
import Singlecard from './components/Singlecard';

const cardImages=[
  {"src":"./img/batman.jpg",matched:false},
  {"src":"./img/black.jpg",matched:false},
  {"src":"./img/captain.jpg",matched:false},
  {"src":"./img/iron.jpg",matched:false},
  {"src":"./img/thor.jpg",matched:false},
  {"src":"./img/flash.jpg",matched:false},
]

function App() {

  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)



 


  //Shuffle Cards
  const shuffleCards=()=>{
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=> Math.random()-0.5)
    .map((card)=>({...card,id:Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice =(card)=>{
      choiceOne ? setChoiceTwo(card):setChoiceOne(card)
  }


  //Compare 2 selected cards
  useEffect(()=>{
    if (choiceOne && choiceTwo)
    {
      if (choiceOne.src === choiceTwo.src)
      {
        setCards(prevCards =>{
          return prevCards.map(card =>{
            if(card.src===choiceOne.src)
            {
              return{...card,matched:true}
            }
            else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(()=>resetTurn(),500)
      }
    }
  },[choiceOne,choiceTwo])


   //Start the game automatically
  useEffect(()=>{
    shuffleCards()
  },[])


  //Reset the Turn
  const resetTurn =()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
  }


  return (
    <div className="App">
      <h1>Memory Magic</h1>
      <button onClick={shuffleCards} >New Game</button>

      <div className='card-grid'>
      {cards.map(card => (
        <Singlecard 
        key={card.id} 
        card={card}
        handleChoice={handleChoice}
        flipped={card===choiceOne || card===choiceTwo || card.matched}/>
      ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
