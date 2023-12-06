import data from "/data.json";
import "/styles/index.css";

export default function JobListing() {
  return (
    <div>
      {data.map((job) => {
        return (
          <section key={job.id}>
            <article className="flex items-center shadow w-9/12 mx-auto justify-between p-6">
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
                <li className="mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded">
                  {job.role}
                </li>
                <li className="mr-1.5 bg-light-grayish-cyan1 px-2.5 rounded">
                  {job.level}
                </li>
                <ul className="flex ">
                  {job.tools &&
                    job.tools.map((tool, index) => (
                      <li
                        key={index}
                        className="px-2.5 rounded mr-1.5 bg-light-grayish-cyan1"
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
  );
}
