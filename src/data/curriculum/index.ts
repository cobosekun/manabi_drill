// ══════════════════════════════════════════
// カリキュラム中央集約（src/data が公開する単一の真実）
// 全教科×開講全学年スライスを取込み、domains/units/contents をマージして export。
// 各スライスは <subject>/<gN>.ts 側で編集する（このファイルは集約のみ）。
//  - Subject は各教科の最低学年ファイルから1件ずつ取込（重複定義回避）。
//  - Domains は id 重複を除去（複数学年が同一領域を共有するため）。
//  - Units/Contents は全件マージ（ID一意性・参照解決・DAGは validate が検査）。
// ══════════════════════════════════════════

import type { Curriculum, Subject, Domain, Unit, UnitContent } from "@/types/curriculum";

// ── さんすう（算数）g1-6 ──
import { sansuuSubject, sansuuG1Domains, sansuuG1Units, sansuuG1Contents } from "./sansuu/g1";
import { sansuuG2Domains, sansuuG2Units, sansuuG2Contents } from "./sansuu/g2";
import { sansuuG3Domains, sansuuG3Units, sansuuG3Contents } from "./sansuu/g3";
import { sansuuG4Domains, sansuuG4Units, sansuuG4Contents } from "./sansuu/g4";
import { sansuuG5Domains, sansuuG5Units, sansuuG5Contents } from "./sansuu/g5";
import { sansuuG6Domains, sansuuG6Units, sansuuG6Contents } from "./sansuu/g6";

// ── こくご（国語）g1-6 ──
import { kokugoSubject, kokugoG1Domains, kokugoG1Units, kokugoG1Contents } from "./kokugo/g1";
import { kokugoG2Domains, kokugoG2Units, kokugoG2Contents } from "./kokugo/g2";
import { kokugoG3Domains, kokugoG3Units, kokugoG3Contents } from "./kokugo/g3";
import { kokugoG4Domains, kokugoG4Units, kokugoG4Contents } from "./kokugo/g4";
import { kokugoG5Domains, kokugoG5Units, kokugoG5Contents } from "./kokugo/g5";
import { kokugoG6Domains, kokugoG6Units, kokugoG6Contents } from "./kokugo/g6";

// ── えいご（英語）g3-6 ──
import { eigoSubject, eigoG3Domains, eigoG3Units, eigoG3Contents } from "./eigo/g3";
import { eigoG4Domains, eigoG4Units, eigoG4Contents } from "./eigo/g4";
import { eigoG5Domains, eigoG5Units, eigoG5Contents } from "./eigo/g5";
import { eigoG6Domains, eigoG6Units, eigoG6Contents } from "./eigo/g6";

// ── りか（理科）g3-6 ──
import { rikaSubject, rikaG3Domains, rikaG3Units, rikaG3Contents } from "./rika/g3";
import { rikaG4Domains, rikaG4Units, rikaG4Contents } from "./rika/g4";
import { rikaG5Domains, rikaG5Units, rikaG5Contents } from "./rika/g5";
import { rikaG6Domains, rikaG6Units, rikaG6Contents } from "./rika/g6";

// ── しゃかい（社会）g3-6 ──
import { shakaiSubject, shakaiG3Domains, shakaiG3Units, shakaiG3Contents } from "./shakai/g3";
import { shakaiG4Domains, shakaiG4Units, shakaiG4Contents } from "./shakai/g4";
import { shakaiG5Domains, shakaiG5Units, shakaiG5Contents } from "./shakai/g5";
import { shakaiG6Domains, shakaiG6Units, shakaiG6Contents } from "./shakai/g6";

// ── せいかつ（生活）g1-2 ──
import { seikatsuSubject, seikatsuG1Domains, seikatsuG1Units, seikatsuG1Contents } from "./seikatsu/g1";
import { seikatsuG2Domains, seikatsuG2Units, seikatsuG2Contents } from "./seikatsu/g2";

// ── きょうよう（教養）g1-6 ──
import { kyoyoSubject, kyoyoG1Domains, kyoyoG1Units, kyoyoG1Contents } from "./kyoyo/g1";
import { kyoyoG2Domains, kyoyoG2Units, kyoyoG2Contents } from "./kyoyo/g2";
import { kyoyoG3Domains, kyoyoG3Units, kyoyoG3Contents } from "./kyoyo/g3";
import { kyoyoG4Domains, kyoyoG4Units, kyoyoG4Contents } from "./kyoyo/g4";
import { kyoyoG5Domains, kyoyoG5Units, kyoyoG5Contents } from "./kyoyo/g5";
import { kyoyoG6Domains, kyoyoG6Units, kyoyoG6Contents } from "./kyoyo/g6";

// ── おうよう（応用）g1-6 ──
import { oyoSubject, oyoG1Domains, oyoG1Units, oyoG1Contents } from "./oyo/g1";
import { oyoG2Domains, oyoG2Units, oyoG2Contents } from "./oyo/g2";
import { oyoG3Domains, oyoG3Units, oyoG3Contents } from "./oyo/g3";
import { oyoG4Domains, oyoG4Units, oyoG4Contents } from "./oyo/g4";
import { oyoG5Domains, oyoG5Units, oyoG5Contents } from "./oyo/g5";
import { oyoG6Domains, oyoG6Units, oyoG6Contents } from "./oyo/g6";

// ── IT（じょうほう）g1-6 ──
import { itSubject, itG1Domains, itG1Units, itG1Contents } from "./it/g1";
import { itG2Domains, itG2Units, itG2Contents } from "./it/g2";
import { itG3Domains, itG3Units, itG3Contents } from "./it/g3";
import { itG4Domains, itG4Units, itG4Contents } from "./it/g4";
import { itG5Domains, itG5Units, itG5Contents } from "./it/g5";
import { itG6Domains, itG6Units, itG6Contents } from "./it/g6";

// ── 教科（最低学年ファイルから1件ずつ）──
const subjects: Subject[] = [
  sansuuSubject,
  kokugoSubject,
  eigoSubject,
  rikaSubject,
  shakaiSubject,
  seikatsuSubject,
  kyoyoSubject,
  oyoSubject,
  itSubject,
];

// ── 全領域（id 重複は後段で除去）──
const allDomains: Domain[] = [
  ...sansuuG1Domains, ...sansuuG2Domains, ...sansuuG3Domains, ...sansuuG4Domains, ...sansuuG5Domains, ...sansuuG6Domains,
  ...kokugoG1Domains, ...kokugoG2Domains, ...kokugoG3Domains, ...kokugoG4Domains, ...kokugoG5Domains, ...kokugoG6Domains,
  ...eigoG3Domains, ...eigoG4Domains, ...eigoG5Domains, ...eigoG6Domains,
  ...rikaG3Domains, ...rikaG4Domains, ...rikaG5Domains, ...rikaG6Domains,
  ...shakaiG3Domains, ...shakaiG4Domains, ...shakaiG5Domains, ...shakaiG6Domains,
  ...seikatsuG1Domains, ...seikatsuG2Domains,
  ...kyoyoG1Domains, ...kyoyoG2Domains, ...kyoyoG3Domains, ...kyoyoG4Domains, ...kyoyoG5Domains, ...kyoyoG6Domains,
  ...oyoG1Domains, ...oyoG2Domains, ...oyoG3Domains, ...oyoG4Domains, ...oyoG5Domains, ...oyoG6Domains,
  ...itG1Domains, ...itG2Domains, ...itG3Domains, ...itG4Domains, ...itG5Domains, ...itG6Domains,
];

// ── 全単元（ID一意性は validate が検査）──
const units: Unit[] = [
  ...sansuuG1Units, ...sansuuG2Units, ...sansuuG3Units, ...sansuuG4Units, ...sansuuG5Units, ...sansuuG6Units,
  ...kokugoG1Units, ...kokugoG2Units, ...kokugoG3Units, ...kokugoG4Units, ...kokugoG5Units, ...kokugoG6Units,
  ...eigoG3Units, ...eigoG4Units, ...eigoG5Units, ...eigoG6Units,
  ...rikaG3Units, ...rikaG4Units, ...rikaG5Units, ...rikaG6Units,
  ...shakaiG3Units, ...shakaiG4Units, ...shakaiG5Units, ...shakaiG6Units,
  ...seikatsuG1Units, ...seikatsuG2Units,
  ...kyoyoG1Units, ...kyoyoG2Units, ...kyoyoG3Units, ...kyoyoG4Units, ...kyoyoG5Units, ...kyoyoG6Units,
  ...oyoG1Units, ...oyoG2Units, ...oyoG3Units, ...oyoG4Units, ...oyoG5Units, ...oyoG6Units,
  ...itG1Units, ...itG2Units, ...itG3Units, ...itG4Units, ...itG5Units, ...itG6Units,
];

// ── 全コンテンツ（unitId キーでマージ）──
const contents: Record<string, UnitContent> = {
  ...sansuuG1Contents, ...sansuuG2Contents, ...sansuuG3Contents, ...sansuuG4Contents, ...sansuuG5Contents, ...sansuuG6Contents,
  ...kokugoG1Contents, ...kokugoG2Contents, ...kokugoG3Contents, ...kokugoG4Contents, ...kokugoG5Contents, ...kokugoG6Contents,
  ...eigoG3Contents, ...eigoG4Contents, ...eigoG5Contents, ...eigoG6Contents,
  ...rikaG3Contents, ...rikaG4Contents, ...rikaG5Contents, ...rikaG6Contents,
  ...shakaiG3Contents, ...shakaiG4Contents, ...shakaiG5Contents, ...shakaiG6Contents,
  ...seikatsuG1Contents, ...seikatsuG2Contents,
  ...kyoyoG1Contents, ...kyoyoG2Contents, ...kyoyoG3Contents, ...kyoyoG4Contents, ...kyoyoG5Contents, ...kyoyoG6Contents,
  ...oyoG1Contents, ...oyoG2Contents, ...oyoG3Contents, ...oyoG4Contents, ...oyoG5Contents, ...oyoG6Contents,
  ...itG1Contents, ...itG2Contents, ...itG3Contents, ...itG4Contents, ...itG5Contents, ...itG6Contents,
};

// Domains は id 重複を除去（複数学年が同一領域を共有）。
const domains: Domain[] = [];
const seenDomainId = new Set<string>();
for (const d of allDomains) {
  if (!seenDomainId.has(d.id)) {
    seenDomainId.add(d.id);
    domains.push(d);
  }
}

export const curriculum: Curriculum = { subjects, domains, units, contents };

export default curriculum;
