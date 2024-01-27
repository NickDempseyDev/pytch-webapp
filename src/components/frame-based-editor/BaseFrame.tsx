import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop, useDrag } from 'react-dnd';
import { FBFrameT } from "../../model/frame-based";
import Frame from "./Frame";
import DropZone from './DropZone';

type BaseFrameProps = {
	baseFrame: FBFrameT;
	moveFrame: (id: number, index: number, newParentId: number) => void;
}

const BaseFrame: React.FC<BaseFrameProps> = ({ baseFrame, moveFrame }) => {
	const [, drag] = useDrag({
		type: 'OTHER',
		item: { id: 0 },
	});

	const [, drop] = useDrop({
		accept: 'FRAME',
		drop: (item: { id: number; index: number; parentID: number } | null) => {
			if (!item) {
				return;
			}

			moveFrame(item.id, item.index, 0);
		},
		hover: (item: { id: number; index: number; parentID: number } | null) => {
			if (!item) {
				return;
			}
		}
	});

	return (
		<div className="frames-container">
			{baseFrame.children.map((frame: FBFrameT, index: number) => (
				<>
					<DropZone
						key={frame.id + 'dropzone'}
						parentId={0}
						index={index}
						moveFrame={moveFrame}
					/>
					<Frame
						key={frame.id + 'frame'}
						frame={frame}
						index={index}
						moveFrame={moveFrame}
						parentID={0} // Set the initial parent ID
					/>
				</>
			))}
			<DropZone
				key={'00' + 'dropzone'}
				parentId={0}
				index={baseFrame.children.length}
				moveFrame={moveFrame}
			/>
		</div>
	)
}

export default BaseFrame;