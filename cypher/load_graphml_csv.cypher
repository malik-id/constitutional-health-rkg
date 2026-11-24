// Contoh IMPORT GENERIK; belum diuji pada instance Neo4j.
// Salin hasil scripts/export_neo4j_csv.py ke folder import Neo4j.
// Menggunakan label :RKGNode dan tipe hubungan :RKGEdge demi portabilitas;
// kategori asli dipertahankan pada atribut kind dan relation.
// Gunakan hanya pada database uji terpisah dan kosong.

CREATE CONSTRAINT rkg_node_id IF NOT EXISTS FOR (n:RKGNode) REQUIRE n.id IS UNIQUE;

LOAD CSV WITH HEADERS FROM 'file:///nodes.csv' AS row
MERGE (n:RKGNode {id: row.id})
SET n.kind = row.kind,
    n.label = row.label,
    n.regulation = row.regulation,
    n.locator = row.locator,
    n.citation = row.citation,
    n.year = row.year,
    n.url = row.url;

LOAD CSV WITH HEADERS FROM 'file:///relationships.csv' AS row
MATCH (source:RKGNode {id: row.source})
MATCH (target:RKGNode {id: row.target})
MERGE (source)-[r:RKGEdge {id: row.id}]->(target)
SET r.relation = row.relation,
    r.evidence_level = row.evidence_level,
    r.citation = row.citation,
    r.review_status = row.review_status,
    r.note = row.note;

MATCH (n:RKGNode) RETURN count(n) AS node_count;
MATCH ()-[r:RKGEdge]->() RETURN count(r) AS edge_count;
