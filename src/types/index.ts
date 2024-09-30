import { SVGProps } from "react";

export const POST_STATUS = {
  BASIC: "BASIC",
  PREMIUM: "PREMIUM",
} as const;

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  profilePhoto: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPost {
  title: string;
  category:
    | "Adventure"
    | "Business Travel"
    | "Exploration"
    | "Family Travel"
    | "Luxury Travel"
    | "Budget Travel";
  description: string; // HTML template in string format
  image: string;
  postAuthor: string;
  upvote: number;
  downvote: number;
  status: keyof typeof POST_STATUS;
  createdAt?: Date;
}

export interface ICreatePostData {
  title: string;
  category: string;
  description: string;
  image: string;
  status: string;
}
