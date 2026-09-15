export type RegionMetric = {
  region: string;
  districts: number;
  enrolled: number;
  active: number;
  adherence: number;
  offline: number;
};

export const demoProgram = {
  id: "ner-wellness-demo",
  name: "NER Elder Cognitive Wellness Initiative",
  organization: "MindMitra Demonstration Program",
  description: "A fictional, privacy-preserving demonstration of regional cognitive-engagement support.",
  status: "Active",
  period: "1 Jul 2026 – 31 Mar 2027",
  languages: ["English", "Hindi", "Assamese", "Manipuri", "Bengali", "Nepali"],
  enabledGames: 10,
};

export const regionMetrics: RegionMetric[] = [
  { region: "Assam", districts: 8, enrolled: 412, active: 286, adherence: 84, offline: 37 },
  { region: "Manipur", districts: 5, enrolled: 224, active: 151, adherence: 81, offline: 44 },
  { region: "Meghalaya", districts: 4, enrolled: 178, active: 116, adherence: 78, offline: 41 },
  { region: "Nagaland", districts: 4, enrolled: 146, active: 94, adherence: 80, offline: 39 },
  { region: "Mizoram", districts: 3, enrolled: 108, active: 72, adherence: 85, offline: 32 },
  { region: "Tripura", districts: 3, enrolled: 96, active: 65, adherence: 82, offline: 28 },
  { region: "Arunachal Pradesh", districts: 3, enrolled: 52, active: 34, adherence: 76, offline: 57 },
  { region: "Sikkim", districts: 2, enrolled: 24, active: 18, adherence: 88, offline: 19 },
];

export const governmentAnalytics = {
  totalBeneficiaries: regionMetrics.reduce((sum, item) => sum + item.enrolled, 0),
  activeBeneficiaries: regionMetrics.reduce((sum, item) => sum + item.active, 0),
  caregivers: 364,
  gamesPlayed: 8294,
  reminderAdherence: 82,
  offlineUsage: 37,
  languageDistribution: [
    { label: "Assamese", value: 31 },
    { label: "Hindi", value: 24 },
    { label: "English", value: 19 },
    { label: "Manipuri", value: 12 },
    { label: "Bengali", value: 8 },
    { label: "Nepali", value: 6 },
  ],
};

export const demoAuditEvents = [
  { actor: "R. Das", role: "Program administrator", action: "Viewed regional aggregates", resource: "NER Elder Cognitive Wellness Initiative", timestamp: "Today, 09:32" },
  { actor: "R. Das", role: "Program administrator", action: "Generated CSV report", resource: "Monthly engagement summary", timestamp: "Yesterday, 16:10" },
  { actor: "System", role: "Service", action: "Recorded offline sync aggregate", resource: "Assam program region", timestamp: "Yesterday, 13:45" },
];
