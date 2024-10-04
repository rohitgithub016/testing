import { Flex } from "antd";
import EarningCarousel from "../EarningCarousel/EarningCarousel";
import HomePageHeader from "./HomePageHeader";
import TransactionWidget from "src/features/Common/Transactions/TransactionWidget";
import ContactUs from "../ContactUs/ContactUs";
import AddNewChat from "../AddNewChat/AddNewChat";
import ChainLinkedChatsWidget from "../../ChainLinkedChatsPage/ChainLinkedChats/ChainLinkedChatsWidget";

interface HomePageProps {
  handleSeeAllChainLinkedChats: () => void;
  handleOpenContactUsDrawer: () => void;
}
const HomePage = ({
  handleSeeAllChainLinkedChats,
  handleOpenContactUsDrawer,
}: HomePageProps) => {
  return (
    <Flex className={"homepage-container"}>
      <HomePageHeader />
      <EarningCarousel />
      <Flex vertical gap={12} style={{ width: "100%" }}>
        <ChainLinkedChatsWidget clickHandler={handleSeeAllChainLinkedChats} />
        <AddNewChat />
      </Flex>
      <TransactionWidget />
      <ContactUs openContactUsDrawer={handleOpenContactUsDrawer} />
    </Flex>
  );
};

export default HomePage;
