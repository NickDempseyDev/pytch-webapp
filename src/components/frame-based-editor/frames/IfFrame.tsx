import { FBIfT } from "../../../model/frame-based"

const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value)
}

type IfFrameProps = {
  frame: FBIfT
}

const IfFrame = ({ frame }: IfFrameProps) => {
  return (
    <div>if <input type="text" value={frame.booleanExpression} />:</div>
  )
}

export default IfFrame;