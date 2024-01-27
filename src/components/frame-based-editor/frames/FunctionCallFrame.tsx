import { FBFunctionCallT } from '../../../model/frame-based'

type FunctionCallFrameProps = {
  frame: FBFunctionCallT
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

const FunctionCallFrame = ({ frame }: FunctionCallFrameProps) => {
  return (
    <div><input type="text" value={frame.name} />({getParameters(frame.parameters)})</div>
  )
}

export default FunctionCallFrame;