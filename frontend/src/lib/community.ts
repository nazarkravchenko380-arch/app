import { apiGet, apiPost } from "@/lib/api";

export type SubmissionType =
  | "idea"
  | "date_idea"
  | "feature"
  | "improvement"
  | "feedback"
  | "bug"
  | "story";

export type SubmissionStatus = "new" | "exploring" | "planned" | "building" | "shipped";

export interface Submission {
  id: string;
  number: number;
  type: SubmissionType;
  content: string;
  name: string | null;
  public: boolean;
  status: SubmissionStatus;
  demo: boolean;
  created_at: string;
}

export interface PublicSubmission {
  id: string;
  number: number;
  type: SubmissionType;
  content: string;
  name: string | null;
  status: SubmissionStatus;
  demo: boolean;
  created_at: string;
}

export interface CommunityStats {
  submitted: number;
  exploring: number;
  planned: number;
  building: number;
  shipped: number;
  demo: boolean;
}

export interface Review {
  id: string;
  quote: string;
  first_names: string | null;
  place: string | null;
  relationship_duration: string | null;
  created_at: string;
}

export interface SubmissionInput {
  type: SubmissionType;
  content: string;
  name?: string;
  email?: string;
  public: boolean;
}

export const submitToAmo = (body: SubmissionInput) => apiPost<Submission>("/community/submissions", body);
export const getBoard = () => apiGet<PublicSubmission[]>("/community/board");
export const getCommunityStats = () => apiGet<CommunityStats>("/community/stats");
export const getReviews = () => apiGet<Review[]>("/community/reviews");
