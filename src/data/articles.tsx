import type { ReactNode } from "react";

export type StaticArticle = {
  slug: string;
  title: string;
  date: string;
  comments: string;
  heroGradient: string;
  image?: string;
  body: ReactNode;
};

export const STATIC_ARTICLES: StaticArticle[] = [
  {
    slug: "puget-sound-winter-plumbing-survival-guide",
    title:
      "The 2026 Puget Sound Winter Plumbing Survival Guide: Performance, Prevention, and Technology",
    date: "January 6, 2026",
    comments: "No Comments",
    heroGradient: "linear-gradient(135deg, #1E3A6E 0%, #2d5fa8 100%)",
    body: (
      <>
        <p>
          January in the Pacific Northwest is often deceptive. While our neighbors in the Midwest
          are dealing with something arguably more dangerous for plumbing: the <strong>vicious
          freeze-thaw cycle</strong>.
        </p>
        <p>
          As of January 6, 2026, the forecast for the Puget Sound shows a mix of heavy rain
          followed by overnight lows dipping toward freezing. This specific weather pattern —
          constant moisture followed by sharp freezes — is exactly what causes $50,000 "hidden"
          floods in crawlspaces and attics. At <strong>All Phase Plumbing</strong>, we believe a
          well-informed homeowner is our best partner. This 1800-word guide is designed to move you
          from reactive repairs to proactive home performance.
        </p>

        <h2>The Physics of the "January Stress Test"</h2>
        <p>
          To understand why your plumbing fails in January, you have to look past the pipes and
          into the physics of water and temperature.
        </p>

        <h3>1. The Expansion Trap</h3>
        <p>
          When water freezes, it doesn't just get hard; it expands by approximately{" "}
          <strong>9%</strong> in volume. In a closed plumbing system, that expansion has nowhere to
          go. If a pipe freezes between your main shut-off and a closed kitchen faucet, the water
          is trapped. The resulting pressure can exceed <strong>3,000 PSI</strong>. No copper or
          PEX pipe is designed to withstand that.
        </p>
        <p>
          In <strong>Tacoma</strong> and <strong>Seattle</strong>, many older homes still utilize
          galvanized steel or older copper. These materials have "memory" — meaning once they have
          been stressed by a freeze, they are permanently weakened. Even if they don't burst this
          week, they may develop a pinhole leak in the spring.
        </p>

        <h3>2. The "Groundwater Gap" and Your Water Heater</h3>
        <p>
          This is the "invisible" January problem. In July, the water entering your home from the
          city main might be <strong>62°F</strong>. Today, it is likely closer to{" "}
          <strong>41°F</strong>.
        </p>
        <ul>
          <li>
            <strong>The Delta Change:</strong> Your water heater now has to raise the temperature
            by 80 degrees instead of 60 to reach a standard 120°F shower.
          </li>
          <li>
            <strong>The Sediment Factor:</strong> If you haven't flushed your tank in the last 12
            months, you likely have 3–4 inches of calcium and magnesium "sand" at the bottom. This
            sediment acts as an insulator, forcing your burner or element to run twice as long to
            heat that cold January water. This is why January is the #1 month for water heater
            "rumbling" and eventual tank failure.
          </li>
        </ul>

        <h2>2026 Trends: Smart Plumbing &amp; Efficiency</h2>
        <p>
          Plumbing in 2026 is no longer a "hidden utility." It is an integrated part of your smart
          home. If you are a homeowner in tech-heavy areas like <strong>Redmond</strong> or{" "}
          <strong>Kirkland</strong>, these three trends are currently defining the industry:
        </p>

        <h3>1. "Brain Pipes" (Automatic Leak Detection)</h3>
        <p>
          In 2026, we are installing more <strong>smart shut-off valves</strong> than ever before.
          These devices (like Moen Flo or Phyn) monitor "micro-leaks" by checking for minute
          pressure drops while you sleep. If a pipe bursts in your <strong>Bothell</strong> garage
          at 2:00 AM, the system detects the abnormal flow and shuts off the main water valve
          automatically, sending a notification to your phone.
        </p>

        <h3>2. Heat Pump Water Heaters (The Hybrid Shift)</h3>
        <p>
          With new 2026 energy regulations in Washington State, we are seeing a massive shift
          toward <strong>Hybrid Heat Pump Water Heaters</strong>. These units pull heat from the
          air to warm your water. While they are incredibly efficient, they require specific
          placement (usually a garage or large utility room) because they "exhaust" cold air. For a
          home in <strong>Auburn</strong> or <strong>Kent</strong>, this can actually help
          dehumidify your basement while saving you $300+ a year on utilities.
        </p>

        <h3>3. Trenchless "No-Dig" Sewer Technology</h3>
        <p>
          January rains often lead to shifting soil, which can snap old clay or cast-iron sewer
          lines. In 2026, All Phase Plumbing utilizes <strong>trenchless pipe bursting</strong>.
          Instead of digging up your entire lawn in <strong>Puyallup</strong>, we pull a new,
          high-density polyethylene (HDPE) pipe directly through the old one. This saves your
          landscaping and usually cuts the repair time by 50%.
        </p>

        <h2>The Service Area Breakdown</h2>
        <p>
          Because the Puget Sound has diverse geography, plumbing risks change depending on where
          you live.
        </p>
        <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-primary">
              <tr>
                <th className="text-left p-3 font-semibold border-b border-border">Service Area</th>
                <th className="text-left p-3 font-semibold border-b border-border">
                  Primary Winter Risk
                </th>
                <th className="text-left p-3 font-semibold border-b border-border">
                  Recommended Action
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr>
                <td className="p-3 border-b border-border align-top">Mercer Island / Des Moines</td>
                <td className="p-3 border-b border-border align-top">
                  Wind-driven salt air corrosion on exterior fixtures.
                </td>
                <td className="p-3 border-b border-border align-top">
                  Inspect outdoor hose bibs for "frost-proof" rating.
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-border align-top">Puyallup / South Hill</td>
                <td className="p-3 border-b border-border align-top">
                  High water pressure from gravity-fed mains.
                </td>
                <td className="p-3 border-b border-border align-top">
                  Check your PRV (Pressure Reducing Valve); cold weather makes high pressure more
                  dangerous.
                </td>
              </tr>
              <tr>
                <td className="p-3 border-b border-border align-top">Tukwila / Kent Valley</td>
                <td className="p-3 border-b border-border align-top">
                  Shifting soil and "grease-sludge" in flat sewer lines.
                </td>
                <td className="p-3 border-b border-border align-top">
                  Annual hydro-jetting to clear old holiday grease that solidifies in the cold.
                </td>
              </tr>
              <tr>
                <td className="p-3 align-top">Bellevue / Redmond</td>
                <td className="p-3 align-top">
                  Large, complex multi-zone systems with hidden attic lines.
                </td>
                <td className="p-3 align-top">
                  Install smart leak sensors in high-risk attic zones.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>The "All Phase" Winterization Checklist</h2>
        <p>This is what you can do today to protect your home.</p>
        <ol>
          <li>
            <strong>The Faucet Drip:</strong> If the forecast calls for a "Hard Freeze" (below 28°F)
            for more than 4 hours, leave a faucet dripping. It's not about the "ice" not forming;
            it's about providing a pressure-relief valve for the expansion.
          </li>
          <li>
            <strong>Disconnect Hoses:</strong> This is the #1 cause of "Spring Floods." If a hose is
            attached, water stays in the faucet. It freezes, bursts the pipe inside your wall, and
            you won't know it until you turn the hose on in May and flood your living room.
          </li>
          <li>
            <strong>Insulate the "Rim Joist":</strong> Most pipes freeze where they enter the
            house. Ensure the insulation in your crawlspace or basement hasn't fallen away from the
            exterior rim joist.
          </li>
          <li>
            <strong>Sump Pump Health:</strong> With the heavy rains forecast for{" "}
            <strong>Tukwila</strong> this week, your sump pump is the only thing keeping your
            basement from becoming a swimming pool. Pour a bucket of water into the pit to ensure
            the float triggers the pump.
          </li>
        </ol>

        <h2>Frequently Asked Questions (FAQ)</h2>
        <p>
          <strong>Q: My kitchen sink is on an outside wall. How do I stop it from freezing?</strong>
          <br />
          A: Use the <strong>"Air Wash"</strong> method. Open the cabinet doors under the sink.
          This allows the warm air from your home's furnace to circulate around the pipes. If it's
          exceptionally cold, point a small desk fan into the cabinet to force air movement.
        </p>
        <p>
          <strong>Q: Why does my hot water run out so much faster in January?</strong>
          <br />
          A: This is the <strong>Groundwater Gap</strong> at work. The water entering your tank is
          20 degrees colder than in summer, meaning the tank has to mix in more hot water to reach
          a comfortable temperature. If you have a 50-gallon tank, it feels like a 35-gallon tank
          in the winter.
        </p>
        <p>
          <strong>Q: I smell "rotten eggs" near my floor drains. Is that a leak?</strong>
          <br />
          A: Not usually. In winter, floor drains in laundry rooms or basements can dry out. The
          water in the "P-trap" evaporates, allowing sewer gas to enter the home. Simply pour a
          gallon of water down the drain to "reseal" the trap.
        </p>

        <h2>Why Tukwila Trusts All Phase Plumbing</h2>
        <p>
          Since our founding, we have focused on one thing:{" "}
          <strong>Long-term home performance</strong>. We don't just patch leaks; we help you
          understand your home's unique "tells" and "stress points." Whether you are in{" "}
          <strong>Spanaway</strong>, <strong>Summit</strong>, or <strong>Bothell</strong>, our
          technicians arrive with the latest 2026 diagnostic tools to ensure the job is done right
          the first time.
        </p>
      </>
    ),
  },
];

STATIC_ARTICLES.push({
  slug: "handyman-vs-professional-plumber-seattle",
  title: "The Difference Between a Handyman and a Professional Plumber in Seattle",
  date: "November 10, 2025",
  comments: "No Comments",
  heroGradient: "linear-gradient(135deg, #1E3A6E 0%, #2d5fa8 100%)",
  image:
    "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1400&q=80",
  body: (
    <>
      <p>
        As a homeowner in Seattle, you've probably faced a leaky faucet, a running toilet, or a
        clogged drain. Your first thought might be to call a handyman, especially for what seems
        like a small job. But when it comes to your home's plumbing, there's a big difference
        between a handyman and a professional, licensed plumber.
      </p>
      <p>
        Understanding this distinction is crucial not only for the quality of the work but also
        for your safety and legal protection.
      </p>

      <h2>What Makes a Plumber a "Professional Plumber in Seattle"?</h2>
      <p>
        It's more than just carrying a wrench. A professional plumber in Washington State, and
        specifically in the City of Seattle, has to jump through some serious hoops to earn their
        title.
      </p>
      <ul>
        <li>
          <strong>Extensive Training &amp; Apprenticeship:</strong> To even be considered for a
          license, a plumber must complete thousands of hours of on-the-job training. This is a
          multi-year apprenticeship where they learn under the direct supervision of a certified
          plumber. They gain hands-on experience with everything from basic repairs to complex
          sewer line installations.
        </li>
        <li>
          <strong>Licensing and Certification:</strong> In Washington, plumbers must pass a
          rigorous certification exam to become a Journey Level or Specialty Plumber. This exam
          tests their knowledge of plumbing code, general trade practices, and complex systems.
          This isn't just about skill; it's about knowing the legal and safety requirements that
          protect your home.
        </li>
        <li>
          <strong>Bonding and Insurance:</strong> A licensed plumber is required to be bonded and
          insured. This is a critical layer of protection for you, the homeowner. If an accident
          happens on the job or a mistake is made, their insurance covers the cost of damage,
          protecting you from a major financial liability.
        </li>
        <li>
          <strong>Knowledge of Local Codes:</strong> Seattle has its own unique plumbing codes and
          regulations. A local, licensed plumber is an expert in these codes and knows how to
          ensure all work is compliant. This is essential for permits and passing inspections,
          especially for larger jobs like water heater installations or bathroom remodels.
        </li>
      </ul>

      <h2>The Handyman's Role</h2>
      <p>
        Handymen are valuable for a wide range of tasks around the house, from hanging a TV to
        painting a room. They are generalists with a broad skill set, and for many minor repairs,
        they can be a great, cost-effective option.
      </p>
      <p>
        However, in Washington State, there are very specific laws about what a handyman can and
        cannot do. A handyman can legally perform very minor plumbing work, but they are not
        permitted to work on projects that require a plumber's license. This includes tasks like
        installing new pipes, replacing a water heater, or repairing a sewer line.
      </p>
      <p>
        Trying to save a few dollars by using a handyman for a job that requires a professional
        plumber can lead to:
      </p>
      <ul>
        <li>
          <strong>Subpar Workmanship:</strong> A lack of specialized training can result in
          incorrect installations or temporary fixes that fail quickly, leading to more expensive
          repairs down the road.
        </li>
        <li>
          <strong>Violating Local Codes:</strong> An unlicensed professional may not be aware of or
          adhere to the proper building codes, which can create safety hazards and make it
          difficult to sell your home in the future.
        </li>
        <li>
          <strong>No Recourse for Damage:</strong> If an unlicensed worker causes a flood or other
          damage to your home, you may be on your own to cover the costs, as they often don't
          carry the necessary insurance.
        </li>
      </ul>

      <h2>When to Call a Pro vs. a Handyman</h2>
      <p>
        <strong>Call a professional plumber in Seattle when the job involves:</strong>
      </p>
      <ul>
        <li>
          <strong>Sewer and Drain Line Issues:</strong> Clogs that are not resolved by a simple
          plunger or snake, especially if they are recurring.
        </li>
        <li>
          <strong>Water Heater Problems:</strong> Installation, repair, or replacement of any
          water heater.
        </li>
        <li>
          <strong>Burst Pipes or Leaks in Walls:</strong> Any issue that requires cutting into
          walls or major pipe replacement.
        </li>
        <li>
          <strong>Gas Line Work:</strong> This should always be handled by a licensed
          professional.
        </li>
        <li>
          <strong>Installing New Fixtures or Appliances:</strong> Especially if it requires
          significant modifications to your existing plumbing.
        </li>
      </ul>
      <p>
        <strong>A Handyman may be appropriate for:</strong>
      </p>
      <ul>
        <li>Tightening a loose faucet.</li>
        <li>Changing a shower head or a toilet flapper.</li>
        <li>Unclogging a very simple drain with a plunger.</li>
      </ul>
      <p>
        Ultimately, a professional plumber is an investment in the long-term health of your home's
        most critical systems. It's about ensuring the work is done safely, correctly, and to
        code.
      </p>
      <p>
        For any plumbing job in Seattle, big or small, trust the professionals. Call{" "}
        <strong>(206) 772-6077</strong>.
      </p>
    </>
  ),
});

STATIC_ARTICLES.push({
  slug: "tankless-water-heaters-seattle-worth-upgrade",
  title: "Tankless Water Heaters in Seattle: Is It Worth the Upgrade?",
  date: "November 10, 2025",
  comments: "No Comments",
  heroGradient: "linear-gradient(135deg, #1E3A6E 0%, #2d5fa8 100%)",
  image:
    "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1400&q=80",
  body: (
    <>
      <p>
        As a homeowner in Seattle, you're always looking for ways to make your home more
        efficient, save on utility bills, and free up space in a market where every square foot
        counts. That's why the idea of a tankless water heater—also known as an on-demand water
        heater—is so appealing. But is it really worth the investment? As the local plumbing pros,
        we get this question all the time. Let's break down the pros and cons to help you decide
        if a tankless water heater in Seattle is the right upgrade for your home.
      </p>

      <h2>How a Tankless Water Heater Works</h2>
      <p>
        Unlike a traditional tank water heater that keeps a large reservoir of water hot 24/7, a
        tankless unit heats water only when you need it. When you turn on a hot water faucet, a
        powerful heat exchanger instantly heats the water as it flows through the unit. This means
        you get a continuous supply of hot water, on demand.
      </p>

      <h2>The Big Advantages for Seattle Homeowners</h2>

      <h3>1. Endless Hot Water</h3>
      <p>
        This is the number one reason many people switch. With a traditional tank, once the hot
        water runs out, you have to wait for the tank to refill and reheat. With a tankless
        system, you can take multiple back-to-back showers, run the dishwasher, and do a load of
        laundry without ever running out of hot water.
      </p>

      <h3>2. Significant Energy Savings</h3>
      <p>
        The biggest energy waste from a traditional heater is "standby heat loss"—the energy used
        to keep a tank full of water hot even when no one is using it. Tankless heaters eliminate
        this waste, as they only use energy when a hot water faucet is on. This can lead to a{" "}
        <strong>24–36% increase in energy efficiency</strong> and noticeable savings on your
        utility bills over time.
      </p>

      <h3>3. Space-Saving Design</h3>
      <p>
        Tankless water heaters are compact, about the size of a small suitcase, and can be mounted
        on a wall. For a city like Seattle, where living space is at a premium, this can free up a
        significant amount of room in your utility closet, garage, or basement.
      </p>

      <h3>4. Longer Lifespan</h3>
      <p>
        A traditional tank water heater typically lasts 10–15 years before the tank starts to
        corrode and needs to be replaced. A tankless unit, on the other hand, can last for{" "}
        <strong>20 years or more</strong> with proper maintenance, making it a better long-term
        investment.
      </p>

      <h2>The Potential Downsides to Consider</h2>

      <h3>1. Higher Upfront Cost</h3>
      <p>
        This is the main drawback for most people. The initial cost of a tankless water heater and
        its installation is significantly higher than a traditional tank unit.
      </p>

      <h3>2. Installation Complexity</h3>
      <p>
        A tankless water heater installation is not a simple swap. Gas-powered units, for example,
        often require a larger gas line and a new venting system to handle the increased demand.
        Electric units may need significant electrical upgrades. This is why it's critical to hire
        a professional plumber who is experienced in tankless systems and knowledgeable about
        Seattle's specific plumbing codes.
      </p>

      <h3>3. Flow Rate Limitations</h3>
      <p>
        While tankless units provide endless hot water, they have a limited flow rate (measured in
        gallons per minute, or GPM). If you're running multiple hot water appliances at the same
        time—like a shower and a dishwasher—a single unit may struggle to keep up, resulting in a
        drop in water temperature or pressure. For larger families, we sometimes recommend
        installing a second unit or a high-capacity model to ensure smooth operation.
      </p>

      <h2>Is It Worth the Upgrade? Our Professional Verdict</h2>
      <p>
        For many Seattle homeowners, the answer is a resounding <strong>yes</strong>.
      </p>
      <p>
        If you're a family that constantly runs out of hot water, a household looking to reduce
        its environmental footprint, or someone who values extra space, a tankless water heater is
        an excellent long-term investment. While the initial cost is higher, the long-term savings
        on energy bills and the extended lifespan of the unit often make it a smart financial
        choice.
      </p>
      <p>
        However, if you're on a tight budget or your home has very low hot water demand, a
        traditional tank water heater might still be a better fit.
      </p>
      <p>
        The key is to work with an experienced plumber who can assess your specific needs and
        recommend the best solution for your home. At <strong>All Phase Plumbing</strong>, we can
        help you with a full evaluation, from choosing the right unit to ensuring a seamless,
        code-compliant installation.
      </p>
      <p>
        Ready to explore your options? Call <strong>(206) 772-6077</strong> to find out if a
        tankless water heater is the right fit for you.
      </p>
    </>
  ),
});

STATIC_ARTICLES.push({
  slug: "preventing-tree-root-damage-sewer-lines",
  title: "Preventing Tree Root Damage in Seattle Sewer Lines",
  date: "November 10, 2025",
  comments: "1 Comment",
  heroGradient: "linear-gradient(135deg, #1E3A6E 0%, #2d5fa8 100%)",
  image:
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80",
  body: (
    <>
      <p>
        If you live in the Seattle Metro Area, you're surrounded by beautiful, mature trees. From
        the massive firs to the established maples and oaks, they add character, shade, and value
        to our neighborhoods. But those same magnificent trees are often the hidden enemy of your
        home's most critical plumbing system: the sewer line.
      </p>
      <p>
        Here at <strong>All Phase Plumbing</strong>, we see tree root intrusion as one of the most
        frequent and destructive problems facing Seattle homeowners. The good news? With a little
        knowledge and proactive maintenance, you can protect your pipes.
      </p>

      <h2>Why Tree Roots Love Your Sewer Line</h2>
      <p>
        It's not personal—it's survival. Tree roots are constantly seeking three things: water,
        nutrients, and oxygen. Your sewer line provides all three in abundance, especially if it
        has an existing small leak or joint separation.
      </p>
      <p>Here is the vicious cycle that leads to expensive damage:</p>
      <ul>
        <li>
          <strong>Seeking Moisture:</strong> The warmth and humidity inside your sewer line create
          condensation, which seeps out through tiny gaps in pipe joints or hairline cracks.
        </li>
        <li>
          <strong>Infiltration:</strong> Microscopic root tendrils, sensing this moisture, push
          their way into the slightest opening in the pipe.
        </li>
        <li>
          <strong>Growth and Blockage:</strong> Once inside, the roots thrive on the nutrient-rich
          wastewater. They grow rapidly, forming dense, fibrous masses that reduce the pipe's flow
          or, worse, completely block the passage of waste.
        </li>
        <li>
          <strong>Pipe Destruction:</strong> As the roots thicken and expand, they exert tremendous
          pressure on the pipe, cracking, crushing, or completely separating the sections, leading
          to a catastrophic collapse.
        </li>
      </ul>
      <p>
        This is especially common in older <strong>Seattle</strong> homes where the sewer lines are
        made of clay or concrete, which are more susceptible to cracks and joint separation than
        modern PVC pipe.
      </p>

      <h2>3 Steps to Protect Your Sewer Line</h2>
      <p>
        Dealing with a fully blocked or collapsed pipe is a major, expensive emergency. Prevention
        is always the smarter path.
      </p>

      <h3>1. Know Your Trees and Your Pipes</h3>
      <p>
        Take a look around your property. If you have large, mature trees (or your neighbor does)
        situated within 10 to 20 feet of where your main sewer line runs, you are at high risk.
      </p>
      <ul>
        <li>
          <strong>Be Strategic with New Planting:</strong> If you are landscaping, choose smaller,
          slow-growing shrubs or plants. Never plant large trees directly over or close to your
          sewer easement.
        </li>
        <li>
          <strong>Locate Your Line:</strong> If you don't know where your sewer line is, a
          professional plumber can perform a <strong>sewer camera inspection</strong> (often
          combined with a locator device) to map out its exact path.
        </li>
      </ul>

      <h3>2. Chemical Root Killers (Use with Caution)</h3>
      <p>
        There are root-killing products that can be flushed down your toilet to kill small roots
        inside the pipe. These are generally copper sulfate or metam sodium based.
      </p>
      <p>
        <strong>A Word of Warning from Your Plumber:</strong> Root killers are only a temporary
        fix. They kill the roots currently inside the pipe, but they do nothing to address the
        crack or gap that allowed the roots in, so the roots will inevitably grow back. Also, some
        chemicals can be harmful to beneficial bacteria in your septic system (if applicable) or
        to surrounding plant life. Use them sparingly and only as directed.
      </p>

      <h3>3. Schedule Proactive Maintenance (Our Top Recommendation)</h3>
      <p>
        The single most effective way to prevent tree root damage is with regular professional
        maintenance.
      </p>
      <ul>
        <li>
          <strong>Sewer Camera Inspection:</strong> If your home is 20 years or older, or if you've
          had a recurring slow drain, schedule a camera inspection. This allows us to see the
          exact location and severity of any root intrusion before it causes a major backup.
        </li>
        <li>
          <strong>Hydro-Jetting:</strong> For minor to moderate root intrusion, professional hydro
          jetting is the gold standard. We use high-pressure water streams (up to 4,000 PSI) to
          cut through the roots, remove them completely, and scour the inside of the pipe walls.
          This clears the blockage without causing further damage to the pipe itself.
        </li>
      </ul>

      <h2>What to Do If You Suspect Root Damage</h2>
      <p>
        Don't wait until sewage is backing up into your bathtub. Call All Phase Plumbing
        immediately if you notice any of these red flags:
      </p>
      <ul>
        <li>
          <strong>Gurgling Sounds:</strong> Especially coming from the toilet when you run the
          sink or shower.
        </li>
        <li>
          <strong>Slow Draining:</strong> Multiple drains in your home (sinks, tubs, toilets) are
          draining slowly at the same time.
        </li>
        <li>
          <strong>Foul Odors:</strong> Persistent sewer odors inside or outside your home.
        </li>
      </ul>
      <p>
        If the damage is severe—meaning the pipe is cracked or collapsed—we will likely recommend{" "}
        <strong>trenchless sewer repair</strong> to fix or replace the damaged section with
        minimal digging, preserving your beautiful Seattle landscaping.
      </p>
      <p>
        Protect your home investment from the hidden threat beneath the surface. Call{" "}
        <strong>(206) 772-6077</strong> to schedule a sewer camera inspection and save yourself
        from a future plumbing catastrophe!
      </p>
    </>
  ),
});

export function getStaticArticle(slug: string): StaticArticle | undefined {
  return STATIC_ARTICLES.find((a) => a.slug === slug);
}
