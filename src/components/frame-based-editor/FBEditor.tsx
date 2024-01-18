import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FBFrameT } from "../../model/frame-based";
import Frame from "./Frame";

type FBEditorProps = {
  frames: FBFrameT[];
};

const FBEditor: React.FC<FBEditorProps> = (props) => {
  const moveFrame = (dragIndex: number, hoverIndex: number) => {
    // Implement your logic to update the state with the new parent and order of frames
    // You might want to use the same global state mechanism you mentioned
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="frames-container">
        {props.frames.map((frame: FBFrameT, index: number) => (
          <Frame
            key={frame.id}
            frame={frame}
            index={index}
            moveFrame={moveFrame}
            parentID={0} // Set the initial parent ID
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default FBEditor;
