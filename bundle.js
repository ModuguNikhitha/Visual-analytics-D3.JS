(function (d3) {
  'use strict';

  const titleText = 'Visualization to view ranking of the university';
  const xAxisLabelText = 'world_rank';

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = data => {
    const xValue = d => d['world_rank'];
    const yValue = d => d.institution;
    const margin = { top: 50, right: 40, bottom: 77, left: 180 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);
    
    const yScale = d3.scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);
    
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxisTickFormat = number =>
      d3.format('.3s')(number)
        .replace('G', 'B');
    
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight);
    
    g.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('.domain, .tick line')
        .remove();
    
    const xAxisG = g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 65)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabelText);
    
    g.selectAll('dot').data(data)
      .enter().append('circle')
      .attr("cx", function (d) { return xScale(d.world_rank); } )
      .attr("cy", function (d) { return yScale(d.institution); } )
      .attr("r", 5)
      .style("fill", "#69b3a2")
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText);
  };

  d3.csv('data.csv').then(data => {
    data.forEach(d => {
      d.world_rank = +d.world_rank;
    });
    render(data);
  });

}(d3));
