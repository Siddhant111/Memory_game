import './SingleCard.css'

export default function Singlecard({card,handleChoice,flipped}) {

const handleClick=()=>{
    handleChoice(card)
}

    return (
        <div>
          <div className='card'>
            <div className={flipped ? "flipped":""}>
              <img  className='front' src={card.src} alt='front-card'/>
              <img  className='back' 
              src='./img/avengers.png' 
              onClick={handleClick}
              alt='back-card'/>
            </div>
          </div> 
        </div>
    )
}
