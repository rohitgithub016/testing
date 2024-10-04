import ContactUsDrawer from "../ContactUs/ContactUsDrawer";

interface DashboardDrawersProps {
  openContactUsDrawer: boolean;
  handleCloseContactUsDrawer: () => void;
}

const DashboardDrawers = ({
  openContactUsDrawer,
  handleCloseContactUsDrawer,
}: DashboardDrawersProps) => {
  return (
    <>
      <ContactUsDrawer
        onClose={handleCloseContactUsDrawer}
        openDrawer={openContactUsDrawer}
      />
    </>
  );
};

export default DashboardDrawers;
