# Taiwan-map-React-with-D3-geo
interactive Taiwan map with table
inspired by @muratkemaldar ！thanks for sharing！

中華民國縣市GeoJson下載來源:

[(https://sheethub.com/ronnywang/%E4%B8%AD%E8%8F%AF%E6%B0%91%E5%9C%8B%E7%B8%A3%E5%B8%82)]

拿到的會是一個點線面的座標資料，但是需要editor編排換行之後，Visual Studio Code 才讀得懂。

JSON Editor:

[(https://jsoneditoronline.org/)]

<img src="https://user-images.githubusercontent.com/66729413/91699528-00943480-eba7-11ea-8ff5-cf4728310175.PNG"></img>

彩色版本：

 .style("fill",function() {
        return "hsl(" + Math.random() * 1080 + ",56%,82%)";
        })


![d3-react-taiwan-map](https://user-images.githubusercontent.com/66729413/127157091-6b3b2904-967b-447b-a997-1744ea237816.gif)


