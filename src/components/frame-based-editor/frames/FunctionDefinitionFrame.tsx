import React from 'react';
import { FBFunctionDefinitionT } from '../../../model/frame-based'

type FunctionDefinitionFrameProps = {
  frame: FBFunctionDefinitionT
}

const mapParametersToInputFields = (parameters: string[]) => {
  return parameters.map((parameter, index) => (
    <React.Fragment key={index + '_param'}>
      <input type="text" value={parameter} />
      {index < parameters.length - 1 && <span>, </span>}
    </React.Fragment>
  ));
};

const FunctionDefinitionFrame = ({ frame }: FunctionDefinitionFrameProps) => {
  return (
    <div>def <input type="text" value={frame.name} />({mapParametersToInputFields(frame.parameters)})</div>
  )
}

export default FunctionDefinitionFrame;