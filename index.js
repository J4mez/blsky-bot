import blue from "@atproto/api";
import 'dotenv/config'

const { BskyAgent, RichText } = blue;

const generatePost = async (text) => {
  if (!text) {
    throw new Error("No text provided");
  }
  const agent = new BskyAgent({ service: "https://bsky.social/" });
  await agent.login({
    identifier: process.env.BLUESKY_BOT_USERNAME,
    password: process.env.BLUESKY_BOT_PASSWORD,
  });
  const rt = new RichText({ text: text });
  const postRecord = {
    $type: "app.bsky.feed.post",
    text: rt.text,
    facets: rt.facets,
    createdAt: new Date().toISOString(),
  };
  await agent.post(postRecord);
};
