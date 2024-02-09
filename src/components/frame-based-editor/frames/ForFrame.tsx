import { FBForT, FBFrameT } from '../../../model/frame-based'

type ForFrameProps = {
  frame: FBForT
  editFrame: (frame: FBFrameT) => void
  setIsEditingText: (isEditingText: boolean) => void
}

const ForFrame = ({ frame, editFrame, setIsEditingText }: ForFrameProps) => {
  const changeIteratorInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, iterator: event.target.value })
  }

  const changeCollectionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, collection: event.target.value })
  }

  return (
    <div>for <input type="text" value={frame.iterator} onChange={changeIteratorInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} /> in <input type="text" value={frame.collection} onChange={changeCollectionInput} onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} />:</div>
  )
}

export default ForFrame;