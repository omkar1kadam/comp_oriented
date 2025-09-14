const CompanyAdmin = require("../models/CompanyAdmin.model");

// 📝 Register Company Admin
exports.registerCompanyAdmin = async (req, res) => {
    try {
        const { companyName, email, password, walletAddress, role } = req.body;

        const hashedPassword = await CompanyAdmin.hashPassword(password);

        const admin = new CompanyAdmin({
            companyName,
            email,
            password: hashedPassword,
            walletAddress,
            role,
        });

        await admin.save();

        res.status(201).json({ message: "Bro, Company Admin registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 🔑 Login Company Admin
exports.loginCompanyAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await CompanyAdmin.findOne({ email }).select("+password");
        if (!admin) return res.status(400).json({ error: "Bro, Invalid credentials" });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: "Bro, Invalid credentials" });

        const token = admin.generateAuthToken();
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
