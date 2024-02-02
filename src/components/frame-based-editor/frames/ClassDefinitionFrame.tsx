import React from 'react';
import { FBClassDefinitionT, FBFrameT } from '../../../model/frame-based'

type ClassDefinitionFrameProps = {
  frame: FBClassDefinitionT
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

const ClassDefinitionFrame = ({ frame, editFrame }: ClassDefinitionFrameProps) => {
  return (
    <div>def <input type="text" value={frame.name} />({mapParametersToInputFields(frame.parameters)}):</div>
  )
}

export default ClassDefinitionFrame;