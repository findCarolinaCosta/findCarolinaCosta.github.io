import { IProject, Portfolio } from "./PortfolioContainer";

const projects: IProject[] = [
  {
    title: "Modern website",
    description: "Website animated interactions.",
    projectImg: "src/assets/images/projects/project-startwar2.gif",
    demo: "https://findcarolinacosta.github.io/project-starwars-planets-search/",
    code: "https://github.com/findCarolinaCosta/project-startwars-planets-search",
  },
  {
    title: "React application",
    description: "Easy-to-handle structure",
    projectImg: "src/assets/images/projects/trybewallet.png",
    demo: "https://findcarolinacosta.github.io/project-trybewallet/",
    code: "https://github.com/findCarolinaCosta/project-trybewallet",
  },
  {
    title: "Login /Logout",
    description: "Login /Logout system with what I learned in frontend",
    projectImg: "src/assets/images/projects/social-contact.png",
    demo: "https://findcarolinacosta.github.io/project-social-contact/",
    code: "https://github.com/findCarolinaCosta/project-social-contact",
  },
];

export function Portfolios() {
  return (
    <section className="portfolio section" id="portfolio">
      <h2 className="section__title">Portfolio</h2>
      <span className="section__subtitle">Most recent project</span>
      <Portfolio.Default projectList={projects} />
    </section>
  );
}
