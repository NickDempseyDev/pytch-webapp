import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBCommentT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { Uuid } from '../../../../model/junior/structured-program';

type CommentFrameProps = {
  frame: FBCommentT
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const CommentFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: CommentFrameProps) => {
  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, text: event.target.value } })
  }
  return (
    <div># <input spellCheck={false} type="text" value={frame.text} onChange={changeInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} /></div>
  )
}

export default CommentFrame;