import React from 'react';
import { FBClassDefinitionT, FBFrameT } from '../../../model/frame-based'

type ClassDefinitionFrameProps = {
  frame: FBClassDefinitionT
  editFrame: (frame: FBFrameT) => void
  setIsEditingText: (isEditingText: boolean) => void
}

const mapParametersToInputFields = (parameters: string[], setIsEditingText: (isEditingText: boolean) => void) => {
  return parameters.map((parameter, index) => (
    <React.Fragment key={index + '_param'}>
      <input type="text" value={parameter} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />
      {index < parameters.length - 1 && <span>, </span>}
    </React.Fragment>
  ));
};

const ClassDefinitionFrame = ({ frame, editFrame, setIsEditingText }: ClassDefinitionFrameProps) => {
  return (
    <div>def <input type="text" value={frame.name} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />({mapParametersToInputFields(frame.parameters, setIsEditingText)}):</div>
  )
}

export default ClassDefinitionFrame;