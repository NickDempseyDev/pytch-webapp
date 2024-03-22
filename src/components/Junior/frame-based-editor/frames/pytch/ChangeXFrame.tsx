import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchChangeXT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type ChangeXFrameProps = {
	frame: FBPytchChangeXT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const ChangeXFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: ChangeXFrameProps) => {
	const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, amount: event.target.value } })
	}

	return (
		<div>
			self.change_x(<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.amount} onChange={changeValueInput} />)
		</div>
	)
}

export default ChangeXFrame;