// This file is only for testing Vulnexa scanner behaviour.

// Should NOT be detected.
// This is only a display label, not a real password assignment.
const PASSWORD_LABEL = "Password";

// Should NOT be detected.
// Environment variable usage is safer than hardcoding the secret.
const adminPassword = process.env.ADMIN_PASSWORD;

// Should be detected as CRITICAL.
// This is a hardcoded secret pattern.
const password = "admin12345";

// Should be detected as HIGH.
// This is a simple SQL query pattern.
const query = "SELECT * FROM users";

// Should NOT be detected.
// This is just a normal variable name.
const passwordHint = "Use a strong password";
