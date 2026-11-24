#!/usr/bin/env python3
"""Reproduce V3 graph reachability with E1/E2/E3 evidence-level filters."""
import argparse
import csv
from pathlib import Path
import networkx as nx

REPO = Path(__file__).resolve().parents[1]
DEFAULT_GRAPH = REPO / "data" / "graph" / "rkg_spm_v2.graphml"
CASES = [
    ("A_HAK_IBU_HAMIL", "N04", "L03"),
    ("B_HAK_KLB_PROV", "N04", "L02"),
    ("C_OTONOMI_IBU_HAMIL", "N01", "L03"),
]
FILTERS = [
    ("E1_ONLY", {"E1"}),
    ("E1_E2", {"E1", "E2"}),
    ("E1_E2_E3", {"E1", "E2", "E3"}),
]


def evaluate(graph):
    records = []
    for case, source, target in CASES:
        assert source in graph and target in graph, (source, target)
        for label, allowed in FILTERS:
            visible = nx.subgraph_view(
                graph,
                filter_edge=lambda u, v: graph.edges[u, v].get("evidence_level") in allowed,
            )
            found = nx.has_path(visible, source, target)
            path = nx.shortest_path(visible, source, target) if found else []
            records.append({
                "case": case,
                "from": source,
                "to": target,
                "filter": label,
                "path_found": found,
                "path_length_edges": len(path)-1 if path else "",
                "path": " -> ".join(path),
            })
    return records


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--graph", type=Path, default=DEFAULT_GRAPH)
    parser.add_argument("--output", type=Path, default=None, help="Optional CSV output path")
    args = parser.parse_args()
    records = evaluate(nx.read_graphml(args.graph))
    print(f"{'Kasus':<23} {'Filter':<11} {'Jalur':<8} Jejak")
    for rec in records:
        print(f"{rec['case']:<23} {rec['filter']:<11} {str(rec['path_found']):<8} {rec['path']}")
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        with args.output.open("w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=list(records[0]))
            writer.writeheader()
            writer.writerows(records)
    print("CATATAN: hasil hanya konektivitas pemodelan graf, BUKAN akurasi atau bukti hukum.")


if __name__ == "__main__":
    main()
