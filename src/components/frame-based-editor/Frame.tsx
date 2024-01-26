import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FBFrameT, FBTypes } from "../../model/frame-based";
import FBIf from "./frames/FBIf";
import { FBIfT } from '../../model/frame-based';
import DropZone from './DropZone';

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
      [FBTypes.IF]: <FBIf frame={frame as FBIfT} />,
      [FBTypes.WHILE]: <div></div>,
      [FBTypes.FOR]: <div></div>,
      [FBTypes.ASSIGNMENT]: <div></div>,
      [FBTypes.CLASS_DEFINITION]: <div></div>,
      [FBTypes.COMMENT]: <div></div>,
      [FBTypes.EXPRESSION]: <div></div>,
      [FBTypes.FUNCTION_CALL]: <div></div>,
      [FBTypes.FUNCTION_DEFINITION]: <div></div>,
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
