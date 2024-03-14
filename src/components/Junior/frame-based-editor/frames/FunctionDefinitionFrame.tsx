import React from 'react';
import { FBFunctionDefinitionT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { Uuid } from '../../../../model/junior/structured-program';

type FunctionDefinitionFrameProps = {
  frame: FBFunctionDefinitionT
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const mapParametersToInputFields = (parameters: string[]) => {
  return parameters.map((parameter, index) => (
    <React.Fragment key={index + '_param'}>
      <input type="text" value={parameter} />
      {index < parameters.length - 1 && <span>, </span>}
    </React.Fragment>
  ));
};

const FunctionDefinitionFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: FunctionDefinitionFrameProps) => {

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, name: event.target.value } })
  }

  return (
    <div>def <input type="text" value={frame.name} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />({mapParametersToInputFields(frame.parameters)})</div>
  )
}

export default FunctionDefinitionFrame;