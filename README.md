# Simple Chat Demo With React

This example demonstrates how to utilize the SignalWire Chat API in a standalone IP message bus incorporating a React UI. Please visit our [Full Guide](https://developer.signalwire.com/apis/docs/build-a-react-chat-application) to see how this application was developed step-by-step.

## Configuration

Start by copying the `env.example` file to a file named `.env`, and fill in the necessary information.

The application requires a SignalWire API token. 

If you don't already have a SignalWire account, you can sign up [here](https://signalwire.com/signup). Your account will be made in trial mode, which you can exit by making a manual top up of $5.00. You can find more information on the [Trial Mode resource page](https://signalwire.com/resources/getting-started/trial-mode).

In the API section of your SignalWire space, you can find the Project ID, API Token, and Space URL to add to the `.env` file as `PROJECT_ID`, `API_TOKEN`, and `SPACE_URL`.

## Running the application

If you are running the application locally, first run `npm install`, followed by `npm start`.

If you prefer to run the application via Docker, first build the image with `docker build -t chatdemo .` followed by `docker run -it --rm -p 3001:3001 --name chatdemo --env-file .env chatdemo`.

Either way, after starting the application, head to `http://localhost:3001` to see the demo in action.

## Useful Links

[Getting Started with SignalWire](https://signalwire.com/resources/getting-started/signalwire-101)

[Getting Started with Chat](https://developer.signalwire.com/apis/docs/chat-first-steps)

[Step-by-step Guide](https://developer.signalwire.com/apis/docs/build-a-react-chat-application)

[Chat API Reference](https://developer.signalwire.com/apis/reference/create_token)

Please feel free to reach out to us on our [Community Slack](https://signalwire-community.slack.com/) or create a Support ticket if you need guidance!
