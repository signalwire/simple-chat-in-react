import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";

function Channel({ selectedChannel, chatClient, channels }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();

    const publishMessage = async (ev) => {
        ev?.preventDefault();

        const content = message.trim();
        if (!content) {
            return;
        }

        await chatClient.publish({
            channel: selectedChannel,
            content
        });
        setMessage("");
    };

    const keyPress = (ev) => {
        if (ev.key === 'Enter' && ev.ctrlKey) {
            publishMessage();
        }
    };

    useEffect(() => {
        const onLoad = async () => {
            //Initially we don't strictly need the 'off' or 'unsubscribe'
            //but it's needed when the 'selectedChannel' prop changes and we need to cleanup before switching to the new channel
            chatClient.off("message");
            chatClient.on("message", (message) => {
                setMessages(oldMessages => [...oldMessages, message]);
            });
            try {
                await chatClient.unsubscribe(channels);
            } catch (_) { }
            await chatClient.subscribe(selectedChannel);

            const messageHistory = await chatClient.getMessages({
                channel: selectedChannel
            });

            if (messageHistory?.messages) {
                setMessages(messageHistory.messages.reverse());
            }

            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        };

        onLoad();
    }, [chatClient, selectedChannel]);

    return (
        <Container>
            <div style={{ 'height': '425px', 'overflowY': 'auto' }}>
                {messages.map(m => {
                    return <div key={m.id} style={{ 'background': 'lightblue', 'borderRadius': '10px', 'padding': '10px', 'margin': '5px 5px 5px 0' }}>
                        <div className='text-muted' style={{ 'marginBottom': '5px' }}>At <em>{m.publishedAt.toLocaleString()}</em> {m.member.id} sent:</div>
                        <span>{m.content}</span>
                    </div>
                })}
                <div ref={scrollRef}></div>
            </div>
            <Form onSubmit={publishMessage}>
                <Form.Control as="textarea" placeholder="Message to channel" value={message} onKeyUp={keyPress} onChange={(e) => setMessage(e.target.value)} />
                <div className='d-flex align-items-baseline'>
                    <Button className="mt-3 mx-3" variant="secondary" type="submit">
                        Send
                    </Button>
                    <Form.Text muted>Ctrl+Enter to send</Form.Text>
                </div>
            </Form>
        </Container>
    );
};

export default Channel;