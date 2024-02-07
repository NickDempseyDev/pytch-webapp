import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useStoreActions, useStoreState } from '../../store';
import BaseFrame from './BaseFrame';
import {
  FBFrameT,
  getNextCoordUp,
  getNextCoordDown,
  findFrame,
  createIf,
  createWhile,
  createAssignment,
  createClassDefinition,
  createComment,
  createExpression,
  createFor,
  createFunctionCall,
  createFunctionDefinition,
  printCodeRecursive
} from '../../model/frame-based';

const FBEditor: React.FC<{ run: (code: string) => void }> = ({ run }) => {

  const { baseFrame, focusedDropZoneCoords } = useStoreState((state) => state.frameBasedEditor);
  const { moveFrame, editFrame, applyFocus, createNewFrame } = useStoreActions((actions) => actions.frameBasedEditor);

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
      case "i":
        const parentFrame = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrame) {
          const newIf = createIf("", -1, parentFrame?.depth + 1, []);
          createNewFrame({ frame: newIf, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "w":
        const parentFrameWhile = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameWhile) {
          const newWhile = createWhile("", -1, parentFrameWhile?.depth + 1, []);
          createNewFrame({ frame: newWhile, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "a":
        const parentFrameAssignment = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameAssignment) {
          const newAssignment = createAssignment("", "", -1, parentFrameAssignment?.depth + 1);
          createNewFrame({ frame: newAssignment, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "c":
        const parentFrameClass = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameClass) {
          const newClass = createClassDefinition("", [], -1, parentFrameClass?.depth + 1);
          createNewFrame({ frame: newClass, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "/":
        const parentFrameComment = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameComment) {
          const newComment = createComment("", -1, parentFrameComment?.depth + 1);
          createNewFrame({ frame: newComment, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "e":
        const parentFrameExpression = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameExpression) {
          const newExpression = createExpression("", -1, parentFrameExpression?.depth + 1);
          createNewFrame({ frame: newExpression, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "f":
        const parentFrameFor = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameFor) {
          const newFor = createFor("", "", -1, parentFrameFor?.depth + 1, []);
          createNewFrame({ frame: newFor, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "m":
        const parentFrameFunctionCall = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameFunctionCall) {
          const newFunctionCall = createFunctionCall("", [], -1, parentFrameFunctionCall?.depth + 1);
          createNewFrame({ frame: newFunctionCall, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
        }
        break;
      case "d":
        const parentFrameFunctionDefinition = findFrame(baseFrame, focusedDropZoneCoords.frameId);
        if (parentFrameFunctionDefinition) {
          const newFunctionDefinition = createFunctionDefinition("", [], -1, parentFrameFunctionDefinition?.depth + 1);
          createNewFrame({ frame: newFunctionDefinition, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
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
      <div>
        <button onClick={() => {
          const generatedCode = printCodeRecursive(baseFrame)
          console.log(generatedCode);
          run(generatedCode);
        }}>Print Python</button>
      </div>
    </DndProvider>
  );
};

export default FBEditor;
