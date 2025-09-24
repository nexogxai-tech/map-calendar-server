const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan("⚡ :method :url from :remote-addr"));

// ---------------------
// MCP Endpoints
// ---------------------
app.get("/mcp", (req, res) => {
  res.json({
    name: "calendar-server",
    version: "1.0.0",
    description: "MCP server for reservations and calendar tools",
    endpoints: {
      tools: "/mcp/tools",
      runTool: "/mcp/run/:tool"
    }
  });
});

app.get("/mcp/tools", (req, res) => {
  res.json({
    tools: [
      {
        name: "create_reservation",
        description: "Create a reservation in the calendar",
        input_schema: {
          type: "object",
          properties: {
            customer_name: { type: "string" },
            party_size: { type: "number" },
            date: { type: "string", format: "date" },
            time: { type: "string" },
            notes: { type: "string" }
          },
          required: ["customer_name", "party_size", "date", "time"]
        }
      }
    ]
  });
});

app.post("/mcp/run/create_reservation", (req, res) => {
  const { customer_name, party_size, date, time, notes } = req.body;
  console.log("🎯 Reservation received:", req.body);

  res.json({
    success: true,
    message: `Reservation created for ${customer_name} on ${date} at ${time} for ${party_size} people.`,
    details: { customer_name, party_size, date, time, notes }
  });
});

// ---------------------
// Google OAuth Routes
// ---------------------
// TODO: Insert your existing Google OAuth setup here
// Example:
// app.get("/auth/google", (req, res) => { ... });
// app.get("/oauth2callback", (req, res) => { ... });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 MCP + Google OAuth server listening on port ${PORT}`);
});
