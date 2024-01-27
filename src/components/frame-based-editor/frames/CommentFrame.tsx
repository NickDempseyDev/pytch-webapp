import { FBCommentT } from '../../../model/frame-based'

type CommentFrameProps = {
  frame: FBCommentT
}

const CommentFrame = ({ frame }: CommentFrameProps) => {
  return (
    <div># <input type="text" value={frame.text} /></div>
  )
}

export default CommentFrame;