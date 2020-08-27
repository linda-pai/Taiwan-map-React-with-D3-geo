import React, { useRef, useEffect } from "react";
import { select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import useResizeObserver from "../pages/useResizeObserver";
import './GeoChart.css'

function GeoChart({ data, property, countyName }) {
  //定義 & 選取 ref = svg\ wrapperRef的DOM節點
  const svgRef = useRef();
  const wrapperRef = useRef();

  //抓取地圖尺寸
  const dimensions = useResizeObserver(wrapperRef);

  //頁面刷新 & 每當變數更新時做的動作
  useEffect(() => {
    const svg = select(svgRef.current);
  //抓取縣市數據的最大與最小值
    const minProp = min(data.features, feature => feature.properties[property]);
    const maxProp = max(data.features, feature => feature.properties[property]);
  //定義顏色
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#d8e2dc", "#457b9d"]);
  //定義大小
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

  //用橫麥卡托的方式投影2D
    const projection = geoMercator()
      .fitSize([width, height], data)
      .precision(100);

  //根據投影定義Path
    const pathGenerator = geoPath().projection(projection);

  //渲染SVG
    svg
      .selectAll(".country")
      .data(data.features)
      .join("path")
      //滑鼠事件發生時 改變的CSS
      .on("mouseover", function (d, i) {
        d3.select('#table')
          .selectAll('tr')
          .classed("tableStyle", function (e, j) { return j == i ; })
          .select('.countyValue')
          .classed("countyValueHovered", function (e, j) { return j == i ; })
      })
      .on("mouseout", () => {
        d3.select('#table')
          .selectAll('tr')
          .classed("tableStyle", false)
          .select('.countyValue')
          .classed("countyValueHovered", false)
      })
      .on("click", feature => {
        alert(feature.properties[countyName])
      })
      .classed('country', true)
      .transition()
      //給定顏色
      .attr("fill", feature => colorScale(feature.properties[property]))
      //給定路徑Path
      .attr("d", feature => pathGenerator(feature));

    // render text
  }, [data, dimensions, property]);

  //定義 & 選取 ref = tableRef的節點
  const tableRef = useRef();
  const drawTable = select(tableRef.current);

  var d3 = require("d3");
  var ƒ = require('d3-utils/get')

  var county1 = [
    { title: "連江縣", countyData: 170 },
    { title: "金門縣", countyData: 100 },
    { title: "宜蘭縣", countyData: 830 },
    { title: "新竹縣", countyData: 252 },
    { title: "苗栗縣", countyData: 116 },
    { title: "彰化縣", countyData: 664 },
    { title: "南投縣", countyData: 723 },
    { title: "雲林縣", countyData: 0 },
    { title: "嘉義縣", countyData: 66 },
    { title: "屏東縣", countyData: 412 },
    { title: "臺東縣", countyData: 150 }
  ];

  var county2 = [
    { title: "花蓮縣", countyData: 540 },
    { title: "澎湖縣", countyData: 485 },
    { title: "基隆市", countyData: 69 },
    { title: "新竹市", countyData: 618 },
    { title: "嘉義市", countyData: 113 },
    { title: "臺北市", countyData: 248 },
    { title: "高雄市", countyData: 304 },
    { title: "新北市", countyData: 255 },
    { title: "臺中市", countyData: 285 },
    { title: "臺南市", countyData: 35 },
    { title: "桃園市", countyData: 317 }
  ]

  // column definitions
  var columns = [
    { head: 'title', html: ƒ('title') },
    { Data: 'countyValue', html: ƒ('countyData') }
  ];

  drawTable
    .append('tbody')
    .selectAll('tr')
    .data(county1).enter()
    .append('tr')
    .on("mouseover", function (d, i) {
      d3.selectAll('.country')
        .classed("countyColor", function (e, j) { return j == i; })
    })
    .on("mouseout", () => {
      d3.selectAll('.country')
        .classed("countyColor", false)
    })
    .selectAll('td')
    .data(function (row, i) {
      return columns.map(function (c) {
        var cell = {};
        d3.keys(c).forEach(function (k) {
          cell[k] = typeof c[k] == 'function' ? c[k](row, i) : c[k];
        });
        return cell;
      });
    }).enter()
    .append('td')
    .html(ƒ('html'))
    .attr('class', ƒ('Data'))
    .classed('map-li', true)


  drawTable
    .append('tbody')
    .attr('class', "county2")
    .selectAll('tr')
    .data(county2).enter()
    .append('tr')
    .on("mouseover", function (d, i) {
      d3.selectAll('.country')
        .classed("countyColor", function (e, j) { return j == i + 11; })
    })
    .on("mouseout", () => {
      d3.selectAll('.country')
        .classed("countyColor", false)
    })
    .selectAll('td')
    .data(function (row, i) {
      return columns.map(function (c) {
        // compute cell values for this specific row
        var cell = {};
        d3.keys(c).forEach(function (k) {
          cell[k] = typeof c[k] == 'function' ? c[k](row, i) : c[k];
        });
        return cell;
      });
    }).enter()
    .append('td')
    .html(ƒ('html'))
    .attr('class', ƒ('Data'))
    .classed('map-li', true)



  return (
    <>
      <h3>一年內全國待辦案件總數</h3>
      <div style={{ display: "flex" }}>
        <div className="taiwanMap" ref={wrapperRef} style={{ height: "100%", position: "relative" }}>
          <svg ref={svgRef} style={{ width: "1400px", height: "1400px" }}></svg>
        </div>
        <div className="li-wrapper">
          <path id="table" ref={tableRef} style={{ width: "360px" }}></path>
        </div>

      </div>
    </>
  );
}

export default GeoChart;