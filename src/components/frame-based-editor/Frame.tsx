import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FBFrameT, FBTypes } from "../../model/frame-based";
import FBIf from "./frames/FBIf";
import { FBIfT } from '../../model/frame-based';

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

  const [, drop] = useDrop({
    accept: 'FRAME',
    drop: (item: { id: number; index: number; parentID: number } | null) => {
      if (!item) {
        console.log('NO CHANGE');

        return;
      }

      if (item.id === frame.id || item.parentID === frame.id) {
        console.log('NO CHANGE');

        return;
      }
      console.log('CHANGE PARENT');
      console.log('FROM ', item.parentID);
      console.log('TO ', frame.id);

      moveFrame(item.id, item.index, frame.id);
    },
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
      // Add other frame types here
    };

    return frameComponents[frame.type];
  };

  const renderChildren = (frame: FBFrameT) => {
    return frame.children.map((child: FBFrameT, childIndex: number) => {
      return (
        <Frame
          key={child.id}
          frame={child}
          moveFrame={moveFrame}
          index={childIndex}
          parentID={frame.id}
        />
      );
    });
  };

  return (
    <div ref={(node) => drag(drop(node))} className="frame">
      {getCorrectFrameComponent(frame)}
      <div className="child-frame">
        {renderChildren(frame)}
      </div>
    </div>
  );
};

export default Frame;
