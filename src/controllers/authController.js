import User from "../models/User";

const register = async (req, res) => {

    const { studentname, school, address, mobile, email, password,}=req.body
    try {
        if (!studentname || !school || !address || !mobile) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = new User({  
            studentName : studentname,
            school,
            address,
            mobile,
            gender: req.body.gender,
            email,
            password,
        });

        // otp generateion and other logic can be added here

            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

            newUser.otp = otp;
            newUser.otpExpiresAt = otpExpiresAt;

           const savedUser = await newUser.save();

           if (savedUser) {
            res.status(201).json({ message: "User registered and otp sent successfully", otp: otp }); 
           }
      



    } catch (error) {
        res.status(500).json({ message: "Server error" }); 
    }

}


export { register };



  