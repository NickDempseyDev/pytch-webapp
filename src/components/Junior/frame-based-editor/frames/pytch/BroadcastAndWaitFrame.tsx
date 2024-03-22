import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchBroadcastAndWaitT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type BroadcastAndWaitFrameProps = {
	frame: FBPytchBroadcastAndWaitT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const BroadcastAndWaitFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: BroadcastAndWaitFrameProps) => {
	const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, message: event.target.value } })
	}

	return (
		<div>
			pytch.broadcast_and_wait("<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.message} onChange={changeValueInput} />")
		</div>
	)
}

export default BroadcastAndWaitFrame;