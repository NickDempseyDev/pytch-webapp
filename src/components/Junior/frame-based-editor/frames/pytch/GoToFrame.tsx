import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchGoToT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type GoToFrameProps = {
	frame: FBPytchGoToT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const GoToFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: GoToFrameProps) => {
	const changeXValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, x: parseInt(event.target.value) } })
	}

	const changeYValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, y: parseInt(event.target.value) } })
	}

	return (
		<div>
			self.got_to_xy(<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.x} onChange={changeXValueInput} />, <input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.y} onChange={changeYValueInput} />)
		</div>
	)
}

export default GoToFrame;