/**
 * 365 Days With Jesus — Portuguese Batch Audit Runner
 *
 * Can audit:
 * - A standalone JSON batch file: node scripts/run_portuguese_audit.mjs [path_to_json]
 * - Or the central registry/month files
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { auditDevotionalPair, BATCHES } from "./audit_portuguese_batch.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

// Load canonical English January source
const enSourcePath = path.join(projectRoot, "scripts/january_source.json");
let enEntries = [];
if (fs.existsSync(enSourcePath)) {
  enEntries = JSON.parse(fs.readFileSync(enSourcePath, "utf-8"));
}

export function runAuditOnEntries(ptEntries, batchId) {
  console.log("================================================================================");
  console.log(`  AUDITORIA DE INTEGRIDADE EDITORIAL — EDIÇÃO EM PORTUGUÊS (FASE 1: JANEIRO)`);
  if (batchId && BATCHES[batchId]) {
    console.log(`  Lote Avaliado: ${BATCHES[batchId].name}`);
  }
  console.log("================================================================================\n");

  let totalAudited = 0;
  let passedCount = 0;
  let failedCount = 0;
  const auditReport = [];

  for (const pt of ptEntries) {
    totalAudited++;
    const en = enEntries.find(e => e.day_number === pt.day_number);
    const res = auditDevotionalPair(pt, en);
    auditReport.push(res);

    if (res.valid) {
      console.log(`  [APROVADO] Dia ${pt.day_number}: "${pt.title}" (${res.ptReflWords} palavras refl / ${res.ptPrayerWords} oração)`);
      passedCount++;
    } else {
      console.error(`  [REJEITADO] Dia ${pt.day_number}: "${pt.title || '(Sem título)'}"`);
      res.issues.forEach(iss => console.error(`      -> ${iss}`));
      failedCount++;
    }
  }

  console.log("\n--------------------------------------------------------------------------------");
  console.log(`  Total Auditado: ${totalAudited} | Aprovados: ${passedCount} | Rejeitados: ${failedCount}`);
  console.log("--------------------------------------------------------------------------------\n");

  return {
    totalAudited,
    passedCount,
    failedCount,
    success: failedCount === 0 && totalAudited > 0,
    report: auditReport
  };
}

// If run from CLI
const targetArg = process.argv[2];
if (targetArg && fs.existsSync(targetArg)) {
  const content = JSON.parse(fs.readFileSync(targetArg, "utf-8"));
  runAuditOnEntries(Array.isArray(content) ? content : [content]);
}
