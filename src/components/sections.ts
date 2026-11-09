/** The page reads like a story: one progress bar per section in the header. */
export const sections = [
  { id: "top", label: "Intro", nav: false },
  { id: "scripts", label: "Scripts", nav: true },
  { id: "work", label: "Work", nav: true },
  { id: "pages", label: "Pages", nav: true },
  { id: "process", label: "Process", nav: false },
  { id: "experience", label: "Experience", nav: true },
  { id: "skills", label: "Skills", nav: false },
  { id: "contact", label: "Contact", nav: false },
] as const;
