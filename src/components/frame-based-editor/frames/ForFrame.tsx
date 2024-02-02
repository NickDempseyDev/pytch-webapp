import { FBForT, FBFrameT } from '../../../model/frame-based'

type ForFrameProps = {
  frame: FBForT
  editFrame: (frame: FBFrameT) => void
}

const ForFrame = ({ frame, editFrame }: ForFrameProps) => {
  const changeIteratorInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, iterator: event.target.value })
  }

  const changeCollectionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    editFrame({ ...frame, collection: event.target.value })
  }

  return (
    <div>for <input type="text" value={frame.iterator} onChange={changeIteratorInput} /> in <input type="text" value={frame.collection} onChange={changeCollectionInput} />:</div>
  )
}

export default ForFrame;