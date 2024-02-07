import React from 'react';
import { FBFunctionDefinitionT, FBFrameT } from '../../../model/frame-based'

type FunctionDefinitionFrameProps = {
  frame: FBFunctionDefinitionT
  editFrame: (frame: FBFrameT) => void
}

const mapParametersToInputFields = (parameters: string[]) => {
  return parameters.map((parameter, index) => (
    <React.Fragment key={index + '_param'}>
      <input type="text" value={parameter} />
      {index < parameters.length - 1 && <span>, </span>}
    </React.Fragment>
  ));
};

const FunctionDefinitionFrame = ({ frame, editFrame }: FunctionDefinitionFrameProps) => {

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, name: event.target.value })
  }

  return (
    <div>def <input type="text" value={frame.name} onChange={changeInput} />({mapParametersToInputFields(frame.parameters)})</div>
  )
}

export default FunctionDefinitionFrame;