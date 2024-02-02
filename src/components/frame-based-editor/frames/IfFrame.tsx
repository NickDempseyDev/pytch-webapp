import { FBIfT, FBFrameT } from "../../../model/frame-based"

type IfFrameProps = {
  frame: FBIfT
  editFrame: (frame: FBFrameT) => void
}

const IfFrame = ({ frame, editFrame }: IfFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, booleanExpression: event.target.value })
  }
  return (
    <div>if <input type="text" value={frame.booleanExpression} onChange={changeInput} />:</div>
  )
}

export default IfFrame;