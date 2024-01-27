import { FBForT } from '../../../model/frame-based'

type ForFrameProps = {
  frame: FBForT
}

const ForFrame = ({ frame }: ForFrameProps) => {
  return (
    <div>for <input type="text" value={frame.iterator} /> in <input type="text" value={frame.collection} />:</div>
  )
}

export default ForFrame;