import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchKeyPressedT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type KeyPressedFrameProps = {
	frame: FBPytchKeyPressedT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const KeyPressedFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: KeyPressedFrameProps) => {
	const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, key: event.target.value } })
	}

	return (
		<div>
			pytch.key_pressed(<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.key} onChange={changeValueInput} />)
		</div>
	)
}

export default KeyPressedFrame;