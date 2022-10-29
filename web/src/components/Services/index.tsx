import { useState } from "react";
import { Service } from "./ServiceContainer";

enum Title {
  "Frontend" = "Frontend Developer",
}

const FrontendServiceList: string[] = [
  "I develop the user interface.",
  "Web page development.",
  "Production and maintenance of websites and web application user interfaces.",
  "Implementing Responsive Design.",
  "I test the site for usability and fixing any bugs.",
  "Bringing a concept to life with HTML, CSS, and JavaScript for essential interactions.",
];

export function Services() {
  const [cardClicked, setCardClicked] = useState("");
  return (
    <section className="services section" id="services">
      <h2 className="section__title">Services</h2>
      <span className="section__subtitle">What i offer</span>
      <Service.Root>
        <Service.Default
          handleClick={(title) => setCardClicked(title)}
          cardClicked={cardClicked}
          services={[
            { title: Title.Frontend, serviceList: FrontendServiceList },
          ]}
        />
      </Service.Root>
    </section>
  );
}
