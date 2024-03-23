import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBAssignmentT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { Uuid } from '../../../../model/junior/structured-program';

type AssignmentFrameProps = {
  frame: FBAssignmentT;
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const AssignmentFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: AssignmentFrameProps) => {
  const changeVariableInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, variable: event.target.value } })
  }

  const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, value: event.target.value } })
  }

  return (
    <div>
      <input spellCheck={false} type="text" value={frame.variable} onChange={changeVariableInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />
      =
      <input spellCheck={false} type="text" value={frame.value} onChange={changeValueInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />
    </div>
  )
}

export default AssignmentFrame;