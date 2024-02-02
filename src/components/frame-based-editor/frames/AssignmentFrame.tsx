import { FBAssignmentT, FBFrameT } from '../../../model/frame-based'

type AssignmentFrameProps = {
  frame: FBAssignmentT;
  editFrame: (frame: FBFrameT) => void;
}

const AssignmentFrame = ({ frame, editFrame }: AssignmentFrameProps) => {
  const changeVariableInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, variable: event.target.value })
  }

  const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, value: event.target.value })
  }

  return (
    <div><input type="text" value={frame.variable} onChange={changeVariableInput} /> = <input type="text" value={frame.value} onChange={changeValueInput} /></div>
  )
}

export default AssignmentFrame;