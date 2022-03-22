import React from "react";
import { Stack, Button } from "react-bootstrap";

function Sidenav({ setSelectedChannel, channels }) {
    return (

        <Stack gap={2} className="mx-auto">
            {channels.map(c => <Button key={c} variant="outline-secondary" onClick={() => setSelectedChannel(c)}>{c}</Button>)}
        </Stack>
    );
};

export default Sidenav;