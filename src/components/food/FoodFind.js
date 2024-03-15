import {Fragment,useState,useRef} from "react";
import {AllGetData} from "../actions/AllGetData";
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";

export const FoodFind=()=>{
    const [curpage,setCurpage]=useState(1)
    const [address,setAddress]=useState('마포')
    //const [temp,setTemp]=useState('마포')
    const addressRef=useRef(null)
    const {isLoading,isError,error,data}
        =AllGetData('http://localhost/food/find_react',
        {page:curpage,address:address},'food-'+address,curpage)
    if(isLoading) return <h3 className={"text-center"}>Loading</h3>
    if(isError) return <h3 className={"text-center"}>{error.message}</h3>

    const handleChange=(page)=>{
        setCurpage(page)
    }
    let temp=''
    const addressChange=(e)=>{
        temp=e.target.value
        addressRef.current.value=temp
    }
    const find=()=>{
        setAddress(temp)
    }
    return (
        <Fragment>
            <div className={"row"}>
                <input type={"text"} className={"input-sm"} ref={addressRef}
                        size={"20"}  onChange={addressChange}/>
                <button className={"btn-sm btn-danger"} onClick={find}>검색</button>
            </div>
            <div style={{"height": "20px"}}></div>
            <div className={"row"}>
                {
                    data.data.find_list.map((food) =>
                        <div className="col-md-4">
                            <div className="thumbnail">
                                <Link to={"/food/detail/" + food.fno}>
                                    <img src={"http://www.menupan.com" + food.poster} alt="Lights"
                                         style={{"width": "100%"}}/>
                                    <div className="caption">
                                        <p>{food.name}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
            <div style={{"height": "10px"}}></div>
            <div className={"text-center"}>
                <Pagination
                    activePage={curpage}
                    itemsCountPerPage={12}
                    totalItemsCount={data.data.totalpage}
                    pageRangeDisplayed={10}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={handleChange}
                    style={{"width": "100%"}}
                />
            </div>
        </Fragment>
    )

}