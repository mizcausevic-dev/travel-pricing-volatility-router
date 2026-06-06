-- Reviewed source contract for travel pricing volatility routing.
select
  route_id,
  segment,
  baseline_fare_usd,
  observed_fare_usd,
  load_factor_percent,
  fuel_move_bps,
  demand_spike_index,
  search_to_book_ratio,
  blackout_window_count,
  owner,
  next_action
from travel.revenue_route_pricing_evidence
where as_of_date = current_date
  and route_status in ('stable', 'watch', 'reroute')
order by demand_spike_index desc, blackout_window_count desc, observed_fare_usd - baseline_fare_usd desc;
