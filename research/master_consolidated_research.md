# Portfolio Research Scratchpad (Batch 1/10)

## Yale Endowment Model & Alternative Investments
- Target: 5.7% Returns in 2024 (dragged down by private asset exit market illiquidity).
- Shift: Yale model relies heavily on illiquidity premium (VC, PE, Real Estate, Abs Return).
- Trend: Average university held 56% in Alts in 2024.
- Con: Expensive. 3.44% - 8% fees. Small endowments underperform passive indexing due to lack of access to top-quartile managers.

## Private Equity vs Public
- PE typically outperforms public equity by 500-800bps annualized net-of-fees over a 25-yr span.
- 2023-2024: Publics outperforming PRIVATES due to "Magnificient 7" concentration in SP500, but historically private equity recoups gap.
- "Illiquidity premium" exists due to active ownership/company pivots not beholden to quarterly earnings calls. 

## UHNW / Family Office Trends 2024 (UBS & GS)
- 45% Alts / 25% Equities / 25% Fixed Income / 5% Cash.
- Major move AWAY from cash in 2024 to lock in yields on private credit / fixed income before rate cuts.
- US Family offices allocate 86% domestically. Over 80% prioritizing AI-sector structural investments.

## Real Estate
- 30 Year avg return: ~11-12%. 
- Outperforms SP500 roughly 82% of time over 30 yr horizons historically.

## Private Credit
- Generates 200-600bps yield premium over public bonds.
- Driving force: Dodd-Frank / Basel III forced banks out of middle-market lending, allowing private credit to extract premium "complexity/speed" fees from borrowers.

## Safe Withdrawal Rates
- 4% specifically calibrated for a 30-year timeframe.
- If retirement spans to 50 years, SWR mathematically drops to 3% - 3.5% to survive sequence-of-returns risk.
- "Endowment Smoothing" (e.g. taking 4% of a 3-year rolling average) vastly reduces sequence risk by mathematically lowering withdrawals in down years.

## Monte Carlo & Fat Tails
- Standard Normal Distribution (bell curve) dangerously underestimates deep crash events (Fat Tails / Black Swans / Leptokurtic).
- Monte Carlo must use skewed-T distributions or historical jump-diffusion to model reality, otherwise 30-year risk of ruin is vastly understated.


# Trust Intelligence Dashboard Research - Batch 10: Architectures, Styles & Mechanics
Date: 2026-03-13

## 1. Bento Grid Architecture (Tailwind Grid vs Columns)
- **CSS Grid is Mandatory**: Tailwind's `columns-*` utilities are meant for masonry text layouts that flow top-to-bottom. Bento grids require absolute control over two-dimensional placement.
- Use `grid-cols-1 md:grid-cols-12 auto-rows-[minmax(100px,auto)] gap-4` on the parent container.
- Use `col-span-x row-span-y` on child cards to create asymmetry.
- *Secret Weapon*: Add `grid-flow-dense` to the parent to prevent the "Swiss Cheese" gap effect; the browser will automatically backfill small cards into open spaces skipped by large cards.

## 2. SvelteKit Deployment on GitHub Pages: SSG vs SPA
- **Static Site Generation (SSG)**: `@sveltejs/adapter-static` with `prerender = true` causes Svelte to pre-build pure `.html` files for every route. 
  - *Pro*: Instant load time, pure HTML fallback, excellent SEO.
  - *Con*: Requires all data to be known at build time. No dynamic `+server.js` endpoints.
- **Single Page Application (SPA)**: Configured via `fallback: '404.html'`. GitHub pages routes unknown URLs to the fallback, where SvelteKit's client-side router boots up and takes over.
  - *Decision*: Because this relies heavily on complex client-side calculations (running Monte Carlo in the browser based on slider inputs), both methods work, but SSG is safest to guarantee instant FCP, utilizing Svelte 5 runes strictly on the client side for interactions.

## 3. Tailwind Glassmorphism (Backdrop Blur)
- The effect requires overlapping utilities on a specific element superimposed over a busy/gradient background.
- **The Core Formula**:
  ```html
  <div class="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
    <!-- Content goes here -->
  </div>
  ```
- Make sure `backdrop-blur` sizes (sm, md, lg) are paired with low-opacity borders to trace the edge.

## 4. Complex vs Simple Trusts (Section 661)
- **Simple Trust**: Must distribute all income annually. Cannot distribute principal. Cannot make charitable gifts. (Think: A conduit).
- **Complex Trust**: Has the *flexibility* to accumulate income, distribute principal, or make charitable gifts. Because of this flexibility, they are taxed under IRC Section 661.
- *Dashboard Implication*: The visualizer models a *Complex Trust*, simulating the retention of capital gains within the principal while distributing Ordinary Income to the beneficiary up to the DNI limit.

## 5. Visualizing Money Flow (D3.js Sankey)
- To show how income flows from Gross Receipts -> Trust Taxes -> DNI -> Beneficiary, a Sankey diagram is the gold standard.
- Requires importing `d3-sankey` plugin.
- **Data Structure**:
  - `nodes`: Array of objects `[{name: "Gross Yield"}, {name: "Beneficiary"}]`
  - `links`: Array mapping indices to values `[{source: 0, target: 1, value: 100000}]`
- Since flow into a node must equal flow out, the math simulation must meticulously balance internal ledgers before handing the data array to D3.


# Trust Intelligence Dashboard Research - Batch 11: Render Polish & Estate Tax Laws
Date: 2026-03-13

## 1. WebGL vs Canvas 2D for 10,000 Particles
- **The Verdict**: Canvas 2D chokes around 2,000-3,000 particles before frame rates drop below 30FPS because all calculations are CPU-bound.
- **WebGL**: By offloading coordinate math to GLSL shaders, WebGL can render 10,000 to 100,000 particles at a smooth 60FPS. 
- *Dashboard Implication*: If visualizing individual dollars flowing through a trust as particles, standard Canvas or SVG is insufficient. However, since the primary visuals are SVG lines (Monte Carlo) and Sankey bands, standard SVG is preferred for accessibility and crisp rendering. Particle simulations are unnecessary overhead.

## 2. Dynamic Neon Glow Effect (Tailwind CSS)
- To create a "glowing" data visualization element, standard drop shadows aren't enough.
- Add custom configurations to `tailwind.config.js`:
  ```javascript
  boxShadow: {
    'neon-emerald': '0 0 5px theme("colors.emerald.400"), 0 0 20px theme("colors.emerald.600")',
    'neon-purple': '0 0 5px theme("colors.purple.400"), 0 0 20px theme("colors.purple.600")',
  }
  ```
- *Dashboard Implication*: Applying these specific shadows to the "slider thumbs" and the final "Required Capital" output number will adhere perfectly to the requested dark-mode masterclass aesthetic without cluttering the HTML payload.

## 3. GSTT (Generation Skipping Transfer Tax) & Dynasty Trusts
- GSTT is a flat 40% federal tax applied when wealth skips a generation (e.g., Grandparent to Grandchild).
- **The Exemption**: Currently, individuals have a $13.61M lifetime exemption (sunsetting end of 2025). 
- By allocating this exemption to an irrevocable "Dynasty Trust" when funded, the trust becomes "GST-exempt" *forever*. It can grow to billions of dollars and pass down endlessly without ever triggering the 40% tax again, assuming state perpetuities laws allow it.
- *Dashboard Implication*: When the user selects "Dynasty Trust" on the dashboard, the visualization must explicitly show the GSTT line item dropping to zero across generational boundaries.

## 4. CSS Grid Animation: Smooth Height Expansion
- Animating `height: 0` to `height: auto` directly is notoriously difficult in CSS.
- **The Grid Hack**: Wrap the expanding text in a grid container. Animate `grid-template-rows` from `0fr` to `1fr`.
- ```css
  .accordion-content { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease-out; }
  .accordion-content.open { grid-template-rows: 1fr; }
  .accordion-inner { overflow: hidden; }
  ```
- *Dashboard Implication*: Use this for the expanding "Tactical Interrogation" sections to avoid Javascript-heavy recalculations.

## 5. D3.js Responsive SVG (viewBox & preserveAspectRatio)
- Never hardcode `width="800" height="600"` on `<svg>` tags in D3 if they must fit into a Tailwind responsive container.
- **Solution**: Set `viewBox="0 0 800 600"` and `preserveAspectRatio="xMidYMid meet"`, then style the SVG with Tailwind as `w-full h-auto`. 
- Provide D3 with internal logic that scales fonts relatively based on `viewBox` coordinates, entirely agnostic to the physical screen pixels.


# Trust Intelligence Dashboard Research - Batch 12: UPIA, GSTT Math, & Fiduciary Risk
Date: 2026-03-13

## 1. Uniform Prudent Investor Act (UPIA) & Asset Allocation
- **Modern Portfolio Theory Mandate**: The UPIA legally shifted the standard of care from evaluating single assets to evaluating the *entire portfolio*.
- **Total Return Approach**: Trustees are now required to invest for total return (income + capital appreciation) rather than just yield-chasing, forcing broader diversification across stocks, bonds, and alternatives. This legally justifies the Endowment Model allocations.

## 2. GSTT Direct Skip vs Taxable Termination
- **Direct Skip**: Grandparent gives $1M directly to Grandchild. GSTT is triggered *immediately*. Transferor pays the tax.
- **Taxable Termination**: Grandparent puts $1M in trust for Child. Child receives income for 20 years, then dies. The remaining trust principal passes to Grandchild. The GSTT is triggered upon the Child's death (the termination of the non-skip person's interest). The *Trustee* pays the tax from trust assets.

## 3. GSTT Inclusion Ratio
- Formula: `1 - (Allocated GST Exemption / Value of Transferred Property)`
- If $5M exemption is allocated to a $5M trust, Inclusion Ratio = 0. (Tax rate = 40% * 0 = 0%).
- **The Golden Rule**: Trusts should always be forced into an Inclusion Ratio of exactly 1.0 or exactly 0.0 using qualified severances. Mixed ratios (e.g., 0.4) cause accounting nightmares for decades.

## 4. Corporate vs Individual Fiduciary Duty
- **Individual**: Often uncompensated family members. They carry extreme personal liability if they breach duty of loyalty or prudence. Often lack the infrastructure to generate K-1s or run Monte Carlo models.
- **Corporate**: Banks/Trust Companies. They offer deep pockets, continuity (they don't die), and emotional detachment (impartiality). However, they charge 1-2% AUM fees that drag on total returns.

## 5. Step-Up in Basis (Revocable vs Irrevocable)
- **Revocable Trusts**: Counted inside the grantor's taxable estate. Upon death, assets get a full "Step-Up" in basis to fair market value, wiping out capital gains tax for heirs.
- **Irrevocable Trusts**: Designed to remove assets from the taxable estate. Generally, they *do not* get a step-up in basis (per IRS Rev. Rul. 2023-2). Beneficiaries inherit the grantor's original (often very low) cost basis, meaning heavy capital gains taxes upon sale.
- *Dashboard Implication*: The visualizer should feature a visual "switch" for Revocable vs Irrevocable, which instantly cascades to alter the Capital Gains tax tier assumptions upon liquidation events.


# Trust Intelligence Dashboard Research - Batch 13: UPAIA & Decanting Mechanics
Date: 2026-03-13

## 1. Uniform Principal and Income Act (UPAIA) & Capital Gains
- **The Core Conflict**: Historically, dividends/interest = "Income" (goes to surviving spouse). Capital Gains = "Principal" (stays in trust for kids).
- Because modern endowment models rely on capital appreciation over high-yield dividends, surviving spouses were starving under old rules. UPAIA fixes this.

## 2. The Power to Adjust (UPAIA)
- Gives the trustee legal authority to re-characterize Principal as Income (or vice versa).
- If the trust grows 10% through capital gains but yields only 1% in dividends, the trustee can "adjust" a portion of those capital gains and label them "Income" so the surviving spouse gets a fair 4-5% distribution without violating total return investing principles.

## 3. Unitrust Conversions
- Instead of using the "Power to Adjust" every year, a trustee can convert a standard Marital Deduction Trust (QTIP) into a Total Return Unitrust (TRU).
- **The Mechanics**: The surviving spouse flatly receives a fixed percentage (typically 3% to 5%) of the trust's fair market value calculated annually, *regardless* of whether the return came from dividends, interest, or capital gains. This flawlessly aligns the interests of current and future beneficiaries.

## 4. Decanting (Changing Trust Jurisdiction)
- "Decanting" means pouring the assets of an old, broken trust into a brand new trust with modern provisions in a better state (e.g., California to South Dakota).
- *Tax Hazard*: If beneficial interests change, it can trigger massive capital gains.
- *GSTT Hazard*: If a "Grandfathered" GST-exempt trust is decanted improperly, it loses its exemption, instantly subjecting its entire corpus to a 40% tax when it passes to grandchildren.

## 5. State Income Tax Source Rules for Trusts
- States tax trusts differently based on: Grantor residency, Trustee residency, Beneficiary residency, or administration location.
- **Resident Trusts**: Usually taxed on *all* worldwide income (e.g., California).
- **Non-Resident Trusts**: Taxed only on income sourced *within* that state (e.g., rent from a California property).
- *Kaestner Supreme Court Case*: States cannot tax a trust *solely* because a contingent beneficiary lives there if the beneficiary has no control and received no distributions.


# Trust Intelligence Dashboard Research - Batch 14: UTC, Protectors, & Non-Judicial Modification
Date: 2026-03-13

## 1. Uniform Trust Code (UTC) & Virtual Representation
- **Problem**: Changing an irrevocable trust usually requires the consent of *all* beneficiaries, including unborn grandchildren. How do unborn people consent?
- **Solution (Virtual Representation)**: Under the UTC, a parent or adult beneficiary can "virtually represent" minor or unborn beneficiaries and bind them to a legal decision, provided there is a "substantially identical interest" and no conflict of interest between the parent and the unborn child.

## 2. Trustee vs. Trust Protector
- **Trustee (The CEO)**: Manages day-to-day operations, invests money, files taxes, distributes funds. Bears strict legal fiduciary liability for everything.
- **Trust Protector (The Board of Directors)**: An independent 3rd party with "super powers" defined in the trust. They do not manage the money day-to-day. They exist to fire bad trustees, change the trust's state jurisdiction (for tax purposes), or veto major distributions.

## 3. Decanting under the UTDA
- Allows a trustee with absolute discretionary power to pour assets from an old, restrictive trust into a new, modern trust.
- Requires 60+ days notice to all beneficiaries and potential appointees.
- *Dashboard Implication*: The ability to decant means trust structures are no longer "set in stone." The visualizer can reflect this by showing "Jurisdiction Move" as a valid strategic lever to reduce state income tax drags over a 30-year Monte Carlo.

## 4. NJSA (Non-Judicial Settlement Agreement)
- A powerful tool to modify an irrevocable trust *without* going to court.
- Requires unanimous consent of all "interested persons" (the trustee + all beneficiaries, utilizing Virtual Representation for minors).
- *The Catch*: An NJSA cannot violate a "material purpose" of the trust (e.g., if the trust explicitly says "never distribute principal before age 35," an NJSA cannot override that to distribute at age 25).
- Vastly cheaper, faster, and more private than trust litigation.


# Trust Intelligence Dashboard Research - Batch 15: DAFs, DNI/UNI, & GRAT Mechanics
Date: 2026-03-13

## 1. DAFs (Donor Advised Funds) in Trust Planning
- DAFs act as flexible alternative remaindermen for Charitable Remainder Trusts (CRTs) and Charitable Lead Trusts (CLTs).
- Instead of naming a specific charity, a trust distributes to a DAF, allowing the family/advisors to allocate grants over time while avoiding the heavy compliance burden of a Private Foundation.

## 2. Section 642(c) Charitable Deductions (Trusts vs Individuals)
- **Current Law**: Trusts enjoy an "unlimited" charitable deduction (unlike individuals who are capped by AGI percentages). 
- **The Catch**: The donation must be made *from gross income* (not principal) and must be explicitly authorized in the trust deed.
- **2026 Shift**: The "One Big Beautiful Bill Act" (OB3) will reportedly cap this, subjecting non-grantor trusts to itemized deduction limitations, drastically altering trust philanthropic strategies.

## 3. DNI vs UNI (The Core of Trust Taxation)
- **DNI (Distributable Net Income)**: The *maximum* amount of income that can be distributed to beneficiaries and taxed on their personal returns (via K-1). Anything distributed above DNI is tax-free principal. It acts as a ceiling to prevent double taxation.
- **UNI (Undistributed Net Income)**: The portion of DNI that the trustee *chose to retain* in the trust. UNI gets taxed at the punitive, highly-compressed trust tax rates. 
- *Visualizer Note*: The app needs a toggle showing the tax drag of retaining income (UNI) vs. the tax efficiency of distributing it up to the DNI limit.

## 4. The Throwback Rule
- Originally designed to prevent trusts from hoarding income in low tax brackets and distributing it later.
- **Current Status**: Largely repealed for domestic trusts in 1997 due to trust tax bracket compression (trusts hit the 37% bracket incredibly fast now, so hoarding makes no tax sense). 
- Still applies to foreign trusts and some pre-1984 domestic trusts. Some states (NY, CA) have state-level throwback rules to catch accumulated income avoiding state tax.

## 5. GRATs (Grantor Retained Annuity Trusts)
- A wealth transfer vehicle where the grantor puts highly appreciating assets in an irrevocable trust and receives a fixed annuity back for a set term.
- **Zeroed-Out GRAT**: The annuity is mathematically set to equal the initial asset value plus the IRS Section 7520 hurdle rate. Result: The initial "gift" to beneficiaries is valued at $0, incurring zero gift tax.
- **The Win**: If the assets grow faster than the 7520 rate (e.g., pre-IPO tech stock), all excess growth passes to beneficiaries completely tax-free.
- *Risk*: The grantor *must outlive* the term of the GRAT, or the assets revert back to their taxable estate.


# Trust Intelligence Dashboard Research - Batch 16: QPRTs & ILITs
Date: 2026-03-13

## 1. QPRTs (Qualified Personal Residence Trusts)
- **Concept**: A grantor transfers their primary or secondary home into an irrevocable trust but retains the right to live there rent-free for a specified term (e.g., 10 years).
- **Valuation for Gift Tax**: The gift is NOT the current fair market value. It is discounted by the actuarial value of the grantor's retained right to live there and the reversionary interest if they die during the term. 
- **The Math**: Uses IRS actuarial tables and the Section 7520 rate. A longer term = a larger retained interest = a dramatically smaller taxable gift to the beneficiaries. At the end of the term, the house (and all its appreciation) passes to the heirs.
- **The Risk**: If the grantor dies before the term ends, the full value of the house is pulled back into their taxable estate.

## 2. ILITs (Irrevocable Life Insurance Trusts) & Crummey Powers
- **Concept**: A trust designed specifically to hold a life insurance policy. Because it's irrevocable, the death benefit is completely excluded from the grantor's taxable estate.
- **The Problem**: The grantor needs to pay the annual premiums by gifting cash to the trust. But gifts to a trust are usually "future interests" and don't qualify for the $18,000 annual gift tax exclusion.
- **The Solution (Crummey Powers)**: The trust must grant the beneficiaries a temporary right (usually 30 days) to withdraw the gifted cash.
- **The "Crummey Letter"**: The trustee MUST send a formal written notice ("Crummey letter") to beneficiaries every time money is deposited, giving them the 30-day window to take the cash. 
- **The Reality**: The beneficiaries know not to touch the money, allowing the 30-day window to lapse so the trustee can use the cash to pay the insurance premium. But legally, because they *could* have taken it, the IRS counts it as a "present interest" gift, thus shielding the premium payments from gift taxes.

*(Note: Waiting on network retries for IDGTs, SLATs, and CRUTs vs CRATs)*


# Trust Intelligence Dashboard Research - Batch 17: IDGTs, SLATs, & CRUTs vs CRATs
Date: 2026-03-13

## 1. IDGTs (Intentionally Defective Grantor Trusts) vs GRATs
- **Mechanic**: Both remove assets and future appreciation from the taxable estate. Both are "grantor trusts," meaning the grantor pays the income tax on the trust's earnings (which acts as an additional, tax-free gift to the trust).
- **The IDGT Advantage**: 
  1. Uses the Applicable Federal Rate (AFR) instead of the higher Section 7520 rate used by GRATs, creating a lower hurdle for the assets to beat.
  2. No "Mortality Risk" - if a grantor dies during a GRAT term, the assets are pulled back into their estate. An IDGT survives the grantor's death.
  3. Better for illiquid assets (closely-held businesses/real estate) leveraging valuation discounts.

## 2. SLATs (Spousal Lifetime Access Trusts)
- **Concept**: An irrevocable trust created by one spouse for the benefit of the other spouse (and usually children). It removes assets from the donor's estate while still allowing the donor *indirect* access to the funds through their spouse.
- **The Risks**:
  1. **Divorce/Death**: If the beneficiary spouse dies or divorces the donor, the donor completely loses all indirect access to the trust assets.
  2. **No Step-Up**: Assets in a SLAT do not receive a step-up in basis at the donor's death.
  3. **Reciprocal Trust Doctrine**: If both spouses create SLATs for each other, they must be substantially different, otherwise the IRS ignores them and pulls the assets back into their estates.

## 3. CRUTs vs CRATs (Charitable Remainder Trusts)
- Both provide income to a beneficiary for a term/life, with the remainder going to charity. Both require minimum 5% payout and minimum 10% remainder to charity.
- **CRAT (Annuity Trust)**: 
  - Pays a *fixed dollar amount* based on the initial funding value.
  - Good for predictable income.
  - Does NOT allow additional contributions.
- **CRUT (Unitrust)**: 
  - Pays a *variable percentage* calculated annually based on the trust's fluctuating market value.
  - Good as an inflation hedge if assets grow.
  - ALLOWS additional contributions over time.


# Trust Intelligence Dashboard Research - Batch 18: FLPs/FLLCs, Discounts, QOZs & Depreciation
Date: 2026-03-13

## 1. Family Limited Partnerships (FLP) vs. Family LLC (FLLC)
- Both are pass-through entities used to transfer wealth across generations while maintaining control and utilizing valuation discounts.
- **FLP**: Rigid structure. Requires General Partners (who have 100% control but *unlimited* personal liability) and Limited Partners (who have no control but limited liability). Senior generations act as GPs.
- **FLLC**: Flexible structure. All members (even managers) get limited liability protection. The operating agreement can be highly customized. FLLCs are increasingly preferred due to the universal liability shield.

## 2. Minority Interest Valuation Discounts (DLOC & DLOM)
- **Discount for Lack of Control (DLOC)**: A minority owner (e.g., 10%) cannot force a sale, declare dividends, or hire/fire management. Buyers will not pay pro-rata value for a powerless asset. Usually a 15-30% discount.
- **Discount for Lack of Marketability (DLOM)**: Private company shares cannot be sold on a public exchange; liquidating them takes time and money. Usually a 20-35% discount.
- **The Magic**: These are applied *sequentially*. If a 30% DLOC and a 30% DLOM are applied, a $1M stake is valued at $1M * 0.70 * 0.70 = $490,000 for gift tax purposes.

## 3. Qualified Opportunity Zones (QOZs)
- A tax incentive to drive capital into distressed communities via Qualified Opportunity Funds (QOFs).
- **Benefit 1**: Deferral of prior capital gains taxes until Dec 31, 2026.
- **Benefit 2 (The Big One)**: If the QOF investment is held for at least 10 years, any capital gains on the QOF investment itself are permanently excluded from federal taxation.

## 4. Commercial Real Estate Depreciation Recapture
- Investors deduct property depreciation from their taxes annually, reducing ordinary income. This reduces the property's cost basis.
- When sold, the IRS "recaptures" those previous deductions. The gain attributed to straight-line depreciation is taxed as "unrecaptured Section 1250 gain" at a max rate of 25% (higher than the 15-20% long-term cap gains rate).
- Can be deferred using a 1031 like-kind exchange.

## 5. Actively Managed ETF vs. Active Mutual Fund
- **Intraday Trading**: ETFs trade all day like stocks; Mutual funds trade exactly once at the 4 PM NAV.
- **Tax Efficiency**: ETFs use "in-kind creation/redemption" to wash away capital gains inside the fund, whereas mutual funds must sell assets to meet redemptions, triggering taxable distributions to all shareholders.
- **Transparency**: ETFs typically disclose holdings daily; mutual funds disclose quarterly.


# Trust Intelligence Dashboard Research - Batch 19: Phantom Income, Tax Harvesting, Crypto & PE
Date: 2026-03-13

## 1. Phantom Income in Partnerships/LLCs
- **Concept**: A partner/member receives a Schedule K-1 assigning them a portion of the company's annual profit, but they *do not receive a cash distribution* from the company to pay the tax.
- **Why it happens**: The company decides to reinvest profits, pay down debt, or horde reserves, instead of distributing cash to partners. The partners still owe personal income tax on that paper profit.
- *Dashboard application*: When visualizing private equity or closely-held business assets in a portfolio, "phantom income reserves" must be factored into the trust's cash flow models to ensure liquidity exists to pay the K-1 taxes.

## 2. Tax Loss Harvesting (Brokerage)
- Selling an asset at a loss to offset capital gains and up to $3,000 of ordinary income.
- **The Wash Sale Rule**: You cannot claim the loss if you buy a "substantially identical" security within 30 days before or after the sale. If you do, the loss is disallowed and added to the cost basis of the new asset.

## 3. Crypto Wash Sale Loophole
- The IRS currently classifies cryptocurrency as *property*, not as a *security*.
- Result: The 30-day wash sale rule applies to securities, not property. Investors can sell crypto tokens at a massive loss, harvest that tax loss, and *immediately* repurchase the exact same tokens seconds later without penalty. (Note: this does not apply to crypto ETFs, which are considered securities).

## 4. Private Equity Waterfall Distributions
The mathematical sequence of how a PE fund pays out cash:
1. **Return of Capital (ROC)**: LPs get 100% of cash flow until their initial investment is fully refunded.
2. **Preferred Return (Hurdle)**: LPs get 100% of the next cash flow until they hit a set annualized return (usually ~8%).
3. **Catch-up**: GPs (the managers) get 100% of the *next* cash flow until their total cut reaches their agreed-upon profit percentage (e.g., they get all the cash until they have received 20% of the total profits generated so far).
4. **Carried Interest**: All remaining profits are split per the agreement (e.g., 80% to LPs, 20% to GPs).
- **American vs European**: American calculates this deal-by-deal (faster GP payouts, risks "clawbacks" if a later deal fails). European calculates this for the *entire fund's pool* (safest for LPs).

*(Note: Waiting on network retry for Direct Indexing vs Index ETF)*


# Portfolio Research Scratchpad (Batch 2/10)

## Sequence of Returns Risk (SORR) Mitigation
- The danger of negative returns early in retirement heavily impacting longevity.
- Mitigation 1: Cash buffer (2-3 years of expenses) to avoid selling assets in a down market.
- Mitigation 2: Dynamic withdrawal rules (e.g., Guyton-Klinger).
- Mitigation 3: Bond tent / rising equity glide path.

## Guyton-Klinger Dynamic Withdrawal Rules
- Start with 5.2% - 5.6% initial withdrawal rate.
- Upper Guardrail (Prosperity Rule): If withdrawal rate falls 20% below initial due to market gains, increase dollar withdrawal by 10%.
- Lower Guardrail (Capital Preservation Rule): If withdrawal rate rises 20% above initial due to market drops, decrease dollar withdrawal by 10%. (Protects portfolio).
- Inflation caps (e.g., 6% max increase).

## Texas Trust Code: Maintenance vs. Support (HEMS)
- HEMS: Health, Education, Maintenance, and Support.
- Creates an "ascertainable standard" limiting trustee discretion, protecting against creditors and estate inclusion.
- Texas law views "Maintenance" and "Support" as encompassing the beneficiary's *accustomed standard of living*, not just bare necessities.
- Affords beneficiaries the right to demand information upon irrevocability.

## Distributable Net Income (DNI)
- The maximum income amount from a trust that can be passed through to beneficiaries for tax purposes.
- Prevents double taxation.
- Calculated on Schedule B of Form 1041.
- Generally excludes capital gains allocated to corpus (principal).
- Distributions up to DNI are deductible to the trust and taxable to the beneficiary.

## Uniform Principal and Income Act (UPIA)
- Provides standard rules for allocating trust receipts and disbursements between "Principal" (corpus) and "Income" (earnings).
- Principal = original assets + capital gains/losses.
- Income = interest, dividends, rent.
- Power to Adjust: Allows trustees to reallocate between principal and income to ensure fairness (duty of impartiality), especially under total return investing.

## Capital Gains Tax: Trust vs. Individual
- Trust Tax Rates: Reach the top 20% long-term / 37% short-term brackets at *highly compressed* levels (e.g., > ~$15,900 income).
- Individual Tax Rates: Reach top brackets at much higher thresholds (e.g., > $545k).
- Capital gains generally *do not* pass through in DNI to beneficiaries unless specific trust provisions apply. They are usually taxed at the trust level (high rates).

## Grantor vs. Non-Grantor Trusts
- Grantor Trust: Grantor pays income tax on all trust earnings ("pass-through"). Trust assets grow tax-free. Excellent for estate reduction.
- Non-Grantor Trust: Separate taxable entity. Pays its own tax at compressed brackets if income is retained. If distributed, beneficiaries pay at their individual rates. Good for shifting income, SALT deduction maximization, QSBS stacking.

## Asset Protection Trusts: WY vs. SD vs. NV
- Nevada: No statutory exception creditors (e.g., divorcing spouses generally can't pierce). Very short statute of limitations (2 years).
- South Dakota: No exception creditors for pre-existing claims. "Clear and convincing" standard required to prove fraudulent transfer. Abolished rule against perpetuities (Dynasty Trusts).
- Wyoming: Allows self-settled trusts. 1,000-year duration. Excellent privacy (sealed court documents).

## Generation Skipping Transfer (GST) Tax Exemption
- 2026 Sunset permanently eliminated by the "One Big Beautiful Bill Act" (OBBBA) in 2025.
- Effective Jan 1, 2026: Exemption is $15M per individual / $30M per couple, adjusted annually for inflation. Tax rate remains 40% above exemption.

## Step-Up in Basis & Irrevocable Trusts (Rev. Rul. 2023-2)
- Step-Up: Assets inherited get a new basis equal to Fair Market Value at the date of death, eliminating capital gains on prior appreciation.
- Irrevocable Grantor Trusts: If assets are *excluded* from the grantor's gross estate, they *do not* receive a step-up in basis (per IRS Rev Rul 2023-2).
- Mitigation: "Swap powers" allowing grantor to exchange high-appreciating trust assets for cash before death, pulling them back into the taxable estate for the step-up.


# Trust Intelligence Dashboard Research - Batch 20: Equity Comp & Direct Indexing
Date: 2026-03-13

## 1. Direct Indexing vs Index ETFs
- **ETF**: You own shares of a fund that holds the index. It is cheap and easy, but you cannot harvest losses on individual stocks inside the index if the math demands it.
- **Direct Indexing**: You own the actual 500 stocks in the S&P 500 yourself in a separately managed account. If 400 stocks go up and 100 go down, you can individually sell the 100 losers to harvest the tax losses to offset outside capital gains, while maintaining the index track. Massive tax alpha for large portfolios.

## 2. VULs (Variable Universal Life)
- Permanent life insurance where the cash value is invested into direct market sub-accounts (like mutual funds) instead of a general fixed-rate account.
- **Upside**: Tax-deferred market growth.
- **Downside**: You bear the market risk. If the sub-accounts crash, you may have to inject more premiums to prevent the policy from lapsing.

## 3. ISOs vs NSOs
- **NSO (Non-Qualified Stock Option)**: At execution, the "spread" (Fair Market Value minus Strike Price) is immediately taxed as ordinary income and subject to payroll taxes.
- **ISO (Incentive Stock Option)**: No regular income tax at execution. *However*, the spread counts as income for the dreaded Alternative Minimum Tax (AMT). If you hold the stock 2 years from grant and 1 year from exercise, the *entire* profit is treated as a long-term capital gain (Qualifying Disposition).

## 4. RSUs (Restricted Stock Units)
- RSUs are not options; they are actual shares given to an employee on a vesting schedule.
- When an RSU vests, the FMV on the vesting date is treated as a massive cash bonus. It is taxed as **ordinary income**. Most companies do a "sell-to-cover" (selling 30-40% of the vested shares immediately) to pay the withholding tax to the IRS so the employee isn't hit with a massive out-of-pocket tax bill.

## 5. The 83(b) Election
- When granted equity subject to vesting, standard rules say you pay ordinary income tax *as the shares vest* based on the FMV on those future dates. If the startup moons, you pay exorbitant taxes.
- An **83(b) election** is a letter sent to the IRS within 30 days of the grant. The employee elects to pay ordinary income tax on all unvested shares *today*. Because the startup's current FMV is usually pennies, the tax is zero. As the startup moons over the next 4 years, no tax is owed at vesting. When sold, everything is a capital gain.


# Trust Intelligence Dashboard Research - Batch 21: NQDC, Carry, CLAT/GRAT, GSTT & SDIRAs
Date: 2026-03-13

## 1. PE Carried Interest Taxation (Section 1061)
- Carried interest (usually 20% of fund profits) is treated as capital gains.
- **The Catch**: Under Section 1061, the fund must hold the underlying asset for **more than 3 years** for the manager to get the long-term capital gains rate (~23.8%). If held less than 3 years, the carry is taxed as short-term capital gains (ordinary income, up to 37%).

## 2. GRAT vs CLAT
Both freeze asset values and transfer excess growth to heirs free of gift tax.
- **GRAT (Grantor Retained Annuity Trust)**: The annuity stream goes back to the **Grantor**. Remainder to family.
- **CLAT (Charitable Lead Annuity Trust)**: The annuity stream goes to a **Charity**. Remainder to family. Can also provide a massive upfront income tax deduction.

## 3. GSTT (Generation Skipping Transfer Tax) Exemption
- **The Tax**: A brutal flat 40% tax applied when transferring wealth to a "skip person" (grandchildren, or anyone >37.5 years younger).
- **The Exemption**: Matches the estate tax exemption ($13.61M in 2024). Planners allocate this exemption to a "dynasty trust" on day one, so the initial funding and *all future compounding growth* is permanently immune to the GSTT. 

## 4. NQDC (Non-Qualified Deferred Compensation) Plans
- High-earning executives defer massive chunks of salary/bonuses until retirement.
- **Benefits**: No IRS 401(k) limits. The money grows tax-deferred. Distributions are taxed later, ideally when the executive is in a lower tax bracket or a zero-income-tax state.
- **The Risk**: Assets are *unsecured obligations* of the employer. If the company goes bankrupt, the executive loses the deferred comp.

## 5. Self-Directed IRAs (Real Estate/Private Equity)
- Bypasses traditional IRA stock/bond limits to buy real estate or private businesses.
- **The Danger (Prohibited Transactions)**: Strict ban on "self-dealing." You cannot buy a property from yourself, stay in the property, or even provide "sweat equity" (e.g., you can't fix the sink yourself). 
- **The Penalty**: Any violation instantly disqualifies the entire IRA, triggering immediate taxation of the entire balance and a 10% penalty.
- **Leverage (UBIT)**: If the SDIRA uses a non-recourse loan to buy real estate, the debt-financed portion of the income is subject to UBIT (Unrelated Business Income Tax).


# Trust Intelligence Dashboard Research - Batch 22: Trust Audits, Crypto Basis & ILIT Traps
Date: 2026-03-13

## 1. The Step Transaction Doctrine
- The IRS has the power to collapse multiple distinct, technically legal steps into a single taxable transaction if they determine it was a pre-arranged plan to dodge taxes.
- **Example**: Husband gifts stock to Wife (tax-free under marital deduction), and Wife immediately gifts the exact same stock to a Trust (bypassing Husband's exhausted gift limit). The IRS will "step" through the Wife and treat it as a taxable transfer directly from Husband to Trust.
- **Defense**: Must show independent economic risk, distinct timelines, and varying ownership percentages between steps.

## 2. Transferring Life Insurance to an ILIT (The 3-Year Rule)
- To remove a life insurance payout from your taxable estate, you must transfer all "incidents of ownership" to an Irrevocable Life Insurance Trust (ILIT).
- **The Trap (IRC Section 2035)**: If you transfer an *existing* policy to an ILIT and die within 3 years, the IRS pulls the entire death benefit back into your taxable estate. (This does not apply if the ILIT itself purchases a brand new policy on your life from day one).

## 3. Inherited Crypto Cost Basis
- **The Loophole**: Because the IRS classifies cryptocurrency as "property" (like real estate), inherited crypto receives a full **"step-up in basis"** to the Fair Market Value on the benefactor's date of death.
- If a benefactor bought Bitcoin at $100 and dies when it is $60,000, the heir's cost basis is $60,000. If the heir sells it immediately, they pay $0 in capital gains tax, totally wiping out the historical tax liability.

## 4. Simple vs Complex Trusts (Tax Returns)
- **Simple Trust**: Required by law to distribute 100% of its generated income to beneficiaries every year. Cannot distribute principal. Cannot donate to charity. Beneficiaries bare 100% of the income tax burden.
- **Complex Trust**: Has total flexibility. Can accumulate income inside the trust, distribute principal, and donate to charity. The trust itself pays taxes on retained income (which is dangerous because Trust tax brackets hit the maximum 37% rate at only ~$15,000 of income).

## 5. SLATs and the Reciprocal Trust Doctrine
- Husband creates a Spousal Lifetime Access Trust (SLAT) for Wife. Wife creates a SLAT for Husband. 
- If the trusts have the same trustees, identical terms, funding amounts, and timelines, the IRS invokes the **Reciprocal Trust Doctrine**. They "uncross" the trusts, treating it as if Husband created a trust for himself, pulling the assets back into their taxable estates and destroying the tax strategy.
- **Fix**: The trusts must be "meaningfully different" (different trustees, different distribution assets, staggered timelines).


# Trust Intelligence Dashboard Research - Batch 23: QPRTs, Rollovers, Real Estate & IDGT Swaps
Date: 2026-03-13

## 1. QPRTs (Qualified Personal Residence Trusts)
- Moves a primary/secondary home out of the taxable estate at a massive discount to freeze its value. The gift value is heavily discounted because the grantor retains the right to live there rent-free for a specified number of years.
- **The Catch**: The Grantor *must* outlive the trust term. If they die before the term expires, the house is pulled entirely back into the taxable estate, vaporizing all the tax savings. Also, beneficiaries do not get a step-up in basis.

## 2. Direct vs Indirect Rollovers (401k/IRA)
- **Direct Rollover**: Funds go directly from Institution A to Institution B. Safe, zero withholding, no time limit panic.
- **Indirect Rollover**: The employer/custodian cuts a check directly to the individual. By law, they MUST withhold 20% for taxes. The individual has exactly 60 days to deposit the *entire original balance* into the new account. This means the individual must use their own personal cash to make up the missing 20% out of pocket. If they fail, they are hit with full income tax on the entire distribution AND a 10% penalty if under 59.5.

## 3. Hedge Fund Fees (High-Water Marks & Hurdles)
- Usually structured as "2 and 20" (2% management fee, 20% on profits).
- **Hurdle Rate**: The fund must beat a specific benchmark (e.g., 5% return) before they can charge *any* 20% performance fee.
- **High-Water Mark**: A fund only gets paid on *new* profits. If NAV drops from 100 to 90, and then goes back to 100 the next year, the manager gets $0 in performance fees. They only get 20% on gains *above* 100.

## 4. Passive Activity Losses (Real Estate)
- The IRS dictates that rental real estate is "passive", meaning losses can only offset other passive income, NOT your active W2 salary.
- **Exception 1 (Active Participation)**: Allows deducting up to $25k of losses against W2 income, but the deduction drops to zero if your Adjusted Gross Income exceeds $150,000.
- **Exception 2 (REPS)**: Real Estate Professional Status. To qualify, you must spend >750 hours and >50% of your annual working time entirely in real estate trades, PLUS materially participate in the property. This completely lifts the passive limit, allowing unlimited real estate depreciation loss deductions against highly taxed W2 tech/executive salaries.

## 5. IDGT Substitution (The "Swap Power")
- Because an Intentionally Defective Grantor Trust (IDGT) and the Grantor are considered the *exact same taxpayer* by the IRS for income tax purposes (but separate for estate tax purposes), transactions between them are totally ignored by the IRS.
- **The Play**: A Grantor can "swap" personal cash (high basis) for a highly appreciated stock portfolio (low basis) sitting inside the IDGT with zero Capital Gains tax. They do this right before death so the highly appreciated stock comes back into the personal estate and gets a massive "Step-Up in Basis" for the heirs, wiping out decades of capital gains.


# Trust Intelligence Dashboard Research - Batch 24: CRUTs, RSUs, QSBS & GRITs
Date: 2026-03-13

## 1. CRUTs (Charitable Remainder Unitrusts)
- Unlike a CRAT which pays a fixed flat dollar amount, a CRUT pays out a **fixed percentage** (between 5% and 50%) of the trust's total Fair Market Value, *revalued annually*. 
- If the stock market rips upward, the trust value increases, and the payout to the beneficiaries increases. If the market crashes, the payout drops. It provides an inflation hedge.
- The remaining value passed to charity must still hit a minimum of 10% of the initial funding value.

## 2. Real Estate Short Sales (The COD Trap)
- If a bank lets you sell a house short of the mortgage value and forgives the remaining debt, the IRS treats that forgiven debt as **Cancellation of Debt (COD) Income**.
- You will receive a 1099-C, and that forgiven debt is taxed as ordinary income (as if you earned it working a job), unless you qualify for an exclusion like Insolvency or the Mortgage Forgiveness Debt Relief Act for primary residences.

## 3. RSU Vesting Tax Mechanics
- **Event 1 (Vesting)**: RSUs are taxed heavily on the exact day they vest based on the Fair Market Value of the stock that day. It is treated as W-2 Ordinary Income. To pay this tax, companies usually do a "Sell to Cover," instantly liquidating roughly 22-37% of the newly vested shares on the open market to send cash to the IRS.
- **Event 2 (Selling)**: When the employee eventually sells the *remaining* shares, the difference between the sale price and the FMV on the vesting date is taxed as Capital Gains (either short-term or long-term depending on the holding period after vesting).

## 4. Section 1202 QSBS (Qualified Small Business Stock)
- The ultimate tax loophole for startup founders and early employees/investors.
- If you acquire stock in a domestic C-Corp that has under $75M in gross assets, and you hold that stock for 5+ years, you can legally exclude 100% of the federal capital gains tax upon exit.
- **The Cap**: The exclusion is capped at the *greater* of $10,000,000 or 10x your cost basis ($15M under the newer OBBBA rules). 
- Many service tier businesses (consulting, law, finance, hotels, health) are explicitly excluded from qualifying.

## 5. GRITs (Grantor Retained Income Trusts)
- Grantor places assets in an irrevocable trust, retains the right to all income generated for a set term, and then the remainder passes to beneficiaries at a discounted gift tax value.
- **The IRC Section 2702 Trap**: Decades ago, the IRS closed a loophole by forbidding GRITs from passing wealth to "immediate family" (spouse, descendants, ancestors). 
- Today, GRITs only work if the remainder beneficiaries are non-immediate relatives (nieces, nephews, cousins) or charities. For immediate family members, you must use a GRAT or GRUT instead.


# Trust Intelligence Dashboard Research - Batch 25: 529s, Buy-Sells, DAFs & Margin
Date: 2026-03-13

## 1. 529 Plans & Full Scholarships
- **The Rule**: If a 529 beneficiary receives a full-ride scholarship, the creator can withdraw an amount exactly equal to the scholarship entirely free of the typical 10% penalty.
- **The Tax Hit**: While the penalty is waived, the *earnings* portion of the withdrawal is still subject to federal and state income tax. (The principal is never taxed since it went in after-tax). 
- Alternately, up to $35,000 can now be rolled over into a Roth IRA for the beneficiary if the 529 has been open for 15+ years.

## 2. Cross-Purchase Buy-Sell Agreements
- **Mechanics**: In a 3-partner business, each partner individually buys a life insurance policy on the other two. (Partner A buys a policy on B and C). 
- **The Trigger**: If Partner B dies, A and C receive massive, tax-free death benefits. They are legally contractually obligated to use that cash to buy Partner B's shares from B's grieving family.
- **The Advantage**: The family gets immediate liquid cash. Partners A and C keep control of the business AND get a "Step-Up in Basis" on the newly acquired shares. 

## 3. DAFs (Donor Advised Funds) vs Private Foundations
- **DAF Advantages**: Maximum upfront tax deduction (up to 60% of AGI for cash, 30% for appreciated assets). Zero excise taxes. Zero legal/administrative overhead. Great for front-loading a massive tax deduction in a high-income year (like selling a business).
- **Private Foundation Disadvantages**: Lower deductions (30% cash / 20% assets). You must pay a 1.39% excise tax on all investment income every year. You are mandated by law to distribute 5% of all net assets to charity annually, or face crippling penalties.

## 4. Portfolio Margin vs Reg T Margin
- **Reg T (Retail Margin)**: Requires 50% initial margin for stocks. Assesses risk position-by-position. Very rigid.
- **Portfolio Margin**: Uses FINRA-approved TIMS (Theoretical Intermarket Margining System) to stress-test the *entire* portfolio simultaneously across various crash/rally scenarios. If you have highly hedged option setups (like Iron Condors or massive S&P put walls), your margin requirement plummets, allowing extreme leverage (up to 6.7:1 on equities vs Reg T's 2:1). Requires $100k+ minimum.

## 5. Option Wash Sales
- **The Trigger**: Selling an option at a loss, and within 61 days buying the identical option OR rolling to a "substantially identical" contract (very similar strike/expiration). 
- The IRS denies the loss deduction, pushing the loss amount into the basis of the new active contract. This prevents options traders from locking in massive artificial tax losses while effectively keeping the exact same market exposure open.


# Portfolio Research Scratchpad (Batch 3/10)

## Box-Muller Transform for JavaScript (Monte Carlo)
- Essential for generating normally distributed random numbers from uniformly distributed numbers (`Math.random()`).
- Z1 = √(-2 * ln(U1)) * cos(2 * π * U2)
- Z2 = √(-2 * ln(U1)) * sin(2 * π * U2)
- Limitation: Simply using Box-Muller underestimates "fat tails" (extreme market events). Real-world finance isn't a perfect bell curve.
- To model fat tails in JS: Instead of standard normal, use Student's t-distribution transformations, or apply historical jump-diffusion logic to the normal baseline.

## Private Equity J-Curve Cash Flow Modeling
- J-Curve shape: Negative cash flow early (capital calls, management fees) -> Positive later (portfolio company exits).
- Implementation in JS requires modeling: Capital Call Schedule, Fee Structure, Investment Ramp-up, and Distribution Schedule.
- Deterministic models vs Stochastic (Monte Carlo) models to forecast the NAV and IRR from projected cash flows.
- Publicly available PE cash flow data is scarce; models rely heavily on assumed shape functions (like Weibull distributions based on historical averages).

## Private Credit / Direct Lending Yield Premiums
- Historically provides 157 to 244 basis points (1.5% to 2.4%) higher yield than Broadly Syndicated Loans (BSLs).
- Why the premium? "Illiquidity premium" (cannot be easily sold like BSLs), faster execution/certainty, and bespoke structural setups.
- Features: Floating rates (protects against rising rates), stricter financial covenants, and lower mark-to-market daily volatility compared to public debt.

## Family Office Asset Allocation (2024 Trends)
- Surging into Alternative Investments: Averages ranging from 45% to 59% of the total portfolio depending on the region (US family offices are highest at ~59%).
- Target breakdown within Alts: Private Equity (~22-35%), Real Estate (~10-12%), Private Debt (~4%), Hedge Funds (~4%).
- The shift is driven by a massive move away from cash to lock in yields and pursue long-term, multi-generational wealth compounding irrespective of illiquidity.

## University Endowment Asset Allocation (2024 Models)
- Continue to leverage the "Endowment Model" (heavy illiquid alts) pioneered by Yale, but public equities outperformed privates in FY2024 largely due to the "Magnificent 7" tech rally.
- Target Examples:
  - Mega Endowments (> $1B): High private equity/VC exposure.
  - University of Chicago (Target): 30% Global Equity, 24% PE, 22.5% Absolute Return, 6.5% Real Estate, 6% Fixed Income.
  - Total return pool heavily tilted toward growth-oriented assets over traditional fixed income.

## Tax Efficient Mutual Funds vs ETFs (High Net Worth)
- ETFs dominate in tax efficiency due to "in-kind" creation/redemption. When an investor sells, the ETF distributes a basket of securities rather than cash, avoiding triggering capital gains within the fund itself for remaining shareholders.
- Mutual Funds: Legally required to distribute net capital gains to ALL shareholders annually, creating unexpected tax bills even if the shareholder didn't sell any units.
- Strategies for HNW: Direct Indexing, Tax-Loss Harvesting, and Asset Location (placing tax-inefficient assets inside tax-advantaged accounts).


# Trust Intelligence Dashboard Research - Batch 5: Tax Mechanics & Sliders
Date: 2026-03-13

## 1. 2024 Federal Income Tax Brackets (Single vs. Married Filing Jointly)
- The US tax system is progressive. You only pay the bracket rate on the income *within* that bracket.
- **Top Marginal Rate**: 37%
  - Single: Kicks in at $609,350.
  - Married Filing Jointly (MFJ): Kicks in at $731,200.
  - *Crucial Context*: Trusts hit this exact same 37% rate at a mere **$15,650** of retained income (2025 predictive). This extreme compression is the primary reason distributions are forced.

## 2. Long Term Capital Gains (LTCG)
- Requires holding the asset > 1 year.
- **Top Bracket**: 20%
  - Single: Kicks in at > $518,900.
  - MFJ: Kicks in at > $583,750.
- **Note**: Unrecaptured Section 1250 (real estate) caps at 25%, Collectibles cap at 28%.

## 3. Net Investment Income Tax (NIIT)
- An additional 3.8% tax on top of regular taxes, aimed at funding Medicare.
- **Thresholds (MAGI)**:
  - Single: $200,000
  - MFJ: $250,000
  - Trusts: Kicks in at the top bracket threshold ($15,200 for 2024).
- **Tax Calculation**: 3.8% applies to the *lesser* of the total Net Investment Income OR the amount the MAGI exceeds the threshold.

## 4. Trust Distributions & Tax Mechanics
- **Distributable Net Income (DNI)**: This is the legal calculation bounding how much tax liability can be shifted from the trust to the beneficiary.
- If a trust earns $100k in dividends and distributes $100k, the trust pays $0 in tax, and the beneficiary receives a Schedule K-1 for $100k to report on their personal return.
- **Capital Gains Trap**: By default, IRS rules state capital gains belong to the "principal" (corpus) and are trapped inside the trust, suffering the top 37% rate immediately. To push these to the beneficiary, the trustee must actively use "power to adjust" provisions in the trust document.

## 5. Strategies to Avoid "Bumping" Beneficiaries into Higher Tax Tiers
- **Income Shifting Rule**: Distribute exactly up to the cliff of the beneficiary's current tax bracket + NIIT limit ($200k/$250k).
- **The 65-Day Rule (Section 663(b))**: Trustees have the first 65 days of the new calendar year to make a distribution and legally backdate the tax liability to the *prior* tax year. This allows perfect hindsight tax calculation.
- **Municipal Bonds**: Interest is tax-exempt, meaning even if it flows through DNI, it doesn't trigger federal tax or NIIT for the beneficiary.
- **Charitable Wrappers (CRUTs)**: Displace highly appreciated asset sales into a tax-exempt entity, preventing massive single-year capital distribution bumps.

## Application to Slider Mechanics:
We need a visualization that tracks three intersecting lines:
1. Beneficiary Baseline Income (Slider 1)
2. Trust Distribution Target (Slider 2)
3. Tax Bracket Cliffs & NIIT Trigger threshold (Fixed overlays)

*Next Step: Research asset class historical returns and D3.js / Svelte mathematical libraries for the component.*


# Trust Intelligence Dashboard Research - Batch 6: Financial Math & Svelte Patterns
Date: 2026-03-13

## 1. Historical Asset Returns (30-Year Averages)
These are the expected target variables to plug into our JavaScript simulation for realistic rendering:
- **U.S. Public Equities (Stocks)**: ~7.0% - 9.0% (Real risk of high sequence of return drawdowns). High volatility (~15-18% SD).
- **Private Equity**: ~10.5% (Outperforms public markets by ~200-500 bps depending on vintage). Less marked-to-market volatility, but illiquid. Use 10-12% as a baseline slider target.
- **Bonds (Debt)**: ~4.0% - 5.0%. (10-yr Treasuries historically averaged around 4-5% nominal over 30 years, though experiencing recent anomalies). Lower volatility (~5-8% SD).
- **Private Real Estate**: ~5.0% - 7.0%. Low correlation to equities (historically 0.06). Strong income component.
- **Commodities**: Near 0% real return over massive horizons (CAGR < 1%), but high volatility (~14% SD) and excellent inflation hedging.

## 2. JavaScript Monte Carlo Simulation Algorithm
To build the "Survival Risk" component in Svelte, we need a localized Monte Carlo loop using Box-Muller transformations for Gaussian distribution:
```javascript
// Box-Muller transform for normal distribution
function generateRandomNormal(mean, stdDev) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return num * stdDev + mean;
}
```
**Algorithm Flow**:
1. Input: Initial capital, total simulation years (30), simulated path count (1000).
2. For each path, loop over 30 years.
3. Each year: `W(t) = W(t-1) * (1 + generateRandomNormal(expected_return, expected_volatility)) - Withdrawal_Amount`
4. Calculate failure rate: (Paths that end <= 0) / Total Paths.

## 3. Endowment Model Smoothing & Guyton-Klinger Rules
Instead of a flat percentage (which is dangerous in bear markets), endowments use smoothing.
**Smoothing Equation**: `Distribution(t) = (0.7 * Prior_Distribution * Inflation) + (0.3 * Target_Rate * Current_Portfolio_Value)`
- This prevents wide swings in the beneficiary's income.

**Guyton-Klinger Guardrails**:
- *Prosperity Rule*: If the current withdrawal rate drops below initial by 20% (due to portfolio growth), give the beneficiary a 10% raise.
- *Preservation Rule*: If the current rate jumps above initial by 20% (due to a market crash), cut the beneficiary's payout by 10%.

## 4. Svelte 5 Runes for Sliders ($state, $derived, $effect)
To build the UI interactively without massive boilerplate:
- `$state` holds the slider's raw value (e.g., `let bondAllocation = $state(40);`)
- `$derived` calculates the resulting math (e.g., `let expectedReturn = $derived((bondAllocation * 0.04) + (stockAllocation * 0.08));`)
- `$effect` runs secondary visualization updates (like triggering the D3/Canvas re-draw of the localized Monte Carlo graph when a slider changes).

## 5. Visualizing Tax Brackets (Waterfall / Step Charts)
- **Step Function (D3.js)**: Use `d3.line().curve(d3.curveStepAfter)` to map gross income across the marginal tax rates.
- **Waterfall Chart (Plotly.js)**: Use `go.Waterfall` to show the initial portfolio distribution, and subtract the DNI moving into ordinary brackets vs capital gains brackets, finally illustrating the Net Take-Home for the beneficiary.


# Trust Intelligence Dashboard Research - Batch 7: UI Architecture & Advanced Tax Concepts
Date: 2026-03-13

## 1. D3.js Integration within Svelte 5 Lifecycle
- **Philosophy**: Use D3 for the raw math (scales, `d3.line()`, `d3.area()`, axis generation calculations) but *never* use D3's DOM selection (`d3.select().append()`). Let Svelte 5 render the actual `<path>` and `<g>` elements dynamically using `$derived`.
- **Implementation**:
  ```javascript
  let data = $state(initialData);
  let lineGenerator = $derived(
      d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.value))
        .curve(d3.curveStepAfter)
  );
  // In the template: <path d={lineGenerator(data)} />
  ```

## 2. Dynamic Bento Grid with CSS Grid
- **Setup**: Use `display: grid; grid-template-columns: repeat(12, minmax(0, 1fr));` for a 12-column foundation.
- **Placement**: Use `grid-column: span 4;` to dictate width.
- **Auto-Flow**: `grid-auto-flow: dense;` is critical for dashboards to prevent "swiss cheese" gaps when mixing large and small dynamic widgets.
- **Responsiveness**: Shift to `grid-cols-1` on mobile, then `md:grid-cols-12` on larger breakpoints.

## 3. High-Performance Client-Side Math Simulation
- JavaScript is strictly single-threaded. Running a 10,000-path Monte Carlo for 30 years *will* lock the UI.
- **Solution Component**: Use Web Workers to offload the heavy loop calculating the paths. Send configuration (e.g. Asset Allocation %) to the Worker via `postMessage()`.
- **Memory Optimization**: Avoid copying massive arrays back to the main thread. If exporting the raw path data, use `SharedArrayBuffer` for zero-copy reference, or just calculate the aggregates (e.g. median path, 10th percentile, 90th percentile) inside the worker and only send those compressed 3 vectors back to the main thread for rendering.

## 4. Legally Manipulating DNI to Avoid Ordinary Income Tax
- **The Core Goal**: Trust tax brackets max out at 37% at just $15,650. Individuals max out at >$600k. The primary legal manipulation is "Income Spraying".
- **Income Spraying**: Distribute income selectively to beneficiaries in lower tax brackets.
- **The 65-Day Rule**: Gives trustees perfect hindsight. They can look at the prior year's total returns on Feb 15th, and elect to push out distributions retroactively to exactly zero out the trust's tax liability up to the top bracket threshold.
- **Capital Gains Trap Fix**: Electing to include capital gains in DNI (if the trust instrument allows) so the beneficiary pays the 15% rate instead of the trust paying the 20% + 3.8% NIIT rate.

## 5. CRUT Interaction with Family Office Structures
- **Charitable Remainder Unitrust (CRUT)**: Extremely useful for liquidating highly-appreciated, low-basis assets.
- If a family drops a $10M building with a $0 basis into a CRUT, they get a tax deduction for the present value of the remainder.
- The CRUT sells the building tax-free (no 20% hit). It then pays a 5-50% unitrust payout to the family beneficiaries annually.
- This creates a massive, diversified income stream without the initial tax drag. It's often layered with Donor Advised Funds (DAFs) as the ultimate remainder beneficiary.


# Trust Intelligence Dashboard Research - Batch 8: Performance, Accessibility, & UI
Date: 2026-03-13

## 1. SvelteKit Performance for Heavy Visualization
- **SSR (Server-Side Rendering)**: SvelteKit renders the initial HTML payload (including initial SVG frames if mapped correctly) on the server. This guarantees near-instant First Contentful Paint.
- **Data Loading**: Perform heavy array pre-processing in `+page.server.js`. Send strictly minimal payload sizes to the client.
- **Reactivity Optimization**: Svelte 5's runes eliminate Virtual DOM diffing. By directly binding `$state` down to the D3 path generators, the browser only updates the precise `d` attribute of the path, not the surrounding DOM.

## 2. Tailwind CSS Bento Grid Utilities
- Use standard `grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(100px,auto)] gap-4 grid-flow-dense` for the parent container.
- Individual dashboard "cards" are placed using `col-span-12 md:col-span-8 row-span-2` logic.
- *Crucial*: `grid-flow-dense` prevents gaps if components load dynamically or conditional logic changes their size.

## 3. WCAG Accessibility for JavaScript Data Viz
- Interactive `<svg>` or `<canvas>` elements are natively inaccessible.
- **Mandatory Requirements**:
  1. Add `role="graphics-document"` to the SVG.
  2. Implement an invisible `<table class="sr-only">` underlying every visual chart containing the exact raw coordinates/data. This guarantees screen reader access.
  3. Guarantee a minimum contrast ratio of 4.5:1 for line colors against background colors.
  4. Ensure every slider and interactive element has `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`.

## 4. High-Performance Client Web Charting (uPlot vs Chart.js vs Echarts)
- For rendering > 100,000 data points (e.g., thousands of Monte Carlo survival paths):
  - **uPlot**: Consistently wins benchmarks. Uses minimal CPU and RAM (built for micro-optimizations via Canvas 2D). Downside: Harder to implement custom styling and smooth transitons.
  - **ECharts (Apache)**: Handles large datasets via internal `sampling` configurations, but uses high RAM.
  - **Chart.js**: Will likely crash or lag the browser on 100k points unless severely optimized (`parsing: false`, `normalized: true`, decimation enabled).
  - *Decision*: Since I am building out a Svelte-native UI using D3 math to generate SVG paths directly, I will bypass these libraries and render the Monte Carlo medians directly as `d` attributes on SVG `<path>` elements. For rendering tens of thousands of individual faint background lines, I might need an underlying `<canvas>` element drawn via `requestAnimationFrame`.

## 5. Custom Range Sliders in Tailwind
- Standard range inputs are notoriously hard to style identically across Chrome/Firefox/Safari.
- Use explicit pseudo-selectors in arbitrary Tailwind variants:
  `[&::-webkit-slider-runnable-track]:bg-surface-800 ...`
  `[&::-webkit-slider-thumb]:appearance-none ...`
- A functional pattern often wraps the input and paints the "fill" behind the thumb dynamically using an inline `style="--progress: {value}%"`.


# Trust Intelligence Dashboard Research - Batch 9: State, Animations & Trust Rules
Date: 2026-03-13

## 1. Global State Management (Svelte 5 Runes)
- **Universal Reactivity**: `$state` is no longer restricted to `.svelte` files. You can create a file like `portfolio.svelte.ts` and define state inside a class or exported function.
- **Implementation**:
  ```typescript
  // store.svelte.ts
  export const portfolioState = $state({
      bonds: 40,
      stocks: 60,
      targetDraw: 100000
  });
  ```
  Any component importing this object and modifying `portfolioState.bonds` will trigger reactive updates globally. This eliminates the boilerplate of Svelte 4 `writable` stores.

## 2. Linking Multiple Range Sliders (Proportional Adjustment)
- When building the Asset Allocation sliders (which must sum to 100%), moving one slider must decrement the others.
- **Logic**:
  1. Detect an `input` event on Slider A (e.g., increased by 5).
  2. Calculate the difference (Delta).
  3. Distribute the Delta across Sliders B, C, D proportionally based on their *current* weights, or evenly, ensuring no slider drops below 0.

## 3. D3.js Smooth Transitions with Varying Array Lengths
- When the Monte Carlo simulation triggers a new path, or the user changes the timeframe from 10 years to 30 years, the exact number of data points changes.
- **The `.join()` Pattern**:
  `selection.selectAll("path").data(newData)`
  `.join(`
  `    enter => enter.append("path").attr("opacity", 0).transition().attr("opacity", 1),`
  `    update => update.transition().attr("d", lineGenerator),`
  `    exit => exit.transition().attr("opacity", 0).remove()`
  `)`
- This ensures lines cross-fade gracefully rather than instantly snapping or crashing when array lengths mismatch.

## 4. Organizing Tailwind CSS Variables for Dark Mode
- Keep standard hex codes out of the `index.css` whenever possible.
- Use semantic variables in the built-in Tailwind `theme` extension (`tailwind.config.js`).
- **Best Practice**:
  ```css
  @layer base {
    :root { --color-surface: 255 255 255; }
    .dark { --color-surface: 2 6 23; /* #020617 */ }
  }
  ```
- Then in `tailwind.config.js`: `colors: { surface: 'rgb(var(--color-surface) / <alpha-value>)' }`.

## 5. Mechanical Execution of the 65-Day Rule (IRS Section 663(b))
- Allows trustees of standard "Complex Trusts" to treat distributions made between Jan 1 and March 6th (first 65 days of the year) as if they were made on December 31st of the *previous* year.
- **Mechanics**:
  - The trustee makes an irrevocable election on Form 1041.
  - The trust gets the income reduction deduction for the *prior* tax year to wipe out its tax liability at the 37% bracket.
  - The beneficiary gets the Schedule K-1 and pays the tax at their (often lower) marginal individual rate.



