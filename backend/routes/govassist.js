const express = require("express");
const router = express.Router();
const Machine = require("../models/Machine");
const Factory = require("../models/Factory");
const ProductionLog = require("../models/ProductionLog");
const Inventory = require("../models/Inventory");

// MODULE 1 – AI COMPLIANCE ASSISTANT
router.get("/compliance-status", async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const logs = await ProductionLog.find({ date: { $gte: today } });
        const actualOutput = logs.reduce((acc, l) => acc + (l.output || 0), 0) || 4800;

        // Mocking some data that might not be in DB but needed for logic
        const waterUsage = actualOutput * 5; // 5 liters per meter
        const workerHours = 8 * 20; // 20 workers, 8 hours
        const energyUsage = actualOutput * 0.8; // 0.8 kWh per meter

        const pollutionRisk = waterUsage > 25000; // Threshold 25k liters
        const laborRisk = workerHours > 160; // Threshold 160 hours

        const complianceList = [
            {
                name: "Pollution Report",
                nextDeadline: "2026-03-25",
                status: pollutionRisk ? "Pending" : "Completed",
                riskLevel: pollutionRisk ? "High" : "Low"
            },
            {
                name: "Labor Compliance Report",
                nextDeadline: "2026-03-20",
                status: "Completed",
                riskLevel: "Low"
            },
            {
                name: "Fire Safety Inspection",
                nextDeadline: "2026-04-10",
                status: "Pending",
                riskLevel: "Medium"
            },
            {
                name: "Energy Consumption Report",
                nextDeadline: "2026-03-30",
                status: "Pending",
                riskLevel: energyUsage > 4000 ? "Medium" : "Low"
            }
        ];

        let issuesDetected = 0;
        complianceList.forEach(c => {
            if (c.riskLevel === "High" || c.riskLevel === "Medium") issuesDetected++;
        });

        const complianceHealth = Math.round(100 - (issuesDetected * 10));

        res.json({
            complianceHealth,
            issuesDetected,
            complianceList
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MODULE 2 – GOVERNMENT SCHEME ELIGIBILITY AI
router.get("/scheme-eligibility", async (req, res) => {
    try {
        const factory = await Factory.findOne() || { investmentCr: 1.2, turnoverCr: 5, targetOutput: 5000 };
        const machineInvestment = factory.investmentCr * 10000000; // Cr to INR

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const logs = await ProductionLog.find({ date: { $gte: today } });
        const actualOutput = logs.reduce((acc, l) => acc + (l.output || 0), 0) || 4800;
        const energyUsage = actualOutput * 0.8;

        const schemes = [];

        if (machineInvestment > 1000000) { // > 10 Lakh
            schemes.push({
                name: "Technology Upgradation Fund Scheme",
                estimatedSubsidy: "₹4,20,000",
                deadline: "2026-06-30",
                documents: ["Machine Invoice", "Audit Report", "MSME Cert"],
                portalUrl: "https://ministryoftextiles.gov.in/schemes/technology-upgradation-fund-scheme-tufs"
            });
        }

        if (energyUsage > 3000) {
            schemes.push({
                name: "Energy Efficiency Rebate",
                estimatedBenefit: "₹1,10,000",
                deadline: "2026-05-15",
                documents: ["Energy Audit", "Electricity Bills"],
                portalUrl: "https://beeindia.gov.in/en/content/schemes"
            });
        }

        // Additional schemes
        if (factory.turnoverCr < 10) {
            schemes.push({
                name: "MSME Cluster Development Grant",
                estimatedBenefit: "₹2,50,000",
                deadline: "2026-07-20",
                documents: ["Udyam Registration", "CASA Statement"],
                portalUrl: "https://udyamregistration.gov.in"
            });
        }

        res.json({ schemes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MODULE 3 – INSPECTION READINESS AI
router.get("/inspection-readiness", async (req, res) => {
    try {
        const machines = await Machine.find();
        const avgBreakdowns = machines.reduce((acc, m) => acc + (m.breakdownCount || 0), 0) / (machines.length || 1);

        // Mocking risks based on existing data patterns
        const fireRisk = avgBreakdowns > 2 ? 1 : 0.2;
        const pollutionRisk = 0.3; // Stable for now
        const workerComplianceIssues = 1; // 1 issue detected

        const score = Math.max(0, 100 - (fireRisk * 15) - (pollutionRisk * 20) - (workerComplianceIssues * 10));

        const issues = [];
        if (fireRisk > 0.5) issues.push("Fire extinguisher inspection overdue");
        if (avgBreakdowns > 3) issues.push("Critical machine maintenance lag in Loom 4");
        if (workerComplianceIssues > 0) issues.push("Lint accumulation near Loom 4 - Safety Hazard");

        res.json({
            readinessScore: Math.round(score),
            issuesDetected: issues
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MODULE 4 – AI AUTO REPORT GENERATOR
router.get("/generate-report", async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const logs = await ProductionLog.find({ date: { $gte: today } });
        const totalFabricProduced = logs.reduce((acc, l) => acc + (l.output || 0), 0) || 18000;

        const machines = await Machine.find();
        const avgUtilization = 78; // Mocked for now as we don't have per-hour logs easily accessible here
        const downtimeHours = machines.reduce((acc, m) => acc + (m.breakdownCount || 0), 0) * 2;

        const reports = [
            {
                reportType: "Monthly Production Report",
                totalFabricProduced: `${totalFabricProduced} meters`,
                averageMachineUtilization: `${avgUtilization}%`,
                downtimeHours: downtimeHours
            },
            {
                reportType: "Energy Usage Report",
                totalEnergyConsumed: `${Math.round(totalFabricProduced * 0.8)} kWh`,
                solarContribution: "15%",
                carbonFootprint: "Low"
            },
            {
                reportType: "Worker Compliance Report",
                shiftParticipation: "94%",
                ppeAdherence: "98%",
                overtimeHours: "12h"
            },
            {
                reportType: "Environmental Compliance Report",
                waterRecycled: "40%",
                wasteGenerated: `${Math.round(totalFabricProduced * 0.02)} kg`,
                status: "Compliant"
            }
        ];

        res.json({ reports });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MODULE 5 – SUBSIDY APPLICATION HANDLER
router.post("/apply", async (req, res) => {
    try {
        const { schemeName } = req.body;

        // Simulating backend processing and registration
        const applicationId = "SF-GOV-" + Math.random().toString(36).substring(2, 9).toUpperCase();

        res.json({
            success: true,
            applicationId,
            message: `Application for ${schemeName} has been successfully registered with Bhilwara Industrial Portal.`,
            status: "In-Progress",
            timestamp: new Date()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
