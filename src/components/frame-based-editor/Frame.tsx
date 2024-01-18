// import { FBFrameT, FBIfT, FBTypes } from "../../model/frame-based"
// import FBIf from "./frames/FBIf"

// type FrameProps = {
// 	frame: FBFrameT
// }

// const getCorrectFrameComponent = (frame: FBFrameT) => {
// 	const frameComponents = {
// 		[FBTypes.IF]: <FBIf frame={frame as FBIfT} />,
// 		[FBTypes.WHILE]: <div></div>,
// 		[FBTypes.FOR]: <div></div>,
// 		[FBTypes.ASSIGNMENT]: <div></div>,
// 		[FBTypes.CLASS_DEFINITION]: <div></div>,
// 		[FBTypes.COMMENT]: <div></div>,
// 		[FBTypes.EXPRESSION]: <div></div>,
// 		[FBTypes.FUNCTION_CALL]: <div></div>,
// 		[FBTypes.FUNCTION_DEFINITION]: <div></div>,
// 		[FBTypes.NOP]: <div></div>
// 	}

// 	return frameComponents[frame.type]
// }

// const renderChildren = (frame: FBFrameT) => {
// 	return frame.children.map((child: FBFrameT) => {
// 		return Frame({ frame: child })
// 	})
// }

// const Frame = (props: FrameProps) => {
// 	return (
// 		<div className="frame">
// 			{getCorrectFrameComponent(props.frame)}
// 			<div className="child-frame">
// 				{renderChildren(props.frame)}
// 			</div>
// 		</div>
// 	)
// }

// export default Frame

import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FBFrameT, FBTypes } from "../../model/frame-based";
import FBIf from "./frames/FBIf";
import { FBIfT } from '../../model/frame-based';

type FrameProps = {
  frame: FBFrameT;
  moveFrame: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  parentID: number;
};

const Frame: React.FC<FrameProps> = ({ frame, moveFrame, index, parentID }) => {
  const [, drag, preview] = useDrag({
    type: 'FRAME',
    item: { id: frame.id, index, parentID },
  });

  const [, drop] = useDrop({
    accept: 'FRAME',
    hover: (item: { id: number; index: number; parentID: number } | null) => {
      if (!item) {
        return;
      }

      if (item.id === frame.id || item.parentID === frame.id) {
        return;
      }

      moveFrame(item.index, index);
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
