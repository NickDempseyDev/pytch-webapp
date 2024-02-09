import { FBCommentT, FBFrameT } from '../../../model/frame-based'

type CommentFrameProps = {
  frame: FBCommentT
  editFrame: (frame: FBFrameT) => void
  setIsEditingText: (isEditingText: boolean) => void
}

const CommentFrame = ({ frame, editFrame, setIsEditingText }: CommentFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, text: event.target.value })
  }
  return (
    <div># <input type="text" value={frame.text} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} /></div>
  )
}

export default CommentFrame;