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

  // Function to handle user selections
  const handleSelection = (e, type) => {
    const value = e.target.textContent;

    // Handle selection based on the specified 'type'
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

  //Localstorage
  useEffect(() => {
    const itemsStored = localStorage.getItem("choice");

    if (itemsStored) {
      setChoice(JSON.parse(itemsStored));
    }
  }, []);

  useEffect(() => {
    if (choice.length > 0) {
      localStorage.setItem("choice", JSON.stringify(choice));
      //Filter the 'data' based on selected criteria
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
      <div className="bg-mobile w-full h-36 bg-desaturated-dark-cyan mb-14 md:bg-desktop">
        {choice.length > 0 && (
          <div className="bg-white relative w-4/5 top-24 py-7 mx-auto shadow-3xl rounded pl-5 md:w-9/12 md:py-2.5 md:top-28">
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
                      {tool}
                    </span>
                  ))}
                </div>
              ))}
            </p>
          </div>
        )}
      </div>
      <div className="space-y-8">
        {filteredJobs.map((job) => {
          return (
            <section key={job.id}>
              <article className="w-4/5 items-center shadow-3xl mx-auto justify-between p-6 md:flex md:w-9/12">
                <div className="lg:flex shrink-0">
                  <figure className="mr-5">
                    <img
                      src={job.logo}
                      alt="logo"
                      className="relative w-1/5 bottom-9 md:static lg:w-3/4  "
                    />
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
                <hr className="border-dark-grayish-cyan my-4 md:hidden" />
                <ul className="flex flex-wrap text-base text-desaturated-dark-cyan cursor-pointer md:ml-14 lg:ml:0">
                  <li
                    className="mb-2 mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded "
                    onClick={(e) => handleSelection(e, "role")}
                  >
                    {job.role}
                  </li>
                  <li
                    className="mb-2 mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded "
                    onClick={(e) => handleSelection(e, "level")}
                  >
                    {job.level}
                  </li>
                  <ul className="flex cursor-pointer ">
                    {job.tools &&
                      job.tools.map((tool, index) => (
                        <li
                          key={index}
                          className="px-2.5 rounded mr-1.5 bg-light-grayish-cyan1 mb-2"
                          onClick={(e) => {
                            handleSelection(e, "tools");
                          }}
                        >
                          {tool}
                        </li>
                      ))}
                  </ul>
                  <ul className="flex mr-1.5 cursor-pointer">
                    {job.languages &&
                      job.languages.map((language, index) => (
                        <li
                          key={index}
                          className="px-2.5 rounded mr-1.5 bg-light-grayish-cyan1 mb-2"
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
