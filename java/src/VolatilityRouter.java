public final class VolatilityRouter {
    private VolatilityRouter() {
    }

    public static double score(double baselineFareUsd, double observedFareUsd, double loadFactorPercent,
            double fuelMoveBps, double demandSpikeIndex, double searchToBookRatio, int blackoutWindowCount) {
        double fareDeltaPercent = ((observedFareUsd - baselineFareUsd) / baselineFareUsd) * 100.0;
        double raw = Math.max(0.0, fareDeltaPercent) * 3.4
                + Math.max(0.0, loadFactorPercent - 70.0) * 0.8
                + fuelMoveBps * 0.35
                + demandSpikeIndex * 0.45
                + searchToBookRatio * 2.4
                + blackoutWindowCount * 7.0;
        double clamped = Math.max(0.0, Math.min(100.0, raw));
        return Math.round(clamped * 100.0) / 100.0;
    }

    public static String posture(double score) {
        if (score >= 72.0) {
            return "reroute";
        }
        if (score >= 38.0) {
            return "watch";
        }
        return "stable";
    }
}
