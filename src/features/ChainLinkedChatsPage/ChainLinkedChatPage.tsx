import { Flex, Typography } from "antd";
import ChainLinkedChats from "./ChainLinkedChats/ChainLinkedChats";
import { useCallback, useState } from "react";
import debounce from "src/utils/debounce";

const ChainLinkedChatPage = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useCallback(
    debounce((value) => {
      setSearchText(value);
    }, 300),
    []
  );
  const handleSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearchText(event?.target?.value);
  };

  const [showInputField, setShowInputField] = useState(false);

  return (
    <Flex
      className="chainlinked-chats-drawer-container"
      vertical
      gap={12}
      align="center"
    >
      <Flex className="header" justify="space-between" align="center">
        <Typography.Title level={3}>Chainlinked Chats</Typography.Title>
      </Flex>
      {/* <Input
        addonBefore={<SearchOutlined />}
        placeholder="Search"
        onChange={handleSearchText}
      /> */}

      <div style={{ width: "100%" }}>
        {showInputField ? (
          <input
            onChange={handleSearchText}
            autoFocus
            style={{
              width: "-webkit-fill-available",
              background: "#7878801F",
              color: "#3C3C4399",
              border: "none",
              outline: " none",
              padding: "7px 8px",
              fontFamily: "Scandia-Regular",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: "22px",
              letterSpacing: "-0.43px",
              borderRadius: "8px",
            }}
          />
        ) : (
          <div
            onClick={() => setShowInputField(true)}
            style={{
              color: "#3C3C4399",
              height: "36px",
              background: "#7878801F",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Scandia-Regular",
              fontSize: "17px",
              fontWeight: 400,
              lineHeight: "22px",
              letterSpacing: "-0.43px",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <svg
                width="17"
                height="19"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.40918 7.44629C0.40918 6.5332 0.580729 5.67822 0.923828 4.88135C1.26693 4.07894 1.74284 3.37337 2.35156 2.76465C2.96029 2.15592 3.66309 1.68001 4.45996 1.33691C5.26237 0.993815 6.12012 0.822266 7.0332 0.822266C7.94629 0.822266 8.80127 0.993815 9.59814 1.33691C10.4006 1.68001 11.1061 2.15592 11.7148 2.76465C12.3236 3.37337 12.7995 4.07894 13.1426 4.88135C13.4857 5.67822 13.6572 6.5332 13.6572 7.44629C13.6572 8.20443 13.5355 8.92383 13.292 9.60449C13.054 10.2852 12.722 10.9022 12.2959 11.4556L16.355 15.5396C16.4435 15.6281 16.5099 15.7305 16.5542 15.8467C16.604 15.9629 16.6289 16.0874 16.6289 16.2202C16.6289 16.4028 16.5874 16.5688 16.5044 16.7183C16.4269 16.8677 16.3162 16.9839 16.1724 17.0669C16.0285 17.1554 15.8625 17.1997 15.6743 17.1997C15.5415 17.1997 15.4142 17.1748 15.2925 17.125C15.1763 17.0807 15.0684 17.0116 14.9688 16.9175L10.8848 12.8252C10.3424 13.2126 9.74479 13.5169 9.0918 13.7383C8.4388 13.9596 7.7526 14.0703 7.0332 14.0703C6.12012 14.0703 5.26237 13.8988 4.45996 13.5557C3.66309 13.2126 2.96029 12.7367 2.35156 12.1279C1.74284 11.5192 1.26693 10.8164 0.923828 10.0195C0.580729 9.21712 0.40918 8.35938 0.40918 7.44629ZM1.82861 7.44629C1.82861 8.16569 1.96143 8.84082 2.22705 9.47168C2.49821 10.097 2.87174 10.6476 3.34766 11.1235C3.8291 11.5994 4.38249 11.973 5.00781 12.2441C5.63867 12.5153 6.3138 12.6509 7.0332 12.6509C7.7526 12.6509 8.42497 12.5153 9.05029 12.2441C9.68115 11.973 10.2345 11.5994 10.7104 11.1235C11.1864 10.6476 11.5599 10.097 11.8311 9.47168C12.1022 8.84082 12.2378 8.16569 12.2378 7.44629C12.2378 6.72689 12.1022 6.05452 11.8311 5.4292C11.5599 4.79834 11.1864 4.24495 10.7104 3.76904C10.2345 3.2876 9.68115 2.91406 9.05029 2.64844C8.42497 2.37728 7.7526 2.2417 7.0332 2.2417C6.3138 2.2417 5.63867 2.37728 5.00781 2.64844C4.38249 2.91406 3.8291 3.2876 3.34766 3.76904C2.87174 4.24495 2.49821 4.79834 2.22705 5.4292C1.96143 6.05452 1.82861 6.72689 1.82861 7.44629Z"
                  fill="#3C3C43"
                  fill-opacity="0.6"
                />
              </svg>
              Search
            </div>
          </div>
        )}
      </div>

      <ChainLinkedChats searchText={searchText} />

      <div style={{ marginBottom: "10px" }}>
      </div>
    </Flex>
  );
};

export default ChainLinkedChatPage;
