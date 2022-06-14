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
Keep in mind the following things when creating your instance:

The environment should be multitenant
The authentication method should be IAM and legacy credentials
Once the Cloudant instance is provisioned (the status is Active), click on it to go to the service instance page.

Click on Launch Dashboard to open the dashboard in a new browser tab.

In the upper right, click on Create Database. Enter guestbook as the database name and select Non-Partitioned under Partitioning. Click Create to create the database.

Switch back to the browser tab with the service dashboard page. Go to Service credentials.

Click New Credential.

Set the name for-guestbook, and leave the role as Manager. Click Add to add the new credential.

Expand the newly created credentials and review them. These credentials will allow Cloud Functions actions to read/write to your Cloudant service.
