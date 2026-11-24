"""Local, structural regression tests. These do NOT validate legal interpretations."""
import csv
import sys
from collections import Counter
from pathlib import Path
import unittest

import networkx as nx

REPO = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO / "scripts"))
from ablation import evaluate  # noqa: E402
from inspect_graph import summarize  # noqa: E402


class GraphIntegrity(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.path = REPO / "data" / "graph" / "rkg_spm_v2.graphml"
        cls.graph = nx.read_graphml(cls.path)

    def test_size_and_direction(self):
        self.assertTrue(self.graph.is_directed())
        self.assertEqual((self.graph.number_of_nodes(), self.graph.number_of_edges()), (131, 213))

    def test_node_kinds(self):
        summary = summarize(self.path)
        self.assertEqual(summary["nodes_by_kind"], {
            "Actor": 16, "HealthService": 14, "Norm": 41,
            "Provision": 51, "Regulation": 7, "SPMLevel": 2,
        })

    def test_candidate_evidence_levels(self):
        candidate = [e for _, _, e in self.graph.edges(data=True)
                     if e.get("relation", "").startswith("RELATED_NORM_")]
        self.assertEqual(len(candidate), 29)
        self.assertEqual(Counter(e.get("evidence_level") for e in candidate),
                         {"E1": 7, "E2": 16, "E3": 6})

    def test_reachability_ablation(self):
        records = evaluate(self.graph)
        self.assertEqual(len(records), 9)
        by_filter = Counter(r["filter"] for r in records if r["path_found"])
        self.assertEqual(by_filter, {"E1_E2_E3": 3})

    def test_audit_rows(self):
        root = REPO / "data" / "annotations" / "v3"
        with (root / "Audit_29_Relasi.csv").open(newline="", encoding="utf-8") as f:
            rows = list(csv.DictReader(f))
        self.assertEqual(len(rows), 29)
        self.assertEqual(Counter(row["Level_bukti_V3"] for row in rows),
                         {"E1": 7, "E2": 16, "E3": 6})


if __name__ == "__main__":
    unittest.main()
