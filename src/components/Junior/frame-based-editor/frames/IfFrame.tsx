import { ThunkCreator, ActionCreator } from "easy-peasy";
import { FBIfT, FBFrameT, FrameUpdateDescriptor } from "../../../../model/frame-based"
import { Uuid } from "../../../../model/junior/structured-program";

type IfFrameProps = {
  frame: FBIfT
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const IfFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: IfFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, booleanExpression: event.target.value } })
  }
  return (
    <div>if <input spellCheck={false} type="text" value={frame.booleanExpression} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />:</div>
  )
}

export default IfFrame;