const mongoose = require("mongoose");

const roloeSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permission:{
      type : Array,
      default : []
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Roles = mongoose.model("Roles", roloeSchema, "roles");

module.exports = Roles;