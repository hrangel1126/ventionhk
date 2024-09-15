import React, {useEffect, useState} from 'react';
import EngineerCard from "./Card.jsx";

const EngineersList = () => {
    const engineers = [
        {
            "candidateName": "Adair Hernandez",
            "description": "Adair has strong full-stack development skills with JavaScript frameworks, making him ideal for building both the frontend and backend. His experience with Docker and AWS ensures scalable infrastructure.",
            "percentage": "70%",
            "topSkills": "JavaScript, React, TypeScript, Node.js, AWS, Docker",
            "hourRate": "35/USD"
        }, {
            "candidateName": "Alexis Leon",
            "description": "Alexis brings robust backend and mobile application expertise, crucial for building a reliable and scalable service infrastructure. With experience in Node.js, AWS, and payment integration, he is perfect for the job.",
            "percentage": "80%",
            "topSkills": "JavaScript, TypeScript, Node.js, React Native, GraphQL, AWS",
            "hourRate": "49/USD"
        }, {
            "candidateName": "Jose Angel García Ruiz",
            "description": "Jose Angel excels in full-stack development focused on performance optimization and cost-effective cloud solutions, ideal for a high-demand service like a ride-sharing app.",
            "percentage": "75%",
            "topSkills": "JavaScript, TypeScript, Node.js, React, AWS, MongoDB",
            "hourRate": "50/USD"
        }
    ]
    // const [engineers, setEngineers] = useState<Engineer[]>([]);
    // useEffect(() => {
    //     loadEngineers(setEngineers)
    // }, []);


    // const currentData = state.context.engineers[state.context.index];
    // const engineers = currentData ? currentData.candidates : [];

    return (
      <div className="engineer-cards">
          <section className="margin-32">
              <div className="space-content">
                  {engineers.map((engineer, index) => (
                    <div key={index} className="card">
                        <EngineerCard
                          {...engineer} />
                    </div>
                  ))}
                  {/*<div className="navigation">*/}
                  {/*    <button onClick={() => send({ type: 'PREV' })}>Previous</button>*/}
                  {/*    <button onClick={() => send({ type: 'NEXT' })}>Next</button>*/}
                  {/*</div>*/}
              </div>
          </section>
      </div>
              );
              };

              export default EngineersList
