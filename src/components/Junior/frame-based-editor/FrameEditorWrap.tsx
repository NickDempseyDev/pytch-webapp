import { Actor, ActorOps, Uuid } from "../../../model/junior/structured-program"
import { useStoreState, useStoreActions } from "../../../store"
import { useFramesProgram } from "../hooks"
import {
	FBFrameT,
	createIf,
	createWhile,
	createAssignment,
	createClassDefinition,
	createComment,
	createExpression,
	createFor,
	createFunctionCall,
	createFunctionDefinition,
	findFrame,
} from "../../../model/frame-based"

import { FrameBasedStructuredProgramOps } from "../../../model/frame-based"
import { useEffect } from "react"

type FrameEditorWrapProps = {
	focusedActorId: Uuid
}

const FrameEditorWrap = (props: FrameEditorWrapProps) => {
	const { focusedActorId } = props
	const framesProgram = useFramesProgram()
	const focusedActor = framesProgram.actors.find((actor) => actor.id === focusedActorId) as Actor
	const focusedHandler = ActorOps.handlerById(focusedActor, focusedActor.currentlyFocusedDropzone.handlerId)
	const isEditing = focusedActor.isEditingText;
	const focusedDropZoneCoords = focusedActor.currentlyFocusedDropzone;

	const _moveFrame = useStoreActions((actions) => actions.activeProject.moveFrame)
	const _deleteFrame = useStoreActions((actions) => actions.activeProject.deleteFrame)
	const _createFrame = useStoreActions((actions) => actions.activeProject.createFrame)
	const _setFocusedDropDownCoords = useStoreActions((actions) => actions.activeProject.setFocusedDropDownCoords)

	const handleKeyDown = (e: KeyboardEvent, isEditing: boolean) => {
		if (!isEditing) {
			switch (e.key) {
				case "ArrowUp":
					const newCoords = FrameBasedStructuredProgramOps.getNextCoordDown(framesProgram, focusedDropZoneCoords, focusedActorId);
					if (newCoords) {
						_setFocusedDropDownCoords({ actorId: focusedActorId, newDropZone: newCoords });
					}
					break;
				case "ArrowDown":
					const newCoordsDown = FrameBasedStructuredProgramOps.getNextCoordDown(framesProgram, focusedDropZoneCoords, focusedActorId);
					if (newCoordsDown) {
						_setFocusedDropDownCoords({ actorId: focusedActorId, newDropZone: newCoordsDown });
					}
					break;
				case "i":
					const parentFrame = findFrame(focusedHandler.baseFrame, focusedDropZoneCoords.frameId);
					if (parentFrame) {
						const newIf = createIf("", -1, parentFrame?.depth + 1, []);
						_createFrame({
							newFrame: newIf,
							parentId: focusedDropZoneCoords.frameId,
							index: focusedDropZoneCoords.index,
							handlerId: focusedHandler.id,
							actorId: focusedActorId
						});
					}
					break;
				// case "w":
				// 	const parentFrameWhile = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameWhile) {
				// 		const newWhile = createWhile("", -1, parentFrameWhile?.depth + 1, []);
				// 		createNewFrame({ frame: newWhile, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				// case "a":
				// 	const parentFrameAssignment = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameAssignment) {
				// 		const newAssignment = createAssignment("", "", -1, parentFrameAssignment?.depth + 1);
				// 		createNewFrame({ frame: newAssignment, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				// case "c":
				// 	const parentFrameClass = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameClass) {
				// 		const newClass = createClassDefinition("", [], -1, parentFrameClass?.depth + 1);
				// 		createNewFrame({ frame: newClass, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				// case "/":
				// 	const parentFrameComment = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameComment) {
				// 		const newComment = createComment("", -1, parentFrameComment?.depth + 1);
				// 		createNewFrame({ frame: newComment, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				// case "e":
				// 	const parentFrameExpression = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameExpression) {
				// 		const newExpression = createExpression("", -1, parentFrameExpression?.depth + 1);
				// 		createNewFrame({ frame: newExpression, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				// case "f":
				// 	const parentFrameFor = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameFor) {
				// 		const newFor = createFor("", "", -1, parentFrameFor?.depth + 1, []);
				// 		createNewFrame({ frame: newFor, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				// case "m":
				// 	const parentFrameFunctionCall = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameFunctionCall) {
				// 		const newFunctionCall = createFunctionCall("", [], -1, parentFrameFunctionCall?.depth + 1);
				// 		createNewFrame({ frame: newFunctionCall, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				// case "d":
				// 	const parentFrameFunctionDefinition = findFrame(baseFrame, focusedDropZoneCoords.frameId);
				// 	if (parentFrameFunctionDefinition) {
				// 		const newFunctionDefinition = createFunctionDefinition("", [], -1, parentFrameFunctionDefinition?.depth + 1);
				// 		createNewFrame({ frame: newFunctionDefinition, parentId: focusedDropZoneCoords.frameId, index: focusedDropZoneCoords.index });
				// 	}
				// 	break;
				default:
					break;
			}
		}
	};

	useEffect(() => {
		const handleKeyDownWrapper = (e: KeyboardEvent) => handleKeyDown(e, isEditing);
		window.addEventListener("keydown", handleKeyDownWrapper);

		return () => {
			window.removeEventListener("keydown", handleKeyDownWrapper);
		}
	}, [focusedDropZoneCoords, isEditing]);

	return (
		<div>FrameEditorWrap</div>
	)
}

export default FrameEditorWrap;