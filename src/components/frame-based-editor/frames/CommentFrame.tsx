import { FBCommentT, FBFrameT } from '../../../model/frame-based'

type CommentFrameProps = {
  frame: FBCommentT
  editFrame: (frame: FBFrameT) => void
}

const CommentFrame = ({ frame, editFrame }: CommentFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, text: event.target.value })
  }
  return (
    <div># <input type="text" value={frame.text} onChange={changeInput} /></div>
  )
}

export default CommentFrame;