from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TravelRoute:
    route_id: str
    baseline_fare_usd: float
    observed_fare_usd: float
    load_factor_percent: float
    fuel_move_bps: float
    demand_spike_index: float
    search_to_book_ratio: float
    blackout_window_count: int


def score_route(route: TravelRoute) -> float:
    fare_delta_percent = ((route.observed_fare_usd - route.baseline_fare_usd) / route.baseline_fare_usd) * 100
    score = (
        max(0, fare_delta_percent) * 3.4
        + max(0, route.load_factor_percent - 70) * 0.8
        + route.fuel_move_bps * 0.35
        + route.demand_spike_index * 0.45
        + route.search_to_book_ratio * 2.4
        + route.blackout_window_count * 7
    )
    return round(max(0, min(100, score)), 2)


def posture(score: float) -> str:
    if score >= 72:
        return "reroute"
    if score >= 38:
        return "watch"
    return "stable"
