import React from 'react'
import { useDrop } from 'react-dnd';
import { DropZoneCoordinate, FocusedDropZoneUpdateDescriptor, FrameMoveDescriptor } from '../../../model/frame-based';
import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { Uuid } from '../../../model/junior/structured-program';
import { useStoreActions } from '../../../store';

type DropZoneProps = {
	parentId: number;
	handlerId: Uuid;
	actorId: Uuid;
	index: number;
	moveFrame: ThunkCreator<FrameMoveDescriptor, any>;
	applyFocus: ActionCreator<FocusedDropZoneUpdateDescriptor>;
	focusedDropZoneCoords: DropZoneCoordinate;
}

const DropZone: React.FC<DropZoneProps> = ({ index, parentId, handlerId, actorId, moveFrame, applyFocus, focusedDropZoneCoords }) => {
	const setFocusedDropDownCoords = useStoreActions(actions => actions.activeProject.setFocusedDropDownCoords);
	const [isHovered, setIsHovered] = React.useState(false);
	const [{ isActive }, drop] = useDrop({
		accept: 'FRAME',
		drop: (item: { id: number; index: number; parentID: number, fromHandlerId: Uuid } | null) => {
			if (!item) {
				return;
			}

			if ((item.id === parentId || item.parentID === parentId) && item.index === index) {
				return;
			}

			applyFocus({ newDropZone: { handlerId, frameId: parentId, index: index + 1 }, actorId });
			// applyFocus({ frameId: parentId, index: index + 1 });
			// item.id frame to move
			console.log({
				frameId: item.id,
				fromFramePos: {
					parentFrameId: item.id,
					actorId: actorId,
					handlerId: item.fromHandlerId,
					index: item.index
				},
				toFramePos: {
					parentFrameId: parentId,
					actorId: actorId,
					handlerId: handlerId,
					index: index
				}
			});

			moveFrame({
				frameId: item.id,
				fromFramePos: {
					parentFrameId: item.id,
					actorId: actorId,
					handlerId: item.fromHandlerId,
					index: item.index
				},
				toFramePos: {
					parentFrameId: parentId,
					actorId: actorId,
					handlerId: handlerId,
					index: index
				}
			});
			// moveFrame(item.id, index, parentId);
		},
		collect(monitor) {
			return {
				isActive: monitor.isOver({ shallow: true }) && monitor.canDrop(),
			}
		},
		// canDrop: (item: { id: number; index: number; parentID: number } | null) => {
		// 	// if (!item) {
		// 	// 	return false;
		// 	// }

		// 	// if (item.id === parentId || item.parentID === parentId) {
		// 	// 	return false;
		// 	// }

		// 	// return true;
		// }
	});

	const correctClassName = () => {
		let name = '';

		if (focusedDropZoneCoords &&
			focusedDropZoneCoords.frameId === parentId &&
			focusedDropZoneCoords.index === index &&
			focusedDropZoneCoords.handlerId === handlerId) {
			name = 'drop-zone-active';
		}

		if (isActive) {
			name = 'drop-zone-hover';
		}

		if (isHovered && !isActive) {
			name = 'drop-zone-mouseover';
		}

		return name;
	}

	const setFocus = () => {
		setFocusedDropDownCoords({ actorId, newDropZone: { handlerId, frameId: parentId, index } });
	}

	return (
		<div ref={drop} onClick={() => setFocus()} onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} className={`drop-zone ${correctClassName()}`}></div>
	)
}

export default DropZone;