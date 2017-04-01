mqttws
======

This is a Fork of the [Eclipse Paho JavaScript client](https://eclipse.org/paho/clients/js/).

Changes include:

*  On invalid utf parseUTF8() now returns the string "\_\_malformed_utf8" instead of throwing an error
*  Grunt instead of Maven as test runner
*  published on bower.io as "mqttws"
