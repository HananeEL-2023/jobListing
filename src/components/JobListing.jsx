import data from "/data.json";
import { useState, useEffect } from "react";
import "/styles/index.css";
import Footer from "./Footer/Footer";

export default function JobListing() {
  const [choice, setChoice] = useState({
    role: "",
    level: "",
    languages: [],
    tools: [],
  });
  const { role, level, languages, tools } = choice;
  const isActiveFilter =
    role || level || languages?.length > 0 || tools?.length > 0;
  const [filteredJobs, setFilteredJobs] = useState(data);

  // Function to handle user selections
  const handleSelection = (e, type) => {
    const value = e.target.textContent;

    // Handle selection based on the specified 'type'
    if (type === "role") {
      setChoice((prev) => ({ ...prev, role: value }));
    } else if (type === "level") {
      setChoice((prev) => ({ ...prev, level: value }));
    } else if (type === "languages") {
      setChoice((prev) => ({ ...prev, languages: [...prev.languages, value] }));
    } else if (type === "tools") {
      setChoice((prev) => ({ ...prev, tools: [...prev.tools, value] }));
    }
  };

  //Localstorage
  useEffect(() => {
    const itemsStored = localStorage.getItem("choice");

    if (itemsStored) {
      setChoice(JSON.parse(itemsStored));
    }
  }, []);

  useEffect(() => {
    if (isActiveFilter) {
      localStorage.setItem("choice", JSON.stringify(choice));
    }

    // Filter the 'data' based on selected criteria
    const filtered = data.filter((job) => {
      return (
        (!role || job.role === role) &&
        (!level || job.level === level) &&
        (languages.length === 0 ||
          languages.every((lang) => job.languages.includes(lang))) &&
        (tools.length === 0 || tools.every((tool) => job.tools.includes(tool)))
      );
    });

    setFilteredJobs(filtered);
  }, [choice, role, level, languages, tools, isActiveFilter]);

  const clearAll = () => {
    setChoice({
      role: "",
      level: "",
      languages: [],
      tools: [],
    });
  };

  const handleDelete = (value, type) => {
    if (type === "role") {
      setChoice((prev) => ({ ...prev, role: "" }));
    } else if (type === "level") {
      setChoice((prev) => ({ ...prev, level: "" }));
    } else if (type === "languages") {
      setChoice((prev) => ({
        ...prev,
        languages: prev.languages.filter((language) => language !== value),
      }));
    } else if (type === "tools") {
      setChoice((prev) => ({
        ...prev,
        tools: prev.tools.filter((tool) => tool !== value),
      }));
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-mobile w-full h-36 bg-desaturated-dark-cyan md:bg-desktop">
        {isActiveFilter && (
          <div className="bg-white relative w-4/5 top-24 py-7 px-4 mx-auto shadow-3xl rounded pl-5 md:w-9/12 md:py-2.5 md:top-28">
            <p>
              <div>
                {role && (
                  <span className="mr-2 bg-light-grayish-cyan1 px-3 py-2.5 rounded text-desaturated-dark-cyan">
                    {role}
                    <button
                      onClick={() => handleDelete(role, "role")}
                      className="text-black ml-2"
                    >
                      x
                    </button>
                  </span>
                )}
                {level && (
                  <span className="mr-2 light-grayish-cyan2 px-3 py-2.5 rounded text-desaturated-dark-cyan bg-light-grayish-cyan1">
                    {level}
                    <button onClick={() => handleDelete(level, "level")}>
                      x
                    </button>
                  </span>
                )}
                {languages.map((language) => (
                  <span
                    key={language}
                    className="mr-2 bg-light-grayish-cyan1 px-3 py-2.5 rounded text-desaturated-dark-cyan"
                  >
                    {language}
                    <button onClick={() => handleDelete(language, "languages")}>
                      x
                    </button>
                  </span>
                ))}
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="mr-2 bg-light-grayish-cyan1 px-3 py-2.5 rounded text-desaturated-dark-cyan"
                  >
                    {tool}
                    <button onClick={() => handleDelete(tool, "tools")}>
                      x
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAll}
                  className="float-right text-dark-grayish-cyan hover:text-desaturated-dark-cyan hover:border-b"
                >
                  Clear
                </button>
              </div>
            </p>
          </div>
        )}
      </div>
      <div className="space-y-10 my-14">
        {filteredJobs.map((job) => {
          return (
            <section key={job.id}>
              <article
                className={`w-11/12 items-center shadow-3xl mx-auto justify-between p-6 md:flex md:w-9/12 ${
                  job.new
                    ? "border-l-4 border-desaturated-dark-cyan rounded"
                    : "border-l-0"
                }`}
              >
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
                    <p className="font-bold text-base text-very-dark-grayish-cyan mb-2 cursor-pointer hover:text-desaturated-dark-cyan">
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
                <ul className="flex flex-wrap text-base text-desaturated-dark-cyan cursor-pointer md:ml-14 lg:ml:0 ">
                  <li
                    className="mb-2 mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded hover:text-light-grayish-cyan1 hover:bg-desaturated-dark-cyan"
                    onClick={(e) => handleSelection(e, "role")}
                  >
                    {job.role}
                  </li>
                  <li
                    className="mb-2 mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded hover:text-light-grayish-cyan1 hover:bg-desaturated-dark-cyan"
                    onClick={(e) => handleSelection(e, "level")}
                  >
                    {job.level}
                  </li>
                  <ul className="flex cursor-pointer ">
                    {job.tools &&
                      job.tools.map((tool, index) => (
                        <li
                          key={index}
                          className="px-2.5 rounded mr-1.5 bg-light-grayish-cyan1 mb-2 hover:text-light-grayish-cyan1 hover:bg-desaturated-dark-cyan"
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
                          className="px-2.5 rounded mr-1.5 bg-light-grayish-cyan1 mb-2 hover:text-light-grayish-cyan1 hover:bg-desaturated-dark-cyan"
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
      <Footer />
    </div>
  );
}
