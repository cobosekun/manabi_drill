// ══════════════════════════════════════════
// カリキュラム集約（src/data が公開する単一の真実）
// 現在は算数・小1の縦スライス実証分のみ。
// 教科/学年を増やすときは各 g*.ts を import してここで合流させる。
// ══════════════════════════════════════════

import type { Curriculum } from "@/types/curriculum";
import {
  sansuuSubject,
  sansuuG1Domains,
  sansuuG1Units,
  sansuuG1Contents,
} from "./sansuu/g1";

export const curriculum: Curriculum = {
  subjects: [sansuuSubject],
  domains: [...sansuuG1Domains],
  units: [...sansuuG1Units],
  contents: { ...sansuuG1Contents },
};

export default curriculum;
