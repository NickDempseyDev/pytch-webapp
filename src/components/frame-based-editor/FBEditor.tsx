import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FBFrameT } from "../../model/frame-based";
import { useStoreActions, useStoreState } from '../../store';
import Frame from "./Frame";

const FBEditor: React.FC = () => {
  const { baseFrame } = useStoreState((state) => state.frameBasedEditor);
  const { moveFrame } = useStoreActions((actions) => actions.frameBasedEditor);

  const moveFrameToNewParent = (frameId: number, index: number, newParentId: number) => {
    console.log(`Moving frame ${frameId} to new parent ${newParentId}`);

    moveFrame({ id: frameId, index, newParentId });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="frames-container">
        {baseFrame.children.map((frame: FBFrameT, index: number) => (
          <Frame
            key={frame.id}
            frame={frame}
            index={index}
            moveFrame={moveFrameToNewParent}
            parentID={0} // Set the initial parent ID
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default FBEditor;
