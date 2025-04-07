import validator from "validator";
export const validateUserSignUpData = (req) => {
  const { name, email, password, mobileNumber } = req.body;

  if (!name || !email || !password || !mobileNumber) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  } else if (!validator.isMobilePhone(mobileNumber, "en-IN")) {
    throw new Error("Invalid Mobile Number");
  } else if (!validator.isLength(mobileNumber, { min: 10, max: 10 })) {
    throw new Error("Invalid Mobile Number");
  }
};

export const validateHostelData = (req) => {
  const { name, category, maxCapacity, totalRooms, rooms, ownerId } = req.body;
  if (!name || !category || !maxCapacity || !totalRooms || !rooms || !ownerId) {
    throw new Error("All fields are required");
  }
};
