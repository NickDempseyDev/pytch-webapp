import { ActorOps, StructuredProgram, StructuredProgramOps, Uuid } from "./junior/structured-program";


export enum FBTypes {
	NOP,
	IF,
	WHILE,
	FOR,
	EXPRESSION,
	ASSIGNMENT,
	COMMENT,
	FUNCTION_DEFINITION,
	FUNCTION_CALL,
	CLASS_DEFINITION,
}

type FBBaseFrameT = {
	type: FBTypes;
	id: number;
	depth: number;
	canHaveChildren: boolean;
	children: FBFrameT[];
	hasFocus: boolean;
}

export type FBNOPT = FBBaseFrameT;

export type FBExpressionT = {
	text: string;
} & FBBaseFrameT;

export type FBIfT = {
	booleanExpression: string;
} & FBBaseFrameT;

export type FBWhileT = {
	booleanExpression: string;
} & FBBaseFrameT;

export type FBForT = {
	iterator: string;
	collection: string;
} & FBBaseFrameT;

export type FBAssignmentT = {
	variable: string;
	value: string;
} & FBBaseFrameT;

export type FBCommentT = {
	text: string;
} & FBBaseFrameT;

export type FBFunctionDefinitionT = {
	name: string;
	parameters: string[];
} & FBBaseFrameT;

export type FBFunctionCallT = {
	name: string;
	parameters: string[];
} & FBBaseFrameT;

export type FBClassDefinitionT = {
	name: string;
	parameters: string[];
} & FBBaseFrameT;

export type FBPytchKeyPressedT = {
	key: string;
} & FBBaseFrameT;

export type FBPytchChangeXT = {
	amount: number;
} & FBBaseFrameT;

export type FBPytchChangeYT = {
	amount: number;
} & FBBaseFrameT;

export type FBPytchGoToT = {
	x: number;
	y: number;
} & FBBaseFrameT;

export type FBPytchShowT = {
} & FBBaseFrameT;

export type FBPytchHideT = {
} & FBBaseFrameT;

export type FBPytchTouchingT = {
	object: string;
} & FBBaseFrameT;

export type FBPytchBroadcastT = {
	message: string;
} & FBBaseFrameT;

export type FBPytchYPosT = {
} & FBBaseFrameT;

export type FBPytchXPosT = {
} & FBBaseFrameT;

export type FBPytchSayT = {
	message: string;
} & FBBaseFrameT;

export type FBPytchBroadcastAndWaitT = {
	message: string;
} & FBBaseFrameT;

export type FBFrameT = 
FBNOPT | 
FBExpressionT | 
FBIfT | 
FBWhileT | 
FBForT | 
FBAssignmentT | 
FBCommentT | 
FBFunctionDefinitionT | 
FBFunctionCallT | 
FBClassDefinitionT | 
FBPytchKeyPressedT |
FBPytchChangeXT |
FBPytchChangeYT |
FBPytchGoToT |
FBPytchShowT |
FBPytchHideT |
FBPytchTouchingT |
FBPytchBroadcastT |
FBPytchYPosT |
FBPytchXPosT |
FBPytchSayT |
FBPytchBroadcastAndWaitT;

export const createNOP = (id: number, depth: number, children: FBFrameT[]): FBNOPT => {
	return {
		type: FBTypes.NOP,
		id,
		depth,
		canHaveChildren: true,
		children: children,
		hasFocus: false	
	}
}

export const createIf = (booleanExpression: string, id: number, depth: number, children: FBFrameT[]): FBIfT => {
	return {
		type: FBTypes.IF,
		id,
		depth,
		canHaveChildren: true,
		children: children,
		hasFocus: false,
		booleanExpression
	}
}

export const createWhile = (booleanExpression: string, id: number, depth: number, children: FBFrameT[]): FBWhileT => {
	return {
		type: FBTypes.WHILE,
		id,
		depth,
		canHaveChildren: true,
		children: children,
		booleanExpression,
		hasFocus: false
	}
}

export const createFor = (iterator: string, collection: string, id: number, depth: number, children: FBFrameT[]): FBForT => {
	return {
		type: FBTypes.FOR,
		id,
		depth,
		canHaveChildren: true,
		children: children,
		iterator,
		collection,
		hasFocus: false
	}
}

export const createAssignment = (variable: string, value: string, id: number, depth: number): FBAssignmentT => {
	return {
		type: FBTypes.ASSIGNMENT,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		variable,
		hasFocus: false,
		value
	}
}

export const createComment = (text: string, id: number, depth: number): FBCommentT => {
	return {
		type: FBTypes.COMMENT,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		hasFocus: false,
		text
	}
}

export const createFunctionDefinition = (name: string, parameters: string[], id: number, depth: number): FBFunctionDefinitionT => {
	return {
		type: FBTypes.FUNCTION_DEFINITION,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		name,
		hasFocus: false,
		parameters
	}
}

export const createFunctionCall = (name: string, parameters: string[], id: number, depth: number): FBFunctionCallT => {
	return {
		type: FBTypes.FUNCTION_CALL,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		name,
		parameters,
		hasFocus: false
	}
}

export const createClassDefinition = (name: string, parameters: string[], id: number, depth: number): FBClassDefinitionT => {
	return {
		type: FBTypes.CLASS_DEFINITION,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		name,
		parameters,
		hasFocus: false
	}
}

export const createExpression = (text: string, id: number, depth: number): FBExpressionT => {
	return {
		type: FBTypes.EXPRESSION,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		text,
		hasFocus: false
	}
}

export const deleteFrame = (frame: FBFrameT, id: number) : boolean => {
	let deleted = false;
	while (true)
	{
		for (let i = 0; i < frame.children.length; i++) {
			if (frame.children[i].id === id) {
				frame.children.splice(i, 1);
				deleted = true;
				break;
			} else {
				deleted = deleteFrame(frame.children[i], id);
				if (deleted) {
					break;
				}
			}
		}
		break;
	}
	return deleted;
}

const extractTextualPython = (frames: FBFrameT[], indentation: number): string => {
	if (frames.length === 0) {
		return '    '.repeat(indentation) + 'pass\n';
	}
	
	let result = '    '.repeat(indentation);
	for (let i = 0; i < frames.length; i++) {
		console.log(frames[i].id, frames[i].depth);
		
		switch (frames[i].type) {
			case FBTypes.NOP:
				result += extractTextualPython([frames[i]], indentation);
				break;
			case FBTypes.IF:
				result += extractTextualPythonFromIfFrame(frames[i] as FBIfT, indentation);
				break;
			case FBTypes.WHILE:
				result += extractTextualPythonFromWhileFrame(frames[i] as FBWhileT, indentation);
				break;
			case FBTypes.FOR:
				result += extractTextualPythonFromForFrame(frames[i] as FBForT, indentation);
				break;
			case FBTypes.ASSIGNMENT:
				result += extractTextualPythonFromAssignmentFrame(frames[i] as FBAssignmentT, indentation);
				break;
			case FBTypes.COMMENT:
				result += extractTextualPythonFromCommentFrame(frames[i] as FBCommentT, indentation);
				break;
			case FBTypes.FUNCTION_DEFINITION:
				result += extractTextualPythonFromFunctionDefinitionFrame(frames[i] as FBFunctionDefinitionT, indentation);
				break;
			case FBTypes.FUNCTION_CALL:
				result += extractTextualPythonFromFunctionCallFrame(frames[i] as FBFunctionCallT, indentation);
				break;
			case FBTypes.CLASS_DEFINITION:
				result += extractTextualPythonFromClassDefinitionFrame(frames[i] as FBClassDefinitionT, indentation);
				break;
			case FBTypes.EXPRESSION:
				result += extractTextualPythonFromExpressionFrame(frames[i] as FBExpressionT, indentation);
				break;
		}
		result+= '\n';
	}

	return result;
}

const extractTextualPythonFromIfFrame = (frame: FBIfT, indentation: number) => {	
	let result = `if ${frame.booleanExpression}:\n`;
	if (frame.children.length > 0) {
		for (let child of frame.children) {
			result += '    '.repeat(indentation) + extractTextualPython([child], indentation + 1);
		}
	} else {
		result += '    '.repeat(indentation) + 'pass\n';
	}
	return result;
}

const extractTextualPythonFromWhileFrame = (frame: FBWhileT, indentation: number) => {
	let result = "while " + frame.booleanExpression + ":\n";
	
	if (frame.children.length > 0) {
		for (let child of frame.children) {
			result += '    '.repeat(indentation) + extractTextualPython([child], indentation + 1);
		}
	} else {
		result += '    '.repeat(indentation) + 'pass\n';
	}
	return result;
}

const extractTextualPythonFromForFrame = (frame: FBForT, indentation: number) => {
	let result = "for " + frame.iterator + " in " + frame.collection + ":\n";
	if (frame.children.length > 0) {
		for (let child of frame.children) {
			result += '    '.repeat(indentation) + extractTextualPython([child], indentation + 1);
		}
	} else {
		result += '    '.repeat(indentation) + 'pass\n';
	}
	return result;
}

const extractTextualPythonFromAssignmentFrame = (frame: FBAssignmentT, indentation: number) => {
	return frame.variable + " = " + frame.value + "\n";
}

const extractTextualPythonFromCommentFrame = (frame: FBCommentT, indentation: number) => {
	return frame.text + "\n";
}

const extractTextualPythonFromFunctionDefinitionFrame = (frame: FBFunctionDefinitionT, indentation: number) => {
	let result = "def " + frame.name + "(";
	for (let i = 0; i < frame.parameters.length; i++) {
		result += frame.parameters[i];
		if (i < frame.parameters.length - 1) {
			result += ", ";
		}
	}
	result += "):\n";
	if (frame.children.length > 0) {
		for (let child of frame.children) {
			result += '    '.repeat(indentation) + extractTextualPython([child], indentation + 1);
		}
	} else {
		result += '    '.repeat(indentation) + 'pass\n';
	}
	return result;
}

const extractTextualPythonFromFunctionCallFrame = (frame: FBFunctionCallT, indentation: number) => {
	let result = frame.name + "(";
	for (let i = 0; i < frame.parameters.length; i++) {
		result += frame.parameters[i];
		if (i < frame.parameters.length - 1) {
			result += ", ";
		}
	}
	result += ")";
	return result;
}

const extractTextualPythonFromClassDefinitionFrame = (frame: FBClassDefinitionT, indentation: number) => {
	let result = "def " + frame.name + "(";
	for (let i = 0; i < frame.parameters.length; i++) {
		result += frame.parameters[i];
		if (i < frame.parameters.length - 1) {
			result += ", ";
		}
	}
	result += "):\n";
	if (frame.children.length > 0) {
		for (let child of frame.children) {
			result += '    '.repeat(indentation) + extractTextualPython([child], indentation + 1);
		}
	} else {
		result += '    '.repeat(indentation) + 'pass\n';
	}
	return result;
}

const extractTextualPythonFromExpressionFrame = (frame: FBExpressionT, indentation: number) => {	
	return frame.text + "\n";
}

export const printCodeRecursive = (baseFrame: FBFrameT) => {
	const codeText = extractTextualPython(baseFrame.children, 0);
	return codeText;
}

const recursiveEditFrame = (frame: any, newFrame: any) => {
    if (frame.id === newFrame.id) {
        Object.assign(frame, newFrame);
        return true;
    }

    for (let i = 0; i < frame.children.length; i++) {
        if (recursiveEditFrame(frame.children[i], newFrame)) {
            return true;
        }
    }

    return false;
};

const deepCopy = (frame: FBFrameT) : FBFrameT => {
	const newFrame = JSON.parse(JSON.stringify(frame));
	return newFrame;
}

export const findFrame = (baseFrame: FBFrameT, id: number) : FBFrameT | null => {	
	if (baseFrame.id === id) {
		return baseFrame;
	}

	for (let child of baseFrame.children) {
		const result = findFrame(child, id);
		if (result !== null) {
			return result;
		}
	}

	return null;
}

const findFrameParent = (baseFrame: FBFrameT, id: number) : FBFrameT | null => {
	for (let child of baseFrame.children) {
		if (child.id === id) {
			return baseFrame;
		}

		const result = findFrameParent(child, id);
		if (result !== null) {
			return result;
		}
	}

	return null;
}

const moveFrame = (baseFrame: FBFrameT, frame: FBFrameT, index: number, newParentId: number) : boolean => {
	const parentFrame = findFrame(baseFrame, newParentId);
	
	if (parentFrame === null) {
		return false;
	}

	const newDepth = parentFrame.depth + 1;
	
	if (parentFrame.children.length > 0) {
		parentFrame.children.splice(index, 0, frame);
	} else {
		parentFrame.children.push(frame);
	}

	frame.depth = newDepth;

	const updateDepth = (frame: FBFrameT, _newDepth: number) => {
		frame.depth = _newDepth;
		for (let child of frame.children) {
			updateDepth(child, _newDepth + 1);
		}
	}

	for (let child of frame.children) {
		updateDepth(child, newDepth + 1);
	}

	return true;
}

export type MoveCandidatesType = {
	toId: number;
	toIndex: number;
	toDepth: number;
  };

const createNestedIfsRecursive = (currentDepth: number, maxDepth: number, nextId: number): FBFrameT => {
	if (currentDepth === maxDepth) {
		return createIf('true', nextId, currentDepth, []);
	}

	return createIf('true', currentDepth, currentDepth, [createNestedIfsRecursive(currentDepth + 1, maxDepth, nextId +1)]);
}

const assignIdsRecursive = (frame: FBFrameT, nextId: number): number => {
	let idNew = nextId;
	frame.id = idNew;
	for (let child of frame.children) {
		idNew = assignIdsRecursive(child, idNew + 1);
	}
	return idNew;
}

export type DropZoneCoordinate = {
	handlerId: Uuid;
	frameId: number;
	index: number;
}

export const getNextCoordDown = (baseFrame: FBFrameT, currentCoord: DropZoneCoordinate, nextHandlerId: Uuid | null, nextHandlerFirstFrameId: number | null): DropZoneCoordinate | null => {
	const frame = findFrame(baseFrame, currentCoord.frameId);
	if (frame === null) {
		return null
	}

	if (currentCoord.index !== frame.children.length) {
		if (frame.children.length !== 0) {
			return { frameId: frame.children[currentCoord.index].id, index: 0, handlerId: currentCoord.handlerId };
		} else {
			return null;
		}
	}

	const parentFrame = findFrameParent(baseFrame, currentCoord.frameId);

	if (parentFrame === null) {
		if (currentCoord.index === 0) {
			return { frameId: frame.id, index: 1, handlerId: currentCoord.handlerId };
		} else {
			if (nextHandlerId === null || nextHandlerFirstFrameId === null) {
				return null;
			} else {
				return { frameId: nextHandlerFirstFrameId, index: 0, handlerId: nextHandlerId };
			}
		}
	} else {
		const parentIndex = parentFrame.children.indexOf(frame);
		return { frameId: parentFrame.id, index: parentIndex + 1, handlerId: currentCoord.handlerId };
	}

}

export const getNextCoordUp = (baseFrame: FBFrameT, currentCoord: DropZoneCoordinate, prevHandlerId: Uuid | null, prevHandlerFirstFrameId: number | null, prevHandlerLastIndex: number | null): DropZoneCoordinate | null => {
	const frame = findFrame(baseFrame, currentCoord.frameId);
	if (frame === null) {
		return null
	}

	if (currentCoord.index !== 0) {
		return { frameId: frame.children[currentCoord.index - 1].id, index: frame.children[currentCoord.index - 1].children.length, handlerId: currentCoord.handlerId };
	}

	const parentFrame = findFrameParent(baseFrame, currentCoord.frameId);

	if (parentFrame === null) {
		if (currentCoord.index !== 0) {
			return { frameId: frame.id, index: 0, handlerId: currentCoord.handlerId };
		} else {
			if (prevHandlerId === null || prevHandlerFirstFrameId === null || prevHandlerLastIndex === null) {
				return null;
			} else {
				return { frameId: prevHandlerFirstFrameId, index: prevHandlerLastIndex, handlerId: prevHandlerId };
			}
		}
	} else {
		const parentIndex = parentFrame.children.indexOf(frame);
		return { frameId: parentFrame.id, index: parentIndex, handlerId: currentCoord.handlerId };
	}
}

const createNewFrame = (baseFrame: FBFrameT, frame: FBFrameT, parentId: number, index: number) : boolean => {
	const parentFrame = findFrame(baseFrame, parentId);
	
	if (parentFrame === null) {
		return false;
	}

	if (parentFrame.canHaveChildren === false) {
		return false;
	}

	parentFrame.children.splice(index, 0, frame);

	return true;
}

// export interface FBEditor {
// 	baseFrame: FBFrameT;
// 	focusedDropZoneCoords: DropZoneCoordinate;
// 	isEditingText: boolean;
// 	setIsEditingText: Action<FBEditor, boolean>;
// 	createNewFrame: Action<FBEditor, { frame: FBFrameT, parentId: number, index: number }>;
// 	editFrame: Action<FBEditor, FBFrameT>;
// 	deleteFrame: Action<FBEditor, number>;
// 	moveFrame: Action<FBEditor, { id: number, index: number, newParentId: number }>;
// 	applyFocus: Action<FBEditor, { frameId: number, index: number }>;
// 	nextId: number;
// }

// export const frameBasedEditor: FBEditor = {
// 	baseFrame: createNOP(0, 0, [
// 		createExpression('import pytch', 1, 1),
// 		createIf('True', 2, 1, 
// 			[createExpression('print("Hello World")', 6, 2)]),
// 			createAssignment('i', '5', 7, 1),
// 		createIf('True', 3, 1, 
// 			[createWhile('i > 0', 4, 2, [createExpression('print("Hello World")', 5, 3), createAssignment('i', 'i - 1', 8, 3),])]),]),
// 	focusedDropZoneCoords: { frameId: 0, index: 0 },
// 	isEditingText: false,
// 	setIsEditingText: action((state, isEditingText) => {
// 		state.isEditingText = isEditingText;
// 	}),
// 	nextId: 5,
// 	createNewFrame: action((state, { frame, parentId, index }) => {
// 		createNewFrame(state, frame, parentId, index);
// 	}),
// 	editFrame: action((state, newFrame) => {
// 		const updatedBaseFrame = deepCopy(state.baseFrame);
// 		const success = recursiveEditFrame(updatedBaseFrame, newFrame);
// 		if (success) {
// 			state.baseFrame = updatedBaseFrame;
// 			assignIdsRecursive(state.baseFrame, 0);
// 		}
// 	}),
// 	deleteFrame: action((state, id) => {
// 		deleteFrame(state.baseFrame, id);
// 	}),
// 	moveFrame: action((state, {id, index, newParentId}) => {		
// 		moveFrame(state.baseFrame, id, index, newParentId);
// 	}),
// 	applyFocus: action((state, dropZoneCoordinate) => {
// 		state.focusedDropZoneCoords = { frameId: dropZoneCoordinate.frameId, index: dropZoneCoordinate.index };
// 	}),
// }

const reassignIds = (frame: FBFrameT, nextId: number) => {
	frame.id = nextId;
	for (let i = 0; i < frame.children.length; i++) {
		nextId = reassignIds(frame.children[i], nextId + 1);
	}
	return nextId;
}

export type FrameUpdateDescriptor = {
	actorId: Uuid;
	handlerId: Uuid;
	newFrame: FBFrameT;
};

export type FrameCreateDescriptor = {
	actorId: Uuid;
	handlerId: Uuid;
	newFrame: FBFrameT;
	parentId: number;
	index: number;
};

export type FrameDeleteDescriptor = {
	actorId: Uuid;
	handlerId: Uuid;
	frameId: number;
};

export type FrameCoords = {
	actorId: Uuid;
	handlerId: Uuid;
	parentFrameId: number;
	index: number;
};

export type FrameMoveDescriptor = {
	frameId: number;
	fromFramePos: FrameCoords;
	toFramePos: FrameCoords;
};

export type FocusedDropZoneUpdateDescriptor = {
	newDropZone: DropZoneCoordinate;
	actorId: Uuid;
};

export class FrameBasedStructuredProgramOps {

	static editFrame(program: StructuredProgram, frameUpdateDescriptor: FrameUpdateDescriptor) {
		const actor = StructuredProgramOps.uniqueActorById(program, frameUpdateDescriptor.actorId);
		const handler = ActorOps.handlerById(actor, frameUpdateDescriptor.handlerId);
		const baseFrameToUpdate = handler.baseFrame;
		const updatedBaseFrame = deepCopy(baseFrameToUpdate);
		const newFrame = frameUpdateDescriptor.newFrame;
		const success = recursiveEditFrame(updatedBaseFrame, newFrame);
		if (success) {
			let currentId = 1;
			handler.baseFrame = updatedBaseFrame;
			actor.handlers.forEach((h) => {
				currentId = reassignIds(h.baseFrame, currentId);
			})
			actor.nextFrameId = currentId;
		}
	}

	static createFrame(program: StructuredProgram, frameCreateDescriptor: FrameCreateDescriptor) {
		const actor = StructuredProgramOps.uniqueActorById(program, frameCreateDescriptor.actorId);
		const handler = ActorOps.handlerById(actor, frameCreateDescriptor.handlerId);
		const newFrame = frameCreateDescriptor.newFrame;
		newFrame.id = actor.nextFrameId;
		actor.nextFrameId = actor.nextFrameId + 1;
		createNewFrame(handler.baseFrame, newFrame, frameCreateDescriptor.parentId, frameCreateDescriptor.index);
	}

	static deleteFrame(program: StructuredProgram, frameDeleteDescriptor: FrameDeleteDescriptor) {
		const actor = StructuredProgramOps.uniqueActorById(program, frameDeleteDescriptor.actorId);
		const handler = ActorOps.handlerById(actor, frameDeleteDescriptor.handlerId);
		deleteFrame(handler.baseFrame, frameDeleteDescriptor.frameId);
		let currentId = 1
		actor.handlers.forEach((h) => {
			currentId = reassignIds(h.baseFrame, currentId);
		})
		actor.nextFrameId = currentId;
	}

	static moveFrame(program: StructuredProgram, frameMoveDescriptor: FrameMoveDescriptor) {
		const fromActor = StructuredProgramOps.uniqueActorById(program, frameMoveDescriptor.fromFramePos.actorId);
		const toActor = StructuredProgramOps.uniqueActorById(program, frameMoveDescriptor.toFramePos.actorId);
		const fromHandler = ActorOps.handlerById(fromActor, frameMoveDescriptor.fromFramePos.handlerId);
		const toHandler = ActorOps.handlerById(toActor, frameMoveDescriptor.toFramePos.handlerId);

		let tempFrameCopy = findFrame(fromHandler.baseFrame, frameMoveDescriptor.frameId);

		if (tempFrameCopy === null) {
			return;
		}

		const frameToMove = deepCopy(tempFrameCopy);

		deleteFrame(fromHandler.baseFrame, frameMoveDescriptor.frameId);
		moveFrame(toHandler.baseFrame, frameToMove, frameMoveDescriptor.toFramePos.index, frameMoveDescriptor.toFramePos.parentFrameId);
		
		let currentId = 1
		fromActor.handlers.forEach((h) => {
			currentId = reassignIds(h.baseFrame, currentId);
		})
		fromActor.nextFrameId = currentId;

		currentId = 1
		toActor.handlers.forEach((h) => {
			currentId = reassignIds(h.baseFrame, currentId);
		})
		toActor.nextFrameId = currentId;
	}

	static applyFocus(program: StructuredProgram, focusedDropZoneUpdateDescriptor: FocusedDropZoneUpdateDescriptor) {
		const actor = StructuredProgramOps.uniqueActorById(program, focusedDropZoneUpdateDescriptor.actorId);
		actor.currentlyFocusedDropzone = focusedDropZoneUpdateDescriptor.newDropZone;
	}

	static getNextCoordDown(program: StructuredProgram, currentCoord: DropZoneCoordinate, actorId: Uuid): DropZoneCoordinate | null {
		const actor = StructuredProgramOps.uniqueActorById(program, actorId);
		const handler = ActorOps.handlerById(actor, currentCoord.handlerId);
		const handlerIndex = ActorOps.handlerIndexById(actor, currentCoord.handlerId);
		const nextHandlerId = handlerIndex < actor.handlers.length - 1 ? actor.handlers[handlerIndex + 1].id : null;
		let nextHandlerFirstFrameId = null;
		if (nextHandlerId !== null) {
			const nextHandler = ActorOps.handlerById(actor, nextHandlerId);
			nextHandlerFirstFrameId = nextHandler.baseFrame.id;
		}
		return getNextCoordDown(handler.baseFrame, currentCoord, nextHandlerId, nextHandlerFirstFrameId);
	}

	static getNextCoordUp(program: StructuredProgram, currentCoord: DropZoneCoordinate, actorId: Uuid): DropZoneCoordinate | null {
		const actor = StructuredProgramOps.uniqueActorById(program, actorId);
		const handler = ActorOps.handlerById(actor, currentCoord.handlerId);
		const handlerIndex = ActorOps.handlerIndexById(actor, currentCoord.handlerId);
		const prevHandlerId = handlerIndex > 0 ? actor.handlers[handlerIndex - 1].id : null;
		let prevHandlerFirstFrameId = null;
		let prevHandlerLastIndex = null;
		if (prevHandlerId !== null) {
			const prevHandler = ActorOps.handlerById(actor, prevHandlerId);
			prevHandlerFirstFrameId = prevHandler.baseFrame.id;
			prevHandlerLastIndex = prevHandler.baseFrame.children.length;
		}
		return getNextCoordUp(handler.baseFrame, currentCoord, prevHandlerId, prevHandlerFirstFrameId, prevHandlerLastIndex);
	}

	static printCodeRecursive(frame: FBFrameT) {
		return printCodeRecursive(frame);
	}
}