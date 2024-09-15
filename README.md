# Vention POC pre-sales Copilot

### Sales Co-pilot - AI-Powered sales/presales Talent Matching System
  Automatically matches pre-vetted engineers with opportunities or client needs based on factors like skillset, project requirements, cultural fit, and even past performance data from similar roles. 
  - 1.1- Improving the pre-sales/sales efficiency of offering staffing solution.
  - 1.2-  Match job descriptions with developers CVs, skills, project requirements, background past experience.
  - 1.3- Analyze opportunity descriptions and needs against resumes, ensuring a near-perfect match for every position.
 -  1.4- improving placement accuracy, enhancing the client experience.

[Live demo](TBD)

## Enviroment Requirements
- Node 18.20.3
- typescript@^5/typescript@5.5.4
- npm@10.7.0

## Getting started
Run the following commands in your project folder to get started:
```console
npm install && npm run dev
OR 
npm install && npm start
```

## Contributors
<ul>
<li><a href="mailto:angel.garcia@ventionteams.com">Angel Garcia</a></li>
<li><a href="mailto:jesus.franco@ventionteams.com">Jesus Franco</a></li>
<li><a href="mailto:hebert.rangel@ventionteams.com">Hebert Rangel</a>.</li>


## Login & Authentication

This POC contains a basic example of authentication and redirecting based on a users logged in status. However, this is done using SSG, which is not ideal, but serves the purpose of this demo. For better authentication and redirecting you should use [Astro's (experimental) SSR](https://docs.astro.build/en/guides/server-side-rendering/).

### LoginForm.astro

This page contains an example login flow, using a fake email address and password and by utilizing the `localStorage`. All pages redirect to `/login.astro` 

### listen.astro
The page is an astro page with angular component to listen to the conversation to be review by OpenAI or enter teh request by typing or pasting it, this will send the data to the model and replay the processed answer.

### results.astro
presentation of the openai results and information to be consider for team building, also the model returns either by best fit, by budget challenge if mentioned during the scope of the inquery.

⚠️ **Note: this is just an example POC for Vention Hacakton, make sure you are aware no secure authentication is done.**

### env file and OpenAI key

The project does not have th eopeai key in the git due to security reasons, if needed we can provide the key that was provided to us.

## Thank you!

