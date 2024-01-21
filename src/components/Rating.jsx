import { useState } from "react"

export const Rating = () => {

const [hovered, setHovered] = useState(0)
const [clicked, setClicked] = useState(0)

const emptyStar = 'https://upload.wikimedia.org/wikipedia/commons/1/18/Five-pointed_star.svg'
const filledStar = 'https://upload.wikimedia.org/wikipedia/commons/2/29/Gold_Star.svg'

const getStar = (id) => {
    if(hovered >= id || clicked >= id){
        return filledStar
    }else{
        return emptyStar
    }
}

const starIDs = [1,2,3,4,5]

  return (
    <div>
    {starIDs.map((id) => (
        <img key={id}
        src={getStar(id)}
        onMouseEnter={() => {
            setHovered(id);
            if(id < clicked) setClicked(0)
        }}
    onClick={() => setClicked(id)}
    onMouseOut={() => setHovered(0)}
    width={40}
    height={50}
    />
    ))}
    
    </div>
  )
}

export default Rating