"use client";

import { useRef } from "react";

import { experience } from "@/data/content";

import { Caption } from "./caption";
import { useScrollProgress } from "./hooks";

/** Jobs, newest first, on a line that draws itself as you read down. */
export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  useScrollProgress(ref, 0.7, 0.5);

  return (
    <section id="experience" className="section section-light" aria-labelledby="experience-title">
      <div className="wrap">
        <div className="section-head">
          <Caption id="experience-title" text="Where I’ve worked." />
          <p className="lede">Content and account roles at agencies in Egypt with clients across the Gulf, after two years leading a real-estate sales team.</p>
        </div>

        <ol ref={ref} className="jobs">
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="job">
              <p className="job-when">{job.period ?? ""}</p>
              <div className="job-body">
                <h3 className="job-role">{job.role}</h3>
                <p className="job-company">
                  {job.company}
                  {job.place ? <span>, {job.place}</span> : null}
                </p>
                <ul className="job-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
