
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

const CoHuu_Filter = (props) => {
    const [condition, setcondition] = useState('')
    const [date, setdate] = useState()
    const mothnow = new Date().getMonth() + 1
    const [month, setmonth] = useState()
    useEffect(() => {

    }, [])

    const changecondition = (e) => {
        setmonth('')
        setdate('')
        setcondition(e.target.value)
    }
    const getdate = (date) => {

        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate())
    }

    const changedate = (e) => {
        setdate(e.target.value)


    }
    const changemonth = (e) => {
        setmonth(e.target.value)


    }
    const addDay = (dates, days) => {
        const date = new Date(dates);
        date.setDate(date.getDate() + days);
        return date;
    }





    const filter = () => {
        console.log(props)
        const datefilter = new Date(date)
        console.log(getdate(addDay(date, 6)))
        let list = []
        if (condition == 1) {
            list = props.listch.filter(item => item.ngay == date)

        }
        if (condition == 2) {
            list = []
            if (datefilter.getDay() != 1) {
                toast.info("Vui lòng chọn ngày là thứ hai")
            }
            else {
                console.log(getdate(addDay(date, 6)))

                props.listgv.map((items, index) => {

                    const sokmngay = props.listch.filter(item => item.soxe == items.soxe && new Date(item.ngay).getTime() >= new Date(date).getTime() && new Date(item.ngay).getTime() <= new Date(getdate(addDay(date, 6))).getTime()).reduce((a, v) => (a = a + Number(v.sokmngay)), 0)
                    const sokmdem = props.listch.filter(item => item.soxe == items.soxe && new Date(item.ngay).getTime() >= new Date(date).getTime() && new Date(item.ngay).getTime() <= new Date(getdate(addDay(date, 6))).getTime()).reduce((a, v) => (a = a + Number(v.sokmdem)), 0)
                    let cohuu = { giaovien: items.name, ngay: '', lotrinh: "", soxe: items.soxe, sokmdem: sokmdem, sokmngay: sokmngay }
                    if (sokmdem + sokmngay > 0)
                        list.push(cohuu)
                })
            }
        }
        if (condition == 3) {
            list = []
            console.log(props.listch)
            props.listgv.map((items, index) => {
                const sokmngay = props.listch.filter(item => item.soxe == items.soxe && new Date(item.ngay).getMonth() == month - 1).reduce((a, v) => (a = a + Number(v.sokmngay)), 0)

                const sokmdem = props.listch.filter(item => item.soxe == items.soxe && new Date(item.ngay).getMonth() == month - 1).reduce((a, v) => (a = a + Number(v.sokmdem)), 0)

                let cohuu = { giaovien: items.name, ngay: '', lotrinh: "", soxe: items.soxe, sokmdem: sokmdem, sokmngay: sokmngay }
                console.log(cohuu)
                list.push(cohuu)
            })
        }
        if (list.length > 0) {
            let obj = { list: list, condition: condition, date: date }
            props.filter(obj)

        }

    }
    return (
        <>


            <div className="col col-md-4">
                <div className="row">
                    <div className="col col-md-4">

                        <select className="form-select" id='quantity' onChange={(e) => changecondition(e)} value={condition} >
                            <option hidden value=''  >Chọn chỉ tiêu</option>
                            <option value='1'  >Ngày</option>
                            <option value='2'  >Tuần</option>
                            <option value='3'  >Tháng</option>

                        </select>

                    </div>
                    <div className="col col-md-4">
                        {condition == 3 ?
                            <select className="form-select " onChange={(e) => changemonth(e)} value={month} >
                                <option hidden value=''  >Chọn tháng</option>
                                <option value='1'  >Tháng 1</option>
                                <option hidden={mothnow < 2} value='2'  >Tháng 2</option>
                                <option hidden={mothnow < 3} value='3'  >Tháng 3</option>
                                <option hidden={mothnow < 4} value='4'  >Tháng 4</option>
                                <option hidden={mothnow < 5} value='5'  >Tháng 5</option>
                                <option hidden={mothnow < 6} value='6'  >Tháng 6</option>
                                <option hidden={mothnow < 7} value='7'  >Tháng 7</option>
                                <option hidden={mothnow < 8} value='8'  >Tháng 8</option>
                                <option hidden={mothnow < 9} value='9'  >Tháng 9</option>
                                <option hidden={mothnow < 10} value='10'  >Tháng 10</option>
                                <option hidden={mothnow < 11} value='11'  >Tháng 11</option>
                                <option hidden={mothnow < 12} value='12'  >Tháng 12</option>

                            </select> : <input type="date" className="form-control  ms-2 " id="teacher" onChange={(e) => changedate(e)} value={date} placeholder="Nhập nội dung tìm kiếm" />
                        }

                    </div>
                    <div className="col col-md-2">
                        <button className="btn btn-lg btn-primary" onClick={() => filter()}>
                            Lọc
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}
export default CoHuu_Filter;