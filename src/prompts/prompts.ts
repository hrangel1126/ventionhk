export const systemRole = `
You are part of a pre-sales teams, you're a solutions architect, and you are part of a software consultnacy company. 
The company offers staff augmentation services to help teams from US to grow their teams to help them develop their software projects. 
Some clients can be technical, but other clients could not have technical experience. 
By technical, we mean they understand software development. 

The CVs below belong available candidates we can offer to clients. 

Your current task is that given these CVS from software engineers you need to select the top-tier candidates that match the best for an specific position within a client's company. 

To do that, you need to evaluate the years of experience, the cultural fit, their career, the tech stack, and their background. After evaluating these CVs, 
you have to response with a list of candidates that best match to the client's requirements by a 60 percent match. 

Also, if the client need it and say it explicity, be cost-effective and try to reduce the cost of the team by identifying the best talented engineers that less budget can get you but accomplishing the minimun skills required.
if it is not possible to be cost/effective, just ignore the budget and give the best team possible for the needs. 

The list needs to contain next aspects:
- Brief description of a maxium of 100 words why the candidates matches for the position. 
- Percentage of match.
- Top technological skill sets. (Programming languages, frameworks, tools).
`;

export const output = `
the return output is in a valid JSON format like in the next expample:
The output is json that contains an array of objects and the object has next attributes: candidateName, description, percentage, hourRate and topSkils. 

{
"reason": "The reason why this team candidates would be the best option and explain the stack that the team would work with depending on the requirements and if there are no requirements, select the best stack from the team members for the project's client",
"candidates": [
    {candidateName: "Name of the candidate", description: "Brief description of a maxium of 100 words why the candidates matches for the position", percentage: "Percentage of match (write in "number%" format)", topSkills: "Top technological skill sets. (Programming languages, frameworks, tools)", hourRate: "Cost per hour in USD (number/USD)"}
  ],
"costOfTeam": "The amount of money the team will cost by hour in USD from the candidates in the list, add the hourRates numbers from the candidates in the list below (Verify the operation and return "number/USD" format)"
}

LAST STEPS:
- If the JSON contains any non-alphanumeric characters, remove them.
- Make sure the output is a valid JSON object. Do not include any non-JSON text in the output. Do not put quotes around the json text or any breakline.
`;

export const summaryCvs = `
These are the available engineers:
1. Adair Hernandez - Software Engineer (3+ years of experience)
Tech Stack: JavaScript, React, TypeScript, Node.js, Golang, MySQL, MongoDB, Docker, AWS, Jenkins, NestJS, Express, REST, GraphQL, React Native.
Roles & Companies:
Full-Stack Engineer at Usercode (2023 - Present) - Tech: React, Tailwind, Bootstrap, NestJS, Docker.
Full-Stack Engineer at BigLeaper (2022 - 2023) - Tech: ReactJS, AWS, DynamoDB.
Backend Developer at Capgemini (2020 - 2022) - Tech: Express, Spring Boot, Postgres.
Full-Stack Engineer at Fairwind Group (2021 - 2022) - Tech: ReactJS, MongoDB, Jest.
Industry: Technology (SaaS, Logistics, Education).
Key Activities: API development, code refactoring, requirement elicitation, writing unit and integration tests.
Hour Rate: 35 USD/hour.
General Summary: A motivated software engineer with strong experience in full-stack development, specializing in JavaScript and TypeScript. Adept at working on both backend and frontend, with experience across various industries including education, logistics, and SaaS. Known for excellent code testability and performance.
2. Alexis Leon - Senior Software Engineer (8+ years of experience)
Tech Stack: JavaScript, TypeScript, React.js, React Native, Node.js, GraphQL, Golang, AWS, Terraform, Docker, PostgreSQL, MongoDB.
Roles & Companies:
Full Stack Engineer at Mosea (Fintech) - Node.js, GraphQL, AWS, React Native.
Backend Engineer at Gopuff - Golang, Kubernetes, Docker, PostgreSQL.
Senior Software Engineer at Remnote - React, Meteor.js, AWS.
Senior Software Engineer at Invex Bank - Swift, Kotlin, Azure.
Industry: Fintech, eCommerce, Payments, EdTech.
Key Activities: Prototyping mobile apps, backend architecture design, payment system integrations, team management.
Hour Rate: 49 USD/hour.
General Summary: A delivery-focused full-stack engineer with deep expertise in backend and mobile applications, Alexis has built robust solutions for fintech and payments industries. His experience ranges from startups to enterprise-scale companies, where he excels in designing payment rails, risk management systems, and API integrations.
3. Diego Gonzalez - Lead Software Engineer (6+ years of experience)
Tech Stack: Python, Java, C#, JavaScript, Django, AWS, Serverless, Docker, CI/CD, MongoDB.
Roles & Companies:
Senior Developer at Luxoft-Syngenta (2022 - Present) - AWS, Serverless, CircleCI, Lambda, DynamoDB.
Senior Developer at Autodesk (2021 - 2022) - AWS microservices, Pandas, Pydantic.
Lead Software Engineer at VMTEC-Google (2018 - 2022) - Python, Django, API integration.
Industry: Technology, Agriculture, AI, Cloud Services.
Key Activities: Building DevOps pipelines, automating monitoring, REST API development, AWS architecture.
Hour Rate: 50 USD/hour.
General Summary: A lead software engineer with expertise in Python and cloud technologies, Diego specializes in building scalable systems using AWS. His focus on automation and efficiency in cloud architecture, combined with experience across industries like agriculture and AI, has made him a valuable asset for companies seeking to optimize their cloud infrastructure.
4. Guillermo Garcia - Software Engineer (6+ years of experience)
Tech Stack: .NET, C/C++, Java, Kotlin, Scala, AWS, Docker, SQL.
Roles & Companies:
Senior .NET Developer at Solera (2022 - Present) - .NET Framework, SQL Server, AWS.
Scala + Java Developer at Distillery (2021 - 2022) - Scala, Akka.
Sr. Developer at New England Computer Solutions (2019 - 2021) - Linux, Android, PCI-compliant apps.
Industry: Fintech, Software Development, Payment Systems.
Key Activities: Debugging code, adding features, application security improvement, Android/Linux embedded system development.
Hour Rate: 55 USD/hour.
General Summary: A versatile software engineer with strong backend and mobile app development expertise, Guillermo has significant experience in building secure, scalable systems. He is particularly adept at working in highly regulated industries like fintech, ensuring application security and compliance.
5. Héctor Fernando Lozada - Senior Backend Engineer (9+ years of experience)
Tech Stack: Python, PHP, Java, JavaScript, AWS, Docker, PostgreSQL, MySQL, Redis.
Roles & Companies:
Senior Python/ETL Developer at Modern Campus - Python, Celery, AWS, MySQL.
Backend Engineer at Ineed - Python, Django, Java, Terraform.
Senior Python Developer at Agile Engine - Python, Docker, Redis.
Industry: EdTech, Technology, Cloud Services.
Key Activities: Legacy system migration, backend development, team coordination, API development.
Hour Rate: 55 USD/hour.
General Summary: Héctor has extensive experience in backend development with a focus on Python. He has been responsible for large-scale migrations and building backend systems from scratch. His expertise in cloud services and DevOps tools makes him well-suited for infrastructure-heavy projects in the tech and education sectors.
6. Ignacio Alvarez - Lead Software Engineer (6+ years of experience)
Tech Stack: JavaScript, TypeScript, React, Node.js, PHP, Angular, AWS, MongoDB, SQL.
Roles & Companies:
Full Stack Developer at Dealership Performance 360 CRM - Angular, Node.js, AWS.
Full Stack Developer at TechGenies (Orchatect) - Node.js, Docker, Lambda.
Sr. Frontend Developer at Duro Tire and Wheel - React, MySQL.
Industry: Automotive, Technology, Cloud Services.
Key Activities: API development, cloud integration, upgrading front-end systems, IoT development.
Hour Rate: 50 USD/hour.
General Summary: A skilled full-stack developer with strong expertise in JavaScript frameworks, Ignacio has consistently delivered high-quality software in industries ranging from automotive to cloud services. His ability to work across the stack and manage complex integrations has proven valuable in driving projects to completion.
7. Jesus Franco - Lead Software Engineer (12+ years of experience)
Tech Stack: PHP, JavaScript, TypeScript, Ruby on Rails, Node.js, AWS, GraphQL, Docker.
Roles & Companies:
Senior Full-Stack Engineer at Wabbi Software (2023) - Nest.js, PostgreSQL, Node.js.
Technical Lead at Levo (2021 - 2023) - Laravel, Firebase, AWS.
Solution Architect at IJALTI (2019) - Ruby on Rails, OAuth 2.0.
Industry: Fintech, SaaS, DevSecOps.
Key Activities: Microservices development, event sourcing, DevOps automation, API development.
Hour Rate: 50 USD/hour.
General Summary: Jesus has a wide range of expertise in full-stack and DevSecOps roles, excelling at creating secure and scalable architectures. His experience spans multiple industries, including fintech and SaaS, where he has led teams in creating robust backend systems and DevOps pipelines.
8. José Angel García Ruiz - Lead Software Engineer (6+ years of experience)
Tech Stack: JavaScript, TypeScript, Node.js, React, Python, MongoDB, AWS, PostgreSQL, Redis.
Roles & Companies:
Full Stack Software Engineer at Infogrid AQ - Node.js, React, AWS.
Tech Lead Developer at DevStudio - React.js, WebSockets, MongoDB.
Senior Software Developer at Position.ai - Next.js, Prisma, AWS.
Industry: SaaS, AI, IoT.
Key Activities: API architecture, microservices development, performance optimization, cloud cost reduction.
Hour Rate: 50 USD/hour.
General Summary: José Angel is a highly skilled lead engineer with expertise in full-stack development, specializing in AI and IoT applications. His focus on performance optimization and cost-effective cloud solutions makes him a valuable asset in the SaaS and AI sectors.
9. Spirin Konstantin - Lead Software Engineer (5+ years of experience)
Tech Stack: Python, Vue.js, Django, Docker, PostgreSQL, Redis, AWS.
Roles & Companies:
Software Developer at Sberbank - Python, Django, Vue.js.
Software Developer at KamaGames - Python, Docker, PostgreSQL.
Jr. Software Developer at Mail.ru Group - Python, Django, REST APIs.
Industry: Fintech, Gaming, Banking.
Key Activities: Microservices architecture, API development, internal tools automation.
Hour Rate: 52 USD/hour.
General Summary: Spirin is a Python expert with a strong background in building scalable web applications. His experience includes developing tools for major financial institutions and gaming companies, where he focused on API integration, automation, and microservice development.
10. Victor Gil - Senior Software Engineer (13+ years of experience)
Tech Stack: React, JavaScript, TypeScript, Node.js, GraphQL, Docker, C#, .NET.
Roles & Companies:
Senior Software Engineer at Backbase - JavaScript, Angular, Rxjs.
Software Developer at AgileThought - Angular, React, NodeJS.
Full Stack Engineer at 4th Source - C#, ASP.NET, SQL Server.
Industry: Fintech, Technology, Consulting.
Key Activities: Front-end development, mentoring junior developers, API integration, scalable web applications.
Hour Rate: 50 USD/hour.
General Summary: With over 13 years of experience, Victor is an experienced senior software engineer with a deep focus on front-end development. He has led teams in developing complex web applications in fintech and consulting, with a particular emphasis on building reusable, scalable components and mentoring junior developers.
`;
