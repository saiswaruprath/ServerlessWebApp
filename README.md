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

![]()


### Step 2: Create actions to save guestbook entries
In order for the guestbook to write entries to the Cloudant database and subsequently read entries from the database, you will use Cloud Functions. In this section, you need to create actions with IBM Cloud Functions to write the guestbook entries to Cloudant. A sequence of two actions will be used to create the entries in Cloudant. Given a name, email address, and comment, the sequence will create a document to be persisted and store that document in your Cloudant database.


### Step 3: Create actions to retrieve guestbook entries
In this step, you need to create a sequence that again consists of two actions, but this sequence will be used to retrieve guestbook entries stored in the Cloudant database. This sequence will list all documents from the database, format the documents, and return them.


### Step 4: Create an API
In order for these functions to be utilized by the guestbook UI, we need to create an API. In this step, you will expose enable your sequences as web actions and create an API that responds to PUT and GET requests.

For each sequence that you created, enable that sequence as a web action.

Create an API called guestbook, with base path /guestbook.

Create two operations for this API. Both operations will use the path /entries. One should be for GET requests and should invoke the read-guestbook-entries-sequence sequence. The other should be for PUT requests and should invoke the save-guestbook-entry-sequence sequence. Use JSON for the response content type.

Make note of the route for this API, as your web application will need it.
