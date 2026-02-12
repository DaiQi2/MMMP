const makeSvg = (label, color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.45"/>
        </linearGradient>
      </defs>
      <rect width="480" height="360" rx="24" fill="url(#g)"/>
      <circle cx="360" cy="90" r="48" fill="${color}" opacity="0.4"/>
      <rect x="72" y="120" width="240" height="140" rx="22" fill="${color}" opacity="0.65"/>
      <rect x="100" y="150" width="184" height="80" rx="16" fill="#fff" opacity="0.75"/>
      <text x="90" y="300" font-size="22" fill="#2a1d16" font-family="sans-serif" font-weight="600">${label}</text>
    </svg>
  `.trim();
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
};

const state = {
  role: "operator",
  pointsBalance: 3200,
  materials: [
    { id: "SKU-1001", name: "字母笔", type: "standard", stock: 138, available: 17, category: "礼品", price: 10, redeemable: true, points: 120, image: makeSvg("字母笔", "#e44b2d") },
    { id: "SKU-1002", name: "鸭舌帽", type: "standard", stock: 56, available: 24, category: "礼品", price: 35, redeemable: true, points: 380, image: makeSvg("鸭舌帽", "#d88c6a") },
    { id: "SKU-1003", name: "帆布袋", type: "standard", stock: 74, available: 31, category: "礼品", price: 25, redeemable: true, points: 260, image: makeSvg("帆布袋", "#c95c3b") },
    { id: "SKU-1004", name: "签字笔", type: "standard", stock: 92, available: 38, category: "礼品", price: 15, redeemable: false, points: 0, image: makeSvg("签字笔", "#1e1b1a") },
    { id: "SKU-2001", name: "折叠伞", type: "custom", stock: 60, available: 45, category: "定制", price: 50, redeemable: true, points: 520, image: makeSvg("折叠伞", "#2f4f3c") },
    { id: "SKU-2002", name: "鼠标", type: "standard", stock: 78, available: 52, category: "礼品", price: 80, redeemable: false, points: 0, image: makeSvg("鼠标", "#45545f") },
    { id: "SKU-2003", name: "运动巾", type: "custom", stock: 96, available: 59, category: "定制", price: 40, redeemable: true, points: 420, image: makeSvg("运动巾", "#2e7f8f") },
    { id: "SKU-2004", name: "鼠标垫", type: "standard", stock: 114, available: 66, category: "礼品", price: 15, redeemable: true, points: 180, image: makeSvg("鼠标垫", "#2a1d1a") },
    { id: "SKU-3001", name: "躺椅", type: "expo", stock: 132, available: 73, category: "展会", price: 200, redeemable: false, points: 0, image: makeSvg("躺椅", "#d6a04e") },
    { id: "SKU-3002", name: "无纺布袋", type: "custom", stock: 100, available: 80, category: "定制", price: 8, redeemable: true, points: 90, image: makeSvg("无纺布袋", "#b7b7b7") },
    { id: "SKU-3003", name: "转换器", type: "standard", stock: 118, available: 87, category: "礼品", price: 60, redeemable: true, points: 640, image: makeSvg("转换器", "#6b6f77") },
    { id: "SKU-3004", name: "手机支架", type: "standard", stock: 56, available: 14, category: "礼品", price: 20, redeemable: true, points: 220, image: makeSvg("手机支架", "#1f1d1a") },
  ],
  orders: [
    { id: "L-20250201", requester: "王晓", cost: "市场中心", status: "待审批", split: "多地址", amount: "¥12,800" },
    { id: "L-20250202", requester: "李楠", cost: "华东销售", status: "已审批", split: "单地址", amount: "¥3,200" },
    { id: "L-20250203", requester: "赵婷", cost: "品牌部", status: "待发货", split: "多地址", amount: "¥6,500" },
    { id: "L-20250204", requester: "陈豪", cost: "展会组", status: "已拒绝", split: "单地址", amount: "¥1,900" },
  ],
  approvals: [
    { id: "L-20250201", requester: "王晓", amount: "¥12,800", reason: "跨成本中心 (市场/销售)", status: "待审批" },
    { id: "L-20250205", requester: "韩梦", amount: "¥4,400", reason: "展会用品补货", status: "待审批" },
    { id: "L-20250206", requester: "孙立", amount: "¥18,000", reason: "定制礼品-品牌活动", status: "待审批" },
  ],
  procurements: [
    { id: "P-20250188", supplier: "星程礼品", items: "展板套件", status: "生产中", method: "发仓库" },
    { id: "P-20250189", supplier: "优品印刷", items: "宣传折页", status: "待入库", method: "发仓库" },
    { id: "P-20250190", supplier: "天启展具", items: "展台工具包", status: "已发货", method: "直发" },
  ],
  inventory: [
    { sku: "SKU-2001", name: "定制展板套件", system: 12, actual: 9, diff: "-3" },
    { sku: "SKU-4001", name: "展台工具包", system: 7, actual: 10, diff: "+3" },
    { sku: "SKU-3002", name: "会议礼盒", system: 18, actual: 16, diff: "-2" },
  ],
  returns: [
    { id: "R-20250112", requester: "黄静", status: "待取件", type: "一键退回" },
    { id: "R-20250113", requester: "周泽", status: "待入库", type: "第三方物品" },
    { id: "R-20250114", requester: "梁思", status: "已完成", type: "普通退回" },
  ],
  shipping: [
    { id: "S-20250131", order: "L-20250203", type: "领用发货", status: "待接单" },
    { id: "S-20250132", order: "P-20250189", type: "采购发货", status: "待发货" },
  ],
};

const routes = ["dashboard", "materials", "points", "orders", "approvals", "procurements", "inventory", "returns", "suppliers", "settings"];
const routeToPage = {
  dashboard: "index.html",
  materials: "materials.html",
  points: "points.html",
  orders: "orders.html",
  approvals: "approvals.html",
  procurements: "procurements.html",
  inventory: "inventory.html",
  returns: "returns.html",
  suppliers: "suppliers.html",
  settings: "settings.html",
};

const materialsGrid = document.getElementById("materialsGrid");
const ordersTable = document.getElementById("ordersTable");
const approvalBoard = document.getElementById("approvalBoard");
const procurementsTable = document.getElementById("procurementsTable");
const inventoryTable = document.getElementById("inventoryTable");
const returnsTable = document.getElementById("returnsTable");
const shippingTable = document.getElementById("shippingTable");
const roleList = document.getElementById("roleList");
const permissionTable = document.getElementById("permissionTable");
const redeemGrid = document.getElementById("redeemGrid");
const redeemList = document.getElementById("redeemList");
const redeemTotal = document.getElementById("redeemTotal");
const redeemBalance = document.getElementById("redeemBalance");
const redeemHint = document.getElementById("redeemHint");
const pointsBalance = document.getElementById("pointsBalance");
const redeemableCount = document.getElementById("redeemableCount");
const redeemOnlyToggle = document.getElementById("redeemOnlyToggle");
const redeemSubmit = document.getElementById("redeemSubmit");

const modal = document.getElementById("decisionModal");
const modalOrder = document.getElementById("modalOrder");
const modalReason = document.getElementById("modalReason");
const orderDrawer = document.getElementById("orderDrawer");
const orderForm = document.getElementById("orderForm");
const splitList = document.getElementById("splitList");
const itemList = document.getElementById("itemList");
const addressList = document.getElementById("addressList");
const multiAddressToggle = document.getElementById("multiAddressToggle");
const primaryCostCenter = document.getElementById("primaryCostCenter");
const totalAmount = document.getElementById("totalAmount");
const splitToggle = document.getElementById("splitToggle");
const splitHint = document.getElementById("splitHint");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
let modalTarget = null;

const redeemCart = new Map();

const bpMapping = {
  "市场中心": "BP-张珊",
  "品牌部": "BP-张珊",
  "华东销售": "BP-李敏",
  "展会组": "BP-王强",
};

function getBpByCostCenter(cost) {
  return bpMapping[cost] || null;
}

function validateSplitAndBp() {
  if (!primaryCostCenter || !totalAmount || !splitToggle) return true;
  const primary = primaryCostCenter.value.trim();
  const total = Number(totalAmount.value || 0);
  const isSplit = splitToggle.checked;
  const rows = splitList ? Array.from(splitList.querySelectorAll(".split-row")).slice(1) : [];

  if (!primary) {
    alert("请填写主成本中心");
    return false;
  }
  if (total <= 0) {
    alert("总金额必须为正数");
    return false;
  }

  if (!isSplit) {
    // 单一成本中心校验：更换后的成本中心 BP 必须与最终使用者 BP 一致（用示例模拟）
    const endUser = document.querySelector("input[name='finalUser']")?.value?.trim() || "";
    const userBp = endUser ? "BP-张珊" : getBpByCostCenter(primary);
    const ccBp = getBpByCostCenter(primary);
    if (!ccBp || ccBp !== userBp) {
      alert("主成本中心与最终使用者财务BP不一致，请改为分摊或另提新单");
      return false;
    }
    return true;
  }

  // 分摊校验
  if (!rows.length) {
    alert("已勾选分摊，请填写分摊表");
    return false;
  }
  let ratioSum = 0;
  rows.forEach((row) => {
    const ratio = Number(row.querySelector("input:nth-child(2)")?.value || 0);
    ratioSum += ratio;
  });
  if (Math.round(ratioSum) !== 100) {
    alert("分摊比例需合计 100% ");
    return false;
  }
  if (!getBpByCostCenter(primary)) {
    alert("主成本中心无法映射财务BP，请更换或另提申请");
    return false;
  }
  return true;
}

function renderMaterials(filter = "all") {
  if (!materialsGrid) return;
  materialsGrid.innerHTML = "";
  const list = state.materials.filter((item) => {
    if (filter === "all") return true;
    if (filter === "low") return item.stock < 20;
    return item.type === filter;
  });

  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "material-card";
    card.innerHTML = `
      <div class="material-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy"/>
      </div>
      <div class="material-name">${item.name}</div>
      <div class="material-stock">可下单数量：<span class="stock-strong">${item.available}</span> | 总库存：${item.stock}</div>
      <div class="material-footer">
        <div class="material-price">¥${item.price}</div>
        <button class="btn ghost icon">🛒</button>
        <button class="btn primary small">立即领用</button>
      </div>
    `;
    materialsGrid.appendChild(card);
  });
}

function renderPointsPage() {
  if (!redeemGrid) return;
  const showRedeemOnly = redeemOnlyToggle ? redeemOnlyToggle.checked : true;
  const list = state.materials.filter((item) => (showRedeemOnly ? item.redeemable : true));

  redeemGrid.innerHTML = "";
  list.forEach((item) => {
    const card = document.createElement("div");
    card.className = "material-card";
    const disabled = !item.redeemable ? "disabled" : "";
    card.innerHTML = `
      <div class="material-image">
        <img src="${item.image}" alt="${item.name}" loading="lazy"/>
      </div>
      <div class="material-name">${item.name}</div>
      <div class="material-stock">库存：${item.stock} | 兑换：${item.redeemable ? item.points + " 积分" : "不可兑换"}</div>
      <div class="material-footer">
        <div class="material-price">SKU ${item.id}</div>
        <button class="btn primary small" data-redeem-add="${item.id}" ${disabled}>加入兑换</button>
      </div>
    `;
    redeemGrid.appendChild(card);
  });

  if (pointsBalance) pointsBalance.textContent = state.pointsBalance;
  if (redeemableCount) redeemableCount.textContent = state.materials.filter((m) => m.redeemable).length;
  renderRedeemCart();
}

function renderRedeemCart() {
  if (!redeemList) return;
  redeemList.innerHTML = "";
  let total = 0;
  redeemCart.forEach((qty, id) => {
    const item = state.materials.find((m) => m.id === id);
    if (!item) return;
    const row = document.createElement("div");
    row.className = "redeem-row";
    const rowTotal = qty * item.points;
    total += rowTotal;
    row.innerHTML = `
      <div>
        <div class="redeem-title">${item.name}</div>
        <div class="redeem-sub">${item.points} 积分 / 件</div>
      </div>
      <div class="redeem-qty">
        <button class="btn ghost icon" data-redeem-dec="${item.id}">-</button>
        <span>${qty}</span>
        <button class="btn ghost icon" data-redeem-inc="${item.id}">+</button>
      </div>
      <div class="redeem-total">${rowTotal} 积分</div>
    `;
    redeemList.appendChild(row);
  });

  if (redeemTotal) redeemTotal.textContent = total;
  if (redeemBalance) redeemBalance.textContent = state.pointsBalance;
  if (redeemHint) {
    redeemHint.textContent = total === 0 ? "请添加兑换物品" : "";
  }
}

function renderTable(el, headers, rows, statusIndex) {
  if (!el) return;
  el.innerHTML = "";
  const headerRow = document.createElement("div");
  headerRow.className = "table-row header";
  headerRow.innerHTML = headers.map((h) => `<div>${h}</div>`).join("");
  el.appendChild(headerRow);

  rows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "table-row";
    row.forEach((cell, i) => {
      const cellEl = document.createElement("div");
      if (i === statusIndex) {
        const status = document.createElement("div");
        const statusKey = cell.includes("待") ? "pending" : cell.includes("拒") ? "rejected" : cell.includes("发货") ? "shipping" : "approved";
        status.className = `status ${statusKey}`;
        status.textContent = cell;
        cellEl.appendChild(status);
      } else {
        cellEl.textContent = cell;
      }
      rowEl.appendChild(cellEl);
    });
    el.appendChild(rowEl);
  });
}

function renderOrders() {
  if (!ordersTable) return;
  const rows = state.orders.map((order) => [order.id, order.requester, order.cost, order.split, order.amount, order.status]);
  renderTable(ordersTable, ["订单号", "申请人", "成本中心", "拆分方式", "金额", "状态"], rows, 5);
}

function renderApprovals() {
  if (!approvalBoard) return;
  approvalBoard.innerHTML = "";
  state.approvals.forEach((item) => {
    const card = document.createElement("div");
    card.className = "approval-card";
    card.innerHTML = `
      <h4>${item.id}</h4>
      <div>申请人：${item.requester}</div>
      <div>金额：${item.amount}</div>
      <div>说明：${item.reason}</div>
      <div class="pill">${item.status}</div>
      <button class="btn primary" data-approve-id="${item.id}">审批</button>
    `;
    approvalBoard.appendChild(card);
  });
}

function renderProcurements() {
  if (!procurementsTable) return;
  const rows = state.procurements.map((item) => [item.id, item.supplier, item.items, item.method, item.status, "查看"]);
  renderTable(procurementsTable, ["采购单号", "供应商", "物料", "发货方式", "状态", "操作"], rows, 4);
}

function renderInventory() {
  if (!inventoryTable) return;
  const rows = state.inventory.map((item) => [item.sku, item.name, item.system, item.actual, item.diff, item.diff.startsWith("-") ? "待核对" : "已校准"]);
  renderTable(inventoryTable, ["SKU", "名称", "系统库存", "实物库存", "差异", "状态"], rows, 5);
}

function renderReturns() {
  if (!returnsTable) return;
  const rows = state.returns.map((item) => [item.id, item.requester, item.type, item.status, item.status === "已完成" ? "查看" : "处理", "-" ]);
  renderTable(returnsTable, ["退回单号", "申请人", "类型", "状态", "操作", "备注"], rows, 3);
}

function renderShipping() {
  if (!shippingTable) return;
  const rows = state.shipping.map((item) => [item.id, item.order, item.type, item.status, "接单", "回填"]);
  renderTable(shippingTable, ["发货单号", "关联订单", "类型", "状态", "操作", "物流"], rows, 3);
}

function renderRoles() {
  if (!roleList || !permissionTable) return;
  const roles = [
    "领用人员：创建领用订单 / 退回申请",
    "审批人员：经理与财务 BP 审批",
    "运营人员：采购、库存、权限、异常处理",
    "供应商：接单发货 / 物流回填",
    "代理人员：代查订单 / 退货操作",
  ];
  roleList.innerHTML = roles.map((r) => `<li>${r}</li>`).join("");

  const permissions = [
    ["模块", "领用", "审批", "运营", "供应商"],
    ["物料中心", "读", "读", "读/写", "只读"],
    ["领用订单", "读/写", "读", "读/写", "只读"],
    ["审批中心", "-", "读/写", "读", "-"],
    ["采购订单", "-", "读", "读/写", "读/写"],
    ["库存管理", "-", "-", "读/写", "只读"],
  ];

  permissionTable.innerHTML = "";
  permissions.forEach((row, index) => {
    const rowEl = document.createElement("div");
    rowEl.className = "table-row" + (index === 0 ? " header" : "");
    rowEl.style.gridTemplateColumns = "repeat(5, 1fr)";
    rowEl.innerHTML = row.map((cell) => `<div>${cell}</div>`).join("");
    permissionTable.appendChild(rowEl);
  });
}


function updateSplitAmounts() {
  if (!splitList || !totalAmount) return;
  const total = Number(totalAmount.value || 0);
  const rows = Array.from(splitList.querySelectorAll(".split-row")).slice(1);
  rows.forEach((row) => {
    const ratio = Number(row.querySelector("input:nth-child(2)")?.value || 0);
    const amountCell = row.querySelector("input:nth-child(3)");
    if (amountCell) {
      amountCell.value = total > 0 ? (total * ratio / 100).toFixed(2) : "";
    }
  });
}

function bindEvents() {
  const menuToggle = document.querySelector("[data-toggle-sidebar]");
  if (menuToggle && sidebar && sidebarOverlay) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.add("active");
      sidebarOverlay.classList.add("active");
      sidebarOverlay.setAttribute("aria-hidden", "false");
    });
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      sidebarOverlay.setAttribute("aria-hidden", "true");
    });
  }
  document.querySelectorAll("[data-open-order]").forEach((btn) => {
    btn.addEventListener("click", () => openOrderDrawer());
  });

  document.querySelectorAll("[data-close-order]").forEach((btn) => {
    btn.addEventListener("click", closeOrderDrawer);
  });

  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      renderMaterials(chip.dataset.filter);
    });
  });

  if (approvalBoard) {
    approvalBoard.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-approve-id]");
      if (!btn) return;
      const id = btn.dataset.approveId;
      modalTarget = id;
      if (modalOrder) modalOrder.textContent = `订单：${id}`;
      if (modalReason) modalReason.value = "";
      if (modal) {
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
      }
    });
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target.matches("[data-close]") || event.target === modal) {
        closeModal();
      }
      if (event.target.matches("[data-approve]")) {
        updateApproval("已审批");
      }
      if (event.target.matches("[data-reject]")) {
        updateApproval("已拒绝");
      }
    });
  }

  const roleSelect = document.getElementById("roleSelect");
  if (roleSelect) {
    roleSelect.addEventListener("change", (event) => {
      state.role = event.target.value;
      updateRoleView();
    });
  }

  if (splitList) {
    const addSplit = document.querySelector("[data-add-split]");
    if (addSplit) {
      addSplit.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "split-row";
        row.innerHTML = `
          <input type="text" placeholder="成本中心" />
          <input type="number" placeholder="比例(%)" />
          <input type="text" placeholder="自动计算" disabled />
        `;
        splitList.appendChild(row);
      });
    }
  }


  if (splitToggle && splitList) {
    const updateSplitUI = () => {
      const enabled = splitToggle.checked;
      splitList.style.display = enabled ? "grid" : "none";
      if (splitHint) {
        splitHint.textContent = enabled ? "已启用分摊，比例合计需为 100%" : "未勾选分摊时不可填写分摊表";
      }
    };
    splitToggle.addEventListener("change", () => {
      updateSplitUI();
    });
    updateSplitUI();
  }

  if (totalAmount) {
    totalAmount.addEventListener("input", updateSplitAmounts);
  }
  if (splitList) {
    splitList.addEventListener("input", (event) => {
      if (event.target.matches("input:nth-child(2)")) {
        updateSplitAmounts();
      }
    });
  }
  if (itemList) {
    const addItem = document.querySelector("[data-add-item]");
    if (addItem) {
      addItem.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "item-row";
        row.innerHTML = `
          <input type="text" placeholder="输入物料名称或 SKU" />
          <select>
            <option>标准礼品</option>
            <option>定制/印刷</option>
            <option>展会用品</option>
          </select>
          <input type="number" min="1" value="1" />
          <button class="btn ghost" type="button" data-remove-row>移除</button>
        `;
        itemList.appendChild(row);
      });
    }

    itemList.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-remove-row]");
      if (!btn) return;
      const row = btn.closest(".item-row");
      if (row && !row.classList.contains("header")) {
        row.remove();
      }
    });
  }

  if (addressList) {
    const addAddress = document.querySelector("[data-add-address]");
    if (addAddress) {
      addAddress.addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "address-row";
        row.innerHTML = `
          <input type="text" placeholder="收货人" />
          <input type="text" placeholder="电话" />
          <input type="text" placeholder="地址" />
          <input type="text" placeholder="SKU-1001 x 20" />
        `;
        addressList.appendChild(row);
      });
    }
  }

  if (multiAddressToggle && addressList) {
    multiAddressToggle.addEventListener("change", () => {
      addressList.style.display = multiAddressToggle.checked ? "grid" : "none";
    });
    addressList.style.display = multiAddressToggle.checked ? "grid" : "none";
  }

  if (orderForm) {
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateSplitAndBp()) return;
      closeOrderDrawer();
      alert("已提交领用订单（演示数据）。");
    });
  }

  if (redeemOnlyToggle) {
    redeemOnlyToggle.addEventListener("change", renderPointsPage);
  }

  if (redeemGrid) {
    redeemGrid.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-redeem-add]");
      if (!btn) return;
      const id = btn.dataset.redeemAdd;
      const item = state.materials.find((m) => m.id === id);
      if (!item || !item.redeemable) return;
      const next = (redeemCart.get(id) || 0) + 1;
      redeemCart.set(id, next);
      renderRedeemCart();
    });
  }

  if (redeemList) {
    redeemList.addEventListener("click", (event) => {
      const inc = event.target.closest("[data-redeem-inc]");
      const dec = event.target.closest("[data-redeem-dec]");
      if (!inc && !dec) return;
      const id = (inc || dec).dataset.redeemInc || (inc || dec).dataset.redeemDec;
      const current = redeemCart.get(id) || 0;
      const next = inc ? current + 1 : current - 1;
      if (next <= 0) redeemCart.delete(id);
      else redeemCart.set(id, next);
      renderRedeemCart();
    });
  }

  if (redeemSubmit) {
    redeemSubmit.addEventListener("click", () => {
      let total = 0;
      redeemCart.forEach((qty, id) => {
        const item = state.materials.find((m) => m.id === id);
        if (item) total += qty * item.points;
      });
      if (total === 0) {
        alert("请先添加可兑换物品");
        return;
      }
      if (total > state.pointsBalance) {
        alert("积分不足，无法提交兑换");
        return;
      }
      state.pointsBalance -= total;
      redeemCart.clear();
      renderPointsPage();
      alert("兑换订单已生成（不触发审批）");
    });
  }
}

function updateApproval(status) {
  if (!modalTarget) return;
  state.approvals = state.approvals.map((item) =>
    item.id === modalTarget ? { ...item, status } : item
  );
  closeModal();
  renderApprovals();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  modalTarget = null;
}

function openOrderDrawer() {
  if (!orderDrawer) return;
  orderDrawer.classList.add("active");
  orderDrawer.setAttribute("aria-hidden", "false");
}

function closeOrderDrawer() {
  if (!orderDrawer) return;
  orderDrawer.classList.remove("active");
  orderDrawer.setAttribute("aria-hidden", "true");
}

function updateRoleView() {
  const role = state.role;
  const navMap = {
    requester: ["dashboard", "materials", "points", "orders", "returns"],
    approver: ["dashboard", "approvals", "orders"],
    operator: routes,
    supplier: ["dashboard", "suppliers", "procurements", "orders"],
    agent: ["dashboard", "points", "orders", "returns"],
  };

  const currentPage = location.pathname.split("/").pop() || "index.html";
  const allowedPages = navMap[role].map((route) => routeToPage[route] || "index.html");

  document.querySelectorAll(".nav-link").forEach((link) => {
    const isAllowed = navMap[role].includes(link.dataset.route);
    link.style.display = isAllowed ? "block" : "none";
  });

  if (!allowedPages.includes(currentPage)) {
    window.location.href = "index.html";
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });

  const bottomNav = document.getElementById("bottomNav");
  if (bottomNav) {
    bottomNav.querySelectorAll("a").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === currentPage);
      const route = link.dataset.route;
      const isAllowed = navMap[role].includes(route);
      link.style.display = isAllowed ? "block" : "none";
    });
  }

  if (sidebar && sidebarOverlay) {
    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
    sidebarOverlay.setAttribute("aria-hidden", "true");
  }
}

function init() {
  renderMaterials();
  renderOrders();
  renderApprovals();
  renderProcurements();
  renderInventory();
  renderReturns();
  renderShipping();
  renderRoles();
  renderPointsPage();
  updateRoleView();
  bindEvents();
}

init();
