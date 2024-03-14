import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { DropZoneCoordinate, FBFrameT, FocusedDropZoneUpdateDescriptor, FrameDeleteDescriptor, FrameMoveDescriptor, FrameUpdateDescriptor } from "../../../model/frame-based";
import Frame from "./Frame";
import DropZone from './DropZone';
import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { Uuid } from '../../../model/junior/structured-program';

type BaseFrameProps = {
	baseFrame: FBFrameT;
	handlerId: Uuid;
	actorId: Uuid;
	moveFrame: ThunkCreator<FrameMoveDescriptor, any>;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	deleteFrame: ThunkCreator<FrameDeleteDescriptor, any>;
	applyFocus: ActionCreator<FocusedDropZoneUpdateDescriptor>;
	focusedDropZoneCoords: DropZoneCoordinate;
	setIsEditingText: ActionCreator<boolean>;
}

const BaseFrame: React.FC<BaseFrameProps> = ({ handlerId, actorId, baseFrame, moveFrame, deleteFrame, editFrame, applyFocus, focusedDropZoneCoords, setIsEditingText }) => {
	const [, drag] = useDrag({
		type: 'OTHER',
		item: { id: 0 },
	});

	const [, drop] = useDrop({
		accept: 'FRAME',
		drop: (item: { id: number; index: number; parentID: number; fromHandlerId: Uuid } | null) => {
			if (!item) {
				return;
			}

			moveFrame({
				frameId: item.id,
				fromFramePos: {
					parentFrameId: item.id,
					actorId: actorId,
					handlerId: item.fromHandlerId,
					index: item.index
				},
				toFramePos: {
					parentFrameId: baseFrame.id,
					actorId: actorId,
					handlerId: handlerId,
					index: 0
				}
			});
		},
		hover: (item: { id: number; index: number; parentID: number, fromHandlerId: Uuid } | null) => {
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
						handlerId={handlerId}
						actorId={actorId}
						parentId={baseFrame.id}
						index={index}
						moveFrame={moveFrame}
						applyFocus={applyFocus}
						focusedDropZoneCoords={focusedDropZoneCoords}
					/>
					<Frame
						key={frame.id + 'frame'}
						frame={frame}
						handlerId={handlerId}
						actorId={actorId}
						index={index}
						moveFrame={moveFrame}
						editFrame={editFrame}
						deleteFrame={deleteFrame}
						parentID={0} // Set the initial parent ID
						applyFocus={applyFocus}
						focusedDropZoneCoords={focusedDropZoneCoords}
						setIsEditingText={setIsEditingText}
					/>
				</>
			))}
			<DropZone
				key={'00' + 'dropzone'}
				handlerId={handlerId}
				actorId={actorId}
				parentId={baseFrame.id}
				index={baseFrame.children.length}
				moveFrame={moveFrame}
				applyFocus={applyFocus}
				focusedDropZoneCoords={focusedDropZoneCoords}
			/>
		</div>
	)
}

export default BaseFrame;