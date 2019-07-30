/*
 * 버스 도착 정보 API제공 : 공공데이터포털[https://www.data.go.kr]
 * 사용 모듈 :  스크래핑 모듈 request-promise xml2
 *             npm i request request-promise xml2js
 * 
 * 버스 정류소ID 참조 : http://topis.seoul.go.kr/excel/stationlist.xlsx
 * 버스 노선ID, 정류소순번 정보 참조 : http://topis.seoul.go.kr/map/openBusMap.do#
*/
// request: http 읽어오는 모듈
//http://ws.bus.go.kr/api/rest/stationinfo/getLowStationByUid?ServiceKey=인증키&arsId=02105
const { promisify } = require('util')
const parseString = promisify(require('xml2js').parseString)//xml파일을 파싱하는 코드
const rp = require('request-promise')
var args = process.argv
var arsId= args[2]

const serviceKey = 'QBHiO9kndqzdxwEal7fqXwhCZmm6LnVTZ%2F1J%2BF9o6%2F9JftwDQUVjPUhTilDn4U7FLnjkevwhS%2BvXOIgQJxGBvw%3D%3D'

const url1 = (arsId) => `http://ws.bus.go.kr/api/rest/stationinfo/getLowStationByUid?ServiceKey=${serviceKey}&arsId=${arsId}`

rp(url1(arsId))
  .then(parseString)
  .then(function (data) {

    console.log("정류소명:"+data.ServiceResult.msgBody[0].itemList[0].stnNm)
    console.log("")
    for (var i=0; i<data.ServiceResult.msgBody[0].itemList.length; i++) {
      console.log((i+1)+"번째 버스명:  "+ data.ServiceResult.msgBody[0].itemList[i].rtNm)
      console.log("")
      console.log("첫번째 버스는 "+data.ServiceResult.msgBody[0].itemList[i].arrmsg1+" 후에 도착")
      console.log("두번째 버스는 "+data.ServiceResult.msgBody[0].itemList[i].arrmsg2+" 후에 도착")
      console.log("") 
      console.log("-------------------------------------------------")
    }
      
  })