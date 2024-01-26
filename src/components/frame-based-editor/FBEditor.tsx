import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useStoreActions, useStoreState } from '../../store';
import BaseFrame from './BaseFrame';

const FBEditor: React.FC = () => {

  const { baseFrame } = useStoreState((state) => state.frameBasedEditor);
  const { moveFrame } = useStoreActions((actions) => actions.frameBasedEditor);

  const moveFrameToNewParent = (frameId: number, index: number, newParentId: number) => {
    moveFrame({ id: frameId, index, newParentId });
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <BaseFrame baseFrame={baseFrame} moveFrame={moveFrameToNewParent} />
    </DndProvider>
  );
};

export default FBEditor;
