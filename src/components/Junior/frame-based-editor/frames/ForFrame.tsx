import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBForT, FBFrameT, FrameUpdateDescriptor } from '../../../../model/frame-based'
import { Uuid } from '../../../../model/junior/structured-program';

type ForFrameProps = {
  frame: FBForT
  handlerId: Uuid;
  actorId: Uuid;
  editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
  setIsEditingText: ActionCreator<boolean>;
}

const ForFrame = ({ frame, editFrame, setIsEditingText, handlerId, actorId }: ForFrameProps) => {
  const changeIteratorInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, iterator: event.target.value } })
  }

  const changeCollectionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ actorId, handlerId, newFrame: { ...frame, collection: event.target.value } })
  }

  return (
    <div>for <input spellCheck={false} type="text" value={frame.iterator} onChange={changeIteratorInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} /> in <input spellCheck={false} type="text" value={frame.collection} onChange={changeCollectionInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />:</div>
  )
}

export default ForFrame;