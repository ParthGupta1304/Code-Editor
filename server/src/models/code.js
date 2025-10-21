import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    language:{ type: String, required: true },
    code: { type: String, required: true },
    output:{ type: String, required: true }
});

export default mongoose.model("Code", codeSchema);



