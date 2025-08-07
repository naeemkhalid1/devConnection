import mongoose from "mongoose";

const databaseConnetion = async (): Promise<void> => {
  try {
    const res = mongoose.connect(process.env.DB_URL as string);

    console.log("MongDb Connected Successfully");
  } catch (error) {
    console.error("Error", error);
    process.exit(1);
  }
};

export default databaseConnetion;
