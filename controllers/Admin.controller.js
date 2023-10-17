const AdminSchema = require('../model/Admin.model');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addAdminRegister = async (req, resp) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    if (!name || !email || !password || !isAdmin) {
      return resp.status(400).json({
        status: "Failed",
        data: "Please Enter All Fields",
      });
    }

    // Check if User Exists
    const adminExist = await AdminSchema.findOne({ email });
    console.log(adminExist);
    if (adminExist) {
      return resp.status(404).json({
        status: "Failed",
        data: "Admin Already Exist",
      });
    }

    // Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newAdmin = await AdminSchema.create({
      email,
      password: hashedPassword,
      name,
      isAdmin
    });

    resp.status(201).json({
      status: "Success",
      data: {
        email: newAdmin.email,
        name: newAdmin.name,
        id: newAdmin._id,
        isAdmin: newAdmin.isAdmin
      },
      token: generateToken(newAdmin),
    });
  } catch (error) {
    resp.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

const addAdminLogin = async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400).json({
        status: "Failed",
        data: "Please Enter All Fields",
      });
    }

    // Check if User Does Not Exist
    const adminExist = await AdminSchema.findOne({ email });
    console.log(adminExist);

    if (!adminExist) {
      return resp.status(404).json({
        status: "Failed",
        data: "Admin Does Not Exist",
      });
    }

    const isMatch = await bcryptjs.compare(password, adminExist.password);

    if (adminExist && isMatch) {
      resp.status(200).json({
        status: "Success",
        data: {
          email: adminExist.email,
          name: adminExist.name,
          id: adminExist._id,
        },
        token: generateToken(adminExist),
      });
    } else {
      return resp.status(400).json({
        status: "Failed",
        data: "Invalid Credentials",
      });
    }
  } catch (error) {
    resp.status(400).json({
      status: "Failed",
      error: error.message,
    });
  }
};

const generateToken = (admin) => {
  return jwt.sign(
    {
      email: admin.email,
      name: admin.name,
      id: admin._id,
      isAdmin: admin.isAdmin
    },
    process.env.JWTSECRET,
    {
      expiresIn: "10d", 
    }
  );
};

module.exports = { addAdminRegister, addAdminLogin }