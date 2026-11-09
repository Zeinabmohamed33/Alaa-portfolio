/*
 * Everything the site says lives here. Edit this file to change text,
 * add a page, a project or a job. No other file needs to change.
 */

export const profile = {
  name: "Alaa Adel Fekry",
  firstName: "Alaa",
  roles: ["Content Creator", "Social Media Specialist", "Account Manager"],
  city: "Cairo, Egypt",
  email: "Alaa88adelsror@gmail.com",
  phone: "+20 109 766 5480",
  whatsapp: "https://wa.me/201097665480",
  markets: ["Egypt", "Saudi Arabia", "UAE"],
  languages: ["Arabic (native)", "English (excellent)"],
  intro:
    "I write hooks, reel scripts and captions in Arabic and English, plan monthly feeds, and keep client accounts moving for brands in Egypt, Saudi Arabia and the UAE.",
};

/**
 * The story card in the hero: Alaa's photo first, then screenshots of
 * pages she runs. To add one, put a 9:16 crop of the profile grid in
 * /public/stories/ and add it to `screens`.
 */
export const heroStories = {
  photo: { title: "Hi, I’m Alaa", detail: "Content creator based in Cairo" },
  screens: [
    { handle: "arabstour_sa", image: "/stories/arabstour_sa.webp", detail: "Travel agency, Saudi Arabia" },
    { handle: "sravico_egy", image: "/stories/sravico_egy.webp", detail: "Marketing agency, Egypt" },
    { handle: "almatbakh_alkuwaiti", image: "/stories/almatbakh_alkuwaiti.webp", detail: "Kuwaiti restaurant, UAE" },
    { handle: "halston.uae", image: "/stories/halston.uae.webp", detail: "Legal consultancy, UAE" },
  ],
};

export interface ManagedPage {
  handle: string;
  name: string;
  url: string;
  sector?: string;
  market?: string;
}

export const managedPages: ManagedPage[] = [
  { handle: "sravico_egy", name: "SRAVICO", url: "https://www.instagram.com/sravico_egy/", sector: "Marketing agency", market: "Egypt" },
  { handle: "arabstour_sa", name: "Arab Tours", url: "https://www.instagram.com/arabstour_sa/", sector: "Travel agency", market: "Saudi Arabia" },
  { handle: "mediaheistegy", name: "Media Heist", url: "https://www.instagram.com/mediaheistegy/", sector: "Creative agency", market: "Egypt" },
  { handle: "halston.uae", name: "Halston & Co", url: "https://www.instagram.com/halston.uae/", sector: "Legal consultancy", market: "UAE" },
  { handle: "moderndigitalsolutions.sa", name: "Modern Digital Solutions", url: "https://www.instagram.com/moderndigitalsolutions.sa/", sector: "Digital solutions", market: "Saudi Arabia" },
  { handle: "rafegiksa", name: "Rafegi", url: "https://www.instagram.com/rafegiksa/", market: "Saudi Arabia" },
  { handle: "almatbakh_alkuwaiti", name: "Al Matbakh Al Kuwaiti", url: "https://www.instagram.com/almatbakh_alkuwaiti/", sector: "Kuwaiti restaurant", market: "UAE" },
];

/** Other brands from the previous portfolio (shown in the moving strip). */
export const otherBrands = ["Mai El Wahy", "Dr. Ghada Yousry", "Dr. Samar Abdelaal", "Summit Pro Source", "Glare Dental Care", "Wood Forje"];

export interface Script {
  id: string;
  brand: string;
  format: string;
  lang: "en" | "ar";
  hook: string;
  body: string[];
  cta: string;
}

/** Real scripts from client work, shown as Hook / Body / CTA. */
export const scripts: Script[] = [
  {
    id: "supercars",
    brand: "Super Cars & Buy Here",
    format: "Car financing reel",
    lang: "en",
    hook: "Bad credit? Don’t count yourself out just yet.",
    body: [
      "Think bad credit means you can’t get into your next car? Not necessarily.",
      "Whether you have good credit, bad credit, or you’re still building it, there may be financing options for your situation.",
      "No need to guess what you qualify for. Start with a simple application.",
    ],
    cta: "Ready to see your options? DM us or call today to get started.",
  },
  {
    id: "glare",
    brand: "Glare Dental Care",
    format: "Dental clinic reel, voice-over",
    lang: "ar",
    hook: "الناس بتفتكر إن زيارة دكتور الأسنان مجرد علاج… لكن في Glare… كل تفصيلة معمول حسابها",
    body: [
      "من أول لحظة استقبالك… لحد أعلى معايير التعقيم…",
      "تشخيص دقيق، وشرح واضح يخليك فاهم كل خطوة… أحدث الأجهزة ورعاية تهتم براحتك قبل أي حاجة…",
      "وفي النهاية، مش بس هتخرج بابتسامة، هتخرج بثقة.",
    ],
    cta: "ابتسامتك تستحق الأفضل — احجز موعدك الآن",
  },
  {
    id: "kiosk",
    brand: "Kiosk launch",
    format: "Grand opening post",
    lang: "en",
    hook: "We’re officially open.",
    body: [
      "Today’s coffee tastes better. Because today… we’re finally open.",
      "Whether you’re starting your morning, taking a quick lunch, or ending your day with dessert — everything you need is waiting for you.",
      "Fresh. Fast. Made daily.",
    ],
    cta: "Drop by today and discover your new favourite spot!",
  },
  {
    id: "woodforje",
    brand: "Wood Forje",
    format: "Home décor reel",
    lang: "en",
    hook: "Design mistakes that instantly make your room look less stylish.",
    body: [
      "Choosing a rug that’s too small — it makes the whole room feel disconnected.",
      "Using only one light source — layered lighting creates warmth and depth.",
      "Pushing every piece against the wall — leave a little breathing space.",
    ],
    cta: "Which mistake are you fixing first?",
  },
];

export interface Project {
  slug: string;
  title: string;
  /** Set when the title itself is written in Arabic. */
  titleLang?: "ar";
  client: string;
  summary: string;
  tags: string[];
  /** Number of slide images in /public/work/{slug}/ (01.webp, 02.webp, …). */
  slides: number;
  /** Which slide is shown on the card (1-based). */
  cover: number;
}

export const projects: Project[] = [
  {
    slug: "kiosk",
    title: "Ready. Grab. Enjoy.",
    client: "Coffee & food kiosk launch",
    summary: "A 10-post launch funnel — teaser, opening, menu heroes and July calendar moments — with notes on design, tone of voice and art direction for every post.",
    tags: ["Launch campaign", "F&B", "Content calendar"],
    slides: 9,
    cover: 1,
  },
  {
    slug: "arabtours",
    title: "Arab Tours travel offers",
    client: "Travel agency in Saudi Arabia, reel scripts",
    summary: "Four reels that sell package trips to Northern Italy, Poland, Switzerland, and London with Edinburgh. Each opens on the price, shows what the agency handles, and ends with one keyword to send by DM.",
    tags: ["Reels", "Travel", "Arabic copy"],
    slides: 5,
    cover: 2,
  },
  {
    slug: "glare",
    title: "Glare Dental Care",
    client: "Dental clinic, reels plan",
    summary: "Reels that take the fear out of the dentist: hooks, voice-over, shot-by-shot production notes and a publishing matrix.",
    tags: ["Reels", "Healthcare", "Arabic copy"],
    slides: 8,
    cover: 8,
  },
  {
    slug: "ecommerce",
    title: "SRAVICO E-Commerce",
    client: "Marketing agency, service sales deck",
    summary: "A sales deck for SRAVICO’s marketplace management on Amazon, Noon and Jumia: why products don’t sell, the eight-part service, a six-step growth cycle, results and brand case studies.",
    tags: ["Sales deck", "E-commerce", "Arabic copy"],
    slides: 11,
    cover: 1,
  },
  {
    slug: "matbakh",
    title: "Al Matbakh Al Kuwaiti",
    client: "Kuwaiti restaurant in the UAE, content plan",
    summary: "Six posts built around Kuwaiti dishes and family gatherings, from majbous and biryani trays to payday get-togethers. Each has a tone-of-voice line and a caption in Gulf Arabic and English.",
    tags: ["Content plan", "Food", "Arabic & English"],
    slides: 7,
    cover: 2,
  },
  {
    slug: "comfy",
    title: "Comfy Collection",
    client: "Loungewear brand, offer strategy",
    summary: "Ten bundle offers — from Comfy Duo to Mom & Mini — each with its own hook, built to raise the average order value.",
    tags: ["E-commerce", "Offer strategy", "Arabic copy"],
    slides: 9,
    cover: 1,
  },
  {
    slug: "afr",
    title: "AFR content plan",
    client: "Tech store in Riyadh, awareness & education",
    summary: "Static posts and five-slide carousels that help shoppers pick the right laptop, screen and desk setup, written in Saudi dialect with a tone-of-voice line for every post.",
    tags: ["Content plan", "Tech retail", "Carousels"],
    slides: 9,
    cover: 1,
  },
  {
    slug: "homes",
    title: "حكايات البيوت المكتملة",
    titleLang: "ar",
    client: "Wood Forje, cinematic ad concept",
    summary: "A film where the showroom owner visits a client’s finished home: two dialogue scripts, voice-over, camera and lighting direction.",
    tags: ["Video concept", "Scriptwriting", "Furniture"],
    slides: 8,
    cover: 5,
  },
  {
    slug: "woodforje",
    title: "Wood Forje Stories",
    client: "Furniture brand, stories & reels",
    summary: "Polls, this-or-that stories and décor-tip reels that turn a furniture catalogue into a daily conversation.",
    tags: ["Stories", "Engagement", "Reels"],
    slides: 7,
    cover: 1,
  },
];

export const slideSrc = (slug: string, slide: number) => `/work/${slug}/${String(slide).padStart(2, "0")}.webp`;

/** A campaign without slides (shown as a text panel). */
export const serova = {
  title: "SEROVA",
  summary: "A luxury teaser campaign built on visual mystery and premium positioning.",
  phases: [
    { name: "A new presence is arriving", note: "Teaser: curiosity and visual mystery" },
    { name: "She doesn’t arrive, she appears", note: "Luxury storytelling and brand voice" },
    { name: "Not everyone understands the Nova", note: "Exclusive positioning and authority" },
  ],
};

export interface Job {
  company: string;
  role: string;
  place?: string;
  period?: string;
  points: string[];
}

export const experience: Job[] = [
  {
    company: "SRAVICO",
    role: "Content Creator & Social Media Specialist",
    place: "Egypt, Saudi Arabia & UAE",
    points: [
      "Build content strategies, creative concepts and monthly social media plans around each brand’s goals.",
      "Write captions, scripts, reel concepts, carousels, ad copy and website content in Arabic and English.",
      "Brief and work with design, media buying, production, e-commerce and web teams.",
    ],
  },
  {
    company: "Win Marketing Agency",
    role: "Account Manager",
    place: "Cairo",
    period: "Nov 2024 – Present",
    points: [
      "Run day-to-day client communication and turn business goals into clear plans for the team.",
      "Prepare creative briefs, marketing calendars, campaign plans, presentations and performance updates.",
      "Follow campaigns with the media team across Meta, Google, TikTok and LinkedIn.",
    ],
  },
  {
    company: "Aura Social Media",
    role: "Content Creator",
    period: "8 months",
    points: ["Created content for the agency’s client accounts: post and reel ideas, captions and scripts."],
  },
  {
    company: "Media Heist",
    role: "Content Creator & Social Media Specialist",
    points: [
      "Created monthly plans, campaign ideas, captions, promotional copy and short-form video concepts for several brands.",
      "Researched competitors, trends and platform formats to guide content decisions.",
    ],
  },
  {
    company: "Green Store Company",
    role: "Sales Team Leader, then Sales Representative",
    place: "Cairo, real estate",
    period: "Jan 2020 – Feb 2022",
    points: [
      "Led and coached a sales team to individual and team targets, from first call to closing.",
      "Worked with marketing to align lead-generation campaigns with sales goals.",
    ],
  },
];

/** A real sequence: how an account is run, start to finish. */
export const process = [
  { step: "Client briefing", note: "Objectives, audience and brand guidelines." },
  { step: "Research & audit", note: "Competitors, trends and current performance." },
  { step: "Content pillars", note: "The topics and messages the brand owns." },
  { step: "Content calendar", note: "Posts planned across every platform." },
  { step: "Production", note: "Copy, visuals and AI-assisted creative." },
  { step: "Publishing & community", note: "Post, reply and look after the audience." },
  { step: "Monitoring", note: "Reach, engagement and conversions." },
  { step: "Reporting", note: "Insights that sharpen next month’s plan." },
];

export const skills = [
  {
    group: "Content",
    items: ["Content strategy", "Copywriting (Arabic & English)", "Reel scripts & hooks", "Content calendars", "Creative direction", "AI content creation"],
  },
  {
    group: "Accounts",
    items: ["Client communication", "Creative briefs", "Campaign planning", "Performance reports", "Community management"],
  },
  {
    group: "Research",
    items: ["Market & competitor research", "Trend & audience research", "Cultural insight for Egypt & the Gulf"],
  },
];

export const tools = ["Meta Business Suite", "Canva & Canva AI", "ChatGPT", "Adobe Photoshop", "Microsoft Excel", "PowerPoint & Word", "Snov.io", "Lusha"];

export const education = [
  { degree: "Master’s Degree in Media", school: "Ain Shams University", year: "2022" },
  { degree: "Bachelor of Media, grade Very Good", school: "6 October University", year: "2016 – 2019" },
];
