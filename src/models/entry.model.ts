import { Schema, model, models } from "mongoose";

const entrySchema = new Schema(
  {
    valero_num: {
      type: String,
      unique: true,
      require: "The valero number is require",
    },
    plate: {
      type: String,
      unique: true,
      require: "The valero number is require",
    },
    automobile_type: {
      type: String,
      require: "The automobile type is required",
      trim: true,
    },
    amount: {
      type: Number,
      trim: true,
    },
    exit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      currentTime: () => new Date().getTime() - 5 * 60 * 60 * 1000,
    },
    versionKey: false,
  }
);

export default models.Entry || model("Entry", entrySchema);
