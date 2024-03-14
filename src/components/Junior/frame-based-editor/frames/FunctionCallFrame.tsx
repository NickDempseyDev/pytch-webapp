import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBFunctionCallT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { Uuid } from '../../../../model/junior/structured-program';

type FunctionCallFrameProps = {
  frame: FBFunctionCallT
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const getParameters = (parameters: string[]) => {
  let result = '';

  for (let i = 0; i < parameters.length; i++) {
    result += parameters[i];

    if (i !== parameters.length - 1) {
      result += ', ';
    }
  }

  return result;
}

const FunctionCallFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: FunctionCallFrameProps) => {

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, name: event.target.value } })
  }

  return (
    <div><input type="text" value={frame.name} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />({getParameters(frame.parameters)})</div>
  )
}

export default FunctionCallFrame;