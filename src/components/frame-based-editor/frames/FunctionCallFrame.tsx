import { FBFunctionCallT, FBFrameT } from '../../../model/frame-based'

type FunctionCallFrameProps = {
  frame: FBFunctionCallT
  editFrame: (frame: FBFrameT) => void
  setIsEditingText: (isEditingText: boolean) => void
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

const FunctionCallFrame = ({ frame, editFrame, setIsEditingText }: FunctionCallFrameProps) => {

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, name: event.target.value })
  }

  return (
    <div><input type="text" value={frame.name} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />({getParameters(frame.parameters)})</div>
  )
}

export default FunctionCallFrame;