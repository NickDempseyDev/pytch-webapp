import React from 'react'

type FramesHelpProps = {
	isActive: boolean
	setIsActive: (isActive: boolean) => void
}

const HelpItem = (props: { title: string, content: string, shortcut: string }) => {
	return (
		<div className='frames-help-item'>
			<h3>{props.title}</h3>
			<div className='frames-help-block'>
				<h5>Shortcut</h5>
				<p className='frames-help-font'>{props.shortcut}</p>
				<h5>Looks like</h5>
				<p className='frames-help-font'>{props.content}</p>
			</div>
		</div>
	)
}

const FramesHelp = (props: FramesHelpProps) => {

	const helpItems = [
		{
			title: 'Go To Frame',
			content: 'self.go_to_xy(0, 0)',
			shortcut: 'Shift and G'
		},
		{
			title: 'While Frame',
			content: 'while True:',
			shortcut: 'w'
		},
		{
			title: 'If Frame',
			content: 'if True:',
			shortcut: 'i'
		},
		{
			title: 'Change X Frame',
			content: 'self.change_x(0)',
			shortcut: 'Shift and X'
		},
		{
			title: 'Change Y Frame',
			content: 'self.change_y(0)',
			shortcut: 'Shift and Y'
		},
		{
			title: 'Hide Frame',
			content: 'self.hide()',
			shortcut: 'Shift and H'
		},
		{
			title: 'Assignment Frame',
			content: 'x = 0',
			shortcut: 'a'
		},
		{
			title: 'Say Frame',
			content: 'self.say("Hello")',
			shortcut: 'Shift and S'
		},
		{
			title: 'Broadcast Frame',
			content: 'pytch.broadcast("Hello")',
			shortcut: 'Shift and B'
		},
		{
			title: 'Broadcast and Wait Frame',
			content: 'pytch.broadcast_and_wait("Hello")',
			shortcut: 'Shift and W'
		},
		{
			title: 'Show Frame',
			content: 'self.show()',
			shortcut: 'Shift and R'
		}

	]

	return (
		<div className="show-frames-help">
			<div className='frames-help-header'>
				<h1>Frames Help</h1>
				<button onClick={() => props.setIsActive(false)}>Close Help</button>
			</div>
			<p>Some helpful information about frames.</p>
			{helpItems.map((item, index) => <HelpItem key={index} {...item} />)}
		</div>
	)
}

export default FramesHelp