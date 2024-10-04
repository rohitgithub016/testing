import Widget from "src/Component/Widget/Widget";
import ChainLinkedChats from "./ChainLinkedChats";
interface ChainLinkedChatsWidgetProps {
    clickHandler: () => void;
}
const ChainLinkedChatsWidget = ({
    clickHandler,
}: ChainLinkedChatsWidgetProps) => {
  return (
    <Widget
      title={"Chainlinked Chats"}
      clickHandler={clickHandler}
    >
      <ChainLinkedChats />
    </Widget>
  );
};

export default ChainLinkedChatsWidget;
