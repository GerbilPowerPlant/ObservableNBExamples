// https://observablehq.com/d/776f0a3c5ed76ab9@3265
import define1 from "../@uwdata/data-utilities.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Introduction to D3`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Halden Lin, Tongshuang (Sherry) Wu_`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## What is d3.js?

[D3](https://d3js.org) is a JavaScript library for data visualization. The core paradigm of D3 is to bind data to Document Object Model (DOM) elements of a web page in order to drive the content and appearance of those elements: hence **D**ata-**D**riven **D**ocuments!
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
## Additional Resources

- D3 v4 and v5 are more or less compatible, and [D3 Tips and Tricks v4.x](https://leanpub.com/d3-t-and-t-v4/read) contains amazing tips that can be applied to both versions. Check it out if you want to learn more!
- Here are links to earlier versions of this tutorial, including a more traditional slide format and some illustrating screenshots that might be intuitive: 
  - [HTML+Javascript version of this tutorial, from 2018 spring](https://jsfiddle.net/haldenl/L7gf9ejj/)
  - [Tutorial slides, Autumn 2018](https://docs.google.com/presentation/d/1izPbshPbJsR0Ujd5JxYgKr0tpJNLGZQmu2qpxkGLpUY/edit?usp=sharing)
  - [Tutorial slides Spring 2016](https://uwdata.github.io/d3-tutorials/)
- A minimal [introduction to Observable and Javascript](https://observablehq.com/@uwdata/a-minimal-introduction-to-javascript-and-observable).
- The spring 2019 [notebook artifact of the in-person D3 tutorial](https://observablehq.com/@haldenl/d3-tutorial) (a recreation of the visualization in this notebook).
- The [classic webpage version](https://github.com/haldenl/d3-tutorial-webpage-version) of the visualization created in this notebook, hosted on Github Pages.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Motivation: Vega-Lite & D3`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Up until now, this course has exposed you to Vega-Lite (or Altair, its Python binding) as a grammar for visualization authoring. The development of Vega-Lite was motivated by a need for _concise specification of visualizations for data analysis_. Its strengths lie in its simplicity and use of _sensible defaults_ to "hide away" much of the nitty gritty of developing a slew of common visualizations and interaction techniques. These reasons are also what make Vega-Lite an excellent tool for learning the fundamentals and grammar of visualization design. However, as we get into the terroritory of exploring even more complex visualizations, Vega-Lite may prove to be inadequate for your needs.

While Vega-Lite and the visualization recommendation tools built on top of it trend towards allowing users to think about _what_ they want to see from their data, D3 was designed to give authors complete control over _how_ their data is presented. Visualization authoring tools exist on a spectrum that can largely be characterized as a going from _expressive yet complex_ to _simple and concise_, and D3 lies near the former. Its strengths lie in the tools it offers in allowing its users to manipulate the Document Object Model (DOM) of a webpage.

The core paradigm of D3 is the _data binding_. An author manipulates the DOM by _binding_ data to its elements and specifying how these elements should behave _as a function of their data_.

In Vega-Lite, you specify _what_ you want your visualization to look like, and its pipeline does the necessary work in creating and placing the appropriate visual marks, scales, legends, and interaction techniques. With D3, _you_ are in charge of this process. This means that understanding of the DOM, HTML, CSS, and JavaScript are required, but with that comes a degree of expressiveness that is only really bounded by the limitations of what can be shown in your web browser.  This makes D3 the tool of choice for authors of _novel_ and _highly customized_ interactive visualizations. D3 is ubiquitous in data journalism and is the backbone of many interactive analysis systems being built today, including Vega and Vega-Lite!

Whether it's Vega-Lite, D3, or any other visualization library, the tool you use depends on the task at hand! With this tutorial, we aim to provide you foundations necessary to add D3 to your visualization toolbox.

Let's get started.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### A quick note about the code in this notebook

Throughout this notebook, we'll be slowly building out our target visualization. To allow us to render multiple stages of this visualization in Observable, we employ a few tactics. __These tactics are only used for chaining these visualizations. You do not need to employ any of these in your own work__.

1. We'll be creating and recreating local elements in a \`__<stagename>__\` object to serve as a pseudo _namespace_. Variables that will be used globally will not be placed in these namespaces.

2. We'll be declaring _D3 selections of DOM elements that become reused_ in namespaces with a [\`mutable\`](https://observablehq.com/@observablehq/introduction-to-mutable-state) qualifier. _This is an Observable construct, not a normal Javascript qualifier_. You don't need to understand how exactly this keyword works, only that it allows us to define a dependency ordering for rendering and allows us to chain modifications to our visualization together without changing previous renderings. When writing your own visualization, you can omit this keyword.

3. When defining our namespaces, we recreate everything defined prior by using a special helper method \`cloneAndAppend\`. You also do not need to know how this works, only that it copies previously defined elements such that modifications are able to be propagated to later visualizations. Again, you will not need to use this in authoring your own visualizations.

To see a single view Observable notebook of the visualization we are going to create, check out the [notebook artifact](https://observablehq.com/@haldenl/d3-tutorial) of the in person tutorial from Spring 2019.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## What we'll be building

Here's a sneak peek of the visualization we'll be creating in this notebook.`
)});
  main.variable(observer()).define(["__complete_n__"], function(__complete_n__){return(
__complete_n__.container.node()
)});
  main.variable(observer("viewof completeButtons")).define("viewof completeButtons", ["html","state","__complete_n__"], function(html,state,__complete_n__)
{
  const decrement = html`<button id="decrement">&lt;&lt;</button>`;
  decrement.onclick = () => {
    if (state.year > 1900) {
      __complete_n__.update(state.sex, -10);
    }
  };
  
  const increment = html`<button id="increment">&gt;&gt;</button>`;
  increment.onclick = () => {
    if (state.year < 2000) {
      __complete_n__.update(state.sex, 10);
    }
  }
  
  const switchSexButton = html`<button id="switch">Switch Sex</button>`;
  switchSexButton.onclick = () => __complete_n__.update(state.sex === 2 ? 1 : 2, 0);
  
  const view = html`
    <div style="width: 800px; text-align: center; font-family: sans-serif">
      ${decrement}
      <span id="curr-year-complete">
        ${state.year}
      </span>
      ${increment}
      <br/>
      ${switchSexButton}
    </div>
`
  return view;
}
);
  main.variable(observer("completeButtons")).define("completeButtons", ["Generators", "viewof completeButtons"], (G, _) => G.input(_));
  main.variable(observer("__complete_n__")).define("__complete_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle","mutable legend","mutable enterbars","tip","d3","state","census","isYearAndSex","x","y","color","height"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6,$7,$8,tip,d3,state,census,isYearAndSex,x,y,color,height)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  const legend = cloneAndAppend($7.value, chart);

  const enterbars = cloneAndAppend($8.value, chart);
  
  container.call(tip);
  
  enterbars.on('mouseover', function(d) {
    // show the tooltip on mouse over
    tip.show(d, this);
    // when the bar is mouse-overed, we slightly decrease opacity of the bar.
    d3.select(this).style('opacity', 0.7);
  }) 
  .on('mouseout', function(d) { 
    // hide the tooltip on mouse out
    tip.hide();
    d3.select(this).style('opacity', 1)
  });
  
  // dynamic legend
  legend
    .on('click', d => update(d, 0))
    .style('cursor', 'pointer');
  
  legend.selectAll('.legend-rect')
    .style('opacity', d => d === state.sex ? 1 : 0.5);
  
  legend.selectAll('.legend-text')
    .style('opacity', d => d === state.sex ? 1 : 0.5)
    .style('font-weight', d => d === state.sex ? 700 : 400);
  
  function update(sex, step) {

    // Step 1. Data.
    state.sex = sex;
    state.year += step;
    const newData = census.filter(row => isYearAndSex(row, state.year, state.sex));

    // Step 2. Join.
    const bars = chart.selectAll('.bar')
        .data(newData, (d) => {
          if (d.year === state.year) {
            // the age for the current year should match the age - step for the previous year.
            return d.age_group - step;
        } else {
            return d.age_group;
        }
      });

    // Step 3. Enter.
    bars.enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.age_group))
      .attr('y', d => y(0))
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', d => color(d.sex))
      .on('mouseenter', function(d) {
        // show the tooltip on mouse enter
        tip.show(d, this);
        d3.select(this).style('opacity', 0.7);
      })
        .on('mouseout', function(d) { 
        // hide the tooltip on mouse out
        tip.hide();
        d3.select(this).style('opacity', 1)
      })
    .transition('enter-transition')
    .duration(500)
      .attr('y', d => y(d.people))
      .attr('height', d => height - y(d.people))

    // Step 4. Update.
    bars
      .transition('update-transition')
      .duration(500)
        .attr('x', d => x(d.age_group))
        .attr('y', d => y(d.people))
        .attr('height', d => height - y(d.people))
        .attr('fill', d => color(d.sex));

    // Step 5. Exit.
    bars.exit()
      .transition('exit-transition')
        .duration(500)
        .attr('height', 0)
        .attr('y', y(0))
        .remove();

    // update legend
    legend.selectAll('.legend-rect')
      .style('opacity', d => d === state.sex ? 1 : 0.5);

    legend.selectAll('.legend-text')
      .style('opacity', d => d === state.sex ? 1 : 0.5)
      .style('font-weight', d => d === state.sex ? 700 : 400);

    // update the year text
    document.getElementById('curr-year-complete').textContent = state.year;
  }

  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
    legend,
    enterbars,
    update
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Data`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`To create a visualization, we need some data!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Every 10 years, the census bureau documents the demographic make-up of the United States, influencing everything from congressional districting to social services. We will work with a dataset that contains a high-level summary of census data for two years a century apart: 1900 and 2000.

The data is a JSON list that describes the U.S. population:
`
)});
  main.variable(observer("census")).define("census", function(){return(
[
  {"year":1900,"age_group":0,"sex":1,"people":4619544},
  {"year":1900,"age_group":0,"sex":2,"people":4589196},
  {"year":1900,"age_group":5,"sex":1,"people":4465783},
  {"year":1900,"age_group":5,"sex":2,"people":4390483},
  {"year":1900,"age_group":10,"sex":1,"people":4057669},
  {"year":1900,"age_group":10,"sex":2,"people":4001749},
  {"year":1900,"age_group":15,"sex":1,"people":3774846},
  {"year":1900,"age_group":15,"sex":2,"people":3801743},
  {"year":1900,"age_group":20,"sex":1,"people":3694038},
  {"year":1900,"age_group":20,"sex":2,"people":3751061},
  {"year":1900,"age_group":25,"sex":1,"people":3389280},
  {"year":1900,"age_group":25,"sex":2,"people":3236056},
  {"year":1900,"age_group":30,"sex":1,"people":2918964},
  {"year":1900,"age_group":30,"sex":2,"people":2665174},
  {"year":1900,"age_group":35,"sex":1,"people":2633883},
  {"year":1900,"age_group":35,"sex":2,"people":2347737},
  {"year":1900,"age_group":40,"sex":1,"people":2261070},
  {"year":1900,"age_group":40,"sex":2,"people":2004987},
  {"year":1900,"age_group":45,"sex":1,"people":1868413},
  {"year":1900,"age_group":45,"sex":2,"people":1648025},
  {"year":1900,"age_group":50,"sex":1,"people":1571038},
  {"year":1900,"age_group":50,"sex":2,"people":1411981},
  {"year":1900,"age_group":55,"sex":1,"people":1161908},
  {"year":1900,"age_group":55,"sex":2,"people":1064632},
  {"year":1900,"age_group":60,"sex":1,"people":916571},
  {"year":1900,"age_group":60,"sex":2,"people":887508},
  {"year":1900,"age_group":65,"sex":1,"people":672663},
  {"year":1900,"age_group":65,"sex":2,"people":640212},
  {"year":1900,"age_group":70,"sex":1,"people":454747},
  {"year":1900,"age_group":70,"sex":2,"people":440007},
  {"year":1900,"age_group":75,"sex":1,"people":268211},
  {"year":1900,"age_group":75,"sex":2,"people":265879},
  {"year":1900,"age_group":80,"sex":1,"people":127435},
  {"year":1900,"age_group":80,"sex":2,"people":132449},
  {"year":1900,"age_group":85,"sex":1,"people":44008},
  {"year":1900,"age_group":85,"sex":2,"people":48614},
  {"year":1900,"age_group":90,"sex":1,"people":15164},
  {"year":1900,"age_group":90,"sex":2,"people":20093},
  {"year":1910,"age_group":0,"sex":1,"people":5296823},
  {"year":1910,"age_group":0,"sex":2,"people":5287477},
  {"year":1910,"age_group":5,"sex":1,"people":4991803},
  {"year":1910,"age_group":5,"sex":2,"people":4866139},
  {"year":1910,"age_group":10,"sex":1,"people":4650747},
  {"year":1910,"age_group":10,"sex":2,"people":4471887},
  {"year":1910,"age_group":15,"sex":1,"people":4566154},
  {"year":1910,"age_group":15,"sex":2,"people":4592269},
  {"year":1910,"age_group":20,"sex":1,"people":4637632},
  {"year":1910,"age_group":20,"sex":2,"people":4447683},
  {"year":1910,"age_group":25,"sex":1,"people":4257755},
  {"year":1910,"age_group":25,"sex":2,"people":3946153},
  {"year":1910,"age_group":30,"sex":1,"people":3658125},
  {"year":1910,"age_group":30,"sex":2,"people":3295220},
  {"year":1910,"age_group":35,"sex":1,"people":3427518},
  {"year":1910,"age_group":35,"sex":2,"people":3088990},
  {"year":1910,"age_group":40,"sex":1,"people":2860229},
  {"year":1910,"age_group":40,"sex":2,"people":2471267},
  {"year":1910,"age_group":45,"sex":1,"people":2363801},
  {"year":1910,"age_group":45,"sex":2,"people":2114930},
  {"year":1910,"age_group":50,"sex":1,"people":2126516},
  {"year":1910,"age_group":50,"sex":2,"people":1773592},
  {"year":1910,"age_group":55,"sex":1,"people":1508358},
  {"year":1910,"age_group":55,"sex":2,"people":1317651},
  {"year":1910,"age_group":60,"sex":1,"people":1189421},
  {"year":1910,"age_group":60,"sex":2,"people":1090697},
  {"year":1910,"age_group":65,"sex":1,"people":850159},
  {"year":1910,"age_group":65,"sex":2,"people":813868},
  {"year":1910,"age_group":70,"sex":1,"people":557936},
  {"year":1910,"age_group":70,"sex":2,"people":547623},
  {"year":1910,"age_group":75,"sex":1,"people":322679},
  {"year":1910,"age_group":75,"sex":2,"people":350900},
  {"year":1910,"age_group":80,"sex":1,"people":161715},
  {"year":1910,"age_group":80,"sex":2,"people":174315},
  {"year":1910,"age_group":85,"sex":1,"people":59699},
  {"year":1910,"age_group":85,"sex":2,"people":62725},
  {"year":1910,"age_group":90,"sex":1,"people":23929},
  {"year":1910,"age_group":90,"sex":2,"people":28965},
  {"year":1920,"age_group":0,"sex":1,"people":5934792},
  {"year":1920,"age_group":0,"sex":2,"people":5694244},
  {"year":1920,"age_group":5,"sex":1,"people":5789008},
  {"year":1920,"age_group":5,"sex":2,"people":5693960},
  {"year":1920,"age_group":10,"sex":1,"people":5401156},
  {"year":1920,"age_group":10,"sex":2,"people":5293057},
  {"year":1920,"age_group":15,"sex":1,"people":4724365},
  {"year":1920,"age_group":15,"sex":2,"people":4779936},
  {"year":1920,"age_group":20,"sex":1,"people":4549411},
  {"year":1920,"age_group":20,"sex":2,"people":4742632},
  {"year":1920,"age_group":25,"sex":1,"people":4565066},
  {"year":1920,"age_group":25,"sex":2,"people":4529382},
  {"year":1920,"age_group":30,"sex":1,"people":4110771},
  {"year":1920,"age_group":30,"sex":2,"people":3982426},
  {"year":1920,"age_group":35,"sex":1,"people":4081543},
  {"year":1920,"age_group":35,"sex":2,"people":3713810},
  {"year":1920,"age_group":40,"sex":1,"people":3321923},
  {"year":1920,"age_group":40,"sex":2,"people":3059757},
  {"year":1920,"age_group":45,"sex":1,"people":3143891},
  {"year":1920,"age_group":45,"sex":2,"people":2669089},
  {"year":1920,"age_group":50,"sex":1,"people":2546035},
  {"year":1920,"age_group":50,"sex":2,"people":2200491},
  {"year":1920,"age_group":55,"sex":1,"people":1880975},
  {"year":1920,"age_group":55,"sex":2,"people":1674672},
  {"year":1920,"age_group":60,"sex":1,"people":1587549},
  {"year":1920,"age_group":60,"sex":2,"people":1382877},
  {"year":1920,"age_group":65,"sex":1,"people":1095956},
  {"year":1920,"age_group":65,"sex":2,"people":989901},
  {"year":1920,"age_group":70,"sex":1,"people":714618},
  {"year":1920,"age_group":70,"sex":2,"people":690097},
  {"year":1920,"age_group":75,"sex":1,"people":417292},
  {"year":1920,"age_group":75,"sex":2,"people":439465},
  {"year":1920,"age_group":80,"sex":1,"people":187000},
  {"year":1920,"age_group":80,"sex":2,"people":211110},
  {"year":1920,"age_group":85,"sex":1,"people":75991},
  {"year":1920,"age_group":85,"sex":2,"people":92829},
  {"year":1920,"age_group":90,"sex":1,"people":22398},
  {"year":1920,"age_group":90,"sex":2,"people":32085},
  {"year":1930,"age_group":0,"sex":1,"people":5875250},
  {"year":1930,"age_group":0,"sex":2,"people":5662530},
  {"year":1930,"age_group":5,"sex":1,"people":6542592},
  {"year":1930,"age_group":5,"sex":2,"people":6129561},
  {"year":1930,"age_group":10,"sex":1,"people":6064820},
  {"year":1930,"age_group":10,"sex":2,"people":5986529},
  {"year":1930,"age_group":15,"sex":1,"people":5709452},
  {"year":1930,"age_group":15,"sex":2,"people":5769587},
  {"year":1930,"age_group":20,"sex":1,"people":5305992},
  {"year":1930,"age_group":20,"sex":2,"people":5565382},
  {"year":1930,"age_group":25,"sex":1,"people":4929853},
  {"year":1930,"age_group":25,"sex":2,"people":5050229},
  {"year":1930,"age_group":30,"sex":1,"people":4424408},
  {"year":1930,"age_group":30,"sex":2,"people":4455213},
  {"year":1930,"age_group":35,"sex":1,"people":4576531},
  {"year":1930,"age_group":35,"sex":2,"people":4593776},
  {"year":1930,"age_group":40,"sex":1,"people":4075139},
  {"year":1930,"age_group":40,"sex":2,"people":3754022},
  {"year":1930,"age_group":45,"sex":1,"people":3633152},
  {"year":1930,"age_group":45,"sex":2,"people":3396558},
  {"year":1930,"age_group":50,"sex":1,"people":3128108},
  {"year":1930,"age_group":50,"sex":2,"people":2809191},
  {"year":1930,"age_group":55,"sex":1,"people":2434077},
  {"year":1930,"age_group":55,"sex":2,"people":2298614},
  {"year":1930,"age_group":60,"sex":1,"people":1927564},
  {"year":1930,"age_group":60,"sex":2,"people":1783515},
  {"year":1930,"age_group":65,"sex":1,"people":1397275},
  {"year":1930,"age_group":65,"sex":2,"people":1307312},
  {"year":1930,"age_group":70,"sex":1,"people":919045},
  {"year":1930,"age_group":70,"sex":2,"people":918509},
  {"year":1930,"age_group":75,"sex":1,"people":536375},
  {"year":1930,"age_group":75,"sex":2,"people":522716},
  {"year":1930,"age_group":80,"sex":1,"people":246708},
  {"year":1930,"age_group":80,"sex":2,"people":283579},
  {"year":1930,"age_group":85,"sex":1,"people":88978},
  {"year":1930,"age_group":85,"sex":2,"people":109210},
  {"year":1930,"age_group":90,"sex":1,"people":30338},
  {"year":1930,"age_group":90,"sex":2,"people":43483},
  {"year":1940,"age_group":0,"sex":1,"people":5294628},
  {"year":1940,"age_group":0,"sex":2,"people":5124653},
  {"year":1940,"age_group":5,"sex":1,"people":5468378},
  {"year":1940,"age_group":5,"sex":2,"people":5359099},
  {"year":1940,"age_group":10,"sex":1,"people":5960416},
  {"year":1940,"age_group":10,"sex":2,"people":5868532},
  {"year":1940,"age_group":15,"sex":1,"people":6165109},
  {"year":1940,"age_group":15,"sex":2,"people":6193701},
  {"year":1940,"age_group":20,"sex":1,"people":5682414},
  {"year":1940,"age_group":20,"sex":2,"people":5896002},
  {"year":1940,"age_group":25,"sex":1,"people":5438166},
  {"year":1940,"age_group":25,"sex":2,"people":5664244},
  {"year":1940,"age_group":30,"sex":1,"people":5040048},
  {"year":1940,"age_group":30,"sex":2,"people":5171522},
  {"year":1940,"age_group":35,"sex":1,"people":4724804},
  {"year":1940,"age_group":35,"sex":2,"people":4791809},
  {"year":1940,"age_group":40,"sex":1,"people":4437392},
  {"year":1940,"age_group":40,"sex":2,"people":4394061},
  {"year":1940,"age_group":45,"sex":1,"people":4190187},
  {"year":1940,"age_group":45,"sex":2,"people":4050290},
  {"year":1940,"age_group":50,"sex":1,"people":3785735},
  {"year":1940,"age_group":50,"sex":2,"people":3488396},
  {"year":1940,"age_group":55,"sex":1,"people":2972069},
  {"year":1940,"age_group":55,"sex":2,"people":2810000},
  {"year":1940,"age_group":60,"sex":1,"people":2370232},
  {"year":1940,"age_group":60,"sex":2,"people":2317790},
  {"year":1940,"age_group":65,"sex":1,"people":1897678},
  {"year":1940,"age_group":65,"sex":2,"people":1911117},
  {"year":1940,"age_group":70,"sex":1,"people":1280023},
  {"year":1940,"age_group":70,"sex":2,"people":1287711},
  {"year":1940,"age_group":75,"sex":1,"people":713875},
  {"year":1940,"age_group":75,"sex":2,"people":764915},
  {"year":1940,"age_group":80,"sex":1,"people":359418},
  {"year":1940,"age_group":80,"sex":2,"people":414761},
  {"year":1940,"age_group":85,"sex":1,"people":127303},
  {"year":1940,"age_group":85,"sex":2,"people":152131},
  {"year":1940,"age_group":90,"sex":1,"people":42263},
  {"year":1940,"age_group":90,"sex":2,"people":58119},
  {"year":1950,"age_group":0,"sex":1,"people":8211806},
  {"year":1950,"age_group":0,"sex":2,"people":7862267},
  {"year":1950,"age_group":5,"sex":1,"people":6706601},
  {"year":1950,"age_group":5,"sex":2,"people":6450863},
  {"year":1950,"age_group":10,"sex":1,"people":5629744},
  {"year":1950,"age_group":10,"sex":2,"people":5430835},
  {"year":1950,"age_group":15,"sex":1,"people":5264129},
  {"year":1950,"age_group":15,"sex":2,"people":5288742},
  {"year":1950,"age_group":20,"sex":1,"people":5573308},
  {"year":1950,"age_group":20,"sex":2,"people":5854227},
  {"year":1950,"age_group":25,"sex":1,"people":6007254},
  {"year":1950,"age_group":25,"sex":2,"people":6317332},
  {"year":1950,"age_group":30,"sex":1,"people":5676022},
  {"year":1950,"age_group":30,"sex":2,"people":5895178},
  {"year":1950,"age_group":35,"sex":1,"people":5511364},
  {"year":1950,"age_group":35,"sex":2,"people":5696261},
  {"year":1950,"age_group":40,"sex":1,"people":5076985},
  {"year":1950,"age_group":40,"sex":2,"people":5199224},
  {"year":1950,"age_group":45,"sex":1,"people":4533177},
  {"year":1950,"age_group":45,"sex":2,"people":4595842},
  {"year":1950,"age_group":50,"sex":1,"people":4199164},
  {"year":1950,"age_group":50,"sex":2,"people":4147295},
  {"year":1950,"age_group":55,"sex":1,"people":3667351},
  {"year":1950,"age_group":55,"sex":2,"people":3595158},
  {"year":1950,"age_group":60,"sex":1,"people":3035038},
  {"year":1950,"age_group":60,"sex":2,"people":3009768},
  {"year":1950,"age_group":65,"sex":1,"people":2421234},
  {"year":1950,"age_group":65,"sex":2,"people":2548250},
  {"year":1950,"age_group":70,"sex":1,"people":1627920},
  {"year":1950,"age_group":70,"sex":2,"people":1786831},
  {"year":1950,"age_group":75,"sex":1,"people":1006530},
  {"year":1950,"age_group":75,"sex":2,"people":1148469},
  {"year":1950,"age_group":80,"sex":1,"people":511727},
  {"year":1950,"age_group":80,"sex":2,"people":637717},
  {"year":1950,"age_group":85,"sex":1,"people":182821},
  {"year":1950,"age_group":85,"sex":2,"people":242798},
  {"year":1950,"age_group":90,"sex":1,"people":54836},
  {"year":1950,"age_group":90,"sex":2,"people":90766},
  {"year":1960,"age_group":0,"sex":1,"people":10374975},
  {"year":1960,"age_group":0,"sex":2,"people":10146999},
  {"year":1960,"age_group":5,"sex":1,"people":9495503},
  {"year":1960,"age_group":5,"sex":2,"people":9250741},
  {"year":1960,"age_group":10,"sex":1,"people":8563700},
  {"year":1960,"age_group":10,"sex":2,"people":8310764},
  {"year":1960,"age_group":15,"sex":1,"people":6620902},
  {"year":1960,"age_group":15,"sex":2,"people":6617493},
  {"year":1960,"age_group":20,"sex":1,"people":5268384},
  {"year":1960,"age_group":20,"sex":2,"people":5513495},
  {"year":1960,"age_group":25,"sex":1,"people":5311805},
  {"year":1960,"age_group":25,"sex":2,"people":5548259},
  {"year":1960,"age_group":30,"sex":1,"people":5801342},
  {"year":1960,"age_group":30,"sex":2,"people":6090862},
  {"year":1960,"age_group":35,"sex":1,"people":6063063},
  {"year":1960,"age_group":35,"sex":2,"people":6431337},
  {"year":1960,"age_group":40,"sex":1,"people":5657943},
  {"year":1960,"age_group":40,"sex":2,"people":5940520},
  {"year":1960,"age_group":45,"sex":1,"people":5345658},
  {"year":1960,"age_group":45,"sex":2,"people":5516028},
  {"year":1960,"age_group":50,"sex":1,"people":4763364},
  {"year":1960,"age_group":50,"sex":2,"people":4928844},
  {"year":1960,"age_group":55,"sex":1,"people":4170581},
  {"year":1960,"age_group":55,"sex":2,"people":4402878},
  {"year":1960,"age_group":60,"sex":1,"people":3405293},
  {"year":1960,"age_group":60,"sex":2,"people":3723839},
  {"year":1960,"age_group":65,"sex":1,"people":2859371},
  {"year":1960,"age_group":65,"sex":2,"people":3268699},
  {"year":1960,"age_group":70,"sex":1,"people":2115763},
  {"year":1960,"age_group":70,"sex":2,"people":2516479},
  {"year":1960,"age_group":75,"sex":1,"people":1308913},
  {"year":1960,"age_group":75,"sex":2,"people":1641371},
  {"year":1960,"age_group":80,"sex":1,"people":619923},
  {"year":1960,"age_group":80,"sex":2,"people":856952},
  {"year":1960,"age_group":85,"sex":1,"people":253245},
  {"year":1960,"age_group":85,"sex":2,"people":384572},
  {"year":1960,"age_group":90,"sex":1,"people":75908},
  {"year":1960,"age_group":90,"sex":2,"people":135774},
  {"year":1970,"age_group":0,"sex":1,"people":8685121},
  {"year":1970,"age_group":0,"sex":2,"people":8326887},
  {"year":1970,"age_group":5,"sex":1,"people":10411131},
  {"year":1970,"age_group":5,"sex":2,"people":10003293},
  {"year":1970,"age_group":10,"sex":1,"people":10756403},
  {"year":1970,"age_group":10,"sex":2,"people":10343538},
  {"year":1970,"age_group":15,"sex":1,"people":9605399},
  {"year":1970,"age_group":15,"sex":2,"people":9414284},
  {"year":1970,"age_group":20,"sex":1,"people":7729202},
  {"year":1970,"age_group":20,"sex":2,"people":8341830},
  {"year":1970,"age_group":25,"sex":1,"people":6539301},
  {"year":1970,"age_group":25,"sex":2,"people":6903041},
  {"year":1970,"age_group":30,"sex":1,"people":5519879},
  {"year":1970,"age_group":30,"sex":2,"people":5851441},
  {"year":1970,"age_group":35,"sex":1,"people":5396732},
  {"year":1970,"age_group":35,"sex":2,"people":5708021},
  {"year":1970,"age_group":40,"sex":1,"people":5718538},
  {"year":1970,"age_group":40,"sex":2,"people":6129319},
  {"year":1970,"age_group":45,"sex":1,"people":5794120},
  {"year":1970,"age_group":45,"sex":2,"people":6198742},
  {"year":1970,"age_group":50,"sex":1,"people":5298312},
  {"year":1970,"age_group":50,"sex":2,"people":5783817},
  {"year":1970,"age_group":55,"sex":1,"people":4762911},
  {"year":1970,"age_group":55,"sex":2,"people":5222164},
  {"year":1970,"age_group":60,"sex":1,"people":4037643},
  {"year":1970,"age_group":60,"sex":2,"people":4577251},
  {"year":1970,"age_group":65,"sex":1,"people":3142606},
  {"year":1970,"age_group":65,"sex":2,"people":3894827},
  {"year":1970,"age_group":70,"sex":1,"people":2340826},
  {"year":1970,"age_group":70,"sex":2,"people":3138009},
  {"year":1970,"age_group":75,"sex":1,"people":1599269},
  {"year":1970,"age_group":75,"sex":2,"people":2293376},
  {"year":1970,"age_group":80,"sex":1,"people":886155},
  {"year":1970,"age_group":80,"sex":2,"people":1417553},
  {"year":1970,"age_group":85,"sex":1,"people":371123},
  {"year":1970,"age_group":85,"sex":2,"people":658511},
  {"year":1970,"age_group":90,"sex":1,"people":186502},
  {"year":1970,"age_group":90,"sex":2,"people":314929},
  {"year":1980,"age_group":0,"sex":1,"people":8439366},
  {"year":1980,"age_group":0,"sex":2,"people":8081854},
  {"year":1980,"age_group":5,"sex":1,"people":8680730},
  {"year":1980,"age_group":5,"sex":2,"people":8275881},
  {"year":1980,"age_group":10,"sex":1,"people":9452338},
  {"year":1980,"age_group":10,"sex":2,"people":9048483},
  {"year":1980,"age_group":15,"sex":1,"people":10698856},
  {"year":1980,"age_group":15,"sex":2,"people":10410271},
  {"year":1980,"age_group":20,"sex":1,"people":10486776},
  {"year":1980,"age_group":20,"sex":2,"people":10614947},
  {"year":1980,"age_group":25,"sex":1,"people":9624053},
  {"year":1980,"age_group":25,"sex":2,"people":9827903},
  {"year":1980,"age_group":30,"sex":1,"people":8705835},
  {"year":1980,"age_group":30,"sex":2,"people":8955225},
  {"year":1980,"age_group":35,"sex":1,"people":6852069},
  {"year":1980,"age_group":35,"sex":2,"people":7134239},
  {"year":1980,"age_group":40,"sex":1,"people":5692148},
  {"year":1980,"age_group":40,"sex":2,"people":5953910},
  {"year":1980,"age_group":45,"sex":1,"people":5342469},
  {"year":1980,"age_group":45,"sex":2,"people":5697543},
  {"year":1980,"age_group":50,"sex":1,"people":5603709},
  {"year":1980,"age_group":50,"sex":2,"people":6110117},
  {"year":1980,"age_group":55,"sex":1,"people":5485098},
  {"year":1980,"age_group":55,"sex":2,"people":6160229},
  {"year":1980,"age_group":60,"sex":1,"people":4696140},
  {"year":1980,"age_group":60,"sex":2,"people":5456885},
  {"year":1980,"age_group":65,"sex":1,"people":3893510},
  {"year":1980,"age_group":65,"sex":2,"people":4896947},
  {"year":1980,"age_group":70,"sex":1,"people":2857774},
  {"year":1980,"age_group":70,"sex":2,"people":3963441},
  {"year":1980,"age_group":75,"sex":1,"people":1840438},
  {"year":1980,"age_group":75,"sex":2,"people":2951759},
  {"year":1980,"age_group":80,"sex":1,"people":1012886},
  {"year":1980,"age_group":80,"sex":2,"people":1919292},
  {"year":1980,"age_group":85,"sex":1,"people":472338},
  {"year":1980,"age_group":85,"sex":2,"people":1023115},
  {"year":1980,"age_group":90,"sex":1,"people":204148},
  {"year":1980,"age_group":90,"sex":2,"people":499046},
  {"year":1990,"age_group":0,"sex":1,"people":9307465},
  {"year":1990,"age_group":0,"sex":2,"people":8894007},
  {"year":1990,"age_group":5,"sex":1,"people":9274732},
  {"year":1990,"age_group":5,"sex":2,"people":8799955},
  {"year":1990,"age_group":10,"sex":1,"people":8782542},
  {"year":1990,"age_group":10,"sex":2,"people":8337284},
  {"year":1990,"age_group":15,"sex":1,"people":9020572},
  {"year":1990,"age_group":15,"sex":2,"people":8590991},
  {"year":1990,"age_group":20,"sex":1,"people":9436188},
  {"year":1990,"age_group":20,"sex":2,"people":9152644},
  {"year":1990,"age_group":25,"sex":1,"people":10658027},
  {"year":1990,"age_group":25,"sex":2,"people":10587292},
  {"year":1990,"age_group":30,"sex":1,"people":11028712},
  {"year":1990,"age_group":30,"sex":2,"people":11105750},
  {"year":1990,"age_group":35,"sex":1,"people":9853933},
  {"year":1990,"age_group":35,"sex":2,"people":10038644},
  {"year":1990,"age_group":40,"sex":1,"people":8712632},
  {"year":1990,"age_group":40,"sex":2,"people":8928252},
  {"year":1990,"age_group":45,"sex":1,"people":6848082},
  {"year":1990,"age_group":45,"sex":2,"people":7115129},
  {"year":1990,"age_group":50,"sex":1,"people":5553992},
  {"year":1990,"age_group":50,"sex":2,"people":5899925},
  {"year":1990,"age_group":55,"sex":1,"people":4981670},
  {"year":1990,"age_group":55,"sex":2,"people":5460506},
  {"year":1990,"age_group":60,"sex":1,"people":4953822},
  {"year":1990,"age_group":60,"sex":2,"people":5663205},
  {"year":1990,"age_group":65,"sex":1,"people":4538398},
  {"year":1990,"age_group":65,"sex":2,"people":5594108},
  {"year":1990,"age_group":70,"sex":1,"people":3429420},
  {"year":1990,"age_group":70,"sex":2,"people":4610222},
  {"year":1990,"age_group":75,"sex":1,"people":2344932},
  {"year":1990,"age_group":75,"sex":2,"people":3723980},
  {"year":1990,"age_group":80,"sex":1,"people":1342996},
  {"year":1990,"age_group":80,"sex":2,"people":2545730},
  {"year":1990,"age_group":85,"sex":1,"people":588790},
  {"year":1990,"age_group":85,"sex":2,"people":1419494},
  {"year":1990,"age_group":90,"sex":1,"people":238459},
  {"year":1990,"age_group":90,"sex":2,"people":745146},
  {"year":2000,"age_group":0,"sex":1,"people":9735380},
  {"year":2000,"age_group":0,"sex":2,"people":9310714},
  {"year":2000,"age_group":5,"sex":1,"people":10552146},
  {"year":2000,"age_group":5,"sex":2,"people":10069564},
  {"year":2000,"age_group":10,"sex":1,"people":10563233},
  {"year":2000,"age_group":10,"sex":2,"people":10022524},
  {"year":2000,"age_group":15,"sex":1,"people":10237419},
  {"year":2000,"age_group":15,"sex":2,"people":9692669},
  {"year":2000,"age_group":20,"sex":1,"people":9731315},
  {"year":2000,"age_group":20,"sex":2,"people":9324244},
  {"year":2000,"age_group":25,"sex":1,"people":9659493},
  {"year":2000,"age_group":25,"sex":2,"people":9518507},
  {"year":2000,"age_group":30,"sex":1,"people":10205879},
  {"year":2000,"age_group":30,"sex":2,"people":10119296},
  {"year":2000,"age_group":35,"sex":1,"people":11475182},
  {"year":2000,"age_group":35,"sex":2,"people":11635647},
  {"year":2000,"age_group":40,"sex":1,"people":11320252},
  {"year":2000,"age_group":40,"sex":2,"people":11488578},
  {"year":2000,"age_group":45,"sex":1,"people":9925006},
  {"year":2000,"age_group":45,"sex":2,"people":10261253},
  {"year":2000,"age_group":50,"sex":1,"people":8507934},
  {"year":2000,"age_group":50,"sex":2,"people":8911133},
  {"year":2000,"age_group":55,"sex":1,"people":6459082},
  {"year":2000,"age_group":55,"sex":2,"people":6921268},
  {"year":2000,"age_group":60,"sex":1,"people":5123399},
  {"year":2000,"age_group":60,"sex":2,"people":5668961},
  {"year":2000,"age_group":65,"sex":1,"people":4453623},
  {"year":2000,"age_group":65,"sex":2,"people":4804784},
  {"year":2000,"age_group":70,"sex":1,"people":3792145},
  {"year":2000,"age_group":70,"sex":2,"people":5184855},
  {"year":2000,"age_group":75,"sex":1,"people":2912655},
  {"year":2000,"age_group":75,"sex":2,"people":4355644},
  {"year":2000,"age_group":80,"sex":1,"people":1902638},
  {"year":2000,"age_group":80,"sex":2,"people":3221898},
  {"year":2000,"age_group":85,"sex":1,"people":970357},
  {"year":2000,"age_group":85,"sex":2,"people":1981156},
  {"year":2000,"age_group":90,"sex":1,"people":336303},
  {"year":2000,"age_group":90,"sex":2,"people":1064581}
]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
It consists of the following columns:

- \`year\`: The year of the census.
- \`age_group\`: Age group, in 5 year bins from 0-4 years old to 90+.
- \`sex\`: The reported sex (binary in this dataset): 1→male, 2→female.
- \`people\`: The population count of the group.

Here are the first 10 rows:
`
)});
  main.variable(observer()).define(["printTable","census"], function(printTable,census){return(
printTable(census.slice(0, 10))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Now, let's start coding!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Imports`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`First, we need to import d3. The suffix \`@5\` here denotes version 5.`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Create and Append`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`First, let's create a \`container\` to hold the visual elements that we are going to add.

To create our container, we first define the width, height, as well as margins for our visualization. We expect the dimensions of our visualization to be \`width\` by \`height\`, with surrounding \`margin\` for elements such as axes and titles.
`
)});
  main.variable(observer("width")).define("width", function(){return(
600
)});
  main.variable(observer("height")).define("height", function(){return(
400
)});
  main.variable(observer("margin")).define("margin", function(){return(
{
    top: 50,
    right: 50,
    bottom: 50,
    left: 100
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Our enclosing container will be an \`svg\`, or **S**calable **V**ector **G**raphics, element. We can create this by using d3's \`create\` method. Notice the \`mutable\` qualifier here. Don't freak out! This is discussed above __"A quick note about the code..."__ and is not necessary for your own work.`
)});
  main.define("initial container", ["d3","width","margin","height"], function(d3,width,margin,height){return(
d3.create('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
)});
  main.variable(observer("mutable container")).define("mutable container", ["Mutable", "initial container"], (M, _) => new M(_));
  main.variable(observer("container")).define("container", ["mutable container"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`Notice that we've assigned \`attr\` (attributes) to the element we've just created. For a full list of attributes assignable to svg elements, check out the documentation [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute).`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Within this container, we can insert our \`chart\`. To do this, we create a \`g\` element (a "group"), which is translated within our \`container\` such that we achieve our \`margin\`. This is where the graphical elements bound to the __data__ of our visualization will lie.

We add the created \`g\` using the \`append()\` function &ndash; it allows us to add new elements anywhere. We can also get rid of elements with \`remove()\`.

We store \`chart\` with a variable for future use.
`
)});
  main.define("initial chart", ["mutable container","margin"], function($0,margin){return(
($0.value).append('g')
  .attr('id', 'chart')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)
)});
  main.variable(observer("mutable chart")).define("mutable chart", ["Mutable", "initial chart"], (M, _) => new M(_));
  main.variable(observer("chart")).define("chart", ["mutable chart"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`If we render this right now, we will see only a large blank rectangle:`
)});
  main.variable(observer()).define(["container"], function(container){return(
container.node()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Selections
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__selections_n__")).define("__selections_n__", ["cloneAndAppend","mutable container","mutable chart"], function(cloneAndAppend,$0,$1)
{
  const container = cloneAndAppend($0.value);

  const chart = cloneAndAppend($1.value, container);
  
  return {
    container,
    chart
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`\`append()\` is part of the d3 selection family, which helps to create and access page elements.

\`d3.select()\` and \`d3.selectAll()\` can be used to access elements by name, class, id, or many other [CSS selectors](https://www.w3schools.com/cssref/css_selectors.asp). \`d3.select()\` selects only the first element that matches the CSS selectors while \`d3.selectAll()\` selects all matched elements. To select an element within a selection we've already defined (e.g., our \`container\` or \`chart\`) we can use _selection_.\`select()\` or _selection_.\`selectAll()\`.

You can access and modify the properties of selections with \`attr()\`, \`text()\`, \`style()\`, and other operators. Most d3 selection methods return the selection, allowing us to chain the operator calls.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Let's try to modify attributes and styles of \`container\` and \`chart\` to help clear up their positions. Below is what you would see if:

_First_. Our svg \`container\` were filled by a pink \`rect\` (note that we use \`insert\` before ':first-child' instead of \`append\` here to insert the rect as a first child of the container so as to not occlude our \`chart\` group).

Remember that we are creating variables designated for specific sections with \`__<section>__\` namespaces, and thus the \`__selections__\`. You __do not__ need to do this if you are developing a visualization on your own. This is simply for the purpose of iteration throughout this notebook.
`
)});
  main.variable(observer()).define(["__selections_n__"], function(__selections_n__){return(
__selections_n__.container
  .insert('rect', ':first-child')
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('fill', '#ff96ca')
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Second_. And our chart (selected by \`#chart\` id) had a blue box of dimensions \`width\` by \`height\`.`
)});
  main.variable(observer()).define(["__selections_n__","width","height"], function(__selections_n__,width,height){return(
__selections_n__.chart
  .append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', '#42adf4')
)});
  main.variable(observer()).define(["__selections_n__"], function(__selections_n__){return(
__selections_n__.container.node()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Note the imbalence in left/right margins. We're saving room to eventually add a left-positioned axis.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Tips_

- The [d3 selections page](https://github.com/d3/d3-selection) is extremely helpful!
- Keep in mind that the origin for positioning elements is the upper left corner!
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Domains

Before we can begin plotting our data, we first need to define our \`x\`, \`y\` and \`color\` domains and scales for our bar chart.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Age Domain_. This produces an array of all the ages in the data. \`array.map\` returns an array of identical length by mapping values in the original array to new ones, decided by the given function (in our case, we want an array of just ages). We defined a helper function \`unique\` that will give us the unique values.`
)});
  main.variable(observer("ageDomain")).define("ageDomain", ["unique","census"], function(unique,census){return(
unique(census.map((row) => { return row.age_group }))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_People Domain_. We want the minimum to be 0, as this is a bar chart, and the maximum to be the maximum \`people\` count in the data. We pass a function to tell \`d3.max\` how to access the \`people\` count given a data record.`
)});
  main.variable(observer("peopleDomain")).define("peopleDomain", ["d3","census"], function(d3,census){return(
[0, d3.max(census, row => row.people)]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Sex domain_. The \`sex\` column in our data codes male as \`1\` and female as \`2\`, and so we can just use them directly as the domain.`
)});
  main.variable(observer("sexDomain")).define("sexDomain", function(){return(
[1, 2]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Scales

Using these domains, we can now define scales for our encoding channels.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`As you have learned with Vega-Lite / Altair, _scales_ are functions that map from a domain to a range (a domain of chart). \`d3\` has multiple built in scale functions. Before building the actual scale function, let's take a look at the type of functions we are going to use:

- \`d3.scaleLinear()\` creates a linear mapping between a continuous domain and range. We also have \`d3.scaleLog()\`, \`d3.scaleSqrt()\`, and so on. 
- \`d3.scaleOrdinal()\` specifies an explicit mapping from a set of ordered, discrete data values to a corresponding set of visual attributes (such as colors). 
- \`d3.scaleBand()\` maps a discrete domain to a continous range, by dividing the continous range into uniform _bands_. Band scales are often used for bar charts with an ordinal or categorical dimension &ndash; just like our \`age\` field!
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We want to visualize \`age\` on the \`x\`-axis. We use an ordinal scale to match the data. \`range\` denotes the bounds in the visualization, and \`domain\` denotes the bounds in the data. Recall that scales are functions that take a domain value, i.e., age, and map it to a visual range value, i.e., position: \`x = f(age) => position\`.`
)});
  main.variable(observer("x")).define("x", ["d3","width","ageDomain"], function(d3,width,ageDomain){return(
d3.scaleBand().rangeRound([0, width])
  .padding(0.1)
  .domain(ageDomain)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Similarly, we want a quantitative \`y\` scale for population count. Our range here is from \`height\` to \`0\` (as opposed to \`0\` to \`height\`) because in HTML/d3 land things are drawn downward, where \`(0, 0)\` is the top-left corner.`
)});
  main.variable(observer("y")).define("y", ["d3","height","peopleDomain"], function(d3,height,peopleDomain){return(
d3.scaleLinear()
  .range([height, 0])
  .domain(peopleDomain)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We encode \`sex\` with colors. We first define the the colors representing the male and female, and use those as the range of an ordinal scale. For the purposes of this visualization, we'll start with a "conventional" color association of blue (male) and pink (female), but feel free to change them below as you see fit!`
)});
  main.variable(observer("color")).define("color", ["d3","sexDomain"], function(d3,sexDomain)
{
  const maleColor = '#42adf4';
  const femaleColor = '#ff96ca';

  // create a scale function that maps 1 to the male color and 2 to the female color
  return d3.scaleOrdinal()
    .range([maleColor, femaleColor])
    .domain(sexDomain);
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_Additional tips:_ D3 also handles temporal scales like \`d3.scaleTime()\`, and contains default color scales like \`d3.schemeCategory10()\` (so you don't have to manually define colors, as in our case). Check out the [d3js Scales](https://github.com/d3/d3-scale) page for more information.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Axes`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__axes_n__")).define("__axes_n__", ["cloneAndAppend","mutable container","mutable chart"], function(cloneAndAppend,$0,$1)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);

  return {
    container,
    chart,
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`With scales defined, we can add corresponding axes to our svg container. 

Axes can be generated based on the scales in your visualization. Axes are defined based on their position using axis generator functions \`d3.axisTop()\`, \`d3.axisBottom()\`, \`d3.axisRight()\`, or \`d3.axisLeft()\`.

To create an axis, we must create or select the element in which we want to place it, then invoke  the selection \`call()\` method to apply our axis generator function to it.

See the [d3 Axes page](https://github.com/d3/d3-axis) for more information.
`
)});
  main.define("initial xaxis", ["__axes_n__","height","d3","x"], function(__axes_n__,height,d3,x){return(
__axes_n__.chart
  .append('g')
  .attr('class', 'axis axis--x')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(x))
)});
  main.variable(observer("mutable xaxis")).define("mutable xaxis", ["Mutable", "initial xaxis"], (M, _) => new M(_));
  main.variable(observer("xaxis")).define("xaxis", ["mutable xaxis"], _ => _.generator);
  main.define("initial yaxis", ["__axes_n__","d3","y"], function(__axes_n__,d3,y){return(
__axes_n__.chart
  .append('g')
  .attr('class', 'axis axis--y')
  .call(d3.axisLeft(y))
)});
  main.variable(observer("mutable yaxis")).define("mutable yaxis", ["Mutable", "initial yaxis"], (M, _) => new M(_));
  main.variable(observer("yaxis")).define("yaxis", ["mutable yaxis"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`Our container now displays x and y axes!`
)});
  main.variable(observer()).define(["__axes_n__"], function(__axes_n__){return(
__axes_n__.container.node()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Titles`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__titles_n__")).define("__titles_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis"], function(cloneAndAppend,$0,$1,$2,$3)
{
  const container = cloneAndAppend($0.value);
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  const yaxis = cloneAndAppend($3.value, chart);
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`In D3, axis generators do not automatically create titles for you. You can manually add _labels_ to your axes (or other elements!) by adding text marks. As with any other mark, you can programmatically specify both HTML attributes and CSS styles.

Let's add titles for the chart, and x and y axes:
`
)});
  main.variable(observer()).define(["__titles_n__"], function(__titles_n__){return(
__titles_n__.container.selectAll('text').style("font-family", "sans-serif")
)});
  main.define("initial title", ["__titles_n__","width","margin"], function(__titles_n__,width,margin){return(
__titles_n__.container.append("text")
    .attr("transform", `translate(${(width + margin.left + margin.right)/2},20)`)
    .style("text-anchor", "middle")
    .style("font-weight", 700)
    .text("Census Age Group and Population by Sex")
)});
  main.variable(observer("mutable title")).define("mutable title", ["Mutable", "initial title"], (M, _) => new M(_));
  main.variable(observer("title")).define("title", ["mutable title"], _ => _.generator);
  main.define("initial ytitle", ["__titles_n__","margin","height"], function(__titles_n__,margin,height){return(
__titles_n__.chart.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Population")
)});
  main.variable(observer("mutable ytitle")).define("mutable ytitle", ["Mutable", "initial ytitle"], (M, _) => new M(_));
  main.variable(observer("ytitle")).define("ytitle", ["mutable ytitle"], _ => _.generator);
  main.define("initial xtitle", ["__titles_n__","width","height","margin"], function(__titles_n__,width,height,margin){return(
__titles_n__.chart.append("text")             
  .attr("transform", `translate(${(width/2)}, ${(height + margin.top - 10)})`)
  .style("text-anchor", "middle")
  .text("Age Group")
)});
  main.variable(observer("mutable xtitle")).define("mutable xtitle", ["Mutable", "initial xtitle"], (M, _) => new M(_));
  main.variable(observer("xtitle")).define("xtitle", ["mutable xtitle"], _ => _.generator);
  main.variable(observer()).define(["__titles_n__"], function(__titles_n__){return(
__titles_n__.container.node()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Legends`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__auto_legend_n__")).define("__auto_legend_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Similarly, you will also need to construct _legends_. The [\`d3-legend\`](https://d3-legend.susielu.com/#summary) library can be used to help automatically create it:`
)});
  main.variable(observer("d3Legend")).define("d3Legend", ["require"], function(require){return(
require('d3-svg-legend')
)});
  main.variable(observer("legend_auto")).define("legend_auto", ["d3Legend","color"], function(d3Legend,color){return(
d3Legend
  .legendColor()
  .scale(color)
  .labels(["Male", "Female"])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Similar to axes, we can then add the legend with the call function: 
`
)});
  main.variable(observer()).define(["__auto_legend_n__","legend_auto"], function(__auto_legend_n__,legend_auto){return(
__auto_legend_n__.container.append("g")
  .attr("class", "legend_auto")
  .style('font-size', 12)
  .style('font-family', 'sans-serif')
  .attr("transform", "translate(650, 100)")
  .call(legend_auto)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Take a look at our container with the axis titles and the color legend:`
)});
  main.variable(observer()).define(["__auto_legend_n__"], function(__auto_legend_n__){return(
__auto_legend_n__.container.node()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Now that we've setup the frame of our chart, let's start to deal with the real data!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Data Bindings`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
The _data bind_ is a core programming paradigm in D3. A _data binding_ is similar to a _data join_. In short, it's a step that makes your elements aware of the data: you can pass this data in the form of an array or object, and "bind" your data to the DOM elements you selected using methods like \`d3.selectAll()\`. This is what it looks like:

~~~ js
d3.selectAll('<selector>').data(<data>)
~~~

What's happening here?

* \`selectAll('<selector>')\` selects all _DOM_ elements and their data bindings (if any) in a given D3 container (if we use \`d3.selectAll\`, we are looking on the entire page, if we do \`chart.selectAll\`, it'll select within the \`chart\` container). Abstractly, the result of a selection that has data bound will look something like this:

~~~
  [
    { id: 0, element: <DOM Element>, datum: <row from dataset> },
    { id: 1, element: <another DOM Element>, datum: <another row from dataset> }
    ...
  ]
~~~

* \`.data(<data>)\` _binds_ the data to the elements selected (replacing old bindings if they exist) by performing the equivalent of a database 'join' on the selection above and the data given. The key used for the join, by default, is simply the index of each datum in the data.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The result of a binding is three sets of _element + data_ pairs.

1. \`enter()\`: The set of _data_ that __do not have__ bound _DOM elements_.
2. \`update()\*\`: The set of _DOM elements_ that __already have__ _data_ (\* note: this is an implicit set. It is the set of elements that will be modified if neither \`enter()\` nor \`exit()\` are selected from the result of \`data()\`.
3. \`exit()\`: The set of _DOM elements_ that __do not have__ _data_ bound.

It may be helpful to remember the symmetry here! There is also a helpful fourth set, \`merge()\`, the union of \`enter()\` and \`update()\` sets.

To understand this paradigm, let's go through each of these sets step by step.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Data binding 101: Recreate the legends manually with Enter`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__manual_legend_n__")).define("__manual_legend_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`As a small first example to data binding, let's recreate the legend manually. We can do so by creating new DOM elements using the \`enter()\` set. Manual legends are just like the other elements of your visualization: by creating a new set of marks, binding the data, and using scales to style the attributes.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Programmatically, data binding goes through several steps (we will see more when we talk about interactions later):

1. _select_ all of elements with the \`legend\` class with \`selectAll()\`. Because we haven't created any yet, the result of \`selectAll\` will be an empty set.
2. _bind_ our data with \`.data()\` (in this case, the domain of \`color\`, which is the values of \`sex\`.)
3. Invoke \`enter()\` to work on the set of input data without a corresponding bound DOM element. 
4. \`append()\` a new DOM element for every data point in the enter set. We append the \`g\` for each sex value (hence we have two). 
5. Invoke \`attr()\` for each element with anonymous functions \`function(d, i)\` which are then applied to the bound data, and return values based on two parameters \`d\` (our bound datum) and \`i\` (the index of our datum). Here, we specify an offset of 20 vertical pixels between \`g\` elements.
`
)});
  main.define("initial legend", ["__manual_legend_n__","color"], function(__manual_legend_n__,color){return(
__manual_legend_n__.chart
  .selectAll(".legend")               // step 1
  .data(color.domain())               // step 2
  .enter()                            // step 3
  .append("g")                        // step 4
  .attr("class", "legend")            // step 5
  .attr("transform", function(d, i) { // step 5
    // i is the index
    return `translate(0, ${i * 20})`; 
  })
  .style('font-family', 'sans-serif')
)});
  main.variable(observer("mutable legend")).define("mutable legend", ["Mutable", "initial legend"], (M, _) => new M(_));
  main.variable(observer("legend")).define("legend", ["mutable legend"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`Then, we can further append elements onto the wrapper group \`g\`. By appending elements onto \`legend\`, elements get automatically mapped to each datum in our \`color.domain()\`. Hence, we will have two \`rect\` elements (rectangles) in total, one for each sex. Inside the \`g\` for each sex, both \`rect\`s are placed at (x=360, y=65). Recall that the two \`g\` elements have a 20 pixel offset in between them, which means we will also have a 20 pixel vertical gap between the rectangles. Think of it as an inherited padding.
`
)});
  main.variable(observer()).define(["mutable legend","width","margin","color"], function($0,width,margin,color){return(
$0.value.append("rect")
  .attr('class', 'legend-rect')
  .attr("x", width + margin.right-12)
  .attr("y", 65)
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", color)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Similarly, we can append text to create the legend labels, and set their text to be Male and Female, instead of the uninformative 1 and 2.`
)});
  main.variable(observer()).define(["mutable legend","width","margin"], function($0,width,margin){return(
$0.value.append("text")
  .attr('class', 'legend-text')
  .attr("x", width + margin.right-22)
  .attr("y", 70)
  .style('font-size', "12px")
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) { return d === 1 ? 'Male' : 'Female'; })
)});
  main.variable(observer()).define(["__manual_legend_n__"], function(__manual_legend_n__){return(
__manual_legend_n__.container.node()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Creating bars with Enter
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__bars_enter_namespace__")).define("__bars_enter_namespace__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle","mutable legend"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6,$7)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  const legend = cloneAndAppend($7.value, chart);
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
    legend
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue_.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Similar to how we've created the legend, let's bind our data onto elements for the bars of our visualization.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`As a starting point, suppose we are interested in seeing the population distribution for a given year (\`1900\`) and sex (\`2 = female\`). We can define these values in a \`state\` object, which we will manipulate later.`
)});
  main.variable(observer("state")).define("state", function(){return(
{year: 1900, sex: 2}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`To filter our data to specific rows of interest (recall that we are interested in a specific year and sex), we define a function on a row. Recall that a row is a JSON object that looks like the following:`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`\`{ "year": 1900, "age_group": 0, "sex": 1,"people": 4619544 }\``
)});
  main.variable(observer("isYearAndSex")).define("isYearAndSex", function(){return(
function isYearAndSex(row, year, sex) {
  return row.year === year && row.sex === sex;
}
)});
  main.variable(observer("filteredData")).define("filteredData", ["census","isYearAndSex","state"], function(census,isYearAndSex,state){return(
census.filter(row => isYearAndSex(row, state.year, state.sex))
)});
  main.variable(observer()).define(["printTable","filteredData"], function(printTable,filteredData){return(
printTable(filteredData)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We can now perform a data binding on our filtered dataset.`
)});
  main.variable(observer("bars")).define("bars", ["__bars_enter_namespace__","filteredData"], function(__bars_enter_namespace__,filteredData){return(
__bars_enter_namespace__.chart.selectAll('.bar').data(filteredData)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The bar selection will be an empty \`selectAll\`, because we have yet to draw any. This means all the data points will be in the \`.enter()\` set of the binding.

Now, for everything in the enter set, append a \`rect\` element and size / position appropriately. Think of this as: for each datapoint, create a rect with the given attributes.`
)});
  main.define("initial enterbars", ["bars","x","y","height","color"], function(bars,x,y,height,color){return(
bars
  .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.age_group))
    .attr('y', (d) => y(d.people))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - y(d.people))
    .attr('fill', (d) => color(d.sex))
)});
  main.variable(observer("mutable enterbars")).define("mutable enterbars", ["Mutable", "initial enterbars"], (M, _) => new M(_));
  main.variable(observer("enterbars")).define("enterbars", ["mutable enterbars"], _ => _.generator);
  main.variable(observer()).define(["md"], function(md){return(
md`Let's use our new knowledge of \`enter()\` to understand what's going on here.

1. \`chart.selectAll('.bar')\` selects all DOM elements (and their data bindings, if any) in \`chart\` with attribute \`class = 'bar'\`. Because we have not yet added any elements with the class 'bar', this is an empty set of elements.
2. \`\{...\}.data(filteredData)\` performs the equivalent of a database 'join' on the the empty set selected above and the filtered data. The key used for the join, by default, is simply the index of each datum in the data. Because, at this point, all datum have __no__ bound DOM element, the result of this join will be __(a)__ an \`enter()\` set containing a datum + DOM bindings (present or otherwise) for every data point, __(b)__ an empty \`update()\` set, and __(c)__ an empty \`exit()\` set.
3. \`.enter()\` simply selects the \`enter()\` set.
4. \`append('rect')\` creates and appends a DOM element (an svg 'rect') _for every item in the selected set_. In this case, we are creating a rect for every row in our \`filteredData\`.
5. \`attr('class', 'bar')\`, applies the attribute \`class="bar"\` to, again, every element in our selected set. Now, if we perform a \`.selectAll('.bar')\`, we will receive all of the elements we have just created!
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`The visual attributes of each bar are calculated as follows:

* Its x position is a function of the \`age_group\` of its datum \`d\`. We created this function earlier, it's the \`x\` scale!
* Its y position is a function of the \`people\`, as determined by our \`y\` scale.
* Its width is \`bandwidth\` of our ordinal scale (the space reserved for each column).
* Its height is the distance between its starting y position and the 'bottom' of the chart, where the x axis lies. Remember that (0, 0) is in our top left corner, so a y position of \`height\` is our 'bottom'.
* Its fill color is a function of the \'sex\' of its datum, as determined by our \`color\` scale.
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Our static visualization is officially complete! Note that this is displaying the population of a single decade and sex. In the next section, we will look at how we can incorporate _interaction_ into our visualization to allow users to change the filter being applied to the data. `
)});
  main.variable(observer()).define(["__bars_enter_namespace__"], function(__bars_enter_namespace__){return(
__bars_enter_namespace__.container.node()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Creating a dynamic visualization with Update`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__update_naive_n__")).define("__update_naive_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle","mutable legend","mutable enterbars"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6,$7,$8)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  const legend = cloneAndAppend($7.value, chart);
  
  const enterbars = cloneAndAppend($8.value, chart);
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
    legend,
    enterbars
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Update_ can help us display modifications to the data presented by our visualization, without needing to re-render it entirely. This is especially powerful in enabling transitions and animations.

Below, we implement a simple update function. This function performs several steps.

1. It takes a sex and a decade \`step\` (e.g. +10, -10), filters out a new subset of the data.
2. Selects all 'bar' elements and joins them with this new data (remember, because we have provided no explicit 'key' function, d3 joins on the index of the data).
3. Selects the \`update()\` set (implicitly), and adjusts the attributes of each bar (e.g. size) to match the new data. Notice that we are not \`appending\` any new elements here! We are simply changing the visual attributes of existing elements to match the new data bound to them.

_Transitions_ allow us to interpolate between each bar's previous appearance and the new one we just specified over the given _duration_. We can name a \`transition\` to create a key for it. Transitions with the same name have the ability to override each other.`
)});
  main.variable(observer("updateNaive")).define("updateNaive", ["state","census","isYearAndSex","__update_naive_n__","x","y","height","color"], function(state,census,isYearAndSex,__update_naive_n__,x,y,height,color){return(
function updateNaive(sex, step) {
  // Step 1
  state.year += step;
  state.sex = sex;
  const newData = census.filter(row => isYearAndSex(row, state.year, state.sex));
  
  // Step 2
  const bars = __update_naive_n__.chart.selectAll('.bar')
    .data(newData);
  
  // Step 3
  bars
    .transition('update')
    .duration(500)
      .attr('x', d => x(d.age_group))
      .attr('y', d => y(d.people))
      .attr('height', d => height - y(d.people))
      .attr('fill', d => color(d.sex));
  
  document.getElementById('curr-year-naive').textContent = state.year;
}
)});
  main.variable(observer()).define(["__update_naive_n__"], function(__update_naive_n__){return(
__update_naive_n__.container.node()
)});
  main.variable(observer("viewof timeButtonsNaive")).define("viewof timeButtonsNaive", ["html","state","updateNaive"], function(html,state,updateNaive)
{
  const decrement = html`<button id="decrement">&lt;&lt;</button>`;
  decrement.onclick = () => {
    if (state.year > 1900) {
      updateNaive(state.sex, -10);
    }
  };
  
  const increment = html`<button id="increment">&gt;&gt;</button>`;
  increment.onclick = () => {
    if (state.year < 2000) {
      updateNaive(state.sex, 10);
    }
  }
  
  
  const switchSexButton = html`<button>switch sex</button>`;
  switchSexButton.onclick = () => updateNaive(state.sex === 2 ? 1 : 2, 0);
  
  const view = html`
    <div style="width: 800px; text-align: center; font-family: sans-serif">
      ${decrement}
      <span id="curr-year-naive">
        ${state.year}
      </span>
      ${increment}
      <br/>
      ${switchSexButton}
    </div>
`
  
  return view;
}
);
  main.variable(observer("timeButtonsNaive")).define("timeButtonsNaive", ["Generators", "viewof timeButtonsNaive"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`We can now cycle through the decades of our dataset and switch the filtered sex!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Conveying temporal movement with Enter + Update + Exit`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__update_better_n__")).define("__update_better_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle","mutable legend","mutable enterbars"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6,$7,$8)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  const legend = cloneAndAppend($7.value, chart);
  
  const enterbars = cloneAndAppend($8.value, chart);
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
    legend,
    enterbars
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`While our simple \`update\` above covers the basics of interaction, there is room for improvement. Recall that the census is taken every 10 years. This means that a population that is 0-5 years old in one census reading will be 10-15 in the next. In our basic update implementation, this idea is hidden! Bars grow and shrink, but without knowledge of the dataset or careful attention, it would be otherwise unclear how the population is aging.

We can combine _enter_, _update_, and _exit_ to achieve this temporal encoding through animation. Here's how we'll do it.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Step 1_. _Data_. Like before, modify our state and filter our data to match it.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Step 2_. _Join_. Like before, select our 'bar's and join on our new data. _However_, this time we give \`.data()\` a \`key\` function. We wish to match the population of the current census year with its record in the next census year. If \`step\` denotes our census year adjustment, then a row in the next year (\`state.year\`) for age group \`d.age_group\` should be matched with the row in the previous year with age group (the row currently bound to that DOM element) \`d.age_group - step\`. For example, if we are transitioning from 1900 to 1910, then the 10-15 year olds in 1910 should be matched with the 0-5 year olds from 1900.

~~~ js
  const bars = chart.selectAll('.bar')
    .data(newData, (d) => {
      if (d.year === state.year) {  // if the datum is from the newData
        // the age for the year we are updating to should match the age - step for the previous year.
        return d.age_group - step;
      } else {  // if the datum is from the data currently bound to the DOM elements
        return d.age_group;
      }
    });
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Step 3_. _Enter_. If we are stepping forward in time, our enter set will contain the age groups 0-5 and 5-10, as those people are yet to be born. We should append new bars for these datum and animate them in.

~~~ js
  bars.enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.age_group))
    .attr('y', d => y(0))
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .attr('fill', d => color(d.sex))
    .on('mouseenter', function(d) {
      // show the tooltip on mouse enter
      updateBetterTip.show(d, this);
      d3.select(this).style('opacity', 0.7);
    })
    .on('mouseout', function(d) { 
    // hide the tooltip on mouse out
      updateBetterTip.hide();
      d3.select(this).style('opacity', 1)
    })
    .transition('enter-transition')
    .duration(500)
    .attr('y', d => y(d.people))
    .attr('height', d => height - y(d.people))
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
_Step 4_. _Update_. For bars in our update set, we need to shift them over to the appropriate \`x\` position and adjust their height.

~~~ js
  bars
    .transition('update-transition')
    .duration(500)
      .attr('x', d => x(d.age_group))
      .attr('y', d => y(d.people))
      .attr('height', d => height - y(d.people))
      .attr('fill', d => color(d.sex));
~~~
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Step 5_. _Exit_. If we are stepping forward in time, our exit set will contain the age groups 85-90 and 95+. We need to transition these out, as they will be replaced by the age groups 75-85 and 80-85 from the previous decade (note that the catch-all of a 95+ age group slightly breaks the analogy).

~~~ js
  bars.exit()
    .transition('exit-transition')
    .duration(500)
      .attr('height', 0)
      .attr('y', y(0))
      .remove();
~~~
`
)});
  main.variable(observer("updateBetter")).define("updateBetter", ["state","census","isYearAndSex","__update_better_n__","x","y","color","height"], function(state,census,isYearAndSex,__update_better_n__,x,y,color,height){return(
function updateBetter(sex, step) {
  
  // Step 1. Data.
  state.sex = sex;
  state.year += step;
  const newData = census.filter(row => isYearAndSex(row, state.year, state.sex));
  
  // Step 2. Join.
  const bars = __update_better_n__.chart.selectAll('.bar')
      .data(newData, (d) => {
        if (d.year === state.year) {
          // the age for the current year should match the age - step for the previous year.
          return d.age_group - step;
      } else {
          return d.age_group;
      }
    });
  
  // Step 3. Enter.
  bars.enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.age_group))
    .attr('y', d => y(0))
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .attr('fill', d => color(d.sex))
  .transition('enter-transition')
  .duration(500)
    .attr('y', d => y(d.people))
    .attr('height', d => height - y(d.people))
  
  // Step 4. Update.
  bars
    .transition('update-transition')
    .duration(500)
      .attr('x', d => x(d.age_group))
      .attr('y', d => y(d.people))
      .attr('height', d => height - y(d.people))
      .attr('fill', d => color(d.sex));
  
  // Step 5. Exit.
  bars.exit()
    .transition('exit-transition')
      .duration(500)
      .attr('height', 0)
      .attr('y', y(0))
      .remove();
  
  // update the year text
  document.getElementById('curr-year-better').textContent = state.year;
}
)});
  main.variable(observer()).define(["__update_better_n__"], function(__update_better_n__){return(
__update_better_n__.container.node()
)});
  main.variable(observer("viewof timeButtonsBetter")).define("viewof timeButtonsBetter", ["html","state","updateBetter"], function(html,state,updateBetter)
{
  const decrement = html`<button id="decrement">&lt;&lt;</button>`;
  decrement.onclick = () => {
    if (state.year > 1900) {
      updateBetter(state.sex, -10);
    }
  };
  
  const increment = html`<button id="increment">&gt;&gt;</button>`;
  increment.onclick = () => {
    if (state.year < 2000) {
      updateBetter(state.sex, 10);
    }
  }
  
  
  const switchSexButton = html`<button>switch sex</button>`;
  switchSexButton.onclick = () => updateBetter(state.sex === 2 ? 1 : 2, 0);
  
  const view = html`
    <div style="width: 800px; text-align: center; font-family: sans-serif">
      ${decrement}
      <span id="curr-year-better">
        ${state.year}
      </span>
      ${increment}
      <br/>
      ${switchSexButton}
    </div>
`
  
  return view;
}
);
  main.variable(observer("timeButtonsBetter")).define("timeButtonsBetter", ["Generators", "viewof timeButtonsBetter"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`This concludes our tour of the core ideas in D3! 🏄‍♀️🏄‍

Read on to learn more about mouse events and other interaction techniques.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Other Interaction Techniques`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
### Creating tooltips`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__tooltip_n__")).define("__tooltip_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle","mutable legend","mutable enterbars"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6,$7,$8)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  const legend = cloneAndAppend($7.value, chart);
  
  const enterbars = cloneAndAppend($8.value, chart);
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
    legend,
    enterbars
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue._`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Making tooltips from scratch is usually difficult. Similar to legends, useful libraries like [\`d3-tip\`](https://github.com/Caged/d3-tip) can be handy.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Import the library:`
)});
  main.variable(observer("d3Tip")).define("d3Tip", ["require"], function(require){return(
require("d3-tip")
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Essentially, d3-tip is creating a carefully styled HTML element block for you. You will need to customize it in the following ways when creating the tooltip: 
1. Provide some style for the tooltip.
2. Make an offset so the tip is on the top.
3. Use \`html\` to set the html element you would like to display in the tooltip block. The input to the function \`d\` represents the underlying data of the mark, of which the tooltip is displaying the information.`
)});
  main.variable(observer("tip")).define("tip", ["d3Tip","d3"], function(d3Tip,d3){return(
d3Tip()
  .attr('class', "d3-tip")
  .style("color", "white")
  .style("background-color", "black")
  .style("padding", "6px")
  .style("border-radius", "4px")
  .style("font-size", "12px")
  .offset([-10, 0])
  .html(function(d) { return `<strong>${d3.format(',')(d.people)}</strong> people`; })
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_Tip:_ \`d3.format()\` can help you display number in a more human-friendly format. Check out more possible formats [here](https://github.com/d3/d3-format)!`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Add the tooltip to the figure with \`call()\`:`
)});
  main.variable(observer()).define(["__tooltip_n__","tip"], function(__tooltip_n__,tip){return(
__tooltip_n__.container.call(tip)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We now add events listeners to the data-binded rectangle bars, such that the tooltip is triggered correctly. 

Event listeners can be added to marks to react to events on the underlying selection using the \`on()\` method. The \`on()\` method takes the event name and a callback function that is triggered every time the specified event happens.

An anonymous function can be used as the callback for the event listener. The input to the function \`d\` represents the underlying data of the mark. The scope, \`this\`, corresponds to the DOM element.

Event listeners include:
- \`mousedown\`: Triggered by an element when a mouse button is pressed down over it
- \`mouseup\`: Triggered by an element when a mouse button is released over it
- \`mouseover\`: Triggered by an element when the mouse comes over it
- \`mouseout\`: Triggered by an element when the mouse goes out of it
- \`mousemove\`: Triggered by an element on every mouse move over it.
- \`click\`: Triggered by a mouse click: mousedown and then mouseup over an element
- \`contextmenu\`: Triggered by a right-button mouse click over an element.
- \`dblclick\`: Triggered by two clicks within a short time over an element
`
)});
  main.variable(observer()).define(["__tooltip_n__","tip","d3"], function(__tooltip_n__,tip,d3){return(
__tooltip_n__.chart
  .selectAll('.bar')
  .on('mouseover', function(d) {
    // show the tooltip on mouse over
    tip.show(d, this);
    // when the bar is mouse-overed, we slightly decrease opacity of the bar.
    d3.select(this).style('opacity', 0.7);
  }) 
  .on('mouseout', function(d) { 
    // hide the tooltip on mouse out
    tip.hide();
    d3.select(this).style('opacity', 1)
  })
)});
  main.variable(observer()).define(["md"], function(md){return(
md`We also have to add these listeners to any bars we \`append\` in our update function (collapsed for space).`
)});
  main.variable(observer("updateTooltipChart")).define("updateTooltipChart", ["state","census","isYearAndSex","__tooltip_n__","x","y","color","tip","d3","height"], function(state,census,isYearAndSex,__tooltip_n__,x,y,color,tip,d3,height){return(
function updateTooltipChart(sex, step) {
  
  // Step 1. Data.
  state.sex = sex;
  state.year += step;
  const newData = census.filter(row => isYearAndSex(row, state.year, state.sex));
  
  // Step 2. Join.
  const bars = __tooltip_n__.chart.selectAll('.bar')
      .data(newData, (d) => {
        if (d.year === state.year) {
          // the age for the current year should match the age - step for the previous year.
          return d.age_group - step;
      } else {
          return d.age_group;
      }
    });
  
  // Step 3. Enter.
  bars.enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.age_group))
    .attr('y', d => y(0))
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .attr('fill', d => color(d.sex))
    .on('mouseenter', function(d) {
      // show the tooltip on mouse enter
      tip.show(d, this);
      d3.select(this).style('opacity', 0.7);
    })
      .on('mouseout', function(d) { 
      // hide the tooltip on mouse out
      tip.hide();
      d3.select(this).style('opacity', 1)
    })
    .transition('enter-transition')
    .duration(500)
      .attr('y', d => y(d.people))
      .attr('height', d => height - y(d.people))
  
  // Step 4. Update.
  bars
    .transition('update-transition')
    .duration(500)
      .attr('x', d => x(d.age_group))
      .attr('y', d => y(d.people))
      .attr('height', d => height - y(d.people))
      .attr('fill', d => color(d.sex));
  
  // Step 5. Exit.
  bars.exit()
    .transition('exit-transition')
      .duration(500)
      .attr('height', 0)
      .attr('y', y(0))
      .remove();
  
  // update the year text
  document.getElementById('curr-year-tooltipchart').textContent = state.year;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Hover on the bars to see what's happening!`
)});
  main.variable(observer()).define(["__tooltip_n__"], function(__tooltip_n__){return(
__tooltip_n__.container.node()
)});
  main.variable(observer("viewof tooltipChartButtons")).define("viewof tooltipChartButtons", ["html","state","updateTooltipChart"], function(html,state,updateTooltipChart)
{
  const decrement = html`<button id="decrement">&lt;&lt;</button>`;
  decrement.onclick = () => {
    if (state.year > 1900) {
      updateTooltipChart(state.sex, -10);
    }
  };
  
  const increment = html`<button id="increment">&gt;&gt;</button>`;
  increment.onclick = () => {
    if (state.year < 2000) {
      updateTooltipChart(state.sex, 10);
    }
  }
  
  
  const switchSexButton = html`<button id="switch">Switch Sex</button>`;
  switchSexButton.onclick = () => updateTooltipChart(state.sex === 2 ? 1 : 2, 0);
  
  const view = html`
    <div style="width: 800px; text-align: center; font-family: sans-serif">
      ${decrement}
      <span id="curr-year-tooltipchart">
        ${state.year}
      </span>
      ${increment}
      <br/>
      ${switchSexButton}
    </div>
`
  return view;
}
);
  main.variable(observer("tooltipChartButtons")).define("tooltipChartButtons", ["Generators", "viewof tooltipChartButtons"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`### Dynamic & clickable legend`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`_namespace definition with everything we've created so far._`
)});
  main.variable(observer("__dynamic_legend_n__")).define("__dynamic_legend_n__", ["cloneAndAppend","mutable container","mutable chart","mutable xaxis","mutable yaxis","mutable title","mutable ytitle","mutable xtitle","mutable legend","mutable enterbars","tip","d3"], function(cloneAndAppend,$0,$1,$2,$3,$4,$5,$6,$7,$8,tip,d3)
{
  const container = cloneAndAppend($0.value);
  
  const chart = cloneAndAppend($1.value, container);
  
  const xaxis = cloneAndAppend($2.value, chart);
  
  const yaxis = cloneAndAppend($3.value, chart);
  
  const title = cloneAndAppend($4.value, container);
  
  const ytitle = cloneAndAppend($5.value, chart);
  
  const xtitle = cloneAndAppend($6.value, chart);
  
  const legend = cloneAndAppend($7.value, chart);
  
  const enterbars = cloneAndAppend($8.value, chart);
  
  container.call(tip);
  
  enterbars.on('mouseover', function(d) {
    // show the tooltip on mouse over
    tip.show(d, this);
    // when the bar is mouse-overed, we slightly decrease opacity of the bar.
    d3.select(this).style('opacity', 0.7);
  }) 
  .on('mouseout', function(d) { 
    // hide the tooltip on mouse out
    tip.hide();
    d3.select(this).style('opacity', 1)
  });
  
  return {
    container,
    chart,
    xaxis,
    yaxis,
    title,
    ytitle,
    xtitle,
    legend,
    enterbars
  };
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`_and now we continue_.`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Since our visualizaton is only ever showing a single sex at any given point, it'd be helpful if:

1. Our legend displayed the selected sex.
2. Users were able to use the legend as a form of input to update our visualization.

#### Displaying the selected sex

Remember that our legend was bound to the data! When we (manually) created it, we bound it to the domain of our color scale. This means we can style it according to this data (as we have with its fill).

We can make the opacity of each rect a function of the data:`
)});
  main.variable(observer()).define(["__dynamic_legend_n__","state"], function(__dynamic_legend_n__,state){return(
__dynamic_legend_n__.legend
  .selectAll('.legend-rect')
  .style('opacity', d => d === state.sex ? 1 : 0.5)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`And bold the text / modify its opacity similarly`
)});
  main.variable(observer()).define(["__dynamic_legend_n__","state"], function(__dynamic_legend_n__,state){return(
__dynamic_legend_n__.legend
  .selectAll('.legend-text')
  .style('opacity', d => d === state.sex ? 1 : 0.5)
  .style('font-weight', d => d === state.sex ? 700 : 400)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Our \`update\` function needs to apply these changes as well (collapsed for space).`
)});
  main.variable(observer("updateLegendV2Chart")).define("updateLegendV2Chart", ["state","census","isYearAndSex","__dynamic_legend_n__","x","y","color","tip","d3","height"], function(state,census,isYearAndSex,__dynamic_legend_n__,x,y,color,tip,d3,height){return(
function updateLegendV2Chart(sex, step) {
  
  // Step 1. Data.
  state.sex = sex;
  state.year += step;
  const newData = census.filter(row => isYearAndSex(row, state.year, state.sex));
  
  // Step 2. Join.
  const bars = __dynamic_legend_n__.chart.selectAll('.bar')
      .data(newData, (d) => {
        if (d.year === state.year) {
          // the age for the current year should match the age - step for the previous year.
          return d.age_group - step;
      } else {
          return d.age_group;
      }
    });
  
  // Step 3. Enter.
  bars.enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.age_group))
    .attr('y', d => y(0))
    .attr('width', x.bandwidth())
    .attr('height', 0)
    .attr('fill', d => color(d.sex))
    .on('mouseenter', function(d) {
      // show the tooltip on mouse enter
      tip.show(d, this);
      d3.select(this).style('opacity', 0.7);
    })
      .on('mouseout', function(d) { 
      // hide the tooltip on mouse out
      tip.hide();
      d3.select(this).style('opacity', 1)
    })
  .transition('enter-transition')
  .duration(500)
    .attr('y', d => y(d.people))
    .attr('height', d => height - y(d.people))
  
  // Step 4. Update.
  bars
    .transition('update-transition')
    .duration(500)
      .attr('x', d => x(d.age_group))
      .attr('y', d => y(d.people))
      .attr('height', d => height - y(d.people))
      .attr('fill', d => color(d.sex));
  
  // Step 5. Exit.
  bars.exit()
    .transition('exit-transition')
      .duration(500)
      .attr('height', 0)
      .attr('y', y(0))
      .remove();
  
  // update legend
  __dynamic_legend_n__.legend.selectAll('.legend-rect')
    .style('opacity', d => d === state.sex ? 1 : 0.5);
  
  __dynamic_legend_n__.legend.selectAll('.legend-text')
    .style('opacity', d => d === state.sex ? 1 : 0.5)
    .style('font-weight', d => d === state.sex ? 700 : 400);
  
  // update the year text
  document.getElementById('curr-year-dynamiclegend').textContent = state.year;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`#### Adding click events to the legend

To invoke an update when a legend item is clicked, we introduce a 'click' event listener to the legend items. When an item is clicked, we update our visualization by passing in the bound sex and a step of 0.
`
)});
  main.variable(observer()).define(["__dynamic_legend_n__","updateLegendV2Chart"], function(__dynamic_legend_n__,updateLegendV2Chart){return(
__dynamic_legend_n__.legend
  .on('click', d => updateLegendV2Chart(d, 0))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Finally, we change the cursor to be a 'pointer' over the legend.`
)});
  main.variable(observer()).define(["__dynamic_legend_n__"], function(__dynamic_legend_n__){return(
__dynamic_legend_n__.legend
  .style('cursor', 'pointer')
)});
  main.variable(observer()).define(["__dynamic_legend_n__"], function(__dynamic_legend_n__){return(
__dynamic_legend_n__.container.node()
)});
  main.variable(observer("viewof legendV2ChartButtons")).define("viewof legendV2ChartButtons", ["html","state","updateLegendV2Chart"], function(html,state,updateLegendV2Chart)
{
  const decrement = html`<button id="decrement">&lt;&lt;</button>`;
  decrement.onclick = () => {
    if (state.year > 1900) {
      updateLegendV2Chart(state.sex, -10);
    }
  };
  
  const increment = html`<button id="increment">&gt;&gt;</button>`;
  increment.onclick = () => {
    if (state.year < 2000) {
      updateLegendV2Chart(state.sex, 10);
    }
  }
  
  
  const switchSexButton = html`<button id="switch">Switch Sex</button>`;
  switchSexButton.onclick = () => updateLegendV2Chart(state.sex === 2 ? 1 : 2, 0);
  
  const view = html`
    <div style="width: 800px; text-align: center; font-family: sans-serif">
      ${decrement}
      <span id="curr-year-dynamiclegend">
        ${state.year}
      </span>
      ${increment}
      <br/>
      ${switchSexButton}
    </div>
`
  return view;
}
);
  main.variable(observer("legendV2ChartButtons")).define("legendV2ChartButtons", ["Generators", "viewof legendV2ChartButtons"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`## Imports &amp; Utilities`
)});
  main.variable(observer("unique")).define("unique", function(){return(
function unique(array) {
  return array.filter((v, i) => array.indexOf(v) === i);
}
)});
  const child1 = runtime.module(define1);
  main.import("printTable", child1);
  main.variable(observer("cloneAndAppend")).define("cloneAndAppend", ["d3"], function(d3){return(
function cloneAndAppend(child, parent) {
  const childClones = [];
  
  child.each(function(p, j) {
    const original = d3.select(this);
    const cloneNode = original.node().cloneNode(true);
    const cloneSelection = d3.select(cloneNode);
    cloneSelection.datum(original.datum());
    
    cloneSelection.select('*');  // propogate data down.
    childClones.push(cloneNode);

    if (parent) {
      parent.node().appendChild(cloneNode);
    }
  });
  
  return d3.selectAll(childClones);
}
)});
  return main;
}
