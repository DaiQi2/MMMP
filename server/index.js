import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

dotenv.config({ path: new URL("./.env", import.meta.url) });

const {
  GRAPH_TENANT_ID,
  GRAPH_CLIENT_ID,
  GRAPH_CLIENT_SECRET,
  GRAPH_USER_OBJECT_ID,
  PORT = 3001,
} = process.env;

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.options("*", (_req, res) => res.sendStatus(204));
app.use(express.json({ limit: "1mb" }));
app.use(express.static(process.cwd()));

const mappingFile = path.resolve(process.cwd(), "server", "bp-mapping.json");
const approvalsFile = path.resolve(process.cwd(), "server", "approvals.json");

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: GRAPH_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${GRAPH_TENANT_ID}`,
    clientSecret: GRAPH_CLIENT_SECRET,
  },
});

async function getGraphToken() {
  const result = await msalClient.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return result?.accessToken;
}

async function loadBpMapping() {
  try {
    const raw = await readFile(mappingFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveBpMapping(mapping) {
  await writeFile(mappingFile, JSON.stringify(mapping, null, 2), "utf-8");
}

async function loadApprovals() {
  try {
    const raw = await readFile(approvalsFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveApprovals(data) {
  await writeFile(approvalsFile, JSON.stringify(data, null, 2), "utf-8");
}

function buildHtmlEmail(order) {
  const rows = (order.items || [])
    .map(
      (i) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e0db;">${i.sku}</td>
          <td style="padding:8px;border:1px solid #e5e0db;">${i.name}</td>
          <td style="padding:8px;border:1px solid #e5e0db;text-align:center;">${i.qty}</td>
        </tr>`
    )
    .join("");

  const approveUrl = `http://localhost:3001/approve.html?orderId=${order.id}&action=approved`;
  const rejectUrl = `http://localhost:3001/approve.html?orderId=${order.id}&action=rejected`;
  const returnUrl = `http://localhost:3001/approve.html?orderId=${order.id}&action=return`;

  return `
  <div style="font-family:Segoe UI,Arial,sans-serif;line-height:1.6;color:#2a1d16;">
    <h2 style="margin:0 0 8px;">Marketing Material Platform - 礼品领用需要您的审批</h2>
    <p>您有一笔新的领用申请需要审批，请查看以下信息：</p>
    <div style="margin:12px 0;padding:12px;background:#faf7f5;border:1px solid #eee;border-radius:8px;">
      <div><strong>订单号：</strong>${order.id}</div>
      <div><strong>申请人：</strong>${order.applicant}</div>
      <div><strong>主成本中心：</strong>${order.costCenter}</div>
      <div><strong>总金额：</strong>${order.amount}</div>
    </div>
    <table style="border-collapse:collapse;width:100%;margin-top:8px;">
      <thead>
        <tr style="background:#f4efe9;">
          <th style="padding:8px;border:1px solid #e5e0db;text-align:left;">SKU</th>
          <th style="padding:8px;border:1px solid #e5e0db;text-align:left;">物料名称</th>
          <th style="padding:8px;border:1px solid #e5e0db;">数量</th>
        </tr>
      </thead>
      <tbody>${rows || ""}</tbody>
    </table>
    <div style="margin-top:16px;">
      <a href="${approveUrl}" style="display:inline-block;margin-right:8px;padding:8px 14px;background:#1f7a4a;color:#fff;text-decoration:none;border-radius:6px;">同意</a>
      <a href="${rejectUrl}" style="display:inline-block;margin-right:8px;padding:8px 14px;background:#c21835;color:#fff;text-decoration:none;border-radius:6px;">拒绝</a>
      <a href="${returnUrl}" style="display:inline-block;padding:8px 14px;background:#6f6862;color:#fff;text-decoration:none;border-radius:6px;">退回</a>
    </div>
    <p style="margin-top:12px;font-size:12px;color:#6f6862;">如果按钮未显示，请复制以下链接到浏览器：</p>
    <div style="font-size:12px;color:#6f6862;word-break:break-all;">
      同意：${approveUrl}<br/>
      拒绝：${rejectUrl}<br/>
      退回：${returnUrl}
    </div>
  </div>`;
}

app.get("/api/bp-mapping", async (_req, res) => {
  try {
    const mapping = await loadBpMapping();
    res.json(mapping);
  } catch {
    res.status(500).json({ error: "Failed to load mapping" });
  }
});

app.post("/api/bp-mapping", async (req, res) => {
  try {
    const { mapping } = req.body || {};
    if (!mapping || typeof mapping !== "object") {
      return res.status(400).json({ error: "Invalid mapping" });
    }
    await saveBpMapping(mapping);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to save mapping" });
  }
});

app.get("/api/approval-status", async (_req, res) => {
  try {
    const approvals = await loadApprovals();
    res.json(approvals);
  } catch {
    res.status(500).json({ error: "Failed to load approvals" });
  }
});

app.post("/api/approval", async (req, res) => {
  try {
    const { orderId, action, comment } = req.body || {};
    if (!orderId || !action) {
      return res.status(400).json({ error: "Missing orderId or action" });
    }
    const approvals = await loadApprovals();
    approvals[orderId] = {
      status: action,
      comment: comment || "",
      updatedAt: new Date().toISOString(),
    };
    await saveApprovals(approvals);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/notify-approval", async (req, res) => {
  try {
    const { order } = req.body || {};
    if (!order || !order.costCenter) {
      return res.status(400).json({ error: "Missing order or costCenter" });
    }

    const mapping = await loadBpMapping();
    const approverEmail = mapping[order.costCenter];
    if (!approverEmail) {
      return res.status(400).json({ error: "No BP mapping for cost center" });
    }

    const approvals = await loadApprovals();
    approvals[order.id] = { status: "pending", updatedAt: new Date().toISOString() };
    await saveApprovals(approvals);

    const token = await getGraphToken();
    if (!token) return res.status(500).json({ error: "Failed to get Graph token" });

    const payload = {
      message: {
        subject: "Marketing Material Platform - 礼品领用需要您的审批",
        body: { contentType: "HTML", content: buildHtmlEmail(order) },
        toRecipients: [{ emailAddress: { address: approverEmail } }],
      },
      saveToSentItems: true,
    };

    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${GRAPH_USER_OBJECT_ID}/sendMail`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(500).json({ error: "Graph sendMail failed", detail });
    }

    res.json({ ok: true, approverEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
