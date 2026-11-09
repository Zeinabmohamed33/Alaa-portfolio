import { education, profile, skills, tools } from "@/data/content";

import { Caption } from "./caption";

export function Skills() {
  return (
    <section id="skills" className="section section-dark" aria-labelledby="skills-title">
      <div className="wrap">
        <div className="section-head">
          <Caption id="skills-title" text="Skills, tools and study." />
        </div>

        <div className="skills-grid">
          <div className="skills-col skills-col-wide">
            {skills.map((group) => (
              <div key={group.group} className="skill-group">
                <h3 className="col-title">{group.group}</h3>
                <ul className="chips">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="skills-col">
            <h3 className="col-title">Tools</h3>
            <ul className="plain-list">
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>

          <div className="skills-col">
            <h3 className="col-title">Education</h3>
            <ul className="degrees">
              {education.map((item) => (
                <li key={item.degree}>
                  <span className="degree">{item.degree}</span>
                  <span className="degree-school">
                    {item.school}, {item.year}
                  </span>
                </li>
              ))}
            </ul>
            <h3 className="col-title">Languages</h3>
            <ul className="plain-list">
              {profile.languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
