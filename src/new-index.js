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

var config = {};
config.IOT_BROKER_ENDPOINT      = "a4xbd0ynwllyo.iot.us-east-1.amazonaws.com";  // also called the REST API endpoint
config.IOT_BROKER_REGION        = "us-east-1";  // eu-west-1 corresponds to the Ireland Region.  Use us-east-1 for the N. Virginia region
config.IOT_THING_NAME           = "baymax";

var states = {
    STARTMODE: '_STARTMODE',                // Prompt the user to start or restart the game.
    ASKMODE: '_ASKMODE',                    // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE'     // Alexa is describing the final choice and prompting to start again or quit
};

var academicsQuotes = ['Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Failure is simply the opportunity to begin again, this time more intelligently.', 'Failure isnt fatal, but failure to change might be', 'Giving up is the only sure way to fail', 'Failure should be our teacher, not our undertaker. Failure is delay, not defeat.  It is a temporary detour, not a dead end. Failure is something we can avoid only by saying nothing, doing nothing, and being nothing'];  // Array of items
var relationshipsQuotes = ['Cry. Forgive. Learn. Move on. Let your tears water the seeds of your future happiness', 'relationship quote 2', 'The weak can never forgive. Forgiveness is the attribute of the strong ', 'There is no love without forgiveness, and there is no forgiveness without love.', 'Anger makes you smaller, while forgiveness forces you to grow beyond what you were', 'In finding love, I think it is important to be patient. In being in a relationship, I think it is important to be honest, to communicate, to respect and trust, and to strive to give more than you take. '];
var financeQuotes = ['Money would not create success, the freedom to make it will', 'Success is not measured by money or power or social rank. Success is measured by your discipline and inner peace.', 'You have reached the pinnacle of success as soon as you become uninterested in money, compliments, or publicity.', 'The greatest legacy one can pass on to ones children and grandchildren is not money or other material things accumulated in ones life, but rather a legacy of character and faith.'];
var workQuotes = ['There are no secrets to success. It is the result of preparation, hard work, and learning from failure', 'Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work', 'Perseverance is the hard work you do after you get tired of doing the hard work you already did.', 'Far and away the best prize that life has to offer is the chance to work hard at work worth doing ', 'I know the price of success: dedication, hard work, and an unremitting devotion to the things you want to see happen'];
var otherQuotes = ['We tend to forget that happiness doesn’t come as a result of getting something we don’t have, but rather of recognizing and appreciating what we do have', 'I believe in pink. I believe that laughing is the best calorie burner. I believe in kissing, kissing a lot. I believe in being strong when everything seems to be going wrong. I believe that happy girls are the prettiest girls. I believe that tomorrow is another day and I believe in miracles', 'Only those who will risk going too far can possibly find out how far one can go'];

// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler);
    alexa.execute();
};

var welcomeMessage = "I'm sorry to hear that. You are not alone, and it does get better. Do you want to talk about it?";
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
           this.emit(':tell', 'Ok, I am listening. Tell me a word or sentence that describes how you feel.');
       }else if(decision === 'no'||decision === 'nah'){
           this.emit(':tell', 'That\'s alright, but remember I am here if you need me. Also, you can call 9-1-1')
       }
   },
  'Academics': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.academics_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to academics. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you,";
    welcomeMessage+=randomPhrase(academicsQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Relationships': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.realtionships_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to relationships. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you,";
    welcomeMessage+=randomPhrase(relationshipsQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Finance': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.finance_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to finance. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you,";
    welcomeMessage+=randomPhrase(financeQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Work': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.work_slot.value;
    welcomeMessage  = "I'm sorry to hear about your issue related to work. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you,";
    welcomeMessage+=randomPhrase(workQuotes);
    this.emit(':ask',welcomeMessage);
   },
  'Other': function () {
   // this.handler.state = states.STARTMODE;
    reason = this.event.request.intent.slots.other_slot.value;
    welcomeMessage  = "I'm sorry to hear that. I do not have specific advice for your situation. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you,";
    welcomeMessage+=randomPhrase(otherQuotes);
    this.emit(':ask',welcomeMessage);
        updateShadow("philadelphia", status => {

            this.emit(':ask', "I have opened some inspiration music for you");

        });
   },
  'Unhandled': function () {
  //  this.handler.state = states.STARTMODE;
    //this.emit(':ask', helpMessage, helpMessage);
    welcomeMessage  = "I'm sorry to hear that. I do not have specific advice for your situation. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you,";
    welcomeMessage+=randomPhrase(otherQuotes);
    this.emit(':ask',welcomeMessage);
    //this.emit(':ask', repeatWelcomeMessage, repeatWelcomeMessage);
  },
};

function randomPhrase(section) {
    // the argument is an array [] of words or phrases
     
    var i = 0;
    
    i = Math.floor(Math.random() *section.length);

    return(section[i]);
}


function updateShadow(desiredState, callback) {
    // update AWS IOT thing shadow
    var AWS = require('aws-sdk');
    AWS.config.region = config.IOT_BROKER_REGION;

    //Prepare the parameters of the update call

    var paramsUpdate = {
        "thingName" : config.IOT_THING_NAME,
        "payload" : JSON.stringify(
            { "state":
                { "desired": desiredState             // {"pump":1}
                }
            }
        )
    };

    var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});

    iotData.updateThingShadow(paramsUpdate, function(err, data)  {
        if (err){
            console.log(err);

            callback("not ok");
        }
        else {
            console.log("updated thing shadow " + config.IOT_THING_NAME + ' to state ' + paramsUpdate.payload);
            callback("ok");
        }

    });


}
