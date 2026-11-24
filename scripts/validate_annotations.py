#!/usr/bin/env python3
"""Check extracted V3 CSV tables for consistency with the archived audit summary."""
import csv
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
D = REPO / "data" / "annotations" / "v3"


def records(name):
    with (D / (name + ".csv")).open(newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def main():
    rel = records("Audit_29_Relasi")
    findings = records("Matriks_Temuan_V3")
    recommendations = records("Rekomendasi_PPHN")
    review = records("Form_Review_Pakar")
    levels = dict(Counter(r["Level_bukti_V3"] for r in rel))
    assert len(rel) == 29, len(rel)
    assert levels == {"E3": 6, "E2": 16, "E1": 7}, levels
    assert len(findings) == 6
    assert len(recommendations) == 4
    assert len(review) == 22
    print("AUDIT: 29 relasi", levels)
    print("TEMUAN: 6 | REKOMENDASI: 4 | FORM REVIEW E2/E3: 22")
    print("CATATAN: struktur data sesuai snapshot, bukan verifikasi substansi hukum.")


if __name__ == "__main__":
    main()
