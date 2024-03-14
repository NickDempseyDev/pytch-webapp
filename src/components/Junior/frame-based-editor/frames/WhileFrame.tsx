import { ActionCreator, ThunkCreator } from 'easy-peasy';
import { FBWhileT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { Uuid } from '../../../../model/junior/structured-program';

type WhileFrameProps = {
  frame: FBWhileT
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const WhileFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: WhileFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, booleanExpression: event.target.value } })
  }

  return (
    <div>while <input type="text" value={frame.booleanExpression} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />:</div>
  )
}

export default WhileFrame;