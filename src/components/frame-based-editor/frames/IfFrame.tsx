import { FBIfT, FBFrameT } from "../../../model/frame-based"

type IfFrameProps = {
  frame: FBIfT
  editFrame: (frame: FBFrameT) => void
  setIsEditingText: (isEditingText: boolean) => void
}

const IfFrame = ({ frame, editFrame, setIsEditingText }: IfFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, booleanExpression: event.target.value })
  }
  return (
    <div>if <input type="text" value={frame.booleanExpression} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />:</div>
  )
}

export default IfFrame;