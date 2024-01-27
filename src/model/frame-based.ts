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
	extractTextualPython: (childre: FBFrameT[]) => string;
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

const creatNOP = (id: number, depth: number): FBNOPT => {
	return {
		type: FBTypes.NOP,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		extractTextualPython: (children: FBFrameT[]) => {
			return children.map((child) => child.extractTextualPython(child.children)).join("\n");
		}
	}
}

export const createIf = (booleanExpression: string, id: number, depth: number, children: FBFrameT[]): FBIfT => {
	return {
		type: FBTypes.IF,
		id,
		depth,
		canHaveChildren: true,
		children: children,
		booleanExpression,
		extractTextualPython: (children: FBFrameT[]) => {
			let result = "if " + booleanExpression + ":\n";
			if (children.length > 0) {
				for (let child of children) {
					result = result + "\n   " + child.extractTextualPython(child.children);
				}
			} else {
				result += "    pass\n";
			}
			return result;
		}
	}
}

export const createWhile = (booleanExpression: string, id: number, depth: number): FBWhileT => {
	return {
		type: FBTypes.WHILE,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		booleanExpression,
		extractTextualPython: (children: FBFrameT[]) => {
			let result = "while " + booleanExpression + ":\n";
			if (children.length > 0) {
				for (let child of children) {
					result = result + "\n   " + child.extractTextualPython(child.children);
				}
			} else {
				result += "    pass\n";
			}
			return result;
		}
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
		extractTextualPython: (children: FBFrameT[]) => {
			let result = "for " + iterator + " in " + collection + ":\n";
			if (children.length > 0) {
				for (let child of children) {
					result = result + "\n   " + child.extractTextualPython(child.children);
				}
			} else {
				result += "    pass\n";
			}
			return result;
		}
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
		value,
		extractTextualPython: (children: FBFrameT[]) => {
			return variable + " = " + value;
		}
	}
}

export const createComment = (text: string, id: number, depth: number): FBCommentT => {
	return {
		type: FBTypes.COMMENT,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		text,
		extractTextualPython: (children: FBFrameT[]) => {
			return text;
		}
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
		parameters,
		extractTextualPython: (children: FBFrameT[]) => {
			let result = "def " + name + "(";
			for (let i = 0; i < parameters.length; i++) {
				result += parameters[i];
				if (i < parameters.length - 1) {
					result += ", ";
				}
			}
			result += "):\n";
			if (children.length > 0) {
				for (let child of children) {
					result = result + "\n   " + child.extractTextualPython(child.children);
				}
			} else {
				result += "    pass\n";
			}
			return result;
		}
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
		extractTextualPython: (children: FBFrameT[]) => {
			let result = name + "(";
			for (let i = 0; i < parameters.length; i++) {
				result += parameters[i];
				if (i < parameters.length - 1) {
					result += ", ";
				}
			}
			result += ")";
			return result;
		}
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
		extractTextualPython: (children: FBFrameT[]) => {
			let result = "class " + name + "(";
			for (let i = 0; i < parameters.length; i++) {
				result += parameters[i];
				if (i < parameters.length - 1) {
					result += ", ";
				}
			}
			result += "):\n";
			if (children.length > 0) {
				for (let child of children) {
					result = result + "\n   " + child.extractTextualPython(child.children);
				}
			} else {
				result += "    pass\n";
			}
			return result;
		}
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
		extractTextualPython: (children: FBFrameT[]) => {
			return text;
		}
	}
}

export const addAllChildrenToFrame = (frame: FBFrameT, children: FBFrameT[]) : boolean => {
	if (!frame.canHaveChildren) {
		return false;
	}

	frame.children.push(...children);
	return true;
}

export const addChildToFrame = (frame: FBFrameT, child: FBFrameT) : boolean => {
	if (!frame.canHaveChildren) {
		return false;
	}

	frame.children.push(child);
	return true;
}

// export const editIf = (frame: FBIf, booleanExpression: string, children: FBFrame[]) : boolean => {
// 	// TODO: validate expression maybe?
// 	frame.booleanExpression = booleanExpression;
// 	frame.children = children;
// 	return true;
// }

// export const editWhile = (frame: FBWhile, booleanExpression: string, children: FBFrame[]) : boolean => {
// 	// TODO: validate expression maybe?
// 	frame.booleanExpression = booleanExpression;
// 	frame.children = children;
// 	return true;
// }

// export const editFor = (frame: FBFor, iterator: string, collection: string, children: FBFrame[]) : boolean => {
// 	frame.iterator = iterator;
// 	frame.collection = collection;
// 	frame.children = children;
// 	return true;
// }

// export const editAssignment = (frame: FBAssignment, variable: string, value: string) : boolean => {
// 	frame.variable = variable;
// 	frame.value = value;
// 	return true;
// }

// export const editComment = (frame: FBComment, text: string) : boolean => {
// 	frame.text = text;
// 	return true;
// }

// export const editFunctionDefinition = (frame: FBFunctionDefinition, name: string, parameters: string[], children: FBFrame[]) : boolean => {
// 	frame.name = name;
// 	frame.parameters = parameters;
// 	frame.children = children;
// 	return true;
// }

// export const editFunctionCall = (frame: FBFunctionCall, name: string, parameters: string[]) : boolean => {
// 	frame.name = name;
// 	frame.parameters = parameters;
// 	return true;
// }

// export const editClassDefinition = (frame: FBClassDefinition, name: string, parameters: string[], children: FBFrame[]) : boolean => {
// 	frame.name = name;
// 	frame.parameters = parameters;
// 	frame.children = children;
// 	return true;
// }

// export const editExpression = (frame: FBExpression, text: string) : boolean => {
// 	frame.text = text;
// 	return true;
// }

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

// TODO: might need to add switch statement for different types of frames
// so that we can validate the input
export const editFrame = (baseFrame: FBFrameT, newFrame: FBFrameT) : boolean => {
	let edited = false;
	while (edited === false) {
		for (let i = 0; i < baseFrame.children.length; i++) {
			if (baseFrame.children[i].id === newFrame.id) {
				baseFrame.children[i] = newFrame;
				edited = true;
				break;
			} else {
				edited = editFrame(baseFrame.children[i], newFrame);
				if (edited) {
					break;
				}
			}
		}
	}
	return edited;
}

const findFrame = (baseFrame: FBFrameT, id: number) : FBFrameT | null => {	
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

	// add frame to new parent at given index if the length is greather than 1
	console.log('INDEX IS: ', index);
	
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

export interface FBEditor {
	baseFrame: FBFrameT;
	focusedFrameId: number;
	createNewFrame: Action<FBEditor, FBFrameT>;
	editFrame: Action<FBEditor, FBFrameT>;
	deleteFrame: Action<FBEditor, number>;
	setFocusedFrameId: Action<FBEditor, number>;
	moveFrame: Action<FBEditor, {id: number, index: number, newParentId: number}>;
}

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

export const frameBasedEditor: FBEditor = {
	baseFrame: createIf("true", 0, 0, [
		createIf('1', 1, 1, 
			[createFunctionDefinition('test', ['a', 'b'], 2, 2)]),
		createIf('2', 3, 1, 
			[createIf('2.1', 4, 2, [])])]),
	focusedFrameId: 0,
	createNewFrame: action((state, frame) => {
		addChildToFrame(state.baseFrame, frame);
	}),
	editFrame: action((state, frame) => {
		editFrame(state.baseFrame, frame);
	}),
	deleteFrame: action((state, id) => {
		deleteFrame(state.baseFrame, id);
	}),
	setFocusedFrameId: action((state, id) => {
		state.focusedFrameId = id;
	}),
	moveFrame: action((state, {id, index, newParentId}) => {		
		moveFrame(state.baseFrame, id, index, newParentId);
	})
}