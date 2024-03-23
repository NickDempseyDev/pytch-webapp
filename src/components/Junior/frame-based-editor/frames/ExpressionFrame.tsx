import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBExpressionT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { Uuid } from '../../../../model/junior/structured-program';

type ExpressionFrameProps = {
  frame: FBExpressionT;
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const ExpressionFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: ExpressionFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, text: event.target.value } })
  }
  return (
    <input spellCheck={false} className='expression-input' type="text" value={frame.text} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />
  )
}

export default ExpressionFrame;