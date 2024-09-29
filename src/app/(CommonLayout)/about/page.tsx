import PageSectionTitle from "@/src/components/ui/section/PageSectionTitle";
import Team from "./_sections/Team";

const About = () => {
  return (
    <div>
      <PageSectionTitle
        title="About Us"
        description="Learn about our passion and how it all began."
      />

      <Team />
    </div>
  );
};

export default About;
