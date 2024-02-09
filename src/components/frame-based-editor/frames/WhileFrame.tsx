import { FBWhileT, FBFrameT } from '../../../model/frame-based'

type WhileFrameProps = {
  frame: FBWhileT
  editFrame: (frame: FBFrameT) => void
  setIsEditingText: (isEditingText: boolean) => void
}

const WhileFrame = ({ frame, editFrame, setIsEditingText }: WhileFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, booleanExpression: event.target.value })
  }

  return (
    <div>while <input type="text" value={frame.booleanExpression} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />:</div>
  )
}

export default WhileFrame;