import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchBroadcastT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type BroadcastFrameProps = {
	frame: FBPytchBroadcastT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const BroadcastFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: BroadcastFrameProps) => {
	const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, message: event.target.value } })
	}

	return (
		<div>
			pytch.broadcast(<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.message} onChange={changeValueInput} />)
		</div>
	)
}

export default BroadcastFrame;