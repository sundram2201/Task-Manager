const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true,
      lowercase:true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum:["user", "admin"],
      default:"user"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("member", memberSchema);
