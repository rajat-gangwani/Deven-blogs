import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";


const Blog = sequelize.define(
  "Blog",
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title is required" },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "Slug is required" },
        notEmpty: { msg: "Slug is required" },
      },
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: false,
      validate: {
        notNull: { msg: "Description is required" },
        notEmpty: { msg: "Description is required" },
      },
    },
    category: {
      type: DataTypes.ENUM("Strategy", "Marketing and Sales", "Finance", "Mindset", "Communication"),
      allowNull: false,
      validate: {
        notNull: { msg: "Category is required" },
        isIn: {
          args: [["Strategy", "Marketing and Sales", "Finance", "Mindset", "Communication"]],
          msg: "Invalid category",
        },
      },
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Thumbnail is required" },
        notEmpty: { msg: "Thumbnail is required" },
      },
    },
    thumbnailType: {
      type: DataTypes.ENUM("file", "url"),
      allowNull: false,
      defaultValue: "file",
      validate: {
        isIn: {
          args: [["file", "url"]],
          msg: "Thumbnail type must be 'file' or 'url'",
        },
      },
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      validate: {
        notNull: { msg: "Content is required" },
        notEmpty: { msg: "Content is required" },
      },
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["category", "created_at"],
      },
      {
        unique: true,
        fields: ["slug"],
      },
    ],
  }
);

// Hook to auto-generate slug if missing
Blog.beforeValidate((blog) => {
  if (!blog.slug && blog.title) {
    blog.slug = blog.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }
});

// Custom method to get thumbnail URL
Blog.prototype.getThumbnailUrl = function () {
  if (this.thumbnailType === "file") {
    return `/uploads/${this.thumbnail}`;
  }
  return this.thumbnail;
};

export default Blog;
