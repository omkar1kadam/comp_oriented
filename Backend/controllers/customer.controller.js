const Customer = require("../models/customer.model");

// 📝 Register Customer
exports.registerCustomer = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, address } = req.body;

        const hashedPassword = await Customer.hashPassword(password);

        const customer = new Customer({
            fullName: { firstName, lastName },
            email,
            password: hashedPassword,
            phone,
            address,
        });

        await customer.save();

        res.status(201).json({ message: "Bro, Customer registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 🔑 Login Customer
exports.loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const customer = await Customer.findOne({ email }).select("+password");
        if (!customer) return res.status(400).json({ error: "Bro, Invalid credentials" });

        const isMatch = await customer.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: "Bro, Invalid credentials" });

        const token = customer.generateAuthToken();
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
