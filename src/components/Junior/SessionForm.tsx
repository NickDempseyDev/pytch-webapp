import { useState } from "react";
import { studyUrlBase } from "../../model/project";

type SessionFormProps = {
	setHasTokens: (hasTokens: boolean) => void
}


const createSessionRequest = async (studyCode: string, participantCode: string) => {
	const response = await fetch(`${studyUrlBase}/sessions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ studyCode, participantCode }),
	})
	const data = await response.json()
	return data
}

const createSession = (participantCode: string, setIsErr: (isErr: boolean) => void, setHasTokens: (hasTokens: boolean) => void, setSuccess: (success: boolean) => void) => {

	if (participantCode === '' || participantCode === undefined || participantCode === null) {
		setIsErr(true)
		return
	}

	const studyCode = '39e47a8d-9563-48dd-a5d4-d03a875f2dca'

	createSessionRequest(studyCode, participantCode).then(data => {
		if (data.token) {
			console.log('Session created successfully', data.token);
			localStorage.setItem('participantCode', participantCode)
			localStorage.setItem('sessionCode', data.token)
			setHasTokens(true)
			setSuccess(true)
		}
	})

}

const SessionForm = (props: SessionFormProps) => {
	const [participantCode, setParticipantCode] = useState('')
	const [isErr, setIsErr] = useState(false)
	const [success, setSuccess] = useState(false)
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<h1>Please enter your participant code that is on your questionnaire</h1>
			{isErr && <p style={{ color: 'red' }}>Please enter a valid participant code</p>}
			{success && <p style={{ color: 'green' }}>Session created successfully</p>}
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '2em' }}>
				<input type="text" id="participantCode" onChange={(e) => setParticipantCode(e.target.value)} />
				<button onClick={() => createSession(participantCode, setIsErr, props.setHasTokens, setSuccess)}>Submit</button>
			</div>
		</div>
	)
}

export default SessionForm