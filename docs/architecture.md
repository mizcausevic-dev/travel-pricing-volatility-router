# Architecture

`travel-pricing-volatility-router` is intentionally small and auditable.

- `fixtures/travel-pricing.json` is the synthetic source packet.
- `src/index.ts` scores route volatility and creates board narratives.
- `java/src/VolatilityRouter.java` mirrors pricing-rule logic in Java.
- `python/volatility_router.py` mirrors analytics scoring.
- `sql/travel_pricing_contract.sql` defines reviewed source fields.
- `src/app.ts` renders the static GitHub Pages proof surface.

No live passenger records, payment data, loyalty identifiers, or supplier credentials are used.
