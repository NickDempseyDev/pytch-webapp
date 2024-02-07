import { FBFunctionCallT, FBFrameT } from '../../../model/frame-based'

type FunctionCallFrameProps = {
  frame: FBFunctionCallT
  editFrame: (frame: FBFrameT) => void
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

const FunctionCallFrame = ({ frame, editFrame }: FunctionCallFrameProps) => {

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, name: event.target.value })
  }

  return (
    <div><input type="text" value={frame.name} onChange={changeInput} />({getParameters(frame.parameters)})</div>
  )
}

export default FunctionCallFrame;