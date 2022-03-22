import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Chat } from '@signalwire/js';
import { Container, Row, Form, Button } from "react-bootstrap";

function Login({ onLoggedIn }) {
    const [username, setUsername] = useState("");
    const [channelsString, setChannelsString] = useState("");
    const navigate = useNavigate();

    const login = async (ev) => {
        ev.preventDefault();
        const member_id = username.trim();
        const channels = channelsString.split(',').map(c => c.trim()).filter(c => c);

        if (!member_id || channels.length === 0)
            return;

        const reply = await axios.post("http://localhost:3001/get_chat_token", {
            member_id,
            channels
        });

        const chatClient = new Chat.Client({
            token: reply.data.token
        });
        // Temporary cache fix
        chatClient.cleanupEventHandlerTransformCache = () => { }
        window.chatClient = chatClient;

        onLoggedIn(member_id, channels, chatClient);

        navigate("/home");
    }
    return (
        <Container className="mt-3">
            <Row className="d-flex align-items-center">
                <h2>Chat Example</h2>
                <Form onSubmit={login}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            className="text-muted"
                            id="username"
                            placeholder="example: Morpheus"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Channels to join</Form.Label>
                        <Form.Control
                            type="text"
                            className="text-muted"
                            id="channels"
                            placeholder="example: Office, Game Room"
                            onChange={(e) => setChannelsString(e.target.value)}
                        />
                        <div className="form-text">
                            Separate multiple channels with a comma.
                        </div>
                    </Form.Group>
                    <Button type="submit" variant="primary">Join Chat</Button>
                </Form>
            </Row>
        </Container>
    );
};

export default Login;