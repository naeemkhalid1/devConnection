import { Schema, Types, model } from "mongoose";

export interface IMedia {
  url?: string;
  type: "image" | "vedio" | "file" | "none";
}

export interface IComment {
  user: Types.ObjectId;
  text: string;
  createdAt: Date;
}

export interface IPosts extends Document {
  user: Types.ObjectId;
  content?: string;
  media?: IMedia;
  likes: Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const postsSchema = new Schema<IPosts>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    media: {
      url: { type: String },
      type: {
        type: String,
        enum: ["image", "video", "file", "none"],
        default: "none",
      },
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Posts = model<IPosts>("Posts", postsSchema);
export default Posts;
