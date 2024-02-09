import { FBAssignmentT, FBFrameT } from '../../../model/frame-based'

type AssignmentFrameProps = {
  frame: FBAssignmentT;
  editFrame: (frame: FBFrameT) => void;
  setIsEditingText: (isEditingText: boolean) => void;
}

const AssignmentFrame = ({ frame, editFrame, setIsEditingText }: AssignmentFrameProps) => {
  const changeVariableInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, variable: event.target.value })
  }

  const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, value: event.target.value })
  }

  return (
    <div>
      <input type="text" value={frame.variable} onChange={changeVariableInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />
      =
      <input type="text" value={frame.value} onChange={changeValueInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />
    </div>
  )
}

export default AssignmentFrame;