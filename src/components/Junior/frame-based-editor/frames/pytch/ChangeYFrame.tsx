import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchChangeYT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type ChangeYFrameProps = {
	frame: FBPytchChangeYT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const ChangeYFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: ChangeYFrameProps) => {
	const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, amount: parseFloat(event.target.value) } })
	}

	return (
		<div>
			self.change_x(<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.amount} onChange={changeValueInput} />)
		</div>
	)
}

export default ChangeYFrame;