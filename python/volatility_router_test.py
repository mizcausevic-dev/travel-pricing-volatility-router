import unittest

from volatility_router import TravelRoute, posture, score_route


class VolatilityRouterTest(unittest.TestCase):
    def test_reroute_corridor(self) -> None:
        route = TravelRoute("atlanta-orlando-summer", 420, 612, 91, 38, 74, 11, 3)
        self.assertEqual(posture(score_route(route)), "reroute")

    def test_stable_corridor(self) -> None:
        route = TravelRoute("nyc-london-business", 890, 870, 76, 12, 18, 4, 0)
        self.assertEqual(posture(score_route(route)), "stable")


if __name__ == "__main__":
    unittest.main()
