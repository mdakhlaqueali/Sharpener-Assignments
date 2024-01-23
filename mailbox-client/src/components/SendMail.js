import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailReducer";
import { useRef, useState } from "react";
import axios from "axios";
import classes from "./SendMail.module.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { authActions } from "../store/authReducer";

const SendMail = () => {
  const recieverIdRef = useRef();
  const subjectRef = useRef();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);
  const senderUsername = email.split('@')[0];
  const editorState = EditorState.createEmpty();

  const onEditorStateChange = (editorState) => {
    const plainText= editorState.getCurrentContent().getPlainText();
    setMessage(plainText);
  };
  const submitHandler = (event) =>{
    event.preventDefault();
    const receiverEmail = recieverIdRef.current.value;
    dispatch(authActions.setReceiver(receiverEmail));
    const subject = subjectRef.current.value;
    const receiverUsername = receiverEmail.split('@')[0];

    const mailDetails = {
        from: email,
        to: receiverEmail,
        subject: subject,
        message: message,
    };

    axios.post(`https://mailbox-client-b0de0-default-rtdb.firebaseio.com/sent/${senderUsername}.json`, mailDetails)
    axios.post(`https://mailbox-client-b0de0-default-rtdb.firebaseio.com/inbox/${receiverUsername}.json`, mailDetails)
    .then((res) => {
        alert("Message sent successfully")
        console.log(res.data);
        dispatch(mailActions.addMail({
          from: email,
          to: receiverEmail,
          subject: subject,
          message: message,
          id: res.data.name,
        }))
    })
    .catch((err) => alert(err));
  }

  return (
    <div className={classes.mail}>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Control placeholder="To" type="text" id="toAddress" required ref={recieverIdRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            placeholder="Subject"
            type="text"
            id="subject"
            ref={subjectRef}
          />
        </Form.Group>
        <div>
            <Editor
              EditorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName={classes.wrapper}
              editorClassName={classes.editor}
              toolbarClassName={classes.toolBar}
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
        </div>
        <Button type="submit" variant="primary">Send</Button>
      </Form>
    </div>
  );
};
export default SendMail;
