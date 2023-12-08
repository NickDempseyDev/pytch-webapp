import { FBFrameT, FBTypes } from "../../model/frame-based"

type FrameProps = {
	frame: FBFrameT
}

const Frame = (props: FrameProps) => {
	switch (props.frame.type) {
		case FBTypes.IF:
			return <div></div>;
		case FBTypes.WHILE:
			return <div></div>;
		case FBTypes.FOR:
			return <div></div>;
		case FBTypes.ASSIGNMENT:
			return <div></div>;
		case FBTypes.CLASS_DEFINITION:
			return <div></div>;
		case FBTypes.COMMENT:
			return <div></div>;
		case FBTypes.EXPRESSION:
			return <div></div>;
		case FBTypes.FUNCTION_CALL:
			return <div></div>;
		case FBTypes.FUNCTION_DEFINITION:
			return <div></div>;	
		case FBTypes.NOP:
			return <div></div>;
		default:
			return (
				<div>
					
				</div>
			)
	}
}

export default Frame