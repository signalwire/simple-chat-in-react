import { Container, Row, Col, Button } from "react-bootstrap";
import Sidenav from "../components/Sidenav";
import Channel from "../components/Channel";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ channels, username, chatClient }) {
    const [selectedChannel, setSelectedChannel] = useState(channels[0]);
    let navigate = useNavigate();

    useEffect(() => {
        if (!username || !channels) {
            navigate('/')
        }
    }, [])

    return (
        <Container className='container-sm mt-5'>
            <Row className="text-center mt-4">
                <h1>Welcome to the {selectedChannel} channel, {username}!</h1>
                <div><Button href="/" variant="secondary">Back to login</Button></div>
            </Row>
            <Row className='justify-content-center'>
                <Col sm={3} className="mt-3" >
                    <Sidenav setSelectedChannel={setSelectedChannel} channels={channels} />
                </Col>
                <Col sm={7} className="mt-3" >
                    <Channel selectedChannel={selectedChannel} chatClient={chatClient} channels={channels} />
                </Col>
            </Row>
        </Container>
    );
};

export default Home;