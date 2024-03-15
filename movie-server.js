// 서버 설정
const express=require("express")
const request=require("request")
const port=3355
const app=express()
app.use(express.json())
let cors=request('cors')
app.use(cors())
app.listen(port,()=>{
    console.log("Server Start...","http://localhost:33355")
})

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/static', express.static(__dirname + '/public'));

/*
   searchMainDailyBoxOffice.do 일일 박스오피스
   searchMainRealTicket.do 실시간 예매율
   searchMainDailySeatTicket.do 좌석점유율순위

 */
// Model => @RestController
/*
        app.get(주소,()=>{}
        @GetMapping()
        메소드
 */
app.get('/movie/list_node',(req,response)=>{
    let no=req.query.no
    console.log("no="+no)
    // String no=request.getParameter("no")
    /*let site=''
    if(no===1)
    {
        site='searchMainDailyBoxOffice.do'
    }
    else if(no===2)
    {
        site='searchMainRealTicket.do'
    }
    else if(no===3)
    {
        site='searchMainDailySeatTicket.do'
    }
   */
    let url='http://localhost/movie/movie_boot?no='+no;
    request({url:url},function(err,request,json){
        console.log(json)
        response.json(json)
    })

})
// thumbUrl  movieNm watchGradeNm
