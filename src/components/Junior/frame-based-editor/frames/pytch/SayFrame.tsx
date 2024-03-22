import { ThunkCreator, ActionCreator } from 'easy-peasy';
import { FBPytchSayT, FrameUpdateDescriptor } from '../../../../../model/frame-based';
import { Uuid } from '../../../../../model/junior/structured-program';

type SayFrameProps = {
	frame: FBPytchSayT;
	handlerId: Uuid;
	actorId: Uuid;
	editFrame: ThunkCreator<FrameUpdateDescriptor, any>;
	setIsEditingText: ActionCreator<boolean>;
}

const SayFrame = ({ frame, editFrame, setIsEditingText, actorId, handlerId }: SayFrameProps) => {
	const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		editFrame({ actorId, handlerId, newFrame: { ...frame, message: event.target.value } })
	}

	return (
		<div>
			self.say("<input onFocus={() => setIsEditingText(true)} onBlur={() => setIsEditingText(false)} value={frame.message} onChange={changeValueInput} />")
		</div>
	)
}

export default SayFrame;