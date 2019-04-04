var dataP = d3.json("https://ghibliapi.herokuapp.com/films");

var compare = function(a, b){
  //console.log("Comparing")
  if (parseInt(a.rt_score) < parseInt(b.rt_score)){
    //console.log(a.rt_score+ "<"+ b.rt_score + ":" + (parseInt(a.rt_score) < parseInt(b.rt_score)));
    return 1;}
  else if (parseInt(a.rt_score) > parseInt(b.rt_score)){
    //console.log(a.rt_score+ ">"+ b.rt_score + ":" + (parseInt(a.rt_score) > parseInt(b.rt_score)));
    return -1;}
  //console.log(a.rt_score+ "="+ b.rt_score + ":" + (parseInt(a.rt_score) == parseInt(b.rt_score)));
  return 0;
}


var sortData = function(rawData){
  console.log("Rawdata", rawData);
  var sortedData = rawData.sort(compare);
  console.log("SortedData", sortedData);
  return sortedData;
}

var plotRanking = function(sortedData){
  var colLabels = ["Rank", "Title", "Rating Score"]
  var headRow = d3.select("#ranking")
                  .append("tr")
                  .selectAll("th")
                  .data(colLabels)
                  .enter()
                  .append("th")
                  .html(function(label) { return label; })

  var rows = d3.select("#ranking")
                .selectAll("tr")
                .data(sortedData)
                .enter()
                .append("tr")

  rows.append('td').html(function(movie, i) { return i + 2; }).classed("rank-col", true);
  rows.append('td').html(function(movie) { return movie.title; }).classed("title-col", true);
  rows.append('td').html(function(movie) { return movie.rt_score; }).classed("rating-col", true);



}

dataP.then(function(data){
  sortedData = sortData(data);
  plotRanking(sortedData);
})
