# Server for Contacts Project

This is a backend server for the Contacts app in-class project. This project is part of [Udacity's Full Stack JavaScript Developer Nanodegree](https://www.udacity.com/course/full-stack-javascript-developer-nanodegree--nd0067).

You'll build the front end of the Contacts app throughout the course. Because the course is on React and doesn't cover Node or servers, we've built this server and an API to interact with it so can focus on building the front end portion of the project in React.

## Getting Set Up

Getting the server running on your local machine takes only a few steps:

1. Fork and then clone the repository. 


2. Go inside the repository.

3. Install dependencies, and generate "node_modules" and "package-lock.json" file. 
```bash
npm install
```


4. Set an environment variable
```bash
export FIRST_NAME="Sebastian"
```

5. Start the server
```bash
node server.js
```

6. If everything works fine, you can build the deployable artifacts:
```bash
# Create the files for Archive.zip
npm run build
# Create an Archive.zip in the exercise root directory
npm run zip  
```
See the *package.json* to understand the npm scripts commands behaviour. 


## Deloying to Elastic Beanstalk
Choose a default region, and application name of your choice. Select Node.js 14 as the platform when it prompts. If you are familiar with logging into EC2 instance, you can choose to set up SSH for your instances. 
```bash
eb init
eb create --sample --single --instance-types t2.small
``` 


## Contributing

We love receiving pull requests! For specifics on how to contribute to this project, check out the [contributing file](CONTRIBUTING.md).
