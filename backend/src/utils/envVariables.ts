module.exports = function () {
    require("dotenv").config()
    if (!process.env.EMAIL_NAME && !process.env.EMAIL_PASS) { console.log("Warning: No EMAIL_NAME or EMAIL_PASS is provided for mailing service ! ") }
    if (!process.env.JWT_SECRET) console.log("Warning: No JWT_SECRET provided ....")
}