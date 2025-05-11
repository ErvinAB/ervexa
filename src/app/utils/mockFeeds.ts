export type FeedPost = {
  title: string;
  url: string;
  description: string;
  source: string;
};

export const mockFeeds: FeedPost[] = [
  {
    title: "How AI is Reshaping Startups",
    url: "https://techcrunch.com/ai-reshaping-startups",
    description: "An overview of how AI is helping early-stage companies gain leverage with smaller teams.",
    source: "TechCrunch",
  },
  {
    title: "The Rise of Prompt Engineering",
    url: "https://venturebeat.com/prompt-engineering-ai",
    description: "Why prompt engineering is the new must-have skill in the generative AI landscape.",
    source: "VentureBeat",
  },
  {
    title: "AI for Business Automation in 2025",
    url: "https://analyticsvidhya.com/ai-business-automation",
    description: "How companies are using AI to streamline operations and cut costs.",
    source: "Analytics Vidhya",
  },
  {
    title: "OpenAI's Latest Research on Reasoning",
    url: "https://openai.com/blog/reasoning-in-llms",
    description: "OpenAI dives deep into structured reasoning and planning with LLMs.",
    source: "OpenAI",
  },
  {
    title: "10 Free Tools to Experiment with AI",
    url: "https://towardsdatascience.com/free-ai-tools-2025",
    description: "A curated list of powerful free AI platforms you can use to prototype today.",
    source: "Towards Data Science",
  },
  {
    title: "AI Regulation is Coming — Are You Ready?",
    url: "https://wired.com/story/ai-regulation-ethics",
    description: "A breakdown of global trends in AI governance, legislation, and impact.",
    source: "Wired",
  },
];
