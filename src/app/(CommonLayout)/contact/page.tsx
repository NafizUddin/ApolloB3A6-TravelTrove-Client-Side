import PageSectionTitle from "@/src/app/(CommonLayout)/(home)/_components/section/PageSectionTitle";
import ContactCard from "./_sections/ContactCard";
import Faq from "./_sections/Faq";
import CallToAction from "./_sections/CallToAction";

const Contact = () => {
  return (
    <>
      <PageSectionTitle
        title="Contact Us"
        description="We would love to hear from you."
      />
      <ContactCard />
      <Faq />
      <CallToAction />
    </>
  );
};

export default Contact;
