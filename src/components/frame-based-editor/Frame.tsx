import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FBFrameT, FBTypes, FBWhileT, FBForT, FBAssignmentT, FBClassDefinitionT, FBCommentT, FBExpressionT, FBFunctionCallT, FBFunctionDefinitionT, DropZoneCoordinate } from "../../model/frame-based";
import IfFrame from './frames/IfFrame';
import { FBIfT } from '../../model/frame-based';
import DropZone from './DropZone';
import WhileFrame from './frames/WhileFrame';
import ForFrame from './frames/ForFrame';
import AssignmentFrame from './frames/AssignmentFrame';
import ClassDefinitionFrame from './frames/ClassDefinitionFrame';
import CommentFrame from './frames/CommentFrame';
import ExpressionFrame from './frames/ExpressionFrame';
import FunctionCallFrame from './frames/FunctionCallFrame';
import FunctionDefinitionFrame from './frames/FunctionDefinitionFrame';

type FrameProps = {
  frame: FBFrameT;
  moveFrame: (id: number, index: number, newParentId: number) => void;
  editFrame: (frame: FBFrameT) => void;
  index: number;
  parentID: number;
  applyFocus: (coords: DropZoneCoordinate) => void;
  focusedDropZoneCoords: DropZoneCoordinate;
  setIsEditingText: (isEditingText: boolean) => void;
};

const Frame: React.FC<FrameProps> = ({ frame, moveFrame, editFrame, index, parentID, applyFocus, focusedDropZoneCoords, setIsEditingText }) => {
  const [, drag] = useDrag({
    type: 'FRAME',
    item: { id: frame.id, index, parentID },
  });


  const getCorrectFrameComponent = (frame: FBFrameT) => {
    const frameComponents = {
      [FBTypes.IF]: <IfFrame frame={frame as FBIfT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.WHILE]: <WhileFrame frame={frame as FBWhileT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.FOR]: <ForFrame frame={frame as FBForT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.ASSIGNMENT]: <AssignmentFrame frame={frame as FBAssignmentT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.CLASS_DEFINITION]: <ClassDefinitionFrame frame={frame as FBClassDefinitionT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.COMMENT]: <CommentFrame frame={frame as FBCommentT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.EXPRESSION]: <ExpressionFrame frame={frame as FBExpressionT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.FUNCTION_CALL]: <FunctionCallFrame frame={frame as FBFunctionCallT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.FUNCTION_DEFINITION]: <FunctionDefinitionFrame frame={frame as FBFunctionDefinitionT} editFrame={editFrame} setIsEditingText={setIsEditingText} />,
      [FBTypes.NOP]: <div></div>
    };

    return frameComponents[frame.type];
  };

  const renderChildren = (frame: FBFrameT) => {
    return <>
      {frame.children.map((child: FBFrameT, childIndex: number) => {
        return (
          <>
            <DropZone
              key={child.id + 'dropzone'}
              parentId={frame.id}
              index={childIndex}
              moveFrame={moveFrame}
              applyFocus={applyFocus}
              focusedDropZoneCoords={focusedDropZoneCoords}
            />
            <Frame
              key={child.id + 'frame'}
              frame={child}
              moveFrame={moveFrame}
              editFrame={editFrame}
              index={childIndex}
              parentID={frame.id}
              applyFocus={applyFocus}
              focusedDropZoneCoords={focusedDropZoneCoords}
              setIsEditingText={setIsEditingText}
            />
          </>
        );
      })}
      {frame.canHaveChildren && <DropZone
        key={frame.id + 'dropzone'}
        parentId={frame.id}
        index={frame.children.length}
        moveFrame={moveFrame}
        applyFocus={applyFocus}
        focusedDropZoneCoords={focusedDropZoneCoords}
      />}
    </>
  };

  return (
    <div ref={drag} className={`frame dep-${frame.depth}`}>
      {getCorrectFrameComponent(frame)}
      {frame.canHaveChildren &&
        <div className={`child-frame`}>
          {renderChildren(frame)}
        </div>}
    </div>
  );
};

export default Frame;
