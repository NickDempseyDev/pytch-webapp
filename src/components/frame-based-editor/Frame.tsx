import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FBFrameT, FBTypes, FBWhileT, FBForT, FBAssignmentT, FBClassDefinitionT, FBCommentT, FBExpressionT, FBFunctionCallT, FBFunctionDefinitionT } from "../../model/frame-based";
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
  index: number;
  parentID: number;
};

const Frame: React.FC<FrameProps> = ({ frame, moveFrame, index, parentID }) => {
  const [, drag] = useDrag({
    type: 'FRAME',
    item: { id: frame.id, index, parentID },
  });


  const getCorrectFrameComponent = (frame: FBFrameT) => {
    const frameComponents = {
      [FBTypes.IF]: <IfFrame frame={frame as FBIfT} />,
      [FBTypes.WHILE]: <WhileFrame frame={frame as FBWhileT} />,
      [FBTypes.FOR]: <ForFrame frame={frame as FBForT} />,
      [FBTypes.ASSIGNMENT]: <AssignmentFrame frame={frame as FBAssignmentT} />,
      [FBTypes.CLASS_DEFINITION]: <ClassDefinitionFrame frame={frame as FBClassDefinitionT} />,
      [FBTypes.COMMENT]: <CommentFrame frame={frame as FBCommentT} />,
      [FBTypes.EXPRESSION]: <ExpressionFrame frame={frame as FBExpressionT} />,
      [FBTypes.FUNCTION_CALL]: <FunctionCallFrame frame={frame as FBFunctionCallT} />,
      [FBTypes.FUNCTION_DEFINITION]: <FunctionDefinitionFrame frame={frame as FBFunctionDefinitionT} />,
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
            />
            <Frame
              key={child.id + 'frame'}
              frame={child}
              moveFrame={moveFrame}
              index={childIndex}
              parentID={frame.id}
            />
          </>
        );
      })}
      <DropZone
        key={frame.id + 'dropzone'}
        parentId={frame.id}
        index={frame.children.length}
        moveFrame={moveFrame}
      />
    </>
  };

  return (
    <div ref={drag} className={`frame dep-${frame.depth}`}>
      {getCorrectFrameComponent(frame)}
      <div className={`child-frame`}>
        {renderChildren(frame)}
      </div>
    </div>
  );
};

export default Frame;
