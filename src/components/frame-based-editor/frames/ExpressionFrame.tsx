import { FBExpressionT, FBFrameT } from '../../../model/frame-based'

type ExpressionFrameProps = {
  frame: FBExpressionT;
  editFrame: (frame: FBFrameT) => void;
  setIsEditingText: (isEditingText: boolean) => void;
}

const ExpressionFrame = ({ frame, editFrame, setIsEditingText }: ExpressionFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, text: event.target.value })
  }
  return (
    <div><input type="text" value={frame.text} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} /></div>
  )
}

export default ExpressionFrame;