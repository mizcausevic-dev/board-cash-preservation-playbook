import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-cash-preservation-playbook app", () => {
  it("serves the HTML routes", async () => {
    const htmlRoutes = ["/", "/preservation-brief", "/freeze-candidates", "/downside-sequencing", "/verification", "/docs"];

    for (const route of htmlRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toContain("html");
    }
  });

  it("serves the JSON routes", async () => {
    const jsonRoutes = [
      "/api/dashboard/summary",
      "/api/preservation-brief",
      "/api/freeze-candidates",
      "/api/downside-sequencing",
      "/api/risk-map",
      "/api/verification",
      "/api/sample",
      "/api/payload"
    ];

    for (const route of jsonRoutes) {
      const response = await request(createApp()).get(route);
      expect(response.status).toBe(200);
      expect(response.type).toContain("json");
    }
  });
});
