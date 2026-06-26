# Graph Report - .  (2026-06-26)

## Corpus Check
- Large corpus: 124 files � ~593,211 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 425 nodes · 587 edges · 47 communities (25 shown, 22 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Portfolio Content Data|Portfolio Content Data]]
- [[_COMMUNITY_Page Components & SEO|Page Components & SEO]]
- [[_COMMUNITY_Site Shell & Navigation|Site Shell & Navigation]]
- [[_COMMUNITY_Dependencies & Config|Dependencies & Config]]
- [[_COMMUNITY_Service Showcase Layouts|Service Showcase Layouts]]
- [[_COMMUNITY_Commercial Offer Pages|Commercial Offer Pages]]
- [[_COMMUNITY_Architecture & Business Concepts|Architecture & Business Concepts]]
- [[_COMMUNITY_Social Proof Components|Social Proof Components]]
- [[_COMMUNITY_ROI Calculator|ROI Calculator]]
- [[_COMMUNITY_Wix vs Agency Guide|Wix vs Agency Guide]]
- [[_COMMUNITY_Website Cost Guide|Website Cost Guide]]
- [[_COMMUNITY_Chess Game Project|Chess Game Project]]
- [[_COMMUNITY_Google Sheets & HubSpot Assets|Google Sheets & HubSpot Assets]]
- [[_COMMUNITY_AI Brand Assets|AI Brand Assets]]
- [[_COMMUNITY_Claude & OpenAI Concepts|Claude & OpenAI Concepts]]
- [[_COMMUNITY_Notion Salesforce Slack Assets|Notion Salesforce Slack Assets]]
- [[_COMMUNITY_TapeType Project Assets|TapeType Project Assets]]
- [[_COMMUNITY_BNK Conseil Screenshots|BNK Conseil Screenshots]]
- [[_COMMUNITY_CampusBridge Project|CampusBridge Project]]
- [[_COMMUNITY_Theo Portrait Photos|Theo Portrait Photos]]
- [[_COMMUNITY_AI Tool Icons|AI Tool Icons]]
- [[_COMMUNITY_Misc Nodes (3)|Misc Nodes (3)]]
- [[_COMMUNITY_Misc Nodes (2)|Misc Nodes (2)]]
- [[_COMMUNITY_Misc Nodes (2)|Misc Nodes (2)]]
- [[_COMMUNITY_Misc Nodes (2)|Misc Nodes (2)]]
- [[_COMMUNITY_Misc Nodes (2)|Misc Nodes (2)]]
- [[_COMMUNITY_Misc Nodes (2)|Misc Nodes (2)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]
- [[_COMMUNITY_Misc Nodes (1)|Misc Nodes (1)]]

## God Nodes (most connected - your core abstractions)
1. `SEOHead()` - 23 edges
2. `PageTransition()` - 22 edges
3. `MaskText()` - 9 edges
4. `Section()` - 9 edges
5. `Reveal()` - 8 edges
6. `BNK Conseil - Commercial Consulting Business for TPE/Startups` - 8 edges
7. `WebsitePreview()` - 6 edges
8. `useThemeSection()` - 6 edges
9. `CLAUDE.md - Project Architecture Guide for Claude Code` - 6 edges
10. `Théo Benkirane - Founder & Consultant at BNK Conseil (since 2022)` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Portfolio Person Photo 1 - Smiling Man in Beige Lacoste Sweater (Background Removed)` --references--> `Théo Benkirane - Founder & Consultant at BNK Conseil (since 2022)`  [AMBIGUOUS]
  public/portfolio/IMG_1403-removebg-preview.png → index.html
- `Portfolio Person Photo 1 - Smiling Man in Beige Lacoste Sweater (Background Removed)` --references--> `BNK Conseil - Commercial Consulting Business for TPE/Startups`  [INFERRED]
  public/portfolio/IMG_1403-removebg-preview.png → index.html
- `Portfolio Person Photo 2 - Smiling Man in Black T-Shirt (Background Removed)` --references--> `BNK Conseil - Commercial Consulting Business for TPE/Startups`  [INFERRED]
  public/portfolio/IMG_3621-removebg-preview.png → index.html
- `CLAUDE.md - Project Architecture Guide for Claude Code` --semantically_similar_to--> `README.md - Project Documentation (French)`  [INFERRED] [semantically similar]
  CLAUDE.md → README.md
- `Theo_Benkirane_CV_2026.pdf - Founder CV Document` --references--> `Théo Benkirane - Founder & Consultant at BNK Conseil (since 2022)`  [EXTRACTED]
  public/Theo_Benkirane_CV_2026.pdf → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **AI Crawler Visibility Strategy: llms.txt + robots.txt allowlist + structured content** — public_llms_txt, public_robots_txt, concept_ai_crawler_access [EXTRACTED 0.95]
- **SEO Foundation Stack: Schema.org JSON-LD + OG Image + SEOHead Pattern** — index_html, concept_seo_pattern, public_og_image [INFERRED 0.85]
- **Portfolio Tool Skills Showcase: AI and Automation Tools Demonstrated by BNK Conseil** — concept_claude_ai, concept_openai, concept_hubspot, concept_notion, concept_google_sheets [INFERRED 0.75]
- **AI and LLM Technology Assets in Portfolio** — portfolio_claude_logo_brand, portfolio_download_openai_logo, portfolio_llm_concept, portfolio_andragogy_brand [INFERRED 0.85]
- **Portfolio Client and Project Brand Identities** — portfolio_campusbridge_logo_brand, portfolio_legalplace_logo_brand, portfolio_groupagora_brand, portfolio_matchers_brand, portfolio_plaza_brand [INFERRED 0.85]
- **Productivity and Collaboration Tools Referenced in Portfolio** — portfolio_salesforce_logo_brand, portfolio_slack_logo_brand, portfolio_notion_logo_brand, portfolio_previewimage_microsoft_office [INFERRED 0.75]
- **TapeType Portfolio Project Visual Assets** — portfolio_tapetype_logo_logo, portfolio_tapetype_screen_game_screenshot, portfolio_tapetype_screen_tuto_screenshot, portfolio_tapetype_screen_screenshot [INFERRED 0.95]
- **Portfolio Skills and Tools Icon Collection** — portfolio_tool_claude_logo, portfolio_tool_hubspot_logo, portfolio_tool_llm_icon, portfolio_tool_notion_logo, portfolio_tool_office_logo, portfolio_tool_openai_logo, portfolio_tool_salesforce_logo, portfolio_tool_sheets_logo, portfolio_tool_slack_logo [INFERRED 0.95]
- **Theo Benkirane Identity Photo Collection** — portfolio_theo_cutout_full_portrait, portfolio_theo_cutout_portrait, portfolio_theo_full_photo, portfolio_theo_portrait_photo, public_theo_portrait [INFERRED 0.95]

## Communities (47 total, 22 thin omitted)

### Community 0 - "Portfolio Content Data"
Cohesion: 0.07
Nodes (42): ABOUT, CONTACT, EXPERIENCE, HERO, PROJECTS, QUIZ, SECTIONS, SKILLS (+34 more)

### Community 1 - "Page Components & SEO"
Cohesion: 0.06
Nodes (32): PageTransition(), SEOHead(), timeline, values, Commander(), fadeUp(), fadeUpView(), FORMULAS (+24 more)

### Community 2 - "Site Shell & Navigation"
Cohesion: 0.06
Nodes (33): AvailabilityBanner(), cityLinks, Footer(), navLinks, resourceLinks, cityLinks, Header(), navLinks (+25 more)

### Community 3 - "Dependencies & Config"
Cohesion: 0.05
Nodes (36): dependencies, @fontsource/ibm-plex-mono, @fontsource/ibm-plex-sans, @fontsource/space-grotesk, @fontsource-variable/fraunces, @fontsource-variable/geist, @fontsource-variable/geist-mono, framer-motion (+28 more)

### Community 4 - "Service Showcase Layouts"
Cohesion: 0.07
Nodes (22): SECTORS, THEMES, WebsitePreview(), gradientText, SECTOR_LIST, THEME_COLORS, THEME_LIST, benefits (+14 more)

### Community 5 - "Commercial Offer Pages"
Cohesion: 0.09
Nodes (19): FAQ(), OfferCard(), cibles, faqItems, gradientText, inclus, resultats, faqItems (+11 more)

### Community 6 - "Architecture & Business Concepts"
Cohesion: 0.14
Nodes (21): CLAUDE.md - Project Architecture Guide for Claude Code, AI Crawler Accessibility Strategy: llms.txt + robots.txt explicit allowlist for GPTBot, ClaudeBot, PerplexityBot, Availability Banner Feature Toggle: AVAILABILITY config object in src/config/availability.js, BNK Conseil - Commercial Consulting Business for TPE/Startups, LinkedIn - Professional Social Network Platform, PageTransition Wrapper Pattern: Framer Motion fade + slide-up 0.35s via AnimatePresence, SEOHead Pattern: react-helmet-async wrapping title, OG, Twitter Card, canonical, JSON-LD, Tech Stack: React 19 + Vite 8 + TailwindCSS v4 + React Router v7 + Framer Motion (+13 more)

### Community 7 - "Social Proof Components"
Cohesion: 0.12
Nodes (14): AnimatedCounter(), TestimonialCarousel(), testimonials, casClients, faqItems, faqSchema, gradientText, Home() (+6 more)

### Community 8 - "ROI Calculator"
Cohesion: 0.15
Nodes (13): BADGE_CONFIG, FORMULAS, ROICalculator(), SECTOR_DEFAULTS, SECTORS, fadeUp(), fadeUpView(), faqItems (+5 more)

### Community 9 - "Wix vs Agency Guide"
Cohesion: 0.12
Nodes (12): agencePros, comparisonRows, fadeUp, faqItems, gradientText, schema, stagger, tocLinks (+4 more)

### Community 10 - "Website Cost Guide"
Cohesion: 0.15
Nodes (10): budgetOptions, costCards, factors, fadeUp, faqItems, gradientText, priceCategories, schema (+2 more)

### Community 11 - "Chess Game Project"
Cohesion: 0.25
Nodes (4): BACK_RANK, GLYPH, INITIAL_PIECES, SQUARES

### Community 12 - "Google Sheets & HubSpot Assets"
Cohesion: 0.47
Nodes (6): Google Sheets - Spreadsheet and Data Management Tool, HubSpot CRM - Sales and Marketing Automation Tool, Google Sheets Logo (Transparent Background) - Portfolio Tool Asset, Google Sheets Logo 2014-2020 (Green Document with Grid) - Portfolio Tool Asset, HubSpot Sprocket/Atom Icon (Orange) - Portfolio Tool Asset, HubSpot Full Logo (Dark Blue + Orange) - Portfolio Tool Asset

### Community 13 - "AI Brand Assets"
Cohesion: 0.50
Nodes (5): Andragogy Project Brand (Robot AI Avatar), Claude (Anthropic) AI Assistant Logo, OpenAI Logo (Hexagonal Rosette Mark), Large Language Model (LLM) Neural Network Concept Illustration, Andragogy Logo (Robot AI Avatar, Alternate Copy)

### Community 14 - "Claude & OpenAI Concepts"
Cohesion: 0.50
Nodes (4): Claude AI (Anthropic) - AI Assistant Tool, OpenAI - AI Platform, Claude AI Logo 2023 (Anthropic Coral Asterisk) - Portfolio Tool Asset, OpenAI Logo 2022 (Black on White) - Portfolio Tool Asset

### Community 15 - "Notion Salesforce Slack Assets"
Cohesion: 0.50
Nodes (4): Notion Productivity App Logo, Salesforce CRM Brand Logo, Slack Icon (2019 Icon-Only Variant), Slack Collaboration Platform Logo (Full Wordmark)

### Community 16 - "TapeType Project Assets"
Cohesion: 0.50
Nodes (4): TapeType App Logo, TapeType Game Screen Screenshot, TapeType Main Screen Screenshot, TapeType Tutorial Screen Screenshot

### Community 17 - "BNK Conseil Screenshots"
Cohesion: 0.67
Nodes (3): Abstract Dark Painted Background Texture, BNK Conseil Website Screenshot, BNK Conseil Website Screenshot (Alternate Copy)

### Community 18 - "CampusBridge Project"
Cohesion: 0.67
Nodes (3): Campus Bridge Brand Logo (Graduation Cap + Bridge), Campus Bridge Website Screenshot (Variant 1), Campus Bridge Website Screenshot (Variant 2)

### Community 19 - "Theo Portrait Photos"
Cohesion: 0.67
Nodes (3): Theo Benkirane Head Cutout Photo, Theo Benkirane Outdoor Portrait Photo, Theo Benkirane Public Portrait Photo

### Community 20 - "AI Tool Icons"
Cohesion: 0.67
Nodes (3): Claude (Anthropic) Tool Logo SVG, LLM Hub-and-Spoke Network Icon, OpenAI Tool Logo

## Ambiguous Edges - Review These
- `Portfolio Person Photo 1 - Smiling Man in Beige Lacoste Sweater (Background Removed)` → `Théo Benkirane - Founder & Consultant at BNK Conseil (since 2022)`  [AMBIGUOUS]
  public/portfolio/IMG_1403-removebg-preview.png · relation: references

## Knowledge Gaps
- **222 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+217 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Portfolio Person Photo 1 - Smiling Man in Beige Lacoste Sweater (Background Removed)` and `Théo Benkirane - Founder & Consultant at BNK Conseil (since 2022)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `SEOHead()` connect `Page Components & SEO` to `Portfolio Content Data`, `Service Showcase Layouts`, `Commercial Offer Pages`, `Social Proof Components`, `ROI Calculator`, `Wix vs Agency Guide`, `Website Cost Guide`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `PageTransition()` connect `Page Components & SEO` to `Service Showcase Layouts`, `Commercial Offer Pages`, `Social Proof Components`, `ROI Calculator`, `Wix vs Agency Guide`, `Website Cost Guide`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `AVAILABILITY` connect `Site Shell & Navigation` to `Page Components & SEO`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _225 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Portfolio Content Data` be split into smaller, more focused modules?**
  _Cohesion score 0.06946386946386947 - nodes in this community are weakly interconnected._
- **Should `Page Components & SEO` be split into smaller, more focused modules?**
  _Cohesion score 0.05584415584415584 - nodes in this community are weakly interconnected._