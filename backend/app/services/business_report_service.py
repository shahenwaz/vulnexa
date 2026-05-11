"""Business-level reporting helpers for scan results."""

from typing import Literal, TypedDict


BusinessProfile = Literal["standard", "finance"]


class FindingLike(TypedDict):
    """Minimal finding shape required for business report generation."""

    title: str
    severity: str
    cwe_id: str
    cwe_name: str
    description: str


class SummaryLike(TypedDict):
    """Minimal summary shape required for business report generation."""

    total_findings: int
    critical: int
    high: int
    medium: int
    low: int


class BusinessReport(TypedDict):
    """Management-friendly business report output."""

    profile: str
    profile_label: str
    risk_level: str
    executive_summary: str
    business_impact: list[str]
    customer_impact: list[str]
    priority_recommendation: list[str]


PROFILE_LABELS = {
    "standard": "Standard company",
    "finance": "Finance company",
}


def get_risk_level(summary: SummaryLike) -> str:
    """Return a simple business risk level."""
    if summary["critical"] > 0:
        return "Severe"

    if summary["high"] > 1:
        return "Serious"

    if summary["high"] == 1 or summary["medium"] > 0:
        return "Moderate"

    if summary["total_findings"] > 0:
        return "Low"

    return "Minimal"


def get_cwe_focus(findings: list[FindingLike]) -> str:
    """Build a short CWE focus sentence for the report."""
    cwe_ids = sorted({finding["cwe_id"] for finding in findings})

    if not cwe_ids:
        return "No CWE categories were identified by the selected scan rules."

    return f"Detected CWE categories include: {', '.join(cwe_ids)}."


def build_business_report(
    findings: list[FindingLike],
    summary: SummaryLike,
    business_profile: BusinessProfile = "standard",
) -> BusinessReport:
    """Build a management-friendly risk report from technical findings."""
    profile_label = PROFILE_LABELS.get(business_profile, PROFILE_LABELS["standard"])
    risk_level = get_risk_level(summary)
    cwe_focus = get_cwe_focus(findings)
    critical_high = summary["critical"] + summary["high"]

    if summary["total_findings"] == 0:
        return {
            "profile": business_profile,
            "profile_label": profile_label,
            "risk_level": "Minimal",
            "executive_summary": (
                "No matching vulnerability patterns were detected in the scanned "
                "files. This does not prove the application is fully secure, but "
                "it indicates that the selected checks did not identify immediate "
                "high-risk patterns."
            ),
            "business_impact": [
                "No immediate business disruption was identified.",
                "The result should still be supported by manual review.",
            ],
            "customer_impact": [
                "No direct customer data exposure was identified by this scan.",
            ],
            "priority_recommendation": [
                "Continue secure development practices.",
                "Run further testing before production release.",
                "Review authentication and secrets management manually.",
            ],
        }

    if business_profile == "finance":
        return {
            "profile": business_profile,
            "profile_label": profile_label,
            "risk_level": risk_level,
            "executive_summary": (
                f"The scan found {summary['total_findings']} potential security "
                f"findings for a finance-focused organization. {critical_high} "
                "finding(s) are critical or high severity. These issues may "
                "increase the risk of financial data exposure, fraud, compliance "
                f"concerns, and reputational damage. {cwe_focus}"
            ),
            "business_impact": [
                "Security weaknesses may affect trust in financial systems.",
                "High-risk findings may increase audit and compliance pressure.",
                "Unsafe secrets or code patterns may support access abuse.",
            ],
            "customer_impact": [
                "Customers may be affected if account or transaction data is exposed.",
                "Security incidents can reduce customer confidence.",
            ],
            "priority_recommendation": [
                "Prioritize critical and high findings before deployment.",
                "Review secrets management and database access patterns.",
                "Retest after remediation and keep the report as evidence.",
            ],
        }

    return {
        "profile": business_profile,
        "profile_label": profile_label,
        "risk_level": risk_level,
        "executive_summary": (
            f"The scan found {summary['total_findings']} potential security "
            f"findings. {critical_high} finding(s) are critical or high severity. "
            "These issues may create business risk if they expose sensitive data, "
            f"allow unauthorized access, or reduce trust in the app. {cwe_focus}"
        ),
        "business_impact": [
            "Security weaknesses may damage user trust.",
            "High-risk findings should be fixed before production release.",
            "Unsafe coding patterns can increase the chance of system misuse.",
        ],
        "customer_impact": [
            "Customers may lose confidence after a security incident.",
            "Security issues can create support pressure and reputation damage.",
        ],
        "priority_recommendation": [
            "Fix critical findings first, followed by high severity findings.",
            "Retest the project after remediation.",
            "Keep the report as evidence for testing and evaluation.",
        ],
    }
