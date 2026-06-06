public final class VolatilityRouterTest {
    public static void main(String[] args) {
        assertEquals("reroute", VolatilityRouter.posture(VolatilityRouter.score(420, 612, 91, 38, 74, 11, 3)));
        assertEquals("stable", VolatilityRouter.posture(VolatilityRouter.score(890, 870, 76, 12, 18, 4, 0)));
        System.out.println("java contract ok");
    }

    private static void assertEquals(String expected, String actual) {
        if (!expected.equals(actual)) {
            throw new AssertionError("expected " + expected + " but received " + actual);
        }
    }
}
