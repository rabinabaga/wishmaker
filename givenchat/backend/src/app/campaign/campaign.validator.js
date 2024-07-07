const { z } = require("zod");

const donationMadeSchema = z.object({
  amount: z.number().min(1000),
  token: z.string().min(6),
});

module.exports = { donationMadeSchema };
