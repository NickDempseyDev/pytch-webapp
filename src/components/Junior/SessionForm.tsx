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

	const participantCodes = [
		"rf9y-htkv",
		"xqd6-4qh7",
		"hjw9-bb4t",
		"t7pj-3ftk",
		"y3b6-h7h7",
		"6677-jrkj",
		"39w8-vjbm",
		"3qwc-dfdm",
		"r7bp-pkgt",
		"74hp-bdqh",
		"dqjk-vh37",
		"jmg4-t4fj",
		"b8jv-rcq8",
		"gtbm-kpv8",
		"hp4w-mj63",
		"v4dx-ym9c",
		"px6j-rdtp",
		"rp8w-6rm8",
		"ygb8-6h3m",
		"hpg7-mxbr",
		"g8mx-wcmg",
		"d3b4-7ytt",
		"jmhd-hwt9",
		"c9d9-m8tf",
		"9v9d-9mxb",
		"kjbr-vq4r",
		"388w-ytvw",
		"7qgy-mfpt",
		"xwh9-t8wd",
		"8ygy-w7d6",
		"9yh8-8qm8",
		"vmqw-mqcc",
		"cvcj-3ptf",
		"v3hc-rbx7",
		"4tt7-688j",
		"pxmj-9394",
		"6796-k8vd",
		"kkr4-gqbm",
		"qtjj-x4pv",
		"phxc-7w9r",
		"88ft-dm4g",
		"fhcw-ddp4",
		"7hpj-mhk6",
		"rdbr-xvkk",
		"q3ty-qhfg",
		"qjmy-tdhd",
		"t438-4yyw",
		"pdyp-b9kk",
		"4kp9-hyym",
		"4k9d-8wpf",
		"dojo"
	]

	if (!participantCodes.includes(participantCode)) {
		setIsErr(true)
		return
	}

	const studyCode = '39e47a8d-9563-48dd-a5d4-d03a875f2dca'

	if (participantCode === 'dojo') {
		localStorage.setItem('participantCode', participantCode)
		localStorage.setItem('sessionCode', "dojo")
		localStorage.setItem('isLogging', "false")
		setHasTokens(true)
		setSuccess(true)
		return
	}

	createSessionRequest(studyCode, participantCode).then(data => {
		if (data.token) {
			console.log('Session created successfully', data.token);
			localStorage.setItem('participantCode', participantCode)
			localStorage.setItem('sessionCode', data.token)
			localStorage.setItem('isLogging', "true")
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