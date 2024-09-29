import PageSectionTitle from "@/src/components/ui/section/PageSectionTitle";
import ContactCard from "./_sections/ContactCard";
import Faq from "./_sections/Faq";

const Contact = () => {
  return (
    <>
      <PageSectionTitle
        title="Contact Us"
        description="We would love to hear from you."
      />
      <ContactCard />
      <Faq />
    </>
  );
};

export default Contact;
