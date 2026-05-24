import { connectDB } from "../src/config/db.js";
import { env } from "../src/config/env.js";
import { User } from "../src/models/User.js";

async function main() {
  const fullName = process.env.ADMIN_NAME || "Admin User";
  const email = (process.env.ADMIN_EMAIL || "admin@miracleminds.test").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "AdminPass123!";

  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is missing.");
  }

  if (!env.jwtSecret) {
    throw new Error("JWT_SECRET is missing.");
  }

  await connectDB();

  const existing = await User.findOne({ email });
  if (existing) {
    existing.fullName = fullName;
    existing.password = password;
    existing.role = "admin";
    existing.isActive = true;
    await existing.save();
    // eslint-disable-next-line no-console
    console.log(`Updated admin account: ${email}`);
  } else {
    await User.create({ fullName, email, password, role: "admin", isActive: true });
    // eslint-disable-next-line no-console
    console.log(`Created admin account: ${email}`);
  }

  // eslint-disable-next-line no-console
  console.log(`Admin credentials -> email: ${email} | password: ${password}`);
  process.exit(0);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Admin seed failed", error);
  process.exit(1);
});
