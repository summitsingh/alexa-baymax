/*
Revised by Summit Singh Thakur on 7/24/2017

Alexa Baymax
• Enable this Alexa Skill using this link: https://www.amazon.com/Summit-Singh-Thakur-Baymax/dp/B0744J4GD5/

Info
• Created Amazon Alexa skill in Node.js to enable Alexa to empathize with and help a user who is feeling low
• Awarded Best Voice User Experience Using Amazon Alexa - Sponsored by Amazon
• Capabilities include: probing user for the cause of low mood, playing soothing music, reciting inspirational quote
• Will give option later to call loved ones and/or suicide prevention services
• Ideated and implemented at HackPrinceton, 2017
• Devpost: https://devpost.com/software/alexa-baymax

Team Members
• Summit Singh Thakur (Project Manager and Lead Developer) (st866@drexel.edu)
• Shivansh Suhane (Developer) (ss4328@drexel.edu)
• Norah Chelagat Borus (Developer) (nborus@stanford.edu)
• Zhaohan Yan (Developer) (zy134@scarletmail.rutgers.edu)
*/
'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

var academicsQuotes = ['Success is not final, failure is not fatal: it is the courage to continue that counts.', 'Failure is simply the opportunity to begin again, this time more intelligently.', 'Failure isnt fatal, but failure to change might be', 'Giving up is the only sure way to fail', 'Failure should be our teacher, not our undertaker. Failure is delay, not defeat.  It is a temporary detour, not a dead end. Failure is something we can avoid only by saying nothing, doing nothing, and being nothing'];
var relationshipsQuotes = ['Cry. Forgive. Learn. Move on. Let your tears water the seeds of your future happiness', 'The weak can never forgive. Forgiveness is the attribute of the strong ', 'There is no love without forgiveness, and there is no forgiveness without love.', 'Anger makes you smaller, while forgiveness forces you to grow beyond what you were', 'In finding love, I think it is important to be patient. In being in a relationship, I think it is important to be honest, to communicate, to respect and trust, and to strive to give more than you take. '];
var financeQuotes = ['Money would not create success, the freedom to make it will', 'Success is not measured by money or power or social rank. Success is measured by your discipline and inner peace', 'You have reached the pinnacle of success as soon as you become uninterested in money, compliments, or publicity', 'The greatest legacy one can pass on to ones children and grandchildren is not money or other material things accumulated in ones life, but rather a legacy of character and faith'];
var workQuotes = ['There are no secrets to success. It is the result of preparation, hard work, and learning from failure', 'Talent is cheaper than table salt. What separates the talented individual from the successful one is a lot of hard work', 'Perseverance is the hard work you do after you get tired of doing the hard work you already did.', 'Far and away the best prize that life has to offer is the chance to work hard at work worth doing ', 'I know the price of success: dedication, hard work, and an unremitting devotion to the things you want to see happen'];
var otherQuotes = ['We tend to forget that happiness doesn’t come as a result of getting something we don’t have, but rather of recognizing and appreciating what we do have', 'I believe in pink. I believe that laughing is the best calorie burner. I believe in kissing, kissing a lot. I believe in being strong when everything seems to be going wrong. I believe that happy girls are the prettiest girls. I believe that tomorrow is another day and I believe in miracles', 'Only those who will risk going too far can possibly find out how far one can go'];

// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler);
    alexa.execute();
};

var newSessionHandler = {
    'LaunchRequest': function() {
        this.emit(':ask', welcomeMessage + helpMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', welcomeMessage + helpMessage);
    },
    'GetHelp': function() {
        var decision = this.event.request.intent.slots.Answer.value;
        if (decision === 'yes' || decision === 'yeah') {
            this.emit(':ask', 'Ok, I am listening. Tell me a word or sentence that describes your troubles <break time=\"1s\"/>');
        } else if (decision === 'no' || decision === 'nah') {
            this.emit(':tell', 'That\'s alright, but remember I am here if you need me. Here is a quote to make you feel better <break time=\"1s\"/>' + randomPhrase(otherQuotes) + '<break time=\"1s\"/> Good bye, and remember I am here if you need me');
        }
    },
    'Academics': function() {
        var academic_reason = this.event.request.intent.slots.academics_slot.value;
        var academic_welcomeMessage = "I'm sorry to hear that you are having a hard time with academics. Here is a quote to make you feel better <break time=\"2s\"/>";
        academic_welcomeMessage += randomPhrase(academicsQuotes) + "<break time=\"1s\"/> I hope these words have given you some peace of mind <break time=\"1s\"/>";
        academic_welcomeMessage += playAudio();
        this.emit(':tell', academic_welcomeMessage);
    },
    'Relationships': function() {
        var relationship_reason = this.event.request.intent.slots.relationships_slot.value;
        var relationship_welcomeMessage = " It's always hard to navigate relationships. But you are not alone. I hope this can make you feel better! The first thing is some words that I think will inspire you <break time=\"2s\"/>";
        relationship_welcomeMessage += randomPhrase(relationshipsQuotes) + "<break time=\"1s\"/> I hope these words have given you some peace of mind <break time=\"1s\"/>";
        relationship_welcomeMessage += playAudio();
        this.emit(':tell', relationship_welcomeMessage);
    },
    'Finance': function() {
        var finance_reason = this.event.request.intent.slots.finance_slot.value;
        var finance_welcomeMessage = "If I could help you financially, I would. Sadly I can't, but I think I know how to make you feel better! Remember, <break time=\"2s\"/>";
        finance_welcomeMessage += randomPhrase(financeQuotes) + "<break time=\"1s\"/> I hope these words have given you some peace of mind <break time=\"1s\"/>";
        finance_welcomeMessage += playAudio();
        this.emit(':tell', finance_welcomeMessage);
    },
    'Work': function() {
        var work_reason = this.event.request.intent.slots.work_slot.value;
        var work_welcomeMessage = "I'm sorry to hear that you are facing problems at work. I know how to make you feel better! The first thing is some words that I think will inspire you <break time=\"2s\"/>";
        work_welcomeMessage += randomPhrase(workQuotes) + "<break time=\"1s\"/> I hope these words have given you some peace of mind <break time=\"1s\"/>";
        work_welcomeMessage += playAudio();
        this.emit(':tell', work_welcomeMessage);
    },
    'Unhandled': function() {
        var unhandled_welcomeMessage = "I'm sorry to hear that. I do not have specific advice for your situation. However, I have a few things in mind to make you feel better. The first thing is some words that I think will inspire you <break time=\"2s\"/>";
        unhandled_welcomeMessage += randomPhrase(otherQuotes) + "<break time=\"1s\"/> I hope these words have given you some peace of mind <break time=\"1s\"/>";
        unhandled_welcomeMessage += playAudio();
        this.emit(':tell', unhandled_welcomeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', 'That\'s alright, but remember I am here if you need me. Here is a quote to make you feel better <break time=\"2s\"/>' + randomPhrase(otherQuotes) + '<break time=\"2s\"/> Good bye');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', 'That\'s alright, but remember I am here if you need me. Here is a quote to make you feel better <break time=\"2s\"/>' + randomPhrase(otherQuotes) + '<break time=\"2s\"/> Good bye');
    }
};

var welcomeMessage = "Hi, I'm Baymax! <break time=\"1s\"/> I may be a bot on Amazon's cloud, but I'm here for you <break time=\"1s\"/>";
var repeatWelcomeMessage = "I'm sorry I didn't understand that. Say yes so that maybe I can help you.";
var helpMessage = "Would you like to share with me? ";

function randomPhrase(section) {
    var i = 0;
    i = Math.floor(Math.random() * section.length);
    return (section[i]);
}

function playAudio() {
    var say = "Here is some music that may soothe you <break time=\"1s\"/>";
    var i = 0;
    i = Math.floor(Math.random() * audioClips.length);
    say += audioClips[i];
    return say;
}

var audioClips = ["<audio src='https://s3.amazonaws.com/baymaxplaylist/song1.mp3' />", "<audio src='https://s3.amazonaws.com/baymaxplaylist/song2.mp3' />", "<audio src='https://s3.amazonaws.com/baymaxplaylist/song3.mp3' />", "<audio src='https://s3.amazonaws.com/baymaxplaylist/song4.mp3' />"];
