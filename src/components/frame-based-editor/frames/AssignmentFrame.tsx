import { FBAssignmentT } from '../../../model/frame-based'

type AssignmentFrameProps = {
  frame: FBAssignmentT;
}

const AssignmentFrame = ({ frame }: AssignmentFrameProps) => {
  return (
    <div><input type="text" value={frame.variable} /> = <input type="text" value={frame.value} /></div>
  )
}

export default AssignmentFrame;