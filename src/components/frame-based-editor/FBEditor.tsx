import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useStoreActions, useStoreState } from '../../store';
import BaseFrame from './BaseFrame';
import { FBFrameT, getNextCoordUp, getNextCoordDown } from '../../model/frame-based';

const FBEditor: React.FC = () => {

  const { baseFrame } = useStoreState((state) => state.frameBasedEditor);
  const { focusedDropZoneCoords } = useStoreState((state) => state.frameBasedEditor);
  const { moveFrame } = useStoreActions((actions) => actions.frameBasedEditor);
  const { editFrame } = useStoreActions((actions) => actions.frameBasedEditor);
  const { applyFocus } = useStoreActions((actions) => actions.frameBasedEditor);

  const moveFrameToNewParent = (frameId: number, index: number, newParentId: number) => {
    moveFrame({ id: frameId, index, newParentId });
  };

  const editExistingFrame = (frame: FBFrameT) => {
    editFrame(frame);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        const newCoords = getNextCoordUp(baseFrame, focusedDropZoneCoords);
        if (newCoords) {
          applyFocus(newCoords);
        }
        break;
      case "ArrowDown":
        const newCoordsDown = getNextCoordDown(baseFrame, focusedDropZoneCoords);
        if (newCoordsDown) {
          applyFocus(newCoordsDown);
        }
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [focusedDropZoneCoords]);

  return (
    <DndProvider backend={HTML5Backend}>
      <BaseFrame
        baseFrame={baseFrame}
        moveFrame={moveFrameToNewParent}
        editFrame={editExistingFrame}
        applyFocus={applyFocus}
        focusedDropZoneCoords={focusedDropZoneCoords}
      />
    </DndProvider>
  );
};

export default FBEditor;
