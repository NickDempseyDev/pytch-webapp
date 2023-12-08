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

type FBFrame = {
	type: FBTypes;
	id: number;
	depth: number;
	canHaveChildren: boolean;
	children: FBFrame[];
	extractTextualPython: (childre: FBFrame[]) => string;
}

export type FBNOP = FBFrame;

export type FBExpression = {
	text: string;
} & FBFrame;

export type FBIf = {
	booleanExpression: string;
} & FBFrame;

export type FBWhile = {
	booleanExpression: string;
} & FBFrame;

export type FBFor = {
	iterator: string;
	collection: string;
} & FBFrame;

export type FBAssignment = {
	variable: string;
	value: string;
} & FBFrame;

export type FBComment = {
	text: string;
} & FBFrame;

export type FBFunctionDefinition = {
	name: string;
	parameters: string[];
} & FBFrame;

export type FBFunctionCall = {
	name: string;
	parameters: string[];
} & FBFrame;

export type FBClassDefinition = {
	name: string;
	parameters: string[];
} & FBFrame;

export type FBFrameT = FBNOP | FBExpression | FBIf | FBWhile | FBFor | FBAssignment | FBComment | FBFunctionDefinition | FBFunctionCall | FBClassDefinition;

const creatNOP = (id: number, depth: number): FBNOP => {
	return {
		type: FBTypes.NOP,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		extractTextualPython: (children: FBFrame[]) => {
			return children.map((child) => child.extractTextualPython(child.children)).join("\n");
		}
	}
}

export const createIf = (booleanExpression: string, id: number, depth: number): FBIf => {
	return {
		type: FBTypes.IF,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		booleanExpression,
		extractTextualPython: (children: FBFrame[]) => {
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

export const createWhile = (booleanExpression: string, id: number, depth: number): FBWhile => {
	return {
		type: FBTypes.WHILE,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		booleanExpression,
		extractTextualPython: (children: FBFrame[]) => {
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

export const createFor = (iterator: string, collection: string, id: number, depth: number): FBFor => {
	return {
		type: FBTypes.FOR,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		iterator,
		collection,
		extractTextualPython: (children: FBFrame[]) => {
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

export const createAssignment = (variable: string, value: string, id: number, depth: number): FBAssignment => {
	return {
		type: FBTypes.ASSIGNMENT,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		variable,
		value,
		extractTextualPython: (children: FBFrame[]) => {
			return variable + " = " + value;
		}
	}
}

export const createComment = (text: string, id: number, depth: number): FBComment => {
	return {
		type: FBTypes.COMMENT,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		text,
		extractTextualPython: (children: FBFrame[]) => {
			return text;
		}
	}
}

export const createFunctionDefinition = (name: string, parameters: string[], id: number, depth: number): FBFunctionDefinition => {
	return {
		type: FBTypes.FUNCTION_DEFINITION,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		name,
		parameters,
		extractTextualPython: (children: FBFrame[]) => {
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

export const createFunctionCall = (name: string, parameters: string[], id: number, depth: number): FBFunctionCall => {
	return {
		type: FBTypes.FUNCTION_CALL,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		name,
		parameters,
		extractTextualPython: (children: FBFrame[]) => {
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

export const createClassDefinition = (name: string, parameters: string[], id: number, depth: number): FBClassDefinition => {
	return {
		type: FBTypes.CLASS_DEFINITION,
		id,
		depth,
		canHaveChildren: true,
		children: [],
		name,
		parameters,
		extractTextualPython: (children: FBFrame[]) => {
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

export const createExpression = (text: string, id: number, depth: number): FBExpression => {
	return {
		type: FBTypes.EXPRESSION,
		id,
		depth,
		canHaveChildren: false,
		children: [],
		text,
		extractTextualPython: (children: FBFrame[]) => {
			return text;
		}
	}
}

export const addAllChildrenToFrame = (frame: FBFrame, children: FBFrame[]) : boolean => {
	if (!frame.canHaveChildren) {
		return false;
	}

	frame.children.push(...children);
	return true;
}

export const addChildToFrame = (frame: FBFrame, child: FBFrame) : boolean => {
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

export const deleteFrame = (frame: FBFrame, id: number) : boolean => {
	let deleted = false;
	while (deleted === false) {
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
	}

	return deleted;
}

// TODO: might need to add switch statement for different types of frames
// so that we can validate the input
export const editFrame = (baseFrame: FBFrame, newFrame: FBFrame) : boolean => {
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

export interface FBEditor {
	baseFrame: FBFrame;
	focusedFrameId: number;
	createNewFrame: Action<FBEditor, FBFrame>;
	editFrame: Action<FBEditor, FBFrame>;
	deleteFrame: Action<FBEditor, number>;
	setFocusedFrameId: Action<FBEditor, number>;
}

// might need to change how the editing works above. 
// Currently, it's based on editing through reference, 
// but that might not work with easy-peasy
export const frameBasedEditor: FBEditor = {
	baseFrame: creatNOP(-1, -1),
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
}