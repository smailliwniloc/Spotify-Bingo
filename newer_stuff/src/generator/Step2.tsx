import { Button } from "../components/Button";
import { StepWrapper } from "./StepWrapper"

type Step2Props = {
    requestAccess: () => Promise<void>;
}

export const Step2 = ({requestAccess}: Step2Props) => {
    return (
        <StepWrapper>
            <div>
            Step 2
            </div>
            <div>
                <Button onClick={requestAccess} title="Get All Playlists"/>
            </div>
        </StepWrapper>
    )
}