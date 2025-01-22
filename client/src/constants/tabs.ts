export const tabs = ["Login", "Sign Up"] as const;
export type TabType = (typeof tabs)[number];
