import PageSectionTitle from "@/src/components/ui/section/PageSectionTitle";
import Team from "./_sections/Team";
import Headers from "./_sections/Headers";
import Missions from "./_sections/Missions";

const About = () => {
  return (
    <div>
      <PageSectionTitle
        title="About Us"
        description="Learn about our passion and how it all began."
      />
      <Headers />
      <Missions />
      <Team />
    </div>
  );
};

export default About;
