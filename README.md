# ServerlessWebApp

## OBJECTIVES

1)Deploy a serverless backend and a database

2)Expose a rest API

3)Host a static website using object storage

4)Deploy the static website as a microservice on Red Hat OpenShift


## OBJECT STORAGE HOSTING ARCHITECTURE

![](https://github.com/saiswaruprath/ServerlessWebApp/blob/main/Screen%20Shot%202022-06-13%20at%2011.41.18%20PM.png)


### Step 1: Deploy a Cloudant database
The guestbook entries will be stored in a Cloudant database for persistence. IBM Cloudant is a fully managed JSON document database built upon and compatible with Apache CouchDB.

Go to the IBM Cloud catalog and create an instance of Cloudant.

Click on Launch Dashboard to open the dashboard in a new browser tab.

In the upper right, click on Create Database. Enter guestbook as the database name and select Non-Partitioned under Partitioning. Click Create to create the database.

Switch back to the browser tab with the service dashboard page. Go to Service credentials.

Click New Credential.

Set the name for-guestbook, and leave the role as Manager. Click Add to add the new credential.
Expand the newly created credentials and review them. These credentials will allow Cloud Functions actions to read/write to your Cloudant service.

![](https://github.com/saiswaruprath/ServerlessWebApp/blob/main/Screen%20Shot%202022-06-14%20at%2012.19.20%20AM.png)


### Step 2: Create actions to save guestbook entries
In order for the guestbook to write entries to the Cloudant database and subsequently read entries from the database, you will use Cloud Functions. In this section, you need to create actions with IBM Cloud Functions to write the guestbook entries to Cloudant. A sequence of two actions will be used to create the entries in Cloudant. Given a name, email address, and comment, the sequence will create a document to be persisted and store that document in your Cloudant database.


### Step 3: Create actions to retrieve guestbook entries
In this step, you need to create a sequence that again consists of two actions, but this sequence will be used to retrieve guestbook entries stored in the Cloudant database. This sequence will list all documents from the database, format the documents, and return them.


### Step 4: Create an API
In order for these functions to be utilized by the guestbook UI, we need to create an API. In this step, you will expose enable your sequences as web actions and create an API that responds to PUT and GET requests.
For each sequence that you created, enable that sequence as a web action.
Create an API called guestbook, with base path /guestbook.

Create two operations for this API. Both operations will use the path /entries. One should be for GET requests and should invoke the read-guestbook-entries-sequence sequence. The other should be for PUT requests and should invoke the save-guestbook-entry-sequence sequence. Use JSON for the response content type.


### Step 5: Deploy the web app using OpenShift

Fork the guestbook repository where we mainatined code for the front end web application.

View the guestbook.js file. Notice that the apiUrl constant is blank. In the quotes, put the route to your API, which you should have noted in the last step. Commit this change to your repository. If you're not familiar with GitHub, there is a pencil button the edit the file, and you after making your change you can leave the default commit message and click Commit changes.
Click OpenShift Console at the top of this environment. This will launch the OpenShift console in a new tab.

Change to the Developer perspective.
Click the +Add button to add a new application.
Choose From Git so that you can deploy your web app directly from your forked GitHub repository.
Paste your GitHub repo URL in the box.

Choose the Httpd builder image. This will build your web app as an Apache web server that serves static content. This is perfect since the web app consists of two simple files: an HTML file and a JavaScript file. Click Create.
OpenShift will now create a build to build your repository into a container image to run on OpenShift.
Click on the deployment that was just created. The outer circle is the application, so click the inner circle with the OpenShift logo.

You should now see a pod, a build, a route. Once the build completes, the pod should stop crashing and should start running. At that point, click the route to view your web app.



### Step 6: Deploy the web app using Object Storage
This method of deploying the web app will provide us with an entirely serverless solution: a cloud-managed Cloudant database to persist the guestbook entries, IBM Cloud Functions to save and retrieve entries from the database, and a static site hosted in Object Storage.
Create an instance of IBM Cloud Object Storage. Make sure to select the Lite plan. Click Create a bucket.
Click the arrow to Customize your bucket.Enter a bucket name that is unique is across all IBM accounts. 

Select Regional resiliency and Smart Tier storage class. Scroll down to the Static website hosting and click Add rule.
Keep the Routing rules (individual) selected and add the Index document index.html.
Click Public access to On. Click Save.

Scroll to the bottom and click Create bucket.Now you need to add your files to this bucket. From the main page of your repository in GitHub, download a zip file by clicking Code then Download ZIP. Unzip the file and navigate to the guestbook.js and index.html files.
Open the bucket Objects view and drag and drop the guestbook.js and index.html files to the COS bucket.
Navigate to the Configuration tab for the bucket and scroll down to the Static website hosting endpoints section to copy the Public endpoint into a browser tab.


