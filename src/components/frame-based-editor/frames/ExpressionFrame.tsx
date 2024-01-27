import { FBExpressionT } from '../../../model/frame-based'

type ExpressionFrameProps = {
  frame: FBExpressionT
}

const ExpressionFrame = ({ frame }: ExpressionFrameProps) => {
  return (
    <div><input type="text" value={frame.text} /></div>
  )
}

export default ExpressionFrame;