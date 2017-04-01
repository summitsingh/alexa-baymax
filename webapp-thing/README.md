#### Ingredients
## Webapp Thing<a id="title"></a>

The browser app at ```waterPump.html``` can be configured to point to your IOT Thing and receive updates triggered by Alexa requests.

#### Steps

Create a new AWS Cognito Identity Pool

1. Login to the AWS Cognito console
1. Click "Manage Federated Identities"
1. Click "Create new identity pool" such as ```MyPool```
 + Check the box to "Enable access to unauthenticated providers"
1. Once your pool is created, click on the "Sample Code" menu item
1. Within your code, find the RED string called Identity Pool ID and record this as your IdentityPoolId.

Add permissions to users of your Identity Pool:
1. Go to the AWS IAM Console
1. Click Roles
1. Click on the new Unauth role, such as Cognito_MyPoolUnauth_Role
1. Click the "Attach Policy" button to add the appropriate permissions to your role
1. For the IOT webapp, choose ```AWSIoTDataAccess``` or define a specific set of permissions.

Apply all settings:
1. Open the /js folder and locate the file ```aws_config.js```
1. Modify the fields labeled REGION and mqttEndpoint and IdentityPoolId

#### Launch the page
 + Open in the page waterPump.html in your favorite browser.
   + You can open the page right from within your project folder, you do not need to host it on a website.
 + The page should display with a green status label saying "CONNECTED"

#### Test your skill
1. Say: Alexa, open mein reisehelfer
1. Say: reisen nach Frankfurt
1. Say: ich komme aus Belfast
1. Say: stopp

The browser page should automatically create a new child window page, that points to an Image Search URL for the city you requested!

#### Debug
 * If there is any issue, open your browser's Debug Console and look for any Javascript errors for clues.


<hr />

Back to the [Home Page](../../README.md#title)

