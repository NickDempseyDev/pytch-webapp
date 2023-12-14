import { 
	FBAssignment, 
	FBClassDefinition, 
	FBComment, 
	FBExpression, 
	FBFor, 
	FBFrame, 
	FBFunctionCall, 
	FBFunctionDefinition, 
	FBIf, 
	FBTypes, 
	FBWhile 
} from "../../model/frame-based"
import IfFrame from "./frames/IfFrame"
import WhileFrame from "./frames/WhileFrame"
import ForFrame from "./frames/ForFrame"
import AssignmentFrame from "./frames/AssignmentFrame"
import ClassDefinitionFrame from "./frames/ClassDefinitionFrame"
import CommentFrame from "./frames/CommentFrame"
import ExpressionFrame from "./frames/ExpressionFrame"
import FunctionCallFrame from "./frames/FunctionCallFrame"
import FunctionDefinitionFrame from "./frames/FunctionDefinitionFrame"

type FrameProps = {
	frame: FBFrame;
}

const getFrameComponent = (frame: FBFrame) => {
	switch (frame.type) {
		case FBTypes.IF:
			return <IfFrame frame={frame as FBIf}/>
		case FBTypes.WHILE:
			return <WhileFrame frame={frame as FBWhile}/>
		case FBTypes.FOR:
			return <ForFrame frame={frame as FBFor}/>;
		case FBTypes.ASSIGNMENT:
			return <AssignmentFrame frame={frame as FBAssignment}/>;
		case FBTypes.CLASS_DEFINITION:
			return <ClassDefinitionFrame frame={frame as FBClassDefinition}/>;
		case FBTypes.COMMENT:
			return <CommentFrame frame={frame as FBComment}/>;
		case FBTypes.EXPRESSION:
			return <ExpressionFrame frame={frame as FBExpression}/>;
		case FBTypes.FUNCTION_CALL:
			return <FunctionCallFrame frame={frame as FBFunctionCall}/>;
		case FBTypes.FUNCTION_DEFINITION:
			return <FunctionDefinitionFrame frame={frame as FBFunctionDefinition}/>;	
		case FBTypes.NOP:
			return <div></div>;
		default:
			return (
				<div>
					
				</div>
			)
	}
}

const Frame = (props: FrameProps) => {
	return (
		getFrameComponent(props.frame)
	)
}

export default Frame