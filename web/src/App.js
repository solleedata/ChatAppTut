import TextField from "@material-ui/core/TextField"
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import "./App.css"

const socket = io.connect('http://localhost:4000/')

function App() {
	const [state, useState] = useState({ message: '', name: '' })
	const [chat, setChat] = useState([])

	useEffect(() => {
		socket.on('message', ({ name, message }) => {
			setChat([...chat, { name, message }])
		})
	})

	const onTextChange = e => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		e.preventDefault()
		const { name, message } = state
		socket.emit('message', { name, message })
		setState({ message: '', name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>{name}: <span>{message}</span> </h3>
			</div>
		))
	}
	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name='name' onChange={e => onTextchange(e)} value={state.name} label='Name' />
				</div>
				<div className="name-field">
					<TextField name='message' onChange={e => onTextchange(e)} value={state.message} id='outlined-multiline-static' variant='outlined' label='message' />
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat log</h1>

			</div>
		</div>
	)
}

export default App