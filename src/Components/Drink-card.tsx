import { useState } from "react";
import '../assets/drinks-styles.css'

type drinkCardProps = {
    name: string,
    img?: string,
    ingredientes: string[]

}
export function DrinkCard(props: drinkCardProps) {
    let [ings, setIngs] = useState<string[]>(props.ingredientes)

    return (
        <div className="cardContainer">
            <div className="flip-card c1">
                <div className="flip-card-inner">
                    <div className="flip-card-front grid">
                        <img src={props.img} />
                        <h3>{props.name}</h3>
                    </div>
                    
                    <div className="flip-card-back">
                        <ul>
                            {ings.map(i => <li>{i}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
}