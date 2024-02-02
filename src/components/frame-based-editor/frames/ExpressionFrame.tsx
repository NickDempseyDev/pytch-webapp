import { FBExpressionT, FBFrameT } from '../../../model/frame-based'

type ExpressionFrameProps = {
  frame: FBExpressionT;
  editFrame: (frame: FBFrameT) => void;
}

const ExpressionFrame = ({ frame, editFrame }: ExpressionFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, text: event.target.value })
  }
  return (
    <div><input type="text" value={frame.text} onChange={changeInput} /></div>
  )
}

export default ExpressionFrame;