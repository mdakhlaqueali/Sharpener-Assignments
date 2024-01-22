import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";
import classes from "./Mail.module.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

const Mail = () => {
  const recieverIdRef = useRef();
  const subjectRef = useRef();
  const [message, setMessage] = useState('');

  const email = useSelector((state) => state.auth.email);
  const senderUsername = email.split('@')[0];
  const editorState = EditorState.createEmpty();

  const onEditorStateChange = (editorState) => {
    const plainText= editorState.getCurrentContent().getPlainText();
    setMessage(plainText);
  };
  const submitHandler = (event) =>{
    event.preventDefault();
    const recieverEmail = recieverIdRef.current.value;
    const subject = subjectRef.current.value;
    const recieverUsername = recieverEmail.split('@')[0];

    const mailDetails = {
        to: recieverEmail,
        subject: subject,
        message: message,
    };

    const url = `https://mailbox-client-b0de0-default-rtdb.firebaseio.com/${senderUsername}/${recieverUsername}.json`;
    axios.post(url, mailDetails)
    .then((res) => {
        console.log(res.data);
        console.log("my", mailDetails);
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
export default Mail;
