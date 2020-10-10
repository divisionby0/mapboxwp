var PlanetFinder = (function () {
    function PlanetFinder() {
    }
    PlanetFinder.find = function (planet, earth, jd) {
        function kepler(m, e) {
            var EPSILON = 1.0e-6;
            var d, ae = m;
            while (true) {
                var sinAE = Math.sin(ae);
                //console.log("loop e=",e," ae=",ae," sinAE=", sinAE," m=",m);
                d = ae - (e * sinAE) - m;
                //console.log("Math.abs( d )="+Math.abs( d )+" EPSILON="+EPSILON);
                if (isNaN(ae)) {
                    break;
                }
                if (Math.abs(d) < EPSILON)
                    break;
                d /= 1.0 - (e * Math.cos(ae));
                ae -= d;
            }
            return 2.0 * Math.atan(Math.sqrt((1.0 + e) / (1.0 - e)) * Math.tan(ae / 2.0));
        }
        //console.log("\nPlanetFinder.find() planet=",planet," earth=",earth, "jd=",jd);
        var t = (jd - Astro.JD_J2000) / 36525.0;
        var m = planet.L - planet.wb + planet.dL * t; /* mean anomaly */
        m = Astro.range(m, Math.PI * 2.0);
        var v = kepler(m, planet.e);
        var cv = Math.cos(v);
        var sv = Math.sin(v);
        var r = (planet.a * (1.0 - planet.e * planet.e)) / (1 + planet.e * cv);
        planet.hx = r * (planet.P[0] * cv + planet.Q[0] * sv);
        planet.hy = r * (planet.P[1] * cv + planet.Q[1] * sv);
        planet.hz = r * (planet.P[2] * cv + planet.Q[2] * sv);
        var dx, dy, dz;
        //console.log("planet.name=", planet.name);
        if (planet.name != "Earth") {
            dx = planet.hx - earth.hx;
            dy = planet.hy - earth.hy;
            dz = planet.hz - earth.hz;
        }
        else {
            dx = -planet.hx;
            dy = -planet.hy;
            dz = -planet.hz;
        }
        planet.pos.ra = Math.atan2(dy, dx);
        planet.pos.dec = Math.atan2(dz, Math.sqrt(dx * dx + dy * dy));
    };
    return PlanetFinder;
}());
//# sourceMappingURL=PlanetFinder.js.map