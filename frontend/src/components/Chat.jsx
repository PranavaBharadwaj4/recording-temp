import { useState, useEffect } from 'react';
import {Fragment} from 'react';


function Chat({ user, chat, allusers }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [messages, setMessages] = useState(chat);

  useEffect(() => {
    // Scroll to the bottom of the chat window on initial load and whenever new messages are added
    const chatBody = document.getElementById('msg-list-div');
    chatBody.scrollTop = chatBody.scrollHeight;
  }, [chat]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (message.trim() === '') return;

    // Post the message to the server
    const response = await fetch('/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (response.ok) {
      // Clear the input field
      setMessage('');
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.addEventListener('dataavailable', (event) => {
        setRecording(event.data);
      });

      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStopRecording = async () => {
    try {
      mediaRecorder.stop();
      setIsRecording(false);

      // Create a blob from the recorded audio and append it to the list of audios
      const blob = new Blob([recording], { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(blob);
      const audioElement = document.createElement('audio');
      audioElement.src = audioUrl;
      document.getElementById('audios-container').appendChild(audioElement);

      // Post the audio to the server
      const response = await fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio: audioUrl }),
      });

      if (response.ok) {
        // Clear the recording and input fields
        setRecording(null);
        setMessage('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePauseRecording = () => {
    mediaRecorder.pause();
  };

  const handleResumeRecording = () => {
    mediaRecorder.resume();
  };

  return (
    

    <div className="row">
      <div className="col-lg-2" style={{ marginLeft: '20px', padding: '10px', border: 'solid darkblue' }}>
        <div className="container">
          {user.is_authenticated ? (
            <>
              <p style={{ color: 'black', fontSize: '18px' }}>
                Username: <b style={{ color: 'white' }}>{user.username}</b>
              </p>
              <p style={{ color: 'black', fontSize: '18px' }}>
                Total Messages: <b style={{ color: 'white' }}>{chat.length}</b>
              </p>

              <br />

              <h5 style={{ color: 'black', fontSize: '18px' }}>Users who participated in chat</h5>

              {allusers.map((obj) => (
                <p key={obj.username}>
                User Name: <b style={{ color: 'white' }}>{obj.username}</b>
                </p>
                ))}
                </>
                ) : null}
                </div>
                </div>
    <div className="col-lg-8">
        <div className="container">
            <div id="chat-body" className="panel panel-default">
                <div className="panel-heading" style={{ color: 'white', background: 'darkblue' }}>
                Speech to text Chat Box
                </div>
                <div id="msg-list-div" className="panel-body">
                <ul id="msg-list" className="list-group">
                    {chat.map((obj) => (
                    <Fragment key={obj.id}>
                        <b>{obj.user}</b>
                        {obj.user === user.username ? (
                        <li className="text-right list-group-item">{obj.message}</li>
                        ) : (
                        <li className="text-left list-group-item">{obj.message}</li>
                        )}
                    </Fragment>
                    ))}
                    {chat.length === 0 && <li className="text-right list-group-item">No messages yet!</li>}
                </ul>
                </div>
            </div>

            <br />

            <h3>Send Message</h3>

            <form id="chat-form" method="post" action="{% url 'chat:post' %}">
                <input type="hidden" name="csrfmiddlewaretoken" value="{{ csrf_token }}" />
                <div id="chat-bottom" className="input-group">
                <textarea
                    id="chat-msg"
                    name="chat-msg"
                    className="form-control"
                    style={{ border: 'solid darkblue' }}
                ></textarea>
                <span className="input-group-btn">
                    <input
                    className="btn btn-default"
                    id="send"
                    type="submit"
                    style={{ color: 'darkblue', padding: '16px' }}
                    value="Send"
                    />
                </span>
                </div>
            </form>

            <article>
                <header style={{ textAlign: 'center' }}></header>

                <section className="experiment">
                <br />
                <h3>Send Message: Speech to text</h3>
                <button id="start-recording">Start</button>
                <button id="stop-recording" disabled>Stop</button>

                <button id="pause-recording" disabled>Pause</button>
                <button id="resume-recording" disabled>Resume</button>
                </section>

                <section className="experiment">
                <div id="audios-container"></div>
                </section>
            </article>
        </div>
  </div>
</div>
    
)
}
export default Chat;

