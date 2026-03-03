import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs" 

const userSchema = new Schema (
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
        },
        addresses: [{ type: String }],
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long']
        },
        isVerified:  { 
            type: Boolean,
            default: false 
        },
        isActive:    { 
            type: Boolean, 
            default: true 
        },
        lastLogin:   { 
            type: Date 
        },
    }, 
    { timestamps: true }
)

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return ;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", userSchema);