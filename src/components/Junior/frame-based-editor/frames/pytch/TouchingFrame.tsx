import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchTouchingT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type TouchingFrameProps = {
	frame: FBPytchTouchingT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const TouchingFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: TouchingFrameProps) => {
	const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, object: event.target.value } })
	}

	return (
		<div>
			self.touching(<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.object} onChange={changeValueInput} />)
		</div>
	)
}

export default TouchingFrame;