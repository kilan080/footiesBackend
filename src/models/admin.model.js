import mongoose from "mongoose";
import  { Schema}  from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema (

    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50
        },
    },
    { timestamps: true }
);

//hashing of password
adminSchema.pre("save", async function(next) {
    console.log("next: " ,typeof next)
    if(!this.isModified("password")) {
       return
    }


    this.password = await bcrypt.hash(this.password, 10);

    // next();
});

//comparing passwords
adminSchema.methods.comparePasswords = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}


export const Admin = mongoose.model("Admin", adminSchema)