import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        // اجمع كل الرتب في قائمة واحدة
        enum: ["super-admin", "admin", "manager", "cashier"],
        default: "cashier",
    }
}, { timestamps: true })

// // تشفير الباسورد قبل الحفظ (أفضل من التشفير اليدوي في الـ Controller)
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 10);
// });

userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

export default mongoose.model("User", userSchema)