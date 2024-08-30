const App = () => {
  const inviteUrl = "https://example.com/invite";

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Invite Link",
          text: "Check out this invite link!",
          url: inviteUrl,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Share failed:", error);
        });
    } else {
      console.log("Web Share API not supported in this browser.");
      copyToClipboard(inviteUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Prevent scrollbars
      }}
    >
      <button onClick={handleShare}>Share This</button>
    </div>
  );
};

export default App;
