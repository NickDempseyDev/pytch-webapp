import { FBIfT } from '../../../model/frame-based'

type FBIfProps = {
  frame: FBIfT
}

const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value)
}

const FBIf = ({ frame } : FBIfProps) => {
  return (
	  <div>if <input type="text" value={frame.booleanExpression}/>:</div>
  )
}

export default FBIf