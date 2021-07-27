# Taiwan-map-React-with-D3-geo
interactive Taiwan map with table
inspired by @muratkemaldar ！thanks for sharing！

中華民國縣市GeoJson下載來源:

[(https://sheethub.com/ronnywang/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E7%B8%A3%E5%B8%82)]


        
        
 進階版本：
 用d3.js運算，縣市顏色以數據深淺顯示
 
  //抓取縣市數據的最大與最小值
    const minProp = min(simplified.features, feature => feature.properties[property]);
    const maxProp = max(simplified.features, feature => feature.properties[property]);
  //定義顏色
    const colorScale = scaleLinear()
      .domain([minProp, maxProp])
      .range(["#B6EBF5", "#0077B4"]);


![d3-react-taiwan-map](https://user-images.githubusercontent.com/66729413/127157091-6b3b2904-967b-447b-a997-1744ea237816.gif)


