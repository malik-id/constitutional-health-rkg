#!/usr/bin/env python3
"""Export GraphML nodes and relationships as generic Neo4j LOAD CSV inputs.

This NEW helper has NOT been executed against a live Neo4j database.
"""
import argparse
import csv
from pathlib import Path
import networkx as nx

REPO = Path(__file__).resolve().parents[1]
DEFAULT_GRAPH = REPO / "data" / "graph" / "rkg_spm_v2.graphml"

NODE_COLUMNS = ["id", "kind", "label", "regulation", "locator", "citation", "year", "url"]
EDGE_COLUMNS = ["id", "source", "target", "relation", "evidence_level", "citation", "review_status", "note"]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--graph", type=Path, default=DEFAULT_GRAPH)
    parser.add_argument("--output", type=Path, default=REPO / "exports" / "neo4j")
    args = parser.parse_args()
    graph = nx.read_graphml(args.graph)
    args.output.mkdir(parents=True, exist_ok=True)
    with (args.output / "nodes.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=NODE_COLUMNS)
        writer.writeheader()
        for node_id, attrs in graph.nodes(data=True):
            writer.writerow({c: node_id if c == "id" else attrs.get(c, "") for c in NODE_COLUMNS})
    with (args.output / "relationships.csv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=EDGE_COLUMNS)
        writer.writeheader()
        for source, target, attrs in graph.edges(data=True):
            row = {c: attrs.get(c, "") for c in EDGE_COLUMNS}
            row["source"] = source
            row["target"] = target
            row["id"] = attrs.get("id", source+"__"+target)
            writer.writerow(row)
    print("Exported",graph.number_of_nodes(),"nodes and",graph.number_of_edges(),
          "relationships to",args.output)
    print("No Neo4j database was changed. See cypher/load_graphml_csv.cypher for UNTESTED example.")


if __name__ == "__main__":
    main()
