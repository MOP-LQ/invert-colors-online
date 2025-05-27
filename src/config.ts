export const SITE = {
  website: "https://invert-colors-online.pages.dev/", // replace this with your deployed domain
  author: "Mark119M",
  profile: "https://x.com/Mark119M",
  desc: "Free online image color inverter tool. Transform images instantly with negative effects, improve accessibility, and process images locally for complete privacy.",
  title: "Invert colors online",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  showTools: true, // show tools in navigation
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
