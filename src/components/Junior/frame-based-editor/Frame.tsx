import React from 'react';
import { useDrag } from 'react-dnd';
import { FBFrameT, FBTypes, FBWhileT, FBForT, FBAssignmentT, FBClassDefinitionT, FBCommentT, FBExpressionT, FBFunctionCallT, FBFunctionDefinitionT, DropZoneCoordinate, FocusedDropZoneUpdateDescriptor, FrameMoveDescriptor, FrameUpdateDescriptor, FrameDeleteDescriptor } from "../../../model/frame-based";
import IfFrame from './frames/IfFrame';
import { FBIfT } from '../../../model/frame-based';
import DropZone from './DropZone';
import WhileFrame from './frames/WhileFrame';
import ForFrame from './frames/ForFrame';
import AssignmentFrame from './frames/AssignmentFrame';
import ClassDefinitionFrame from './frames/ClassDefinitionFrame';
import CommentFrame from './frames/CommentFrame';
import ExpressionFrame from './frames/ExpressionFrame';
import FunctionCallFrame from './frames/FunctionCallFrame';
import FunctionDefinitionFrame from './frames/FunctionDefinitionFrame';
import { Uuid } from '../../../model/junior/structured-program';
import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { CloseButton } from 'react-bootstrap';

type FrameProps = {
  frame: FBFrameT;
  index: number;
  parentID: number;
  moveFrame: ThunkCreator<FrameMoveDescriptor, any>;
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  deleteFrame: ThunkCreator<FrameDeleteDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
  applyFocus: ActionCreator<FocusedDropZoneUpdateDescriptor>;
  focusedDropZoneCoords: DropZoneCoordinate;
};

const Frame: React.FC<FrameProps> = ({ actorId, handlerId, frame, moveFrame, editFrame, deleteFrame, index, parentID, applyFocus, focusedDropZoneCoords, setIsEditingText }) => {

  const [, drag] = useDrag({
    type: 'FRAME',
    item: { id: frame.id, index, parentID, fromHandlerId: handlerId },
  });


  const getCorrectFrameComponent = (frame: FBFrameT) => {
    const frameComponents = {
      [FBTypes.IF]: <IfFrame frame={frame as FBIfT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.WHILE]: <WhileFrame frame={frame as FBWhileT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.FOR]: <ForFrame frame={frame as FBForT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.ASSIGNMENT]: <AssignmentFrame frame={frame as FBAssignmentT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.CLASS_DEFINITION]: <ClassDefinitionFrame frame={frame as FBClassDefinitionT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.COMMENT]: <CommentFrame frame={frame as FBCommentT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.EXPRESSION]: <ExpressionFrame frame={frame as FBExpressionT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.FUNCTION_CALL]: <FunctionCallFrame frame={frame as FBFunctionCallT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
      [FBTypes.FUNCTION_DEFINITION]: <FunctionDefinitionFrame frame={frame as FBFunctionDefinitionT} editFrame={editFrame} setIsEditingText={setIsEditingText} actorId={actorId} handlerId={handlerId} />,
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
              handlerId={handlerId}
              actorId={actorId}
              parentId={frame.id}
              index={childIndex}
              moveFrame={moveFrame}
              applyFocus={applyFocus}
              focusedDropZoneCoords={focusedDropZoneCoords}
            />
            <Frame
              key={child.id + 'frame'}
              handlerId={handlerId}
              actorId={actorId}
              frame={child}
              moveFrame={moveFrame}
              editFrame={editFrame}
              deleteFrame={deleteFrame}
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
        handlerId={handlerId}
        actorId={actorId}
        key={frame.id + 'dropzone'}
        parentId={frame.id}
        index={frame.children.length}
        moveFrame={moveFrame}
        applyFocus={applyFocus}
        focusedDropZoneCoords={focusedDropZoneCoords}
      />}
    </>
  };

  const removeFrame = () => {
    deleteFrame({ frameId: frame.id, actorId, handlerId });
  }

  return (
    <div ref={drag} className={`frame dep-${frame.depth}`}>
      <div className='frame-delete-container'>
        {getCorrectFrameComponent(frame)}
        <CloseButton onClick={() => removeFrame()} />
      </div>
      {frame.canHaveChildren &&
        <div className={`child-frame`}>
          {renderChildren(frame)}
        </div>}
    </div>
  );
};

export default Frame;
