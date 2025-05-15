import React from "react";
import { StepWrapper } from "./StepWrapper";

type Step4Props = {
    token: string;
    selectedPlaylist: string;
};

export const Step4 = ({token, selectedPlaylist}: Step4Props) => {
    const [numberOfCards, setNumberOfCards] = React.useState<number>(30);

    const onNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfCards(Number(event.target.value))
    }

    const printCards = () => {
        const printableCards = window.frames[0];
        printableCards.print();
    };

    return (
        <StepWrapper>
            <div>
                Step 4
            </div>
            <div>
                <input onChange={onNumberChange} type='number' value={numberOfCards}/>
            </div>
            {!!token && !!selectedPlaylist ? 
            (<div>
                Print the cards
                <button onClick={printCards}>Print Cards</button>
                <iframe
                    title="Printable Cards"
                    name="printable_cards"
                    src={`/printable-cards?token=${token}&playlistID=${selectedPlaylist}&amount=${numberOfCards}`}
                    style={{height: '100vh', width: '100%'}}
                />
            </div>) : null}
        </StepWrapper>
    )
}