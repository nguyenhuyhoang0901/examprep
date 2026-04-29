export type ExamProvider = {
  id: string;
  name: string;
  exams: string[];
};

export const PROVIDERS: ExamProvider[] = [
  {
    id: "microsoft",
    name: "Microsoft",
    exams: ["AZ-900", "AZ-104", "DP-203"],
  },
  {
    id: "google",
    name: "Google",
    exams: ["ACE", "PDE"],
  },
  {
    id: "juniper",
    name: "Juniper",
    exams: ["JN0-664", "JN0-563"],
  },
  {
    id: "cisco",
    name: "Cisco",
    exams: ["CCNA", "ENCOR"],
  },
];
