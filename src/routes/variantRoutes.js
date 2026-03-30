const express = require("express");
const { Parser } = require("json2csv");
const { ensureAuth } = require("../middleware/auth");
const mockVariants = require("../data/mockVariants.json");

const router = express.Router();

function filterVariants(query) {
  const { gene, chromosome, sampleId, rsid } = query;

  return mockVariants.filter((variant) => {
    const byGene = gene ? variant.gene.toLowerCase() === gene.toLowerCase() : true;
    const byChromosome = chromosome ? variant.chromosome === chromosome : true;
    const bySample = sampleId ? variant.sampleId.toLowerCase() === sampleId.toLowerCase() : true;
    const byRsid = rsid ? variant.rsid.toLowerCase() === rsid.toLowerCase() : true;

    return byGene && byChromosome && bySample && byRsid;
  });
}

// GET /api/variants
router.get("/", ensureAuth, (req, res) => {
  const results = filterVariants(req.query);

  return res.json({
    ok: true,
    total: results.length,
    data: results
  });
});

// GET /api/variants/:id
router.get("/:id", ensureAuth, (req, res) => {
  const id = Number(req.params.id);
  const variant = mockVariants.find((item) => item.id === id);

  if (!variant) {
    return res.status(404).json({
      ok: false,
      message: "Variante no encontrada."
    });
  }

  return res.json({
    ok: true,
    data: variant
  });
});

// POST /api/variants/search
router.post("/search", ensureAuth, (req, res) => {
  const results = filterVariants(req.body);

  return res.json({
    ok: true,
    total: results.length,
    data: results
  });
});

// GET /api/variants/summary/report
router.get("/summary/report", ensureAuth, (req, res) => {
  const totalVariants = mockVariants.length;
  const uniqueGenes = [...new Set(mockVariants.map((item) => item.gene))].length;
  const uniqueSamples = [...new Set(mockVariants.map((item) => item.sampleId))].length;
  const moderateImpact = mockVariants.filter((item) => item.impact === "moderado").length;

  return res.json({
    ok: true,
    data: {
      totalVariants,
      uniqueGenes,
      uniqueSamples,
      moderateImpact
    }
  });
});

// GET /api/variants/export/csv
router.get("/export/csv", ensureAuth, (req, res) => {
  const fields = [
    "id","sampleId","gene","chromosome","position","rsid",
    "reference","alternative","genotype","impact","consequence"
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(mockVariants);

  res.header("Content-Type", "text/csv");
  res.attachment("sportvar_variants.csv");
  return res.send(csv);
});

// POST /api/variants/files/connect-drive
router.post("/files/connect-drive", ensureAuth, (req, res) => {
  const { driveEmail, folderName } = req.body;

  return res.json({
    ok: true,
    message: "Conexión simulada con Google Drive registrada.",
    data: {
      driveEmail: driveEmail || "sin_correo",
      folderName: folderName || "SportVar"
    }
  });
});

module.exports = router;
