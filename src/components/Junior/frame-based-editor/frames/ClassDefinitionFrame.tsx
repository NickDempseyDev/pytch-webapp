import React from 'react';
import { FBClassDefinitionT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { Uuid } from '../../../../model/junior/structured-program';

type ClassDefinitionFrameProps = {
  frame: FBClassDefinitionT
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
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