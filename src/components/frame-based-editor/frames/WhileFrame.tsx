import { FBWhileT } from '../../../model/frame-based'

type WhileFrameProps = {
  frame: FBWhileT
}

const WhileFrame = ({ frame }: WhileFrameProps) => {
  return (
    <div>while <input type="text" value={frame.booleanExpression} />:</div>
  )
}

export default WhileFrame;