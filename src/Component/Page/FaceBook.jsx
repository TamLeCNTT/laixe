import { FacebookProvider, CustomChat } from "react-facebook";
const FaceBook = () => {
  return (
    <>
      <FacebookProvider appId="670283444932151" chatSupport>
        <CustomChat
          class="fb-customerchat"
          pageId="102061176154237"
          minimized={true}
        />
      </FacebookProvider>
    </>
  );
};
export default FaceBook;
