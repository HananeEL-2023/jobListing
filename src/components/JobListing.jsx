import data from "/data.json";
import { useState, useEffect } from "react";
import "/styles/index.css";

export default function JobListing() {
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("");
  const [languages, setLanguages] = useState([]);
  const [tools, setTools] = useState([]);
  const [choice, setChoice] = useState([
    { role: role, level: level, languages: languages, tools: tools },
  ]);
  const [filteredJobs, setFilteredJobs] = useState(data);

  const handleSelection = (e, type) => {
    const value = e.target.textContent;

    if (type === "role") {
      setRole(value);
    } else if (type === "level") {
      setLevel(value);
    } else if (type === "languages") {
      setLanguages((prev) => [...prev, value]);
    } else if (type === "tools") {
      setTools((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    setChoice([
      {
        role: role,
        level: level,
        languages: languages,
        tools: tools,
      },
    ]);
  }, [role, level, languages, tools]);

  useEffect(() => {
    const itemsStored = localStorage.getItem("choice");

    if (itemsStored) {
      setChoice(JSON.parse(itemsStored));
    }
  }, []);

  useEffect(() => {
    if (choice.length > 0) {
      localStorage.setItem("choice", JSON.stringify(choice));
      const filtered = data.filter((job) => {
        return (
          (!role || job.role === role) &&
          (!level || job.level === level) &&
          (languages.length === 0 ||
            languages.every((lang) => job.languages.includes(lang))) &&
          (tools.length === 0 ||
            tools.every((tool) => job.tools.includes(tool)))
        );
      });
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(data);
    }
  }, [choice, role, level, languages, tools]);

  return (
    <div>
      <div>
        <img
          src="./images/bg-header-desktop.svg"
          alt=""
          className="bg-desaturated-dark-cyan"
        />
        {choice.length > 0 && (
          <div className="bg-white w-9/12 mx-auto py-2.5 shadow rounded relative bottom-6 pl-5">
            <p>
              {choice.map((item, index) => (
                <div key={index}>
                  <span className="mr-2">{item.role}</span>
                  <span className="mr-2">{item.level}</span>
                  {item.languages.map((language) => (
                    <span key={index} className="mr-2">
                      {language}
                    </span>
                  ))}
                  {item.tools.map((tool) => (
                    <span key={index} className="mr-2">
                      {tool}x
                    </span>
                  ))}
                </div>
              ))}
            </p>
          </div>
        )}
      </div>
      <div className="space-y-5">
        {filteredJobs.map((job) => {
          return (
            <section key={job.id}>
              <article className="flex items-center shadow w-9/12 mx-auto justify-between p-6 ">
                <div className="flex shrink-0">
                  <figure className="mr-5">
                    <img src={job.logo} alt="logo" className="w-3/4" />
                  </figure>
                  <div>
                    <div className="flex mb-2 ">
                      <h2 className="text-base text-desaturated-dark-cyan font-medium mr-1.5">
                        {job.company}
                      </h2>
                      {job.new && (
                        <p className="text-base bg-desaturated-dark-cyan text-light-grayish-cyan2 p-1 rounded-b-2xl rounded-t-2xl py-0 px-2.5 mr-1.5">
                          New!
                        </p>
                      )}
                      {job.featured && (
                        <p className="text-base py-0 px-2.5 text-light-grayish-cyan2 bg-very-dark-grayish-cyan rounded-b-2xl rounded-t-2xl">
                          Featured
                        </p>
                      )}
                    </div>
                    <p className="font-bold text-base text-very-dark-grayish-cyan mb-2">
                      {job.position}
                    </p>
                    <ul className="flex text-base text-dark-grayish-cyan">
                      <li className="mr-5">{job.postedAt}</li>
                      <li className="mr-5 list-disc">{job.contract}</li>
                      <li className="list-disc">{job.location}</li>
                    </ul>
                  </div>
                </div>
                <ul className="flex text-base text-desaturated-dark-cyan ">
                  <li
                    className="mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded"
                    onClick={(e) => handleSelection(e, "role")}
                  >
                    {job.role}
                  </li>
                  <li
                    className="mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded"
                    onClick={(e) => handleSelection(e, "level")}
                  >
                    {job.level}
                  </li>
                  <ul className="flex ">
                    {job.tools &&
                      job.tools.map((tool, index) => (
                        <li
                          key={index}
                          className="px-2.5 rounded mr-1.5 bg-light-grayish-cyan1"
                          onClick={(e) => {
                            handleSelection(e, "tools");
                          }}
                        >
                          {tool}
                        </li>
                      ))}
                  </ul>
                  <ul className="flex mr-1.5 ">
                    {job.languages &&
                      job.languages.map((language, index) => (
                        <li
                          key={index}
                          className="px-2.5 rounded mr-1.5 bg-light-grayish-cyan1"
                          onClick={(e) => {
                            handleSelection(e, "languages");
                          }}
                        >
                          {language}
                        </li>
                      ))}
                  </ul>
                </ul>
              </article>
            </section>
          );
        })}
      </div>
    </div>
  );
}
