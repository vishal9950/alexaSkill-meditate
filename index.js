const Alexa = require('ask-sdk');

const SKILL_NAME = 'Meditate me';
const START_MEDITATION_MESSAGE = 'Hi There! I\'ll be your guide for the meditation. Please defer the use of any gadgets for just 2 minutes and follow my instructions. ';
const HELP_MESSAGE = 'You can say meditate me, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Be Inspired, Goodbye!';
const CARD_DISPLAY_MESSAGE = 'Hi There! I\'ll be your guide for the meditation.';

const stepsToMeditate = [
  'Close your eyes, and let go of the outside world. <break time="1s" />',
  'Monitor your breath. <break time="0.5s" /> Every inhale <break time="1.5s" /> and exhale. <break time="0.5s" />',
  'In <break time="2s" /> and out. <break time="2s" />',
  'In <break time="2s" /> and out. <break time="2s" />',
  'Forget every thought, positive <break time="0.5s" /> or negative. <break time="2s" />',
  'Breathing in <break time="2s" /> and out. <break time="2s" />',
  'In <break time="2s" /> and out. <break time="2s" />',
  'In <break time="2s" /> and out. <break time="5s" />',
  'Now <break time="1s" /> not losing your momentum, <break time="1s" /> think how you can make the rest of your day productive <break time="0.5s" /> and useful. <break time="10s" />',
  'I\'ll ask you to open your eyes, but <break time="1s" /> when you do <break time="0.5s" /> you will feel refreshed <break time="0.5s" /> and energized. <break time="2s" />',
  'You will do your best <break time="0.5s" /> to make good use of the rest of the time in this day. <break time="2s" />',
  'You can open your eyes now. <break time="1s" />',
  'Take care! and be Inspired!',
];

const StartMeditationHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'StartMeditationIntent');
  },
  handle(handlerInput) {
    let speechOutput = START_MEDITATION_MESSAGE;
    stepsToMeditate.map((eachStep) => {
      speechOutput += eachStep;
      return true;
    });
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, CARD_DISPLAY_MESSAGE)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    StartMeditationHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
