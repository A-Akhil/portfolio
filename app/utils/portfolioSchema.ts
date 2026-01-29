import { z } from 'zod';

const ImageAssetSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number().int().nonnegative().optional(),
  height: z.number().int().nonnegative().optional(),
});

const ResumeResourceSchema = z.object({
  url: z.string(),
  downloadName: z.string(),
});

const ProfileEducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  period: z.string(),
  location: z.string(),
  achievements: z.array(z.string()).optional(),
});

const ProfileSummarySchema = z.object({
  name: z.string(),
  titles: z.array(z.string()).min(1),
  summary: z.string(),
  location: z.string(),
  email: z.string(),
  phone: z.string(),
  github: z.string(),
  linkedin: z.string(),
  avatar: ImageAssetSchema,
  resume: ResumeResourceSchema,
  bio: z.array(z.string()).min(1),
  education: z.array(ProfileEducationSchema).min(1),
});

const NavigationItemSchema = z.object({
  label: z.string(),
  target: z.string(),
});

const TerminalLauncherSchema = z.object({
  label: z.string(),
  href: z.string(),
  tooltip: z.string().optional(),
});

const NavigationContentSchema = z.object({
  primary: z.array(NavigationItemSchema).nonempty(),
  terminal: TerminalLauncherSchema,
});

const CtaButtonSchema = z.object({
  label: z.string(),
  action: z.enum(['download', 'scroll', 'external']),
  target: z.string(),
  downloadName: z.string().optional(),
  newTab: z.boolean().optional(),
});

const SocialLinkSchema = z.object({
  id: z.string(),
  label: z.string(),
  url: z.string(),
  icon: z.string(),
});

const FloatingIconSchema = z.object({
  emoji: z.string(),
  positionClass: z.string(),
  animationDelay: z.number().optional(),
});

const HeroContentSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string(),
  ctaPrimary: CtaButtonSchema,
  ctaSecondary: CtaButtonSchema.optional(),
  socialLinks: z.array(SocialLinkSchema).nonempty(),
  floatingIcons: z.array(FloatingIconSchema),
});

const StatBadgeSchema = z.object({
  label: z.string(),
  value: z.string(),
  icon: z.string().optional(),
});

const AboutContentSchema = z.object({
  title: z.string(),
  body: z.array(z.string()).nonempty(),
  highlightSkills: z.array(z.string()),
  stats: z.array(StatBadgeSchema).optional(),
  image: ImageAssetSchema.optional(),
});

const ExperienceEntrySchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  period: z.string(),
  summary: z.string().optional(),
  technologies: z.array(z.string()),
  achievements: z.array(z.string()).optional(),
  accentGradient: z.string().optional(),
});

const ExperienceContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(ExperienceEntrySchema).nonempty(),
});

const ProjectMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const ProjectEntrySchema = z.object({
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  githubUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  gradient: z.string().optional(),
  icon: z.string().optional(),
  metric: ProjectMetricSchema.optional(),
  featured: z.boolean().optional(),
});

const ProjectsContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  cta: CtaButtonSchema.optional(),
  items: z.array(ProjectEntrySchema).nonempty(),
});

const SkillEntrySchema = z.object({
  name: z.string(),
  level: z.number().min(0).max(100),
  icon: z.string().optional(),
});

const SkillCategorySchema = z.object({
  id: z.string(),
  label: z.string(),
  skills: z.array(SkillEntrySchema).nonempty(),
});

const SkillsContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  categories: z.array(SkillCategorySchema).nonempty(),
  coreCompetencies: z.array(z.string()),
});

const AwardEntrySchema = z.object({
  title: z.string(),
  level: z.string(),
  position: z.string(),
  description: z.string(),
  year: z.string(),
  icon: z.string().optional(),
  gradient: z.string().optional(),
});

const AwardsContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  items: z.array(AwardEntrySchema).nonempty(),
  stats: z.array(StatBadgeSchema).optional(),
});

const PublicationSchema = z.object({
  title: z.string(),
  venue: z.string(),
  date: z.string(),
  description: z.array(z.string()),
  doi: z.string().optional(),
  doiUrl: z.string().optional(),
});

const OpenSourceContributionSchema = z.object({
  project: z.string(),
  role: z.string(),
  year: z.string(),
  description: z.string(),
  prUrl: z.string().optional(),
});

const ContactMethodSchema = z.object({
  type: z.string(),
  label: z.string(),
  value: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  gradient: z.string().optional(),
});

const ContactFormCopySchema = z.object({
  successMessage: z.string(),
  submitLabel: z.string().optional(),
  namePlaceholder: z.string().optional(),
  emailPlaceholder: z.string().optional(),
  messagePlaceholder: z.string().optional(),
});

const LocationContentSchema = z.object({
  headline: z.string(),
  body: z.array(z.string()),
});

const ContactContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  form: ContactFormCopySchema,
  methods: z.array(ContactMethodSchema).nonempty(),
  location: LocationContentSchema,
  footer: z.string(),
});

const EducationEntrySchema = ProfileEducationSchema;

const SeoMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.array(z.string()),
  baseUrl: z.string(),
  socialImage: z.string().optional(),
  twitterHandle: z.string().optional(),
});

const TerminalGreetingSchema = z.object({
  intro: z.array(z.string()),
  prompts: z.array(z.string()).optional(),
});

const TerminalContentSchema = z.object({
  greeting: TerminalGreetingSchema.optional(),
  quickLinks: z.array(SocialLinkSchema).optional(),
});

const ContentMetaSchema = z.object({
  version: z.string().optional(),
  lastUpdated: z.string().optional(),
});

export const PortfolioDataSchema = z.object({
  profile: ProfileSummarySchema,
  navigation: NavigationContentSchema,
  hero: HeroContentSchema,
  about: AboutContentSchema,
  experience: ExperienceContentSchema,
  projects: ProjectsContentSchema,
  skills: SkillsContentSchema,
  awards: AwardsContentSchema,
  publications: z.array(PublicationSchema).optional(),
  openSourceContributions: z.array(OpenSourceContributionSchema).optional(),
  contact: ContactContentSchema,
  education: z.array(EducationEntrySchema),
  seo: SeoMetadataSchema,
  terminal: TerminalContentSchema.optional(),
  contentMeta: ContentMetaSchema.optional(),
});

export type PortfolioDataInput = z.infer<typeof PortfolioDataSchema>;
