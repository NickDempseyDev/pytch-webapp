import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrop, useDrag } from 'react-dnd';
import { DropZoneCoordinate, FBFrameT } from "../../model/frame-based";
import Frame from "./Frame";
import DropZone from './DropZone';

type BaseFrameProps = {
	baseFrame: FBFrameT;
	moveFrame: (id: number, index: number, newParentId: number) => void;
	editFrame: (frame: FBFrameT) => void;
	applyFocus: (coords: DropZoneCoordinate) => void;
	focusedDropZoneCoords: DropZoneCoordinate;
	setIsEditingText: (isEditingText: boolean) => void;
}

const BaseFrame: React.FC<BaseFrameProps> = ({ baseFrame, moveFrame, editFrame, applyFocus, focusedDropZoneCoords, setIsEditingText }) => {
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
						applyFocus={applyFocus}
						focusedDropZoneCoords={focusedDropZoneCoords}
					/>
					<Frame
						key={frame.id + 'frame'}
						frame={frame}
						index={index}
						moveFrame={moveFrame}
						editFrame={editFrame}
						parentID={0} // Set the initial parent ID
						applyFocus={applyFocus}
						focusedDropZoneCoords={focusedDropZoneCoords}
						setIsEditingText={setIsEditingText}
					/>
				</>
			))}
			<DropZone
				key={'00' + 'dropzone'}
				parentId={0}
				index={baseFrame.children.length}
				moveFrame={moveFrame}
				applyFocus={applyFocus}
				focusedDropZoneCoords={focusedDropZoneCoords}
			/>
		</div>
	)
}

export default BaseFrame;