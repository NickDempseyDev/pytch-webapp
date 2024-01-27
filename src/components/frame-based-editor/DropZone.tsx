import React from 'react'
import { useDrop } from 'react-dnd';
import { DropZoneCoordinate } from '../../model/frame-based';


type DropZoneProps = {
	parentId: number;
	index: number;
	moveFrame: (id: number, index: number, newParentId: number) => void;
	applyFocus: (coords: DropZoneCoordinate) => void;
	focusedDropZoneCoords: DropZoneCoordinate;
}

const DropZone: React.FC<DropZoneProps> = ({ index, parentId, moveFrame, applyFocus, focusedDropZoneCoords }) => {
	const [{ isActive }, drop] = useDrop({
		accept: 'FRAME',
		drop: (item: { id: number; index: number; parentID: number } | null) => {
			if (!item) {
				return;
			}

			if ((item.id === parentId || item.parentID === parentId) && item.index === index) {
				return;
			}

			applyFocus({ frameId: parentId, index: index + 1 });
			moveFrame(item.id, index, parentId);
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

		if (focusedDropZoneCoords && focusedDropZoneCoords.frameId === parentId && focusedDropZoneCoords.index === index) {
			name = 'drop-zone-active';
		}

		if (isActive) {
			name = 'drop-zone-hover';
		}

		return name;
	}

	return (
		<div ref={drop} className={`drop-zone ${correctClassName()}`}></div>
	)
}

export default DropZone;