chart = {
  const root = d3.hierarchy(data);
  const links = root.links();
  const nodes = root.descendants();

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(0).strength(1))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .stop()
      .tick(ticks);

  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line");

  const node = svg.append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("fill", d => d.children ? null : "#000")
      .attr("stroke", d => d.children ? null : "#fff")
      .attr("r", 3.5);

  node.append("title")
      .text(d => d.data.name);

  link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

  node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

  return svg.node();
}

data = Object {
  name: "flare"
  children: Array(10) [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object]
}
data = FileAttachment("flare-2.json").json()
height = 600