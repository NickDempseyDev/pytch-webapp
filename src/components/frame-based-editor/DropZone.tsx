import React from 'react'
import { useDrop } from 'react-dnd';


type DropZoneProps = {
	parentId: number;
	index: number;
	moveFrame: (id: number, index: number, newParentId: number) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ index, parentId, moveFrame }) => {
	const [{ isActive }, drop] = useDrop({
		accept: 'FRAME',
		drop: (item: { id: number; index: number; parentID: number } | null) => {
			if (!item) {
				return;
			}

			if ((item.id === parentId || item.parentID === parentId) && item.index === index) {
				return;
			}

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

	return (
		<div ref={drop} className={`drop-zone ${isActive ? 'drop-zone-active' : ''}`}></div>
	)
}

export default DropZone;