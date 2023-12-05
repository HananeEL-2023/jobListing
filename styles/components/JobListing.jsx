import data from "/data.json";

export default function JobListing() {
  return (
    <div>
      {data.map((job) => {
        return (
          <section key={job.id}>
            <article>
              <div>
                <figure>
                  <img src={job.logo} alt="logo" />
                </figure>
                <div>
                  <h2>{job.company}</h2>
                  {job.new && <p>New!</p>}
                  {job.featured && <p>Featured</p>}
                  <p>{job.position}</p>
                  <ul>
                    <li>{job.postedAt}</li>
                    <li>{job.contract}</li>
                    <li>{job.location}</li>
                  </ul>
                </div>
              </div>
              <div>
                {job.role}
                {job.level}
                {job.languages}
                {job.tools}
              </div>
            </article>
          </section>
        );
      })}
    </div>
  );
}
