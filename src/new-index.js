/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).


var states = {
    STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.
    ASKMODE: '_ASKMODE',                    // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE'     // Alexa is describing the final choice and prompting to start again or quit
};

var academicQuotes = ['Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Failure is simply the opportunity to begin again, this time more intelligently.'];  // Array of items
var financeQuotes = ['wealth is not everything.', 'money is the root of evil.'];
// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler);
    alexa.execute();
};

var welcomeMessage = "I'm sorry to hear that. Do you want to talk about it?";
var reason = "";
var repeatWelcomeMessage = "I'm sorry I didn't understand that. Say yes so that maybe I can help you.";
var promptToStartMessage = "Are you still here?";
var helpMessage = "I will ask you some questions to identify the cause of your depression. Want to start now?";

// set state to start up and  welcome the user
var newSessionHandler = {
  'LaunchRequest': function () {
  //  this.handler.state = states.STARTMODE;
    this.emit(':ask',welcomeMessage);
  },'AMAZON.HelpIntent': function () {
   // this.handler.state = states.STARTMODE;
    this.emit(':ask', helpMessage, helpMessage);
  },
   'GetHelp': function () {
   // this.handler.state = states.STARTMODE;
    var decision= this.event.request.intent.slots.Answer.value;
       if(decision === 'yes'||decision === 'yeah'){
           this.emit(':tell', 'You are not alone, and it does get better. ' + randomPhrase());
       }else if(decision === 'no'||decision === 'nah'){
           this.emit(':tell', 'That\'s alright, but remember I am here if you need me. Also, you can call 9-1-1')
       }
   },
  'Academics': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.academics_slot.value;
    welcomeMessage  = "I'm sorry to hear about your"+reason+". I have a few things in mind to make you feel better. The first is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(academicQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Realtionships': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.realtionships_slot.value;
    welcomeMessage  = "I'm sorry to hear about your"+reason+". I have a few things in mind to make you feel better. The first is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(academicQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Finance': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.finance_slot.value;
    welcomeMessage  = "I'm sorry to hear about your"+reason+". I have a few things in mind to make you feel better. The first is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(academicQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Work': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.work_slot.value;
    welcomeMessage  = "I'm sorry to hear about your"+reason+". I have a few things in mind to make you feel better. The first is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(academicQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Other': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.other_slot.value;
    welcomeMessage  = "I'm sorry to hear about your"+reason+". I have a few things in mind to make you feel better. The first is some words that I think will inspire you.";
    welcomeMessage+=randomPhrase(academicQuotes);
    this.emit(':ask',welcomeMessage);
   }
  },
  'Unhandled': function () {
  //  this.handler.state = states.STARTMODE;
    //this.emit(':ask', helpMessage, helpMessage);
    this.emit(':ask', repeatWelcomeMessage, repeatWelcomeMessage);
  },
};

function randomPhrase(section) {
    // the argument is an array [] of words or phrases
     
    var i = 0;
    
    i = Math.floor(Math.random() *section.length);

    return(section[i]);
}




