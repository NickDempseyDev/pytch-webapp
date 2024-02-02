import { FBWhileT, FBFrameT } from '../../../model/frame-based'

type WhileFrameProps = {
  frame: FBWhileT
  editFrame: (frame: FBFrameT) => void
}

const WhileFrame = ({ frame, editFrame }: WhileFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, booleanExpression: event.target.value })
  }

  return (
    <div>while <input type="text" value={frame.booleanExpression} onChange={changeInput} />:</div>
  )
}

export default WhileFrame;