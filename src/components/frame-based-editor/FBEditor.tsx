import { FBFrame } from "../../model/frame-based"
import Frame from "./Frame"

type FBEditorProps = {
	  frames: FBFrame[];
}

const FBEditor = (props: FBEditorProps) => {
  return (
	<div className="frame-editor">
	  {props.frames.map((frame, index) => (
		<Frame key={index} frame={frame} />
	  ))}
	</div>
  )
}

export default FBEditor