#!/usr/bin/env python3
"""Audit a directed RKG GraphML snapshot without inferring legal validity."""
import argparse
from collections import Counter
import json
from pathlib import Path
import networkx as nx

REPO = Path(__file__).resolve().parents[1]
DEFAULT_GRAPH = REPO / "data" / "graph" / "rkg_spm_v2.graphml"


def summarize(path: Path):
    graph = nx.read_graphml(path)
    candidates = [a for _, _, a in graph.edges(data=True)
                  if a.get("relation", "").startswith("RELATED_NORM_")]
    return {
        "nodes": graph.number_of_nodes(),
        "edges": graph.number_of_edges(),
        "directed": graph.is_directed(),
        "nodes_by_kind": dict(sorted(Counter(a.get("kind", "UNKNOWN")
                                           for _, a in graph.nodes(data=True)).items())),
        "all_edges_by_level": dict(sorted(Counter(a.get("evidence_level", "UNKNOWN")
                                                for _, _, a in graph.edges(data=True)).items())),
        "norm_candidate_relations": len(candidates),
        "norm_candidates_by_level": dict(sorted(Counter(a.get("evidence_level", "UNKNOWN")
                                                      for a in candidates).items())),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--graph", type=Path, default=DEFAULT_GRAPH)
    args = parser.parse_args()
    print(json.dumps(summarize(args.graph), indent=2, ensure_ascii=False))
    print("CATATAN: ukuran graf dan kategori bukti tidak mengukur keabsahan tafsir hukum.")


if __name__ == "__main__":
    main()
