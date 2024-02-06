import { action, Action } from "easy-peasy";


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

export type FBFrameT = FBNOPT | FBExpressionT | FBIfT | FBWhileT | FBForT | FBAssignmentT | FBCommentT | FBFunctionDefinitionT | FBFunctionCallT | FBClassDefinitionT;

const creatNOP = (id: number, depth: number, children: FBFrameT[]): FBNOPT => {
	return {
		type: FBTypes.NOP,
		id,
		depth,
		canHaveChildren: true,
		children: children,
		hasFocus: false,
		// extractTextualPython: (children: FBFrameT[]) => {
		// 	return children.map((child) => child.extractTextualPython(child.children, 1)).join("\n");
		// }		
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
		booleanExpression,
		// extractTextualPython: (children: FBFrameT[], indentation = 1) => {
		// 	let result = `if ${booleanExpression}:\n`;
		
		// 	if (children.length > 0) {
		// 		for (let child of children) {
		// 			result += '    '.repeat(indentation) + child.extractTextualPython(child.children, indentation + 1);
		// 		}
		// 	} else {
		// 		result += '    '.repeat(indentation) + 'pass\n';
		// 	}
		
		// 	return result;
		// }
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
		hasFocus: false,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	let result = "while " + booleanExpression + ":\n";
		// 	if (children.length > 0) {
		// 		for (let child of children) {
		// 			result += '    '.repeat(indentation) + child.extractTextualPython(child.children, indentation + 1);
		// 		}
		// 	} else {
		// 		result += '    '.repeat(indentation) + 'pass\n';
		// 	}
		// 	return result;
		// }
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
		hasFocus: false,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	let result = "for " + iterator + " in " + collection + ":\n";
		// 	if (children.length > 0) {
		// 		for (let child of children) {
		// 			result += '    '.repeat(indentation) + child.extractTextualPython(child.children, indentation + 1);
		// 		}
		// 	} else {
		// 		result += '    '.repeat(indentation) + 'pass\n';
		// 	}
		// 	return result;
		// }
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
		value,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	return variable + " = " + value + "\n";
		// }
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
		text,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	return text;
		// }
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
		parameters,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	let result = "def " + name + "(";
		// 	for (let i = 0; i < parameters.length; i++) {
		// 		result += parameters[i];
		// 		if (i < parameters.length - 1) {
		// 			result += ", ";
		// 		}
		// 	}
		// 	result += "):\n";
		// 	if (children.length > 0) {
		// 		for (let child of children) {
		// 			result += '    '.repeat(indentation) + child.extractTextualPython(child.children, indentation + 1);
		// 		}
		// 	} else {
		// 		result += '    '.repeat(indentation) + 'pass\n';
		// 	}
		// 	return result;
		// }
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
		hasFocus: false,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	let result = name + "(";
		// 	for (let i = 0; i < parameters.length; i++) {
		// 		result += parameters[i];
		// 		if (i < parameters.length - 1) {
		// 			result += ", ";
		// 		}
		// 	}
		// 	result += ")";
		// 	return result;
		// }
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
		hasFocus: false,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	let result = "def " + name + "(";
		// 	for (let i = 0; i < parameters.length; i++) {
		// 		result += parameters[i];
		// 		if (i < parameters.length - 1) {
		// 			result += ", ";
		// 		}
		// 	}
		// 	result += "):\n";
		// 	if (children.length > 0) {
		// 		for (let child of children) {
		// 			result += '    '.repeat(indentation) + child.extractTextualPython(child.children, indentation + 1);
		// 		}
		// 	} else {
		// 		result += '    '.repeat(indentation) + 'pass\n';
		// 	}
		// 	return result;
		// }
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
		hasFocus: false,
		// extractTextualPython: (children: FBFrameT[], indentation: number) => {
		// 	return text + "\n";
		// }
	}
}

export const deleteFrame = (frame: FBFrameT, id: number) : boolean => {
	// delete the frame with ID from the tree
	// return true if successful, false otherwise
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

export const extractTextualPython = (frame: FBFrameT[], indentation: number): string => {
	let result = '';
	for (let i = 0; i < frame.length; i++) {
		// @ts-ignore
		result += '    '.repeat(indentation) + mapFrameToExtractFunction[frame[i].type](frame[i], indentation) + "\n";
	}

	return result;
}

const extractTextualPythonFromIfFrame = (frame: FBIfT, indentation: number) => {
	let result = `if ${frame.booleanExpression}:\n`;
	if (frame.children.length > 0) {
		for (let child of frame.children) {
			result += '    '.repeat(indentation) + extractTextualPython(child.children, indentation + 1);
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
			result += '    '.repeat(indentation) + extractTextualPython(child.children, indentation + 1);
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
			result += '    '.repeat(indentation) + extractTextualPython(child.children, indentation + 1);
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
	return frame.text;
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
			result += '    '.repeat(indentation) + extractTextualPython(child.children, indentation + 1);
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
			result += '    '.repeat(indentation) + extractTextualPython(child.children, indentation + 1);
		}
	} else {
		result += '    '.repeat(indentation) + 'pass\n';
	}
	return result;
}

const extractTextualPythonFromExpressionFrame = (frame: FBExpressionT, indentation: number) => {
	return frame.text + "\n";
}

const mapFrameToExtractFunction = {
	[FBTypes.NOP]: extractTextualPython,
	[FBTypes.IF]: extractTextualPythonFromIfFrame,
	[FBTypes.WHILE]: extractTextualPythonFromWhileFrame,
	[FBTypes.FOR]: extractTextualPythonFromForFrame,
	[FBTypes.ASSIGNMENT]: extractTextualPythonFromAssignmentFrame,
	[FBTypes.COMMENT]: extractTextualPythonFromCommentFrame,
	[FBTypes.FUNCTION_DEFINITION]: extractTextualPythonFromFunctionDefinitionFrame,
	[FBTypes.FUNCTION_CALL]: extractTextualPythonFromFunctionCallFrame,
	[FBTypes.CLASS_DEFINITION]: extractTextualPythonFromClassDefinitionFrame,
	[FBTypes.EXPRESSION]: extractTextualPythonFromExpressionFrame,
}

export const printCodeRecursive = (frame: FBFrameT) => {
	const codeText = extractTextualPython(frame.children, 0);
	return codeText;
}

const recursiveEditFrame = (frame: any, newFrame: any) => {
    if (frame.id === newFrame.id) {
        Object.assign(frame, newFrame); // Update frame properties
        return true;
    }

    for (let i = 0; i < frame.children.length; i++) {
        if (recursiveEditFrame(frame.children[i], newFrame)) {
            return true; // Return true if the frame is found and updated
        }
    }

    return false; // Return false if frame is not found
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

const moveFrame = (baseFrame: FBFrameT, id: number, index: number, newParentId: number) : boolean => {
	const parentFrame = findFrame(baseFrame, newParentId);
	
	if (parentFrame === null) {
		return false;
	}

	const frame = findFrame(baseFrame, id);
	if (frame === null) {
		return false;
	}

	const newDepth = parentFrame.depth + 1;

	deleteFrame(baseFrame, id);
	
	if (parentFrame.children.length > 0) {
		parentFrame.children.splice(index, 0, frame);
	} else {
		parentFrame.children.push(frame);
	}

	frame.depth = newDepth;

	const updateDepth = (frame: FBFrameT) => {
		frame.depth = newDepth + 1;
		for (let child of frame.children) {
			updateDepth(child);
		}
	}

	for (let child of frame.children) {
		updateDepth(child);
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

const assignIdsAndDepthRecursive = (frame: FBFrameT, nextId: number, depth: number): number => {
	frame.id = nextId;
	frame.depth = depth;
	nextId++;
	for (let child of frame.children) {
		nextId = assignIdsAndDepthRecursive(child, nextId, depth + 1);
	}
	return nextId;
}

export type DropZoneCoordinate = {
	frameId: number;
	index: number;
}

export const getNextCoordDown = (baseFrame: FBFrameT, currentCoord: DropZoneCoordinate): DropZoneCoordinate | null => {
	const frame = findFrame(baseFrame, currentCoord.frameId);
	if (frame === null) {
		return null
	}

	if (currentCoord.index !== frame.children.length) {
		if (frame.children.length !== 0) {
			return { frameId: frame.children[currentCoord.index].id, index: 0 };
		} else {
			return null;
		}
	}

	const parentFrame = findFrameParent(baseFrame, currentCoord.frameId);

	if (parentFrame === null) {
		if (currentCoord.index === 0) {
			return { frameId: frame.id, index: 1};
		} else {
			return null;
		}
	} else {
		const parentIndex = parentFrame.children.indexOf(frame);
		return { frameId: parentFrame.id, index: parentIndex + 1 };
	}

}

export const getNextCoordUp = (baseFrame: FBFrameT, currentCoord: DropZoneCoordinate): DropZoneCoordinate | null => {
	const frame = findFrame(baseFrame, currentCoord.frameId);
	if (frame === null) {
		return null
	}

	if (currentCoord.index !== 0) {
		return { frameId: frame.children[currentCoord.index - 1].id, index: frame.children[currentCoord.index - 1].children.length };
	}

	const parentFrame = findFrameParent(baseFrame, currentCoord.frameId);

	if (parentFrame === null) {
		return null;
	} else {
		const parentIndex = parentFrame.children.indexOf(frame);
		return { frameId: parentFrame.id, index: parentIndex };
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

export interface FBEditor {
	baseFrame: FBFrameT;
	focusedDropZoneCoords: DropZoneCoordinate
	createNewFrame: Action<FBEditor, { frame: FBFrameT, parentId: number, index: number }>;
	editFrame: Action<FBEditor, FBFrameT>;
	deleteFrame: Action<FBEditor, number>;
	moveFrame: Action<FBEditor, { id: number, index: number, newParentId: number }>;
	applyFocus: Action<FBEditor, { frameId: number, index: number }>;
	incrementId: Action<FBEditor>;
	nextId: number;
}

export const frameBasedEditor: FBEditor = {
	baseFrame: creatNOP(0, 0, [
		createExpression('import pytch', 1, 1),
		createIf('True', 2, 1, 
			[createExpression('print("Hello World")', 6, 2)]),
			createAssignment('i', '5', 7, 1),
		createIf('True', 3, 1, 
			[createWhile('i > 0', 4, 2, [createExpression('print("Hello World")', 5, 3), createAssignment('i', 'i - 1', 8, 3),])]),]),
	focusedDropZoneCoords: { frameId: 0, index: 0 },
	nextId: 5,
	incrementId: action((state) => {
		state.nextId++;
	}),
	createNewFrame: action((state, { frame, parentId, index }) => {
		createNewFrame(state.baseFrame, frame, parentId, index);
	}),
	editFrame: action((state, newFrame) => {
		const updatedBaseFrame = deepCopy(state.baseFrame); // Create a deep copy of the baseFrame
		const success = recursiveEditFrame(updatedBaseFrame, newFrame); // Perform recursive edit
		if (success) {
			state.baseFrame = updatedBaseFrame; // Update state with the new baseFrame
		}
	}),
	deleteFrame: action((state, id) => {
		deleteFrame(state.baseFrame, id);
	}),
	moveFrame: action((state, {id, index, newParentId}) => {		
		moveFrame(state.baseFrame, id, index, newParentId);
	}),
	applyFocus: action((state, dropZoneCoordinate) => {
		state.focusedDropZoneCoords = { frameId: dropZoneCoordinate.frameId, index: dropZoneCoordinate.index };
	}),
}